import { UserLikeProvide } from '@/providers/user-like'
import {
  Flex,
  HStack,
  Icon,
  List,
  ListItem,
  VStack,
  Text,
  Image,
  Box,
  Avatar,
} from '@chakra-ui/react'
import { useCallback } from 'react'
import { AiFillLike } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { MdCalendarViewWeek } from 'react-icons/md'
import { getFullStaticSrc } from '@/utils/helper'
import dayjs from 'dayjs'
import Link from 'next/link'
import { DoLike } from './DoLike'

interface IProps {
  topics: ITopic[]
  refresh: (index: number) => void
}

export const TopicList = ({ topics, refresh }: IProps) => {
  return (
    <>
      {topics && topics.length > 0 ? (
        <List w="100%">
          {topics.map((item, index) => (
            <ListItem key={item.id}>
              <HStack
                bg="white"
                mb={3}
                p={3}
                align="start"
                borderRadius="base"
              >
                <VStack flex={1} align="start">
                  <HStack w="100%">
                    <Avatar
                      name={item.user.nickname}
                      size="xs"
                      src={getFullStaticSrc(item.user.avatar)}
                    />
                    <Flex justify="space-between" flex="1">
                      <Text color="gray.600" fontWeight="medium">
                        {item.user.nickname}
                      </Text>
                      <Text color="gray.500" fontSize="xs">
                        {dayjs(item.createAt).fromNow()}
                      </Text>
                    </Flex>
                  </HStack>
                  <Link
                    href={`/topic/detail/${item.id}`}
                    style={{ width: '100%' }}
                  >
                    <Text color="gray.800" fontWeight="medium" fontSize="md">
                      {item.title}
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      {item.summary}
                    </Text>
                  </Link>
                  <Flex
                    justify="space-between"
                    fontSize="xs"
                    color="gray.500"
                    w="100%"
                  >
                    <Flex align="center">
                    <DoLike
                        entityType="topic"
                        refresh={refresh}
                        item={item}
                        index={index}
                      ></DoLike>
                      <Icon as={BiCommentDetail}></Icon>
                      <Text ml={1} mr={4}>
                        评论{item.commentCount}
                      </Text>
                      <Icon as={MdCalendarViewWeek}></Icon>
                      <Text ml={1}>浏览{item.viewCount}</Text>
                    </Flex>
                    <Text
                      bg="gray.50"
                      border="1px"
                      borderColor="gray.200"
                      borderRadius="xl"
                      px={2}
                    >
                      {item.category?.name}
                    </Text>
                  </Flex>
                </VStack>
              </HStack>
            </ListItem>
          ))}
        </List>
      ) : (
        <Flex
          w="100%"
          h={24}
          justify="center"
          alignItems={'center'}
          bg="white"
          shadow="xs"
        >
          <Text color={'gray.500'}>抱歉，暂无数据</Text>
        </Flex>
      )}
    </>
  )
}
