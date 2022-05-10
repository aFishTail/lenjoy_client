import { UserLikeProvide } from "@/providers/user-like"
import { Flex, HStack, Icon, List, ListItem, VStack, Text, Image } from "@chakra-ui/react"
import { useCallback } from "react"
import { AiFillLike } from "react-icons/ai"
import { BiCommentDetail } from "react-icons/bi"
import { MdCalendarViewWeek } from "react-icons/md"

interface IProps  {
    topics: ITopic[]
}

export const TopicList = ({topics}: IProps) => {

    const doLike = useCallback((id: string, status: 0 | 1) => {
        UserLikeProvide.doLikeTopic({entityId: id, status})
    }, [])

    return (
        <List w="100%" maxH="calc(100vh - 100px)" overflow="auto">
        {topics.map((item) => (
          // <ListItem key={item.id}>{item.title}</ListItem>
          <ListItem key={item.id}>
            <HStack bg="white" mb={3} p={3} align="start" borderRadius="base">
              <Image
                src={item.user.avatar || 'https://bit.ly/dan-abramov'}
                alt="头像"
                boxSize="50px"
                m={2}
              ></Image>
              <VStack flex={1} align="start">
                <Flex justify="space-between" w="100%">
                  <Text color="gray.600" fontWeight="medium">
                    {item.user.nickname}
                  </Text>
                  <Text color="gray.500" fontSize="xs">
                    {item.createAt}
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
                    {item.category.name}
                  </Text>
                </Flex>
              </VStack>
            </HStack>
          </ListItem>
        ))}
      </List>
    )
}