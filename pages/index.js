import Layout from '../components/Layout';
import PostList from '../components/PostList';

import githubCms from '../lib/github-cms';

const Home = ({ postList }) => {
  return (
    <Layout>
      <PostList postList={postList} />
    </Layout>
  );
};

export async function getServerSideProps() {
  const postList = await githubCms.getPostList();

  return {
    props: {
      postList,
    },
  };
}

export default Home;
