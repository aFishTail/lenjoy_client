import { Flex, Text } from '@chakra-ui/react'

export const Footer: React.FC = () => {
  return (
    <footer>
      <Flex justifyContent="center" h="60px" alignItems='center'>
        <Text color='gray.400'>乐享网@20202</Text>
      </Flex>
    </footer>
  )
}
