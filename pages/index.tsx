import { GetServerSideProps, NextPage } from 'next/types';
import { Post } from '../components/Post';
import { MainLayout } from '../layouts/MainLayout';
import { Api } from '../utils/api';
import { PostDto } from '../utils/api/types';

interface HomeProps {
  posts: PostDto[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <MainLayout>
      {posts?.map((post) => (
        <Post key={post.id} id={post.id} title={post.title} description={post.description} />
      ))}
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const posts = await Api(ctx).post.getAll();
    return {
      props: { posts: posts },
    };
  } catch (error) {
    console.warn(error);
  }
  return { props: { posts: null } };
};

export default Home;
