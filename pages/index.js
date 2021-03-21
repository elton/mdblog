import Layout from '../components/Layout';
import PostList from '../components/PostList';
import { promises as fsPromises } from 'fs';

const Home = ({ postList }) => {
  return (
    <Layout>
      <PostList postList={postList} />
    </Layout>
  );
};

export async function getStaticProps() {
  const MarkdownFile = await fsPromises.readdir('data');
  const postList = MarkdownFile.map((filename) => {
    const slug = filename.replace(/.md$/, '');
    const [year, month, day, ...rest] = slug.split('-');
    const createdAt = new Date(`${year} ${month} ${day}`).getTime();
    const title = rest.join(' ');

    return {
      slug,
      createdAt,
      title,
    };
  });

  return {
    props: {
      postList,
    },
  };
}

export default Home;
