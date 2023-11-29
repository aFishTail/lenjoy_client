import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import TopicEditor from '@/components/TopicEditor';
import { TopicProvider } from '@/providers/topic';


const Editor: NextPage = () => {
  return <TopicEditor />;
};


export default Editor;
