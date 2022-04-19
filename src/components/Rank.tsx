import { DragHandleIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Flex,
  HStack,
  List,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react'

export const Rank: React.FC = () => {
  return (
    <Box w="300px" bg="white" py={2} px={4}>
      <Text
        fontSize="xl"
        fontWeight="semibold"
        borderBottom="1px"
        borderBottomColor="gray.200"
        color="gray.600"
        py={2}
      >
        积分排行
      </Text>
      <List>
        {[0, 1, 2].map((item) => (
          <ListItem key={item} borderBottom="1px" borderBottomColor="gray.200" py={2} _last={
              {border: 'none'}
          }>
            <Flex justify="space-between" align="center">
              <HStack>
                <Avatar
                  name="Dan Abrahmov"
                  size="sm"
                  src="https://bit.ly/dan-abramov"
                />
                <Box>
                  <Text color="gray.600">一条鱼尾</Text>
                  <HStack color="gray.500" fontSize="sm">
                    <Text>1001 帖子</Text>
                    <Text>.</Text>
                    <Text>1001 评论</Text>
                  </HStack>
                </Box>
              </HStack>
              <HStack bg="gray.200" borderRadius="2xl" flex={0} h="20px" px={1}>
                <DragHandleIcon></DragHandleIcon>
                <Text color="gray.500" fontSize="sm">
                  3070
                </Text>
              </HStack>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
