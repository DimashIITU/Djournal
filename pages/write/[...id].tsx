import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { WriteForm } from '../../components/WriteForm';
import { MainLayout } from '../../layouts/MainLayout';
import { Api } from '../../utils/api';
import { PostDto } from '../../utils/api/types';

interface WritePageProps {
  post: PostDto;
}

const WritePage: NextPage<WritePageProps> = ({ post }) => {
  return (
    <MainLayout className="main-layout-white" hideComments hideMenu>
      <div style={{ backgroundColor: '#fff' }}>
        <WriteForm data={post} />
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx.query.id;
    const post = await Api(ctx).post.getOne(+id);
    const user = await Api(ctx).user.preAuth();

    if (!(post.user.id === user.id)) {
      return {
        props: {
          post: null,
        },
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.warn(error);
    return {
      props: {
        post: null,
      },
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default WritePage;
