import { GlobalContext } from '@/context/global'
import { DragHandleIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  HStack,
  Text,
  VStack,
  Image,
} from '@chakra-ui/react'
import { useContext } from 'react'
import { getFullStaticSrc } from '@/utils/helper'
import { Link } from '@chakra-ui/next-js'

interface IProps {
  user: IUser
}

export const UserIntro: React.FC<IProps> = ({ user }) => {
  const {
    nickname,
    avatar,
    description,
    score,
    topicCount,
    commentCount,
    fansCount,
  } = user
  return (
    <Box w="300px" height="fit-content" bg="white" pt={2}>
      <VStack>
        <Avatar
          src={getFullStaticSrc(avatar)}
          name={nickname}
          alt="头像"
          boxSize="50px"
          borderRadius={'50%'}
          m={2}
        ></Avatar>
        <Link href={'#'}>
          {nickname}
        </Link>
        <Text fontSize="sm">{description || '这个人很懒，什么都没有留下'}</Text>
        <HStack
          justifyContent="space-between"
          w="full"
          bg="gray.50"
          borderTop="1px"
          borderTopColor="gray.200"
          py="1"
          px={4}
        >
          <VStack>
            <Text>积分</Text>
            <Text>{score}</Text>
          </VStack>
          <VStack>
            <Text>话题</Text>
            <Text>{topicCount}</Text>
          </VStack>
          <VStack>
            <Text>评论</Text>
            <Text>{commentCount}</Text>
          </VStack>
          <VStack>
            <Text>关注</Text>
            <Text>{fansCount}</Text>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  )
}
