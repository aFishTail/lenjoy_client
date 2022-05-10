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
import { TopicList } from '@/components/topicList'
import { PAGE_SIZE } from '@/common/constant'

interface IProps {
  data: PagerList<ITopic>
}

const Category: NextPage<IProps> = (props) => {
  const router = useRouter()
  const topics = props.data.records
  return (
    <Center>
      <TopicList topics={topics}></TopicList>
    </Center>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sulg = context.query.sulg
  const data = await TopicProvider.list({
    pageSize:PAGE_SIZE ,
    pageNum: 1,
    categoryId: sulg,
  })
  return {
    props: {
      data,
    },
  }
}

export default Category
