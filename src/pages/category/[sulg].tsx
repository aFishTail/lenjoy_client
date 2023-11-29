import type { GetServerSideProps, NextPage } from 'next'
import {
  Box,
} from '@chakra-ui/react'
import { AiFillLike } from 'react-icons/ai'
import { MdCalendarViewWeek } from 'react-icons/md'
import { useRouter } from 'next/router'
import { TopicProvider } from '@/providers/topic'
import { TopicList } from '@/components/topicList'
import { PAGE_SIZE } from '@/common/constant'
import InfiniteScroll from 'react-infinite-scroller'
import { useCallback, useEffect, useState } from 'react'

interface IProps {
  data: PagerList<ITopic>
}

const Category: NextPage<IProps> = ({data}) => {
  const [pageNum, setPageNum] = useState(1)
  const [total, setTotal] = useState(data.total)
  const [topics, setTopics] = useState<ITopic[]>(data.records)
  const router = useRouter()
  
  useEffect(() => {
    setTotal(data.total)
    setTopics(data.records)
  }, [data])

  const reset = async () => {
    const res = await TopicProvider.list({
      pageNum: 1,
      pageSize: PAGE_SIZE,
      categoryLabel: router.query.sulg
    })
    setPageNum(1)
    setTopics((topics) =>[...res.records])
    setTotal(res.total)
  }

  const loadTopics = useCallback(async (pageNum) => {
    const res = await TopicProvider.list({
      pageNum,
      pageSize: PAGE_SIZE,
      categoryLabel: router.query.sulg
    })
    setTopics((topics) =>[...topics, ...res.records])
    setPageNum(pageNum)
    setTotal(res.total)
  }, [router.query.sulg])
  return (
    <Box h="calc(100vh - 200px)" overflow="auto">
      <InfiniteScroll
        pageStart={1}
        loadMore={loadTopics}
        hasMore={pageNum * PAGE_SIZE < total}
        loader={<div key={0}>加载中...</div>}
        useWindow={false}
      >
        <TopicList topics={topics}></TopicList>
      </InfiniteScroll>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sulg = context.query.sulg
  const data = await TopicProvider.list({
    pageSize:PAGE_SIZE ,
    pageNum: 1,
    categoryLabel: sulg,
  })
  return {
    props: {
      data
    },
  }
}

export default Category
