import Layout from '../../../components/Layout';
import { getPost } from '../../../lib/data';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { useState } from 'react';
import axios from 'axios';

export default function EditPost({ post }) {
  const [title, setTitle] = useState(post && post.title);
  const [content, setContent] = useState(post && post.content);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await axios.patch(`/api/post?slug=${encodeURIComponent(post.slug)}`, {
        title,
        content,
      });
      router.push('/dashboard');
    } catch (err) {
      return alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className='my-12 mx-auto max-w-2xl py-7'>
        <form className='edit-post' onSubmit={handleSubmit}>
          <h2>Edit: {post.title}</h2>
          <input
            type='text'
            placeholder='Add your blog post title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full rounded mb-2'
          />
          <br />
          <textarea
            placeholder='Add your blog post content'
            onChange={(e) => setContent(e.target.value)}
            value={content}
            className='w-full h-20 rounded'
          />
          <br />
          <button
            disabled={submitting}
            className='bg-teal-700 rounded px-3 py-1 text-white float-right'>
            {submitting ? 'submitting ...' : 'Submit'}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, params }) {
  const session = await getSession({ req });
  if (!session) {
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
    return { props: {} };
  }
  const post = await getPost(params.slug, { ownerId: session.user.id });

  return {
    props: {
      post,
    },
  };
}
