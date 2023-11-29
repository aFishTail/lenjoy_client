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
} from '@chakra-ui/react'
import { Search2Icon, ChevronDownIcon, AddIcon } from '@chakra-ui/icons'
import { useCallback, useContext, useMemo, useState, useEffect } from 'react'
import { GlobalContext } from '@/context/global'
import { useRouter } from 'next/router'
import storage from '@/utils/storage'
import { getFullStaticSrc } from '@/utils/helper'
import { AuthProvider } from '@/providers/auth'
import { Link } from '@chakra-ui/next-js'


export const Header: React.FC = () => {
  const { user, setUser } = useContext(GlobalContext)
  const router = useRouter()

  const toast = useToast()

  const goLogin = () => {
    router.push('/signin')
  }
  const handleLogout = useCallback(() => {
    //TODO: 可以优化
    AuthProvider.logout()
    setUser(null)
    storage.clearAll()
    router.push('/')
  }, [])

  const handleGoUserCenter = useCallback(() => {
    //TODO: 可以优化
    router.push('/user')
  }, [])

  const handleGoEditUser = useCallback(() => {
    //TODO: 可以优化
    router.push('/user/edit')
  }, [])

  const handlePost = useCallback(
    (type: number) => {
      if (!user) {
        toast({
          title: '请先登录',
          status: 'warning',
          position: 'top',
          duration: 2000,
        })
        goLogin()
        return
      }
      switch (type) {
        case 1:
          router.push('/topic/editor')
          break
        case 2:
          router.push('/resource/editor')
          break
        case 3:
          router.push('/reward/editor')
          break

        default:
          break
      }
    },
    [user]
  )

  const avatar = useMemo(() => getFullStaticSrc(user?.avatar), [user])
  const [tabIndex, setTabIndex] = useState(0)
  const handleTabChange = (index) => {
    console.log('ss', index, tabIndex)
    setTabIndex(index)
    switch (index) {
      case 0:
        router.push('/')
        break
      case 1:
        router.push('/resource')
        break
      case 2:
        router.push('/reward')
        break
    }
  }

  useEffect(() => {
    console.log('mounted', router.pathname)
    switch (router.pathname) {
      case '/':
        setTabIndex(0)
        break
      case '/resource':
        setTabIndex(1)
        break
      case '/reward':
        setTabIndex(2)
        break
    }
  }, [])

  return (
    <Center bg="white" w="100%" p={4} as="header">
      <Container maxW="container.lg">
        <HStack spacing={4}>
          <Box w="120px">
            <Link href="/">
              乐享
            </Link>
          </Box>
          <Box w="600px">
            <Flex justify="space-between">
              <Tabs
                variant="unstyled"
                index={tabIndex}
                onChange={handleTabChange}
                colorScheme="teal"
              >
                <TabList>
                  <Tab>首页</Tab>
                  <Tab>资源</Tab>
                  <Tab>悬赏</Tab>
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
                <MenuItem onClick={() => handlePost(1)}>发布帖子</MenuItem>
                <MenuItem onClick={() => handlePost(2)}>发布资源</MenuItem>
                <MenuItem onClick={() => handlePost(3)}>发布悬赏</MenuItem>
              </MenuList>
            </Menu>
            {user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  leftIcon={
                    <Avatar name={user?.nickname} size="sm" src={avatar} />
                  }
                  bg="white"
                  variant="line"
                  _active={{ boxShadow: 'none' }}
                  _focus={{ boxShadow: 'none' }}
                  _hover={{ bg: 'gray.50' }}
                  rightIcon={<ChevronDownIcon />}
                >
                  {user.nickname}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleGoUserCenter}>个人中心</MenuItem>
                  <MenuItem onClick={handleGoEditUser}>编辑资料</MenuItem>
                  <MenuItem onClick={handleLogout}>退出登录</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button variant="outline" onClick={goLogin}>
                登录
              </Button>
            )}
          </HStack>
        </HStack>
      </Container>
    </Center>
  )
}
