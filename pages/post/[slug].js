// Copyright 2021 Elton Zheng
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import Layout from '../../components/Layout';
import Youtube from '../../components/Youtube';
import Comments from '../../components/comments';
import ms from 'ms';
import githubCms from '../../lib/github-cms';
import Markdown from 'markdown-to-jsx';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Post = ({ post }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Layout>Loading...</Layout>;
  }

  if (!post) {
    return (
      <Layout>
        <Head>
          <meta name='robots' content='noindex' />
        </Head>
        404 - Page not found.
      </Layout>
    );
  }
  return (
    <Layout>
      <div className='my-12 mx-auto max-w-2xl text-lg text-gray-700 mb-1'>
        <div className='text-sm text-gray-600'>
          Published {ms(Date.now() - post.createdAt, { long: true })} ago
        </div>
        <h1 className='text-xl'>{post.title}</h1>
        <div className='mb-5 border border-gray-300 p-2'>
          <Markdown
            options={{
              overrides: {
                Youtube: { component: Youtube },
              },
            }}>
            {post.content}
          </Markdown>
        </div>
      </div>
      <div className='max-w-2xl mx-auto text-gray-700'>
        <b>Comments:{post.slug}</b>
        <Comments slug={post.slug} />
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const postList = await githubCms.getPostList();

  const paths = postList.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    // If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.
    // If fallback is true,
    // The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps.
    // The paths that have not been generated at build time will serve a “fallback” version of the page on the first request to such a path
    // Enable statically generating additional pages
    // For example: `/posts/3`
    // In the background, Next.js will statically generate the requested path HTML and JSON. This includes running getStaticProps.
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  let post = null;
  try {
    post = await githubCms.getPost(params.slug);
  } catch (err) {
    if (err.status !== 404) {
      throw err;
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 2,
  };
}

export default Post;
