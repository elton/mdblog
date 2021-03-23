import Layout from '../../../components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { useSession } from 'next-auth/client';

export default function CreatePost({}) {
  const [session, loading] = useSession();
  if (loading) {
    return 'loading...';
  }

  if (!session) {
    return (
      <Layout>
        <div className='my-12 mx-auto max-w-2xl py-7'>
          <p>You are not allowed to visit this page.</p>
          <p>
            Visit the{' '}
            <Link href='/'>
              <a>homepage</a>
            </Link>
          </p>
        </div>
      </Layout>
    );
  }

  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await axios.post('/api/post', {
        title,
        content,
        slug: title.replace(/ /g, '-'),
      });
      router.push('/dashboard');
    } catch (err) {
      return alert(err.message);
    } finally {
      setSubmitting(false);
    }

    router.push('/dashboard');
  };

  return (
    <Layout>
      <div className='my-12 mx-auto max-w-2xl py-7'>
        <form className='w-full' onSubmit={handleSubmit}>
          <h2 className='text-xl mb-1 font-semibold'>Create New Blog Post</h2>
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
