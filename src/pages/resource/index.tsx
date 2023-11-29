import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { Center, Square, Circle, Button, Box } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroller'
import { ResourceList } from '@/components/resourceList'
// import { PAGE_SIZE } from '@/common/constant'
import { ResourceProvider } from '@/providers/resource'
import { useCallback, useState } from 'react'

const PAGE_SIZE = 8
interface IProps {
  data: PagerList<Iresource>
}

const Home: NextPage<IProps> = (props) => {
  const [pageNum, setPageNum] = useState(1)
  const [total, setTotal] = useState(props.data.total)
  const [resources, setResources] = useState<Iresource[]>(props.data.records)

  const loadTopics = useCallback(async (pageNum) => {
    const res = await ResourceProvider.list({
      pageNum,
      pageSize: PAGE_SIZE,
    })
    setResources((resources) =>[...resources, ...res.records])
    setPageNum(pageNum)
    setTotal(res.total)
  }, [])
  return (
    <Box overflow="auto" h="calc(100vh - 200px)">
      <InfiniteScroll
        pageStart={1}
        loadMore={loadTopics}
        hasMore={pageNum * PAGE_SIZE < total}
        loader={<div key={0}>加载中...</div>}
        useWindow={false}
      >
        <ResourceList data={resources}></ResourceList>
      </InfiniteScroll>
    </Box>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await ResourceProvider.list({
    pageSize: PAGE_SIZE,
    pageNum: 1,
  })
  return {
    props: {
      data,
    },
  }
}
