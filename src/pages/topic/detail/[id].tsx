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
  Avatar,
  position,
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
import Head from "next/head";

interface IProps {
  data: ITopic;
}

const TopicDetail: NextPage<IProps> = (props) => {
  const topic = props.data;

  const [isOwner, setIsOwner] = useState<Boolean>(false);
  const { user, isMobile } = useContext(GlobalContext);

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

  const UserEdit = ({ styles }) => {
    return (
      isOwner && (
        <Box {...styles}>
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
      )
    );
  };

  return (
    <>
      <Head>
        <title>{`${topic.title} - 乐享`}</title>
        <meta name="keywords" content={topic.title} />
        <meta name="description" content={topic.content} />
      </Head>
      <Container
        maxW={{ base: "full", md: "container.lg" }}
        bg="gray.100"
        my="4"
      >
        <Flex justify="space-between">
          <Box mx={{ base: 0, md: 4 }} flex={1}>
            <Box px={3} py="2" mb="4" bg="white" position={"relative"}>
              <HStack>
                <Avatar
                  src={getFullStaticSrc(topic.user.avatar)}
                  name={topic.user.nickname}
                  boxSize="50px"
                  borderRadius={"50%"}
                  m={2}
                ></Avatar>
                <Flex
                  alignItems={{ base: "center", md: "flex-start" }}
                  justifyContent={{ base: "space-between" }}
                  flexDirection={{ base: "row", md: "column" }}
                  w={"full"}
                >
                  <Text fontSize="20px">{topic.user.nickname}</Text>
                  <Text fontSize={"14px"}>
                    {dayjs(topic.createAt).fromNow()}
                  </Text>
                </Flex>
              </HStack>
              <UserEdit
                styles={
                  isMobile
                    ? {}
                    : { position: "absolute", top: "10px", right: "10px" }
                }
              ></UserEdit>
              <Text fontSize="xl" fontWeight="medium" pt="3">
                {topic.title}
              </Text>
              <Divider borderColor="gray.300" my="2"></Divider>
              <div
                dangerouslySetInnerHTML={{ __html: props.data.content }}
              ></div>
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
            <Comment user={user} entity={topic} entityType="topic"></Comment>
          </Box>

          <Box display={{ base: "none", md: "block" }}>
            <UserIntro user={topic.user}></UserIntro>
          </Box>
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

              <AlertDialogBody>
                删除后帖子将不可找回，确认删除？
              </AlertDialogBody>

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
    </>
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
