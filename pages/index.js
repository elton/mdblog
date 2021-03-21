import Layout from '../components/Layout';
import PostList from '../components/PostList';
const Home = ({ postList }) => {
  return (
    <Layout>
      <PostList postList={postList} />
    </Layout>
  );
};

export async function getStaticProps() {
  const postList = [
    {
      slug: '2020-July-01-Hello-World',
      title: 'Hello World',
      createdAt: new Date('2020 July 01').getTime(),
    },
  ];

  return {
    props: {
      postList,
    },
  };
}

export default Home;
