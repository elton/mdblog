import { useState } from 'react';
import { useSession, signIn } from 'next-auth/client';

const AddCommentBox = ({ onSubmit }) => {
  const [commentText, setCommentText] = useState('');
  const [adding, setAdding] = useState(false);
  const [session] = useSession();

  const handleLogin = () => {
    signIn('github');
  };

  const handleAddComment = async () => {
    try {
      setAdding(true);
      await onSubmit(commentText);
      setCommentText('');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className='border-t border-gray-300 py-2 flex items-end justify-between'>
      {session ? (
        <>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className='mt-2 mb-1 w-10/12 border border-gray-300 rounded h-20 p-2'></textarea>
          <button
            onClick={handleAddComment}
            disabled={adding}
            className='text-sm bg-teal-700 text-white rounded p-1 mb-1 text-center'>
            {adding ? 'adding...' : 'Add Comment'}
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className='text-sm bg-teal-700 text-white rounded p-1 mb-1 text-center'>
          Login to Add Comment
        </button>
      )}
    </div>
  );
};

export default AddCommentBox;
