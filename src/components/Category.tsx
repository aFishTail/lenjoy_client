import { GlobalContext } from '@/content/global'
import { Box, Divider, Link, List, ListItem, Text } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { useContext } from 'react'
import NextLink from 'next/link'

export const Category: React.FC = () => {
  const { categories } = useContext(GlobalContext)
  console.log('cates:', categories)
  return (
    <Box w="100px" bg="white">
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
        {categories.map((item) => (
          <ListItem
            key={item.id}
            textAlign="center"
            cursor="pointer"
            _hover={{ bg: 'gray.50' }}
            py={2}
            mx={2}
            borderRadius="sm"
          >
            <NextLink key={item.id} href={`/category/${item.id}`} passHref>
              <Link>{item.name}</Link>
            </NextLink>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
