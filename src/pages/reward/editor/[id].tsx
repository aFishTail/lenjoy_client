import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import ResourceEditor from '@/components/resourceEditor';
import { ResourceProvider } from '@/providers/resource';

interface IProps {
  id: string;
  resource: IResource;
}

const Editor: NextPage<IProps> = ({ id, resource }) => {
  return <ResourceEditor id={id} resource={resource} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const resource = await ResourceProvider.detail({id: (id as string)});
  return {
    props: { id: (id as string), resource }
  }
};

export default Editor;
