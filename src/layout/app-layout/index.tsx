import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Rank } from '@/components/Rank'
import { Category } from '@/components/Category'
import { Box, Container, Flex, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const notNeedLayoutPages: string[] = ['/signin', '/signup', '/test']

export const AppLayout: React.FC = ({ children }) => {
  const router = useRouter()
  console.log('router', router)
  const noLayout = notNeedLayoutPages.includes(router.pathname)
  return (
    <Box bg="gray.100" h="100vh">
      <Header></Header>
      {noLayout ? (
        children
      ) : (
        <Container maxW="container.lg" mt={4}>
          <Flex justify="space-between">
            <Category></Category>
            <Box flex={1} px={3}>
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
