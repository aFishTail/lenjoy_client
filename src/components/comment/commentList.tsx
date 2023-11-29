import { CommentProvider } from "@/providers/comment";
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
} from "@chakra-ui/react";
import { FC, useCallback, useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { PAGE_SIZE } from '@/common/constant'
import dayjs from 'dayjs';

interface IProps {
  list: IComment[]
}


export const CommentList: FC<IProps> = ({ list }) => {

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
            <VStack flex={1} alignItems='flex-start' py={2}>
              <HStack justifyContent={'space-between'} w='full'>
                <Text as={'b'}>{item.user.nickname}</Text>
                <Text fontSize={'sm'} color='gray.500'>{dayjs(item.createAt).fromNow()}</Text>
              </HStack>

              <Text>{item.content}</Text>

              <HStack color='gray.500'>
                <HStack>
                  <Icon as={AiFillLike}></Icon>
                  <Text ml={1} mr={4} onClick={() => {}}>
                    赞 {item.likeCount}
                  </Text>
                </HStack>
                {/* <HStack>
                  <Icon as={BiCommentDetail}></Icon>
                  <Text ml={1} mr={4}>
                    评论{9999}
                  </Text>
                </HStack> */}
              </HStack>
            </VStack>
          </HStack>
          <Divider></Divider>
        </ListItem>
      ))}
    </List>
  );
};
