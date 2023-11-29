import type { GetServerSideProps, NextPage } from "next";
// import Image from 'next/image'
import dayjs from "dayjs";
import { Comment } from "@/components/comment";
import {
  Box,
  Container,
  Flex,
  HStack,
  Image,
  VStack,
  Text,
  Divider,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogFooter,
  useDisclosure,
  AlertDialogHeader,
  AlertDialogBody,
  Icon,
  Avatar
} from "@chakra-ui/react";
import { TopicProvider } from "@/providers/topic";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { UserIntro } from "@/components/UserIntro";
import { GlobalContext } from "@/context/global";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { getFullStaticSrc } from "@/utils/helper";
import { AiFillLike } from "react-icons/ai";
import { MdCalendarViewWeek } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";

interface IProps {
  data: ITopic;
}

const TopicDetail: NextPage<IProps> = (props) => {
  const topic = props.data;

  const [isOwner, setIsOwner] = useState<Boolean>(false);
  const { user } = useContext(GlobalContext);

  const router = useRouter();

  useEffect(() => {
    // const contentBlock = htmlToDraft(props.data.content)
    setIsOwner(user?.id === topic.user?.id);
  }, [user, topic.user?.id]);

  const handleEdit = useCallback(() => {
    router.push(`/topic/editor/${topic.id}`);
  }, [topic.id]);
  const handleDel = useCallback(() => {
    onOpen();
  }, [topic.id]);

  const confirmDel = useCallback(async () => {
    await TopicProvider.remove({ id: topic.id });
    router.push("/");
  }, [topic.id]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  return (
    <Container maxW="container.lg" bg="gray.100" my="4">
      <Flex justify="space-between">
        <Box flex={1} mx={4}>
          {/* 帖子详情区域 */}
          <Box flex={1} px={3} py="2" mb="4" bg="white">
            <HStack position={"relative"}>
              <Avatar
                src={getFullStaticSrc(topic.user.avatar)}
                name={topic.user.nickname}
                alt="头像"
                boxSize="50px"
                borderRadius={'50%'}
                m={2}
              ></Avatar>
              <VStack alignItems="flex-start">
                <Text fontSize="20px">{topic.user.username}</Text>
                <Text>{dayjs(topic.createAt).fromNow()}</Text>
              </VStack>
              {isOwner && (
                <Box position="absolute" top="10px" right="10px">
                  <Menu>
                    <MenuButton
                      as={Button}
                      bg="white"
                      variant="line"
                      _active={{ boxShadow: "none" }}
                      _focus={{ boxShadow: "none" }}
                      _hover={{ bg: "gray.50" }}
                      rightIcon={<ChevronDownIcon />}
                    >
                      管理
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={handleEdit}>修改</MenuItem>
                      <MenuItem onClick={handleDel}>删除</MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              )}
            </HStack>
            <Text fontSize="xl" fontWeight="medium" pt="3">
              {topic.title}
            </Text>
            <Divider borderColor="gray.300" my="2"></Divider>
            <div dangerouslySetInnerHTML={{ __html: props.data.content }}></div>
            <HStack py={2}>
              <Box
                py={0.5}
                px={3}
                borderRadius={"2xl"}
                border={"1px"}
                bg="gray.50"
                borderColor="gray.300"
              >
                <Text fontSize={"xs"}>{topic.category.name}</Text>
              </Box>
            </HStack>

            <Divider></Divider>

            <Flex
              align="center"
              color="gray.500"
              justify={"space-around"}
              my={2}
            >
              <HStack>
                <Icon as={MdCalendarViewWeek}></Icon>
                <Text ml={1}>浏览{topic.viewCount}</Text>
              </HStack>
              <HStack>
                <Icon as={AiFillLike}></Icon>
                {/* <Text ml={1} mr={4} onClick={() =>{doLike(item.id, item.isLike ? 0 : 1)}}> */}
                <Text ml={1} mr={4} onClick={() => {}}>
                  赞 {topic.likeCount}
                </Text>
              </HStack>
              <HStack>
                <Icon as={BiCommentDetail}></Icon>
                <Text ml={1} mr={4}>
                  评论{topic.commentCount}
                </Text>
              </HStack>
            </Flex>
          </Box>
          {/* 评论区域 */}
          <Comment user={user} entity={topic} entityType="topic"></Comment>
        </Box>

        <UserIntro user={topic.user}></UserIntro>
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              提示
            </AlertDialogHeader>

            <AlertDialogBody>删除后帖子将不可找回，确认删除？</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                取消
              </Button>
              <Button colorScheme="red" onClick={confirmDel} ml={3}>
                确认
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string;
  const data = await TopicProvider.detail({
    id,
  });
  return {
    props: {
      data,
    },
  };
};

export default TopicDetail;
