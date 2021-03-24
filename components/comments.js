import Markdown from 'markdown-to-jsx';
import ms from 'ms';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import AddCommentBox from './AddCommentBox';

const comments = ({ slug }) => {
  // Access the client
  const queryClient = useQueryClient();

  const fetchComments = () =>
    fetch(`/api/comments?slug=${slug}`).then((res) => res.json());

  // Queries
  const { isLoading, error, data: comments } = useQuery(
    'commentsData',
    fetchComments
  );

  const handleAddComment = async (content) => {
    const fetchRes = await fetch(`/api/comments?slug=${slug}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ content }),
    });

    if (!fetchRes.ok) {
      alert(`Error:${fetchRes.text()}`);
    }
  };

  // mutations
  const mutation = useMutation(handleAddComment, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('commentsData');
    },
  });

  if (isLoading) {
    return (
      <div>
        <div>Loading ...</div>
      </div>
    );
  }

  if (error) return <div>An error occurred {error.message}</div>;

  return (
    <div>
      {comments && comments.length > 0 ? (
        <div className='my-2 max-w-2xl'>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className={comment.clientOnly ? 'opacity-80' : ''}>
              <div className='px-4 py-2 text-sm'>
                <Markdown>{comment.content || ''}</Markdown>
              </div>
              <div className='flex items-center border-t border-gray-200 p-2 text-xs bg-[#fafafa]'>
                <img
                  src={comment.avatar}
                  title={comment.name}
                  className='w-7 h-7 rounded-full border-2 border-gray-200 mr-2'
                />
                <div className='text-gray-500'>
                  {comment.name} (
                  {comment.createdAt &&
                    ms(Date.now() - comment.createdAt, { long: true })}{' '}
                  ago)
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='border-gray-300 border rounded my-2 max-w-2xl'>
          <div className='p-4 text-sm'>No comments so far.</div>
        </div>
      )}

      <AddCommentBox mutation={mutation} />
    </div>
  );
};

export default comments;
