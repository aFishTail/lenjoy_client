import type { NextPage } from 'next'
import { AppLayout } from '@/layout/app-layout'
import { Center, Square, Circle, Button } from '@chakra-ui/react'

const Home: NextPage = (props) => {
  console.log('props:', props)
  return (
      <Center bg="tomato" h="100px" color="white">
        This is the Center
      </Center>
  )
}

export default Home
