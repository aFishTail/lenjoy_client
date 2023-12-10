import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { Center, Square, Circle, Button, Box } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroller'
import { ResourceList } from '@/components/resourceList'
// import { PAGE_SIZE } from '@/common/constant'
import { ResourceProvider } from '@/providers/resource'
import { useCallback, useState } from 'react'
import { RewardList } from '@/components/rewardList'
import { RewardProvider } from '@/providers/reward'

const PAGE_SIZE = 8
interface IProps {
  data: PagerList<IReward>
}

const Home: NextPage<IProps> = (props) => {
  const [pageNum, setPageNum] = useState(1)
  const [total, setTotal] = useState(props.data.total)
  const [data, setData] = useState<IReward[]>(props.data.records)

  const loadTopics = useCallback(async (pageNum: number) => {
    const res = await RewardProvider.list({
      pageNum,
      pageSize: PAGE_SIZE,
    })
    setData((data) =>[...data, ...res.records])
    setPageNum(pageNum)
    setTotal(res.total)
  }, [])

  const handleRefresh = useCallback(
    async (index) => {
      const oldVal = data[index]
      const newVal = await RewardProvider.listFindOne({id: oldVal.id})
      setData((data) => {
        return data.map((t, i) => {
          if (i === index) {
            return { ...t, ...newVal};
          }
          return t;
        });
      })
    },
    [data]
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
        <RewardList data={data} refresh={handleRefresh}></RewardList>
      </InfiniteScroll>
    </Box>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await RewardProvider.list({
    pageSize: PAGE_SIZE,
    pageNum: 1,
  })
  return {
    props: {
      data,
    },
  }
}
