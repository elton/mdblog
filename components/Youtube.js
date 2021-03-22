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
const Youtube = (props) => {
  const { videoId, width = '100%', height = 366 } = props;
  const src = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className='relative hover:opacity-80'>
      <iframe
        width={width}
        height={height}
        src={src}
        frameBorder='0'
        allow='autoplay; encrypted-media'
        allowFullScreen='1'
      />
    </div>
  );
};

export default Youtube;
