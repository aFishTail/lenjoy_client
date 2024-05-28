import { UserLikeProvide } from "@/providers/user-like";
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
  Badge,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { AiFillLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { MdCalendarViewWeek } from "react-icons/md";
import { getFullStaticSrc } from "@/utils/helper";
import dayjs from "dayjs";
import Link from "next/link";
import { DoLike } from "./DoLike";

interface IProps {
  data: IResource[];
  refresh: (index: number) => void;
}

export const ResourceList = ({ data, refresh }: IProps) => {
  return (
    <>
      {data && data.length > 0 ? (
        <List w="100%">
          {data.map((item, index) => (
            <ListItem key={item.id}>
              <HStack bg="white" mb={3} p={3} align="start" borderRadius="base">
                <VStack flex={1} align="start">
                  <HStack width={"100%"}>
                    <Avatar
                      name={item.user.nickname}
                      size="xs"
                      src={getFullStaticSrc(item.user.avatar)}
                    />
                    <HStack justify="space-between" w="100%">
                      <Text color="gray.600" fontWeight="medium">
                        {item.user.nickname}
                      </Text>
                      <Text color="gray.500" fontSize="xs">
                        {dayjs(item.createAt).fromNow()}
                      </Text>
                    </HStack>
                  </HStack>
                  <Link
                    href={`/resource/detail/${item.id}`}
                    style={{ width: "100%" }}
                  >
                    <Flex alignItems={"flex-start"}>
                      <Badge
                        mr="1"
                        mt={1}
                        colorScheme={item.isPublic ? "green" : "red"}
                        flexGrow={0}
                      >
                        {item.isPublic ? "免费" : `${item.score}积分`}
                      </Badge>
                      <Text color="gray.600" fontWeight="medium">
                        {item.name}
                      </Text>
                    </Flex>
                  </Link>
                  <Flex
                    justify="space-between"
                    fontSize="xs"
                    color="gray.500"
                    w="100%"
                  >
                    <Flex align="center">
                      <DoLike
                        entityType="resource"
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
                    {item.category?.name && (
                      <Text
                        bg="gray.50"
                        border="1px"
                        borderColor="gray.200"
                        borderRadius="xl"
                        px={2}
                      >
                        {item.category?.name}
                      </Text>
                    )}
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
          alignItems={"center"}
          bg="white"
          shadow="xs"
        >
          <Text color={"gray.500"}>抱歉，暂无数据</Text>
        </Flex>
      )}
    </>
  );
};
