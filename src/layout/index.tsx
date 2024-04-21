import { Footer } from '@/components/Footer'
import { Header } from '@/components/header'
import { Rank } from '@/components/Rank'
import { Category } from '@/components/Category'
import { Box, Container, Flex, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const notNeedLayoutPages: string[] = [
  '/signin',
  '/signup',
  '/thirdaccount/redirect',
  '/test',
  '/topic/editor',
  '/topic/editor/[id]',
  '/topic/detail/[id]',
  '/user',
  '/user/edit',
  '/resource/editor',
  '/resource/editor/[id]',
  '/resource/detail/[id]',
  '/reward/editor',
  '/reward/editor/[id]',
  '/reward/detail/[id]',
]

export const AppLayout: React.FC = ({ children }) => {
  const router = useRouter()
  const noLayout = notNeedLayoutPages.includes(router.pathname)
  return (
    <Box bg="gray.100" minH="100vh">
      <Header></Header>
      {noLayout ? (
        <Box minH="calc(100vh - 150px)">{children}</Box>
      ) : (
        <Container maxW="container.lg" mt={4}>
          <Flex justify="space-between">
            <Category></Category>
            <Box flex={1} px={3} minH="calc(100vh - 150px)">
              {children}
            </Box>
            <Rank></Rank>
          </Flex>
        </Container>
      )}
      <Footer></Footer>
    </Box>
  )
}
