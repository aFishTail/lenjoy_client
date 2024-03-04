import { GlobalContext } from '@/context/global'
import { Box, Divider, List, ListItem, Text } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { useContext, useMemo } from 'react'
import { Link } from '@chakra-ui/next-js'
import { useRouter } from 'next/router'

export const Category: React.FC = () => {
  const { categories } = useContext(GlobalContext)
  const route = useRouter()
  const categoryQuery = useMemo(() => route.query.category, [route.query])
  return (
    <Box w="100px" h='fit-content' bg="white">
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
            bg={categoryQuery == null || categoryQuery === 'all' ? 'gray.200' : null}
            py={2}
            mx={2}
            borderRadius="sm"
          >
            <Link key={'all'} href={`${route.pathname}?category=${'all'}`}>
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
            bg={categoryQuery === item.label ? 'gray.200' : null}
            py={2}
            mx={2}
            borderRadius="sm"
          >
            <Link key={item.id} href={`${route.pathname}?category=${item.label}`}>
              {item.name}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
