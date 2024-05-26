import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { Center, Square, Circle, Button, Box } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroller";
import { TopicList } from "@/components/topicList";
import { TopicProvider } from "@/providers/topic";
import { useCallback, useEffect, useState } from "react";
import { SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { useRouter } from "next/router";
import Head from "next/head";

const PAGE_SIZE = 8;
interface IProps {
  data: PagerList<ITopic>;
}

const Home: NextPage<IProps> = (props) => {
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState(props.data.total);
  const [topics, setTopics] = useState<ITopic[]>(props.data.records);

  const router = useRouter();
  const { query } = router;

  const initTopics = useCallback(async () => {
    const res = await TopicProvider.list({
      pageNum: 1,
      pageSize: PAGE_SIZE,
      categoryLabel: query.category,
    });
    setTopics((topics) => res.records);
    setTotal(res.total);
  }, [query.category]);

  useEffect(() => {
    initTopics();
  }, [query.category]);

  const loadTopics = useCallback(async (pageNum) => {
    const res = await TopicProvider.list({
      pageNum,
      pageSize: PAGE_SIZE,
      categoryLabel: query.category,
    });
    setTopics((topics) => [...topics, ...res.records]);
    setPageNum(pageNum);
    setTotal(res.total);
  }, []);

  const handleRefresh = useCallback(
    async (index) => {
      const oldVal = topics[index];
      const newVal = await TopicProvider.listFindOne({ id: oldVal.id });
      setTopics((topics) => {
        return topics.map((t, i) => {
          if (i === index) {
            return { ...t, ...newVal };
          }
          return t;
        });
      });
    },
    [topics]
  );

  return (
    <>
      <Head>
        <title>乐享</title>
        <meta
          name="keywords"
          content="乐享，乐享社区，资源分享，网盘资源，悬赏"
        />
        <meta name="description" content="乐享，话题" />
      </Head>
      <Box
        overflow="auto"
        h={{ base: "calc(100vh - 140px)", md: "calc(100vh - 200px)" }}
      >
        <InfiniteScroll
          pageStart={1}
          loadMore={loadTopics}
          hasMore={pageNum * PAGE_SIZE < total}
          loader={<div key={0}>加载中...</div>}
          useWindow={false}
        >
          <TopicList topics={topics} refresh={handleRefresh}></TopicList>
        </InfiniteScroll>
      </Box>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getIronSession<SessionData>(
    context.req,
    context.res,
    sessionOptions
  );
  const data = await TopicProvider.list(
    {
      pageSize: PAGE_SIZE,
      pageNum: 1,
      categoryLabel: context.query.category,
    },
    { headers: { authorization: `Bearer ${session.token}` } }
  );
  return {
    props: {
      data,
    },
  };
};
