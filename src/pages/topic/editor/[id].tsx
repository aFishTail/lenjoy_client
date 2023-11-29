import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import TopicEditor from '@/components/TopicEditor';
import { TopicProvider } from '@/providers/topic';

interface IProps {
  id: string;
  topic: ITopic;
}

const Editor: NextPage<IProps> = ({ id, topic }) => {
  return <TopicEditor id={id} topic={topic} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const topic = await TopicProvider.detail({id: (id as string)});
  return {
    props: { id: (id as string), topic }
  }
};

export default Editor;
