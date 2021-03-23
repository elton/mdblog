import Link from 'next/link';
import Layout from '../../components/Layout';
import ms from 'ms';
import { getPostList } from '../../lib/data';
import { getSession } from 'next-auth/client';
import axios from 'axios';

export default function Home({ postList }) {
  const handleDelete = async (e, post) => {
    e.preventDefault();

    const confirmed = confirm('Do you want to delete this blog post?');
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`/api/post?slug=${encodeURIComponent(post.slug)}`);
      location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Layout>
      <div className='my-12 mx-auto max-w-2xl py-7'>
        <div className='flex items-center justify-between'>
          <h2>Dashboard</h2>
          <Link href='/dashboard/post/create'>
            <a className='ml-auto text-sm py-1 px-4 rounded-sm font-medium bg-teal-700 text-white hover:opacity-80'>
              + Create New
            </a>
          </Link>
        </div>
        <div className='block border border-gray-300 text-gray-700 p-4 rounded-2 my-5'>
          {postList.map((post) => (
            <div key={post.slug} className='dashboard-post'>
              <div className='text-gray-500 text-xs'>
                {ms(Date.now() - post.createdAt, { long: true })} ago
              </div>
              <h3 className='py-1 text-base font-semibold'>{post.title}</h3>
              <div className='mb-7 border-b border-gray-200 pb-2'>
                <Link
                  href='/dashboard/post/[slug]'
                  as={`/dashboard/post/${post.slug}`}>
                  <a className='mr-1 text-xs py-1 px-2 rounded-sm font-medium bg-teal-800 text-white hover:opacity-80'>
                    Edit
                  </a>
                </Link>
                <a
                  className='mr-1 text-xs py-1 px-2 rounded-sm font-medium bg-red-800 text-white hover:opacity-80'
                  href='#'
                  onClick={(e) => handleDelete(e, post)}>
                  Delete
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });
  if (!session) {
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
    return { props: {} };
  }

  const postList = await getPostList({ ownerId: session.user.id });

  return {
    props: {
      postList,
    },
  };
}
