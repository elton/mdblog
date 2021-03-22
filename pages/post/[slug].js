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
import ms from 'ms';
import githubCms from '../../lib/github-cms';
import Markdown from 'markdown-to-jsx';

const Post = ({ post }) => {
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
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const post = await githubCms.getPost(params.slug);

  return {
    props: {
      post,
    },
  };
}

export default Post;
