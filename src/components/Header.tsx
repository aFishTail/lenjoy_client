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
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { Search2Icon, ChevronDownIcon } from '@chakra-ui/icons'
import { useContext } from 'react'
import { GlobalContext } from '@/content/global'
import { useRouter } from 'next/router'

export const Header: React.FC = () => {
  const { user } = useContext(GlobalContext)
  const router = useRouter()
  const goLogin = () => {
    router.push('/signin')
  }
  return (
    <Center bg="white" w="100%" p={4} as="header">
      <Container maxW="container.lg">
        <HStack spacing={4}>
          <Box w="120px">
            <Text fontSize="lg" color="gray.600" fontWeight={600}>
              乐享
            </Text>
          </Box>
          <Box w="600px">
            <Flex justify="end">
              <InputGroup w="400px">
                <Input></Input>
                <InputRightElement>
                  <Search2Icon color="gray.400" />
                </InputRightElement>
              </InputGroup>
            </Flex>
          </Box>
          <HStack spacing={4}>
            <Button colorScheme="teal">发表</Button>
            {user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  leftIcon={
                    <Avatar
                      name="Dan Abrahmov"
                      size="sm"
                      src={user.avatar || "https://bit.ly/dan-abramov"}
                    />
                  }
                  bg="white"
                  variant="line"
                  _active={{ boxShadow: 'none' }}
                  _focus={{ boxShadow: 'none' }}
                  _hover={{ bg: 'gray.50' }}
                  rightIcon={<ChevronDownIcon />}
                >
                  {user.username}
                </MenuButton>
                <MenuList>
                  <MenuItem>Download</MenuItem>
                  <MenuItem>Create a Copy</MenuItem>
                  <MenuItem>Mark as Draft</MenuItem>
                  <MenuItem>Delete</MenuItem>
                  <MenuItem>Attend a Workshop</MenuItem>
                </MenuList>
              </Menu>
            ) : (
                  <Button variant="outline" onClick={goLogin}>登录</Button>
            )}
          </HStack>
        </HStack>
      </Container>
    </Center>
  )
}
