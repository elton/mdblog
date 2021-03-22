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

export async function getStaticProps() {
  const postList = await githubCms.getPostList();

  return {
    props: {
      postList,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 2, // In seconds
  };
}

export default Home;
