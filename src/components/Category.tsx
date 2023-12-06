import { GlobalContext } from '@/context/global'
import { Box, Divider, List, ListItem, Text } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { useContext } from 'react'
import { Link } from '@chakra-ui/next-js'

export const Category: React.FC = () => {
  const { categories } = useContext(GlobalContext)
  return (
    <Box w="100px" h='fit-content' bg="white">
      {/* <Link href={`/category/all`}>
      <Text textAlign="center" py={3}>
        全部
      </Text>
      </Link> */}
      <List
        spacing={2}
        py={2}
        color="gray.600"
        fontSize="16px"
        fontWeight={600}
      >
        <ListItem
            key={'all'}
            textAlign="center"
            cursor="pointer"
            _hover={{ bg: 'gray.50' }}
            py={2}
            mx={2}
            borderRadius="sm"
          >
            <Link key={'all'} href={`/category/${'all'}`}>
              {'全部'}
            </Link>
          </ListItem>
          <Divider></Divider>
        {[...categories].map((item) => (
          <ListItem
            key={item.id}
            textAlign="center"
            cursor="pointer"
            _hover={{ bg: 'gray.50' }}
            py={2}
            mx={2}
            borderRadius="sm"
          >
            <Link key={item.id} href={`/category/${item.label || 'all'}`}>
              {item.name}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
