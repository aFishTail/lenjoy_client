import { CommentProvider } from '@/providers/comment'
import {
  Avatar,
  Box,
  HStack,
  List,
  ListItem,
  VStack,
  Text,
  Icon,
  Divider,
  Button,
  Badge,
} from '@chakra-ui/react'
import { FC, useCallback, useContext, useEffect, useState } from 'react'
import { AiFillLike } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { PAGE_SIZE } from '@/common/constant'
import dayjs from 'dayjs'
import { GlobalContext } from '@/context/global'
import { ChooseAnswer } from './chooseAnswer'

interface IProps {
  list: IRewardAnswer[]
  reward: IReward
}

export const CommentList: FC<IProps> = ({ list, reward }) => {
  const { user } = useContext(GlobalContext)
  return (
    <List>
      {list.map((item) => (
        <ListItem key={item.id}>
          <HStack>
            <Box>
              <Avatar
                name={item.user.nickname}
                size="sm"
                src={item.user.avatar}
              />
            </Box>
            <VStack flex={1} alignItems="flex-start" py={2}>
              <HStack justifyContent={'space-between'} w="full">
                <Text as={'b'}>
                  {item.user.nickname}
                </Text>
                <Text fontSize={'sm'} color="gray.500">
                {item.isConfirmedAnswer && (
                    <Badge ml="1" fontSize="0.8em" colorScheme="green">
                      最终答案
                    </Badge>
                  )}
                  {dayjs(item.createAt).fromNow()}
                </Text>
              </HStack>

              <Text>{item.content}</Text>

              <ChooseAnswer reward={reward} rewardAnswer={item}></ChooseAnswer>
            </VStack>
          </HStack>
          <Divider></Divider>
        </ListItem>
      ))}
    </List>
  )
}
