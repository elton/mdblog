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

const Header = () => {
  return (
    <div className='bg-teal-700 p-8 flex items-center'>
      <Link href='/'>
        <a className='text-gray-200 font-semibold text-xl hover:text-white'>
          My Blog
        </a>
      </Link>
    </div>
  );
};

export default Header;
