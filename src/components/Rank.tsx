import { GlobalContext } from '@/context/global'
import { getFullStaticSrc } from '@/utils/helper'
import { DragHandleIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Flex,
  HStack,
  List,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useContext } from 'react'

export const Rank: React.FC = () => {
  const { scoreRankList } = useContext(GlobalContext)
  return (
    <Box w="300px" h='fit-content' bg="white" py={2} px={4}>
      <Text
        fontSize="xl"
        fontWeight="semibold"
        borderBottom="1px"
        borderBottomColor="gray.200"
        color="gray.600"
        py={2}
      >
        积分排行
      </Text>
      <List>
        {scoreRankList.map((item) => (
          <ListItem key={item.userId} borderBottom="1px" borderBottomColor="gray.200" py={2} _last={
              {border: 'none'}
          }>
            <Flex justify="space-between" align="center">
              <HStack>
                <Avatar
                  name={item.username}
                  size="sm"
                  src={getFullStaticSrc(item.avatar)}
                />
                <Box>
                  <Text color="gray.600">{item.username}</Text>
                  <HStack color="gray.500" fontSize="sm">
                    <Text>{item.topicCount} 帖子</Text>
                    <Text>.</Text>
                    <Text>{item.commentCount} 评论</Text>
                  </HStack>
                </Box>
              </HStack>
              <HStack bg="gray.200" borderRadius="2xl" flex={0} h="20px" px={1}>
                <DragHandleIcon></DragHandleIcon>
                <Text color="gray.500" fontSize="sm">
                  {item.score}
                </Text>
              </HStack>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
