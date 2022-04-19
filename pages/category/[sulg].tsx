import type { GetServerSideProps, NextPage } from 'next'
// import Image from 'next/image'
import { AppLayout } from '@/layout/app-layout'
import {
  Center,
  Square,
  Circle,
  Button,
  List,
  ListItem,
  HStack,
  VStack,
  Avatar,
  Flex,
  Text,
  Icon,
  Image,
} from '@chakra-ui/react'
import { AiFillLike } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { MdCalendarViewWeek } from 'react-icons/md'
import { route } from 'next/dist/server/router'
import { useRouter } from 'next/router'
import { TopicProvider } from '@/providers/topic'

const pageSize = 12

const Category: NextPage = (props) => {
  const router = useRouter()
  const { sulg } = router.query
  const topics = props.topics.records
  return (
    <Center>
      <List w="100%">
        {topics.map((item) => (
          // <ListItem key={item.id}>{item.title}</ListItem>
          <ListItem key={item.id}>
            <HStack bg="white" mb={3} p={3} align="start" borderRadius="base">
              <Image
                src="https://bit.ly/dan-abramov"
                alt="头像"
                boxSize="50px"
                m={2}
              ></Image>
              <VStack flex={1} align="start">
                <Flex justify="space-between" w="100%">
                  <Text color="gray.600" fontWeight="medium">
                    一条鱼尾
                  </Text>
                  <Text color="gray.500" fontSize="xs">
                    发布于10小时之前
                  </Text>
                </Flex>
                <Text color="gray.800" fontWeight="medium" fontSize="md">
                  {item.title}
                </Text>
                <Text color="gray.600" fontSize="sm">
                  {item.content}
                </Text>
                <Flex
                  justify="space-between"
                  fontSize="xs"
                  color="gray.500"
                  w="100%"
                >
                  <Flex align="center">
                    <Icon as={AiFillLike}></Icon>
                    <Text ml={1} mr={4}>
                      赞
                    </Text>
                    <Icon as={BiCommentDetail}></Icon>
                    <Text ml={1} mr={4}>
                      评论109
                    </Text>
                    <Icon as={MdCalendarViewWeek}></Icon>
                    <Text ml={1}>浏览1090</Text>
                  </Flex>
                  <Text
                    bg="gray.50"
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="xl"
                    px={2}
                  >
                    类别
                  </Text>
                </Flex>
              </VStack>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Center>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sulg = context.query.sulg
  const topics = await TopicProvider.list({
    pageSize,
    pageNum: 1,
    categoryId: sulg,
  })
  return {
    props: {
      topics,
    },
  }
}

export default Category
