import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Avatar,
  useToast,
  Tabs,
  TabList,
  Tab,
  TabIndicator,
  VStack,
  useMediaQuery,
  IconButton,
} from "@chakra-ui/react";
import {
  Search2Icon,
  ChevronDownIcon,
  AddIcon,
  CheckIcon,
  BellIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { useCallback, useContext, useMemo, useState, useEffect } from "react";
import { GlobalContext } from "@/context/global";
import { useRouter } from "next/router";
import storage from "@/utils/storage";
import { getFullStaticSrc } from "@/utils/helper";
import { AuthProvider } from "@/providers/auth";
import { Link } from "@chakra-ui/next-js";
import { useSignIn } from "@/hooks/features/useSignIn";
import { useNotification } from "@/hooks/features/useNotification";
import { Notification } from "./notification";
import { useMediaDevices } from "react-use";
export const Header: React.FC = () => {
  const { user, setUser, isMobile } = useContext(GlobalContext);
  const router = useRouter();
  const toast = useToast();

  const { signStatus, dailySignIn } = useSignIn();
  const { data } = useNotification();

  const goLogin = () => {
    router.push("/signin");
  };
  const handleLogout = useCallback(() => {
    //TODO: 可以优化
    AuthProvider.logout();
    setUser(null);
    storage.clearAll();
    router.push("/");
  }, []);

  const handleGoUserCenter = useCallback(() => {
    //TODO: 可以优化
    router.push("/user");
  }, []);

  const handleGoEditUser = useCallback(() => {
    //TODO: 可以优化
    router.push("/user/edit");
  }, []);

  const handlePost = useCallback(
    (type: "resource" | "reward" | "topic") => {
      if (!user) {
        toast({
          title: "请先登录",
          status: "warning",
          position: "top",
          duration: 2000,
        });
        goLogin();
        return;
      }
      router.push(`/${type}/editor`);
    },
    [user]
  );

  const avatar = useMemo(() => getFullStaticSrc(user?.avatar), [user]);
  const [tabIndex, setTabIndex] = useState<number>();

  const handleTabChange = (index: number) => {
    setTabIndex(index);
    switch (index) {
      case 0:
        router.push("/");
        break;
      case 1:
        router.push("/reward");
        break;
      case 2:
        router.push("/topic");
        break;
    }
  };

  useEffect(() => {
    if (router.pathname === "/" || router.pathname.includes("/resource")) {
      setTabIndex(0);
    } else if (router.pathname.includes("/reward")) {
      setTabIndex(1);
    } else if (router.pathname.includes("/topic")) {
      setTabIndex(2);
    }
  }, [router.pathname]);

  const handleClickLogo = useCallback(() => {
    location.replace("/");
  }, []);

  return (
    <Center bg="white" w="100%" p={{ base: 0, md: 4 }} as="header">
      <Container maxW="container.lg" display={{ base: "none", md: "block" }}>
        <HStack spacing={4}>
          <Box w="120px">
            <Text
              cursor="pointer"
              onClick={handleClickLogo}
              data-testid="logo-title"
            >
              乐享
            </Text>
          </Box>
          <Box w="600px">
            <Flex justify="space-between">
              <Tabs variant="unstyled" index={tabIndex} colorScheme="teal">
                <TabList>
                  <Tab
                    onClick={() => {
                      handleTabChange(0);
                    }}
                  >
                    资源
                  </Tab>
                  <Tab
                    onClick={() => {
                      handleTabChange(1);
                    }}
                  >
                    悬赏
                  </Tab>
                  <Tab
                    onClick={() => {
                      handleTabChange(2);
                    }}
                  >
                    话题
                  </Tab>
                </TabList>
                <TabIndicator
                  mt="-1.5px"
                  height="2px"
                  bg="teal"
                  borderRadius="1px"
                />
              </Tabs>
              <InputGroup w="300px">
                <Input></Input>
                <InputRightElement>
                  <Search2Icon color="gray.400" />
                </InputRightElement>
              </InputGroup>
            </Flex>
          </Box>
          <HStack spacing={4}>
            {/* <Button colorScheme="teal" onClick={handlePost}>
                发表
              </Button> */}
            <Menu>
              <MenuButton
                as={Button}
                colorScheme="teal"
                rightIcon={<AddIcon />}
              >
                发布
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => handlePost("resource")}>
                  发布资源
                </MenuItem>
                <MenuItem onClick={() => handlePost("reward")}>
                  发布悬赏
                </MenuItem>
                <MenuItem onClick={() => handlePost("topic")}>
                  发布话题
                </MenuItem>
              </MenuList>
            </Menu>
            <Notification></Notification>
            {user ? (
              <HStack>
                <Menu>
                  <MenuButton
                    as={Button}
                    leftIcon={
                      <Avatar name={user?.nickname} size="sm" src={avatar} />
                    }
                    bg="white"
                    variant="line"
                    _active={{ boxShadow: "none" }}
                    _focus={{ boxShadow: "none" }}
                    _hover={{ bg: "gray.50" }}
                    rightIcon={<ChevronDownIcon />}
                    data-testid="user-menu"
                    p={0}
                  >
                    {user.nickname}
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={handleGoUserCenter}>个人中心</MenuItem>
                    <MenuItem onClick={handleGoEditUser}>编辑资料</MenuItem>
                    <MenuItem onClick={handleLogout}>退出登录</MenuItem>
                  </MenuList>
                </Menu>
                <HStack>
                  {!signStatus ? (
                    <Button
                      leftIcon={<CheckIcon></CheckIcon>}
                      colorScheme={"orange"}
                      onClick={dailySignIn}
                    >
                      签到
                    </Button>
                  ) : null}
                </HStack>
              </HStack>
            ) : (
              <Button variant="outline" onClick={goLogin}>
                登录
              </Button>
            )}
          </HStack>
        </HStack>
      </Container>
      <HStack
        py={2}
        px={4}
        w={"full"}
        justifyContent={"space-between"}
        display={{ base: "flex", md: "none" }}
      >
        <HStack>
          <Text
            cursor="pointer"
            onClick={handleClickLogo}
            data-testid="logo-title"
          >
            乐享
          </Text>
          <Menu>
            <MenuButton
              as={IconButton}
              bg="white"
              variant="line"
              _active={{ boxShadow: "none" }}
              _focus={{ boxShadow: "none" }}
              _hover={{ bg: "gray.50" }}
              icon={<HamburgerIcon />}
              data-testid="user-menu"
              px={1}
            ></MenuButton>
            <MenuList>
              <MenuItem as={"a"} href="/">
                资源
              </MenuItem>
              <MenuItem as={"a"} href="/reward">
                悬赏
              </MenuItem>
              <MenuItem as={"a"} href="/topic">
                话题
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        {/* <InputGroup w={"100px"}>
          <Input></Input>
          <InputRightElement>
            <Search2Icon color="gray.400" />
          </InputRightElement>
        </InputGroup> */}

        <HStack spacing={4}>
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="teal"
              rightIcon={<AddIcon />}
              size={"sm"}
            >
              发布
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handlePost("resource")}>
                发布资源
              </MenuItem>
              <MenuItem onClick={() => handlePost("reward")}>发布悬赏</MenuItem>
              <MenuItem onClick={() => handlePost("topic")}>发布话题</MenuItem>
            </MenuList>
          </Menu>
          <Notification></Notification>
          {user ? (
            <HStack>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<Avatar name={user?.nickname} size="sm" src={avatar} />}
                  bg="white"
                  variant="line"
                  _active={{ boxShadow: "none" }}
                  _focus={{ boxShadow: "none" }}
                  _hover={{ bg: "gray.50" }}
                  data-testid="user-menu"
                  p={0}
                ></MenuButton>
                <MenuList>
                  <MenuItem onClick={handleGoUserCenter}>个人中心</MenuItem>
                  <MenuItem onClick={handleGoEditUser}>编辑资料</MenuItem>
                  <MenuItem onClick={handleLogout}>退出登录</MenuItem>
                </MenuList>
              </Menu>
              <HStack>
                {!signStatus ? (
                  <Button
                    leftIcon={<CheckIcon></CheckIcon>}
                    colorScheme={"orange"}
                    onClick={dailySignIn}
                  >
                    签到
                  </Button>
                ) : null}
              </HStack>
            </HStack>
          ) : (
            <Button variant="outline" onClick={goLogin}>
              登录
            </Button>
          )}
        </HStack>
      </HStack>
    </Center>
  );
};
