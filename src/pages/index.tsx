import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { Center, Square, Circle, Button, Box } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroller";
import { ResourceList } from "@/components/resourceList";
// import { PAGE_SIZE } from '@/common/constant'
import { ResourceProvider } from "@/providers/resource";
import { useCallback, useEffect, useState } from "react";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/session";
import { useRouter } from "next/router";
import Head from "next/head";

const PAGE_SIZE = 8;
interface IProps {
  data: PagerList<IResource>;
}

const Home: NextPage<IProps> = (props) => {
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState(props.data.total);
  const [resources, setResources] = useState<IResource[]>(props.data.records);

  const router = useRouter();
  const { query } = router;

  const initResource = useCallback(async () => {
    const res = await ResourceProvider.list({
      pageNum: 1,
      pageSize: PAGE_SIZE,
      categoryLabel: query.category,
    });
    setResources(res.records);
    setTotal(res.total);
  }, [query.category]);

  useEffect(() => {
    console.log("时尚感");
    initResource();
  }, [query.category]);

  const loadTopics = useCallback(async (pageNum) => {
    const res = await ResourceProvider.list({
      pageNum,
      pageSize: PAGE_SIZE,
    });
    setResources((resources) => [...resources, ...res.records]);
    setPageNum(pageNum);
    setTotal(res.total);
  }, []);

  const handleRefresh = useCallback(
    async (index) => {
      const oldVal = resources[index];
      const newVal = await ResourceProvider.listFindOne({ id: oldVal.id });
      setResources((resources) => {
        return resources.map((t, i) => {
          if (i === index) {
            return { ...t, ...newVal };
          }
          return t;
        });
      });
    },
    [resources]
  );

  return (
    <>
      <Head>
        <title>乐享</title>
        <meta
          name="keywords"
          content="乐享，乐享社区，资源分享，网盘资源，悬赏"
        />
        <meta name="description" content="资源分享" />
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
          <ResourceList data={resources} refresh={handleRefresh}></ResourceList>
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
  const data = await ResourceProvider.list(
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
