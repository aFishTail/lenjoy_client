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
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { UserIntro } from "@/components/UserIntro";
import { GlobalContext } from "@/context/global";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { getFullStaticSrc } from "@/utils/helper";
import { AiFillLike } from "react-icons/ai";
import { MdCalendarViewWeek } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { ResourceProvider } from "@/providers/resource";
import { ResourceLinkViewer } from "@/components/ResourceLinkViewer";
import { SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import Head from "next/head";

interface IProps {
  data: IResource;
}

const ResourceDetail: NextPage<IProps> = (props) => {
  const resource = props.data;

  const [isOwner, setIsOwner] = useState<Boolean>(false);
  const { user, isMobile } = useContext(GlobalContext);

  const router = useRouter();

  useEffect(() => {
    // const contentBlock = htmlToDraft(props.data.content)
    setIsOwner(user?.id === resource.user?.id);
  }, [user, resource.user?.id]);

  const handleEdit = useCallback(() => {
    router.push(`/resource/editor/${resource.id}`);
  }, [resource.id]);
  const handleDel = useCallback(() => {
    onOpen();
  }, [resource.id]);

  const confirmDel = useCallback(async () => {
    await ResourceProvider.remove({ id: resource.id });
    router.push("/resource");
  }, [resource.id]);

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
        <title>{`${resource.name} - 乐享`}</title>
        <meta name="keywords" content={resource.name} />
        <meta name="description" content={resource.content} />
      </Head>
      <Container
        maxW={{ base: "full", md: "container.lg" }}
        bg="gray.100"
        my="4"
      >
        <Flex>
          <Box flex={1} mx={{ base: 0, md: 4 }}>
            {/* 帖子详情区域 */}
            <Box flex={1} px={3} py="2" mb="4" bg="white" position={"relative"}>
              <HStack>
                <Avatar
                  src={getFullStaticSrc(resource.user.avatar)}
                  name={resource.user.nickname}
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
                  <Text fontSize="20px">{resource.user.nickname}</Text>
                  <Text fontSize={"14px"}>
                    {dayjs(resource.createAt).fromNow()}
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
                {resource.name}
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
                  <Text fontSize={"xs"}>{resource.category?.name}</Text>
                </Box>
              </HStack>

              <ResourceLinkViewer data={resource}></ResourceLinkViewer>

              <Divider borderColor="gray.300" my="2"></Divider>

              <Flex
                align="center"
                color="gray.500"
                justify={"space-around"}
                my={2}
              >
                <HStack>
                  <Icon as={MdCalendarViewWeek}></Icon>
                  <Text ml={1}>浏览{resource.viewCount}</Text>
                </HStack>
                <HStack>
                  <Icon as={AiFillLike}></Icon>
                  {/* <Text ml={1} mr={4} onClick={() =>{doLike(item.id, item.isLike ? 0 : 1)}}> */}
                  <Text ml={1} mr={4} onClick={() => {}}>
                    赞 {resource.likeCount}
                  </Text>
                </HStack>
                <HStack>
                  <Icon as={BiCommentDetail}></Icon>
                  <Text ml={1} mr={4}>
                    评论{resource.commentCount}
                  </Text>
                </HStack>
              </Flex>
            </Box>
            {/* 评论区域 */}
            <Comment
              user={user}
              entity={resource}
              entityType="resource"
            ></Comment>
          </Box>
          <Box display={{ base: "none", md: "block" }}>
            <UserIntro user={resource.user}></UserIntro>
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
  const session = await getIronSession<SessionData>(
    context.req,
    context.res,
    sessionOptions
  );
  const id = context.query.id as string;
  const data = await ResourceProvider.detail(
    {
      id,
    },
    { headers: { authorization: `Bearer ${session.token}` } }
  );
  return {
    props: {
      data,
    },
  };
};

export default ResourceDetail;
