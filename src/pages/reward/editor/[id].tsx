import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { RewardProvider } from '@/providers/reward';
import RewardEditor from '@/components/rewardEditor';

interface IProps {
  id: string;
  reward: IReward;
}

const Editor: NextPage<IProps> = ({ id, reward }) => {
  return <RewardEditor id={id} reward={reward} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const reward = await RewardProvider.detail({id: (id as string)});
  return {
    props: { id: (id as string), reward }
  }
};

export default Editor;
