import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { AppLayout } from '@/layout/app-layout'
import { Center, Square, Circle, Button } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroller'
import { TopicList } from '@/components/topicList'
import { PAGE_SIZE } from '@/common/constant'
import { TopicProvider } from '@/providers/topic'
import { useCallback, useState } from 'react'

interface IProps {
  data: PagerList<ITopic>
}

const Home: NextPage<IProps> = (props) => {
  console.log('props:', props)
  const [pageNum, setPageNum] = useState(1)
  const [total, setTotal] = useState(props.data.total)
  const [topics, setTopics] = useState<ITopic[]>(props.data.records)

  const loadTopics = useCallback(async (pageNum) => {
    const res = await TopicProvider.list({
      pageNum,
      pageSize: PAGE_SIZE,
    })
    setTopics([...topics, ...res.records])
    setPageNum(pageNum)
    console.log('total:', res)
    setTotal(res.total)
  }, [])

  return (
    <Center>
      <InfiniteScroll
        pageStart={1}
        loadMore={loadTopics}
        hasMore={pageNum * PAGE_SIZE < total}
        loader={<div>加载中...</div>}
        useWindow={false}
      >
        <TopicList topics={topics}></TopicList>
      </InfiniteScroll>
    </Center>
  )
}

export default Home

// export const getStaticProps: GetStaticProps = (context) => {
//   return {
//     redirect: {
//       destination: '/category/all',
//       permanent: false
//     }
//   }
// }

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await TopicProvider.list({
    pageSize: PAGE_SIZE,
    pageNum: 1,
  })
  console.log('topics:', data)
  return {
    props: {
      data,
    },
  }
}
