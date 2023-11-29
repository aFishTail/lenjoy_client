import { TopicList } from '@/components/topicList'
import { GlobalContext } from '@/context/global'
import { TopicProvider } from '@/providers/topic'
import {
  Avatar,
  Box,
  Container,
  HStack,
  VStack,
  Text,
  Grid,
  GridItem,
  Button,
  Divider,
  Heading,
  Link,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { GetServerSideProps, NextPage } from 'next'
import { useCallback, useContext, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import UserBg from '@/static/images/default-user-bg.jpg'


const PAGE_SIZE = 8

const UserCenter: NextPage = (props) => {
  const { user } = useContext(GlobalContext)

  const [pageNum, setPageNum] = useState(1)
  const [total, setTotal] = useState(0)
  const [topics, setTopics] = useState<ITopic[]>([])

  useEffect(() => {
    if (!user?.id) return
    loadTopics()
  }, [user])

  const loadTopics = useCallback(
    async (pageNum = 1) => {
      const res = await TopicProvider.list({
        pageNum,
        pageSize: PAGE_SIZE,
        userId: user.id,
      })
      setTopics((topics) => [...topics, ...res.records])
      setPageNum(pageNum)
      setTotal(res.total)
    },
    [user]
  )

  return (
    <Container maxW="container.lg" mt={4}>
      {/* 需要指定背景色 */}
      <Box h={'220px'} bgImg={UserBg.src} w="full" mb={4} pt="120px">
        <HStack pl={8}>
          <Avatar
            name={user?.nickname}
            size="xl"
            src={user?.avatar || 'https://bit.ly/dan-abramov'}
          />
          <VStack alignItems={'flex-start'}>
            <Text as="b">{user?.username}</Text>
            <Text>{user?.description || ' 这个人很懒， 什么都没有留下'}</Text>
          </VStack>
        </HStack>
      </Box>
      <HStack>
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          <GridItem colSpan={1} h="10">
            <Box bg="white" p="2">
              <Text as={'b'}>个人成就</Text>
              <HStack
                justifyContent="space-between"
                w="full"
                borderTop="1px"
                borderTopColor="gray.200"
                mt="2"
                py="1"
                px={4}
              >
                <VStack>
                  <Text>积分</Text>
                  <Text>{user?.score}</Text>
                </VStack>
                <VStack>
                  <Text>话题</Text>
                  <Text>{user?.topicCount}</Text>
                </VStack>
                <VStack>
                  <Text>评论</Text>
                  <Text>{user?.commnetCount}</Text>
                </VStack>
                <VStack>
                  {/* // TODO: 暂时写死 */}
                  <Text>注册排名</Text>
                  <Text>{999}</Text>
                </VStack>
              </HStack>
            </Box>

            <Box bg="white" p="2" mt={3}>
              <HStack justify={'space-between'}>
                <Heading fontSize="xl">个人资料</Heading>
                <Text>编辑资料</Text>
              </HStack>
              <Divider />
              <HStack py={2}>
                <Text>昵称</Text>
                <Text>{user?.nickname}</Text>
              </HStack>
              <Divider />
              <HStack py={2} alignItems='flex-start'>
                <Text wordBreak={'keep-all'}>签名</Text>
                <Text>{user?.description || '这个人很懒，什么都没有留下'}</Text>
              </HStack>
              <Divider />
              {/* <HStack>
                <Text>主页</Text>
                <Link color="blue.500" href="https://baidu.com" isExternal>
                  https://baidu.com
                </Link>
              </HStack> */}
            </Box>

            <Box bg="white" p="2" mt={3}>
              <HStack justify={'space-between'}>
                <HStack>
                  <Heading fontSize="xl">粉丝</Heading>
                  <Text fontSize="xl">0</Text>
                </HStack>
                <Text>更多</Text>
              </HStack>
              <Divider />
              <HStack justify={'space-between'} py={2}>
                <Text>昵称</Text>
                <Button colorScheme="messenger" leftIcon={<AddIcon></AddIcon>} size='xs'>
                  关注
                </Button>
              </HStack>
              <Divider />
              <HStack justify={'space-between'} py={2}>
                <Text>昵称</Text>
                <Button colorScheme="messenger" leftIcon={<AddIcon></AddIcon>} size='xs'>
                  关注
                </Button>
              </HStack>
            </Box>

            <Box bg="white" p="2" mt={3}>
              <HStack justify={'space-between'}>
                <HStack>
                  <Heading fontSize="xl">关注</Heading>
                  <Text fontSize="xl">0</Text>
                </HStack>
                <Text>更多</Text>
              </HStack>
              <Divider />
              <HStack justify={'space-between'} py={2}>
                <Text>昵称</Text>
                <Button colorScheme="messenger" leftIcon={<AddIcon></AddIcon>} size='xs'>
                  关注
                </Button>
              </HStack>
            </Box>
          </GridItem>
          <GridItem colSpan={3}>
            <Tabs bg="white">
              <TabList>
                <Tab>帖子</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box overflow="auto" h="500px">
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
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
        </Grid>
      </HStack>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const user =
  return {
    props: {},
  }
}

export default UserCenter
