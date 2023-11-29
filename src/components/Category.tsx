import { GlobalContext } from '@/context/global'
import { Box, Divider, List, ListItem, Text } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { useContext } from 'react'
import { Link } from '@chakra-ui/next-js'

export const Category: React.FC = () => {
  const { categories } = useContext(GlobalContext)
  return (
    <Box w="100px" h='fit-content' bg="white">
      <Text textAlign="center" py={3}>
        主题
      </Text>
      <Divider></Divider>
      <List
        spacing={2}
        py={2}
        color="gray.600"
        fontSize="16px"
        fontWeight={600}
      >
        {[{ name: '全部', id: '-99', label: 'all' },...categories].map((item) => (
          <ListItem
            key={item.id}
            textAlign="center"
            cursor="pointer"
            _hover={{ bg: 'gray.50' }}
            py={2}
            mx={2}
            borderRadius="sm"
          >
            <Link key={item.id} href={`/category/${item.label || 'all'}`} passHref>
              {item.name}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
