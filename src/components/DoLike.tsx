import { GlobalContext } from '@/context/global'
import { UserLikeProvide } from '@/providers/user-like'
import { Box, Flex, Icon, Text, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useContext } from 'react'
import { AiFillLike } from 'react-icons/ai'

interface IProps {
  refresh: (index: number) => void
  entityType: IEntityType
  item: ITopic | IResource | IReward
  index: number
}

export const DoLike = ({ refresh, entityType, item, index }: IProps) => {
  const toast = useToast()
  const router = useRouter()
  const { user } = useContext(GlobalContext)
  const doLike = useCallback(
    async (index: number, item: IEntity) => {
      if (!user) {
        toast({
          title: '请先登录',
          status: 'warning',
          position: 'top',
          duration: 2000,
        })
        router.push('/signin')
        return
      }
      const id = item.id
      const status = item.isLike ? 0 : 1
      await UserLikeProvide.doLikeTopic({
        entityType,
        entityId: id,
        status,
      })
      refresh(index)
    },
    [refresh, entityType, user]
  )
  return (
    <Flex cursor="pointer" alignItems={'center'}>
      <Icon as={AiFillLike} color={item.isLike ? 'orange' : 'inherit'}></Icon>
      <Text
        ml={1}
        mr={4}
        color={item.isLike ? 'orange' : 'inherit'}
        onClick={() => {
          doLike(index, item)
        }}
      >
        赞 {item.likeCount}
      </Text>
    </Flex>
  )
}
