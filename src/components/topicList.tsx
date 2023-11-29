import { UserLikeProvide } from "@/providers/user-like"
import { Flex, HStack, Icon, List, ListItem, VStack, Text, Image, Box, Avatar } from "@chakra-ui/react"
import { useCallback } from "react"
import { AiFillLike } from "react-icons/ai"
import { BiCommentDetail } from "react-icons/bi"
import { MdCalendarViewWeek } from "react-icons/md"
import { getFullStaticSrc } from "@/utils/helper"
import dayjs from "dayjs"
import Link from 'next/link'



interface IProps  {
    topics: ITopic[]
}

export const TopicList = ({topics}: IProps) => {

    const doLike = useCallback((id: string, status: 0 | 1) => {
        UserLikeProvide.doLikeTopic({entityId: id, status})
    }, [])
    console.log('topicList', topics)
    return (
      <>
      {topics && topics.length > 0 ? 
        <List w="100%">
        {topics.map((item) => (
          <ListItem key={item.id}>
            <Link href={`/topic/detail/${item.id}`}>
            <HStack bg="white" mb={3} p={3} cursor="pointer" align="start" borderRadius="base">
              <Avatar
                  name={item.user.nickname}
                  size="sm"
                  src={getFullStaticSrc(item.user.avatar)}
                />
              <VStack flex={1} align="start">
                <Flex justify="space-between" w="100%">
                  <Text color="gray.600" fontWeight="medium">
                    {item.user.nickname}
                  </Text>
                  <Text color="gray.500" fontSize="xs">
                    {dayjs(item.createAt).fromNow()}
                  </Text>
                </Flex>
                <Text color="gray.800" fontWeight="medium" fontSize="md">
                  {item.title}
                </Text>
                <Text color="gray.600" fontSize="sm">
                  {item.summary}
                </Text>
                <Flex
                  justify="space-between"
                  fontSize="xs"
                  color="gray.500"
                  w="100%"
                >
                  <Flex align="center">
                    <Icon as={AiFillLike}></Icon>
                    <Text ml={1} mr={4} onClick={() =>{doLike(item.id, item.isLike ? 0 : 1)}}>
                      赞 {item.likeCount}
                    </Text>
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
            </Link>
          </ListItem>
        ))}
      </List> : 
      <Flex w='100%' h={24} justify='center' alignItems={'center'} bg='white' shadow='xs'>
        <Text color={'gray.500'}>抱歉，暂无数据</Text>
      </Flex>
      }
      </>
    )
}