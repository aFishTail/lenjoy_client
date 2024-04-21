import { useNotification } from "@/hooks/features/useNotification";
import { getFullStaticSrc } from "@/utils/helper";
import { BellIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Input,
  Link,
  List,
  ListItem,
  VStack,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { BiCommentDetail } from "react-icons/bi";
import { MdCalendarViewWeek } from "react-icons/md";
import { DoLike } from "../DoLike";

export const Notification: React.FC = () => {
  const btnRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    data,
    existNew,
    read,
    hasLastPage,
    hasNextPage,
    clickLastPage,
    clickNextPage,
  } = useNotification();

  // const handleRead = (item: Notification) => {
  //   item.status = 1;
  //   console.log("handleRead", item);
  // };

  return (
    <>
      <Box cursor={"pointer"} position={"relative"}>
        <BellIcon ref={btnRef} fontSize={"24px"} onClick={onOpen}></BellIcon>
        {existNew && (
          <Box
            w={"6px"}
            h={"6px"}
            borderRadius={"3px"}
            backgroundColor={"red"}
            position={"absolute"}
            top={"2px"}
            right={"2px"}
          ></Box>
        )}
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>我的消息通知</DrawerHeader>

          <DrawerBody>
            <List w="100%">
              {data.map((item, index) => (
                <ListItem key={item.id}>
                  <VStack alignItems={"flex-start"}>
                    <Box fontSize={"14px"}>{item.content}</Box>
                    <HStack
                      fontSize={"12px"}
                      w={"100%"}
                      color={"gray.500"}
                      justify={"space-between"}
                    >
                      <Text>
                        {dayjs(item.createAt).format("YYYY-MM-DD HH:mm:ss")}
                      </Text>
                      {item.status === 0 ? (
                        <Button size={"xs"} onClick={() => read(item)}>
                          标为已读
                        </Button>
                      ) : null}
                    </HStack>
                    <Divider></Divider>
                  </VStack>
                </ListItem>
              ))}
            </List>
            <HStack justify={"flex-end"} py={4}>
              {hasLastPage && (
                <Button size={"xs"} onClick={clickLastPage}>
                  上一页
                </Button>
              )}
              {hasNextPage && (
                <Button size={"xs"} onClick={clickNextPage}>
                  下一页
                </Button>
              )}
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
