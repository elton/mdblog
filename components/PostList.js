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
import Link from 'next/link';
import ms from 'ms';
const PostList = ({ postList }) => {
  return (
    <div className='my-12 mx-auto max-w-xl px-7'>
      {postList.map((post) => (
        <div key={post.slug}>
          <Link href='/post/[slug]' as={`/post/${post.slug}`}>
            <a className='block border border-teal-600 rounded font-semibold my-5 p-4 hover:bg-teal-500 group'>
              <div className='font-normal text-xs mb-1 text-gray-600 group-hover:text-gray-100'>
                {ms(Date.now() - post.createdAt, { long: true })} ago
              </div>
              <div className='group-hover:text-gray-50'>{post.title}</div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
