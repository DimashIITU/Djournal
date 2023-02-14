import { NextPage } from 'next';
import React from 'react';
import { WriteForm } from '../../components/WriteForm';
import { MainLayout } from '../../layouts/MainLayout';

interface WritePageProps {}

const WritePage: NextPage = () => {
  return (
    <MainLayout className="main-layout-white" hideComments hideMenu>
      <div style={{ backgroundColor: '#fff' }}>
        <WriteForm />
      </div>
    </MainLayout>
  );
};

export default WritePage;
