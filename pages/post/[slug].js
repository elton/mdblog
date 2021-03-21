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
import ms from 'ms';

const Post = ({ post }) => {
  return (
    <Layout>
      <div className='my-12 mx-auto max-w-2xl text-lg text-gray-700 mb-1'>
        <div className='text-sm text-gray-600'>
          Published {ms(Date.now() - post.createdAt, { long: true })} ago
        </div>
        <h1 className='text-xl'>{post.title}</h1>
        <div className='mb-5 border border-gray-300 p-2'>{post.content}</div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { slug: '2020-July-01-Hello-World' },
      },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const [year, month, day, ...rest] = params.slug.split('-');
  const createdAt = new Date(`${year} ${month} ${day}`).getTime();
  const title = rest.join(' ');

  return {
    props: {
      post: {
        slug: params.slug,
        title,
        content: `This is content for ${title}`,
        createdAt,
      },
    },
  };
}

export default Post;
