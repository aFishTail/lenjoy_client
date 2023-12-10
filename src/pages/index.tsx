import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { Center, Square, Circle, Button, Box } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroller'
import { TopicList } from '@/components/topicList'
import { TopicProvider } from '@/providers/topic'
import { useCallback, useState } from 'react'

const PAGE_SIZE = 8
interface IProps {
  data: PagerList<ITopic>
}

const Home: NextPage<IProps> = (props) => {
  const [pageNum, setPageNum] = useState(1)
  const [total, setTotal] = useState(props.data.total)
  const [topics, setTopics] = useState<ITopic[]>(props.data.records)

  const loadTopics = useCallback(async (pageNum) => {
    const res = await TopicProvider.list({
      pageNum,
      pageSize: PAGE_SIZE,
    })
    setTopics((topics) => [...topics, ...res.records])
    setPageNum(pageNum)
    setTotal(res.total)
  }, [])

  const handleRefresh = useCallback(
    async (index) => {
      const oldVal = topics[index]
      const newVal = await TopicProvider.listFindOne({id: oldVal.id})
      setTopics((topics) => {
        return topics.map((t, i) => {
          if (i === index) {
            return { ...t, ...newVal};
          }
          return t;
        });
      })
    },
    [topics]
  )

  return (
    <Box overflow="auto" h="calc(100vh - 200px)">
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
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await TopicProvider.list({
    pageSize: PAGE_SIZE,
    pageNum: 1,
  })
  return {
    props: {
      data,
    },
  }
}
