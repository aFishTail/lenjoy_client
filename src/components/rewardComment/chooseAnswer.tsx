import { GlobalContext } from '@/context/global'
import { ResourceProvider } from '@/providers/resource'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  VStack,
  Text,
  useToast,
  HStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useContext, useRef, useState } from 'react'
import { Link } from '@chakra-ui/next-js'
import { RewardProvider } from '@/providers/reward'
import { redirect } from 'next/navigation'

interface IProps {
  reward: IReward
  rewardAnswer: any
}

export const ChooseAnswer: React.FC<IProps> = ({ reward, rewardAnswer }) => {
  const toast = useToast()
  const router = useRouter()
  const { user } = useContext(GlobalContext)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<any>()
  const handleConfirm = useCallback(async () => {
    onOpen()
  }, [])

  const handleExecConfirm = useCallback(async () => {
    await RewardProvider.confirmRewardAnswer({
      rewardId: reward.id,
      rewardAnswerId: rewardAnswer.id,
    })
    toast({
      title: '确认成功',
      status: 'success',
      position: 'top',
    })
    onClose()
    location.reload()
  }, [])

  if(reward.confirmedRewardAnswer) {
    return
  }

  return (
    <>
      {reward.user.id === user?.id && (
        <HStack justifyContent={'flex-end'} width={'100%'}>
          {rewardAnswer.user.id !== user?.id && (
            <Button colorScheme="teal" size={'xs'} onClick={handleConfirm}>
              选为正确答案
            </Button>
          )}
        </HStack>
      )}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              提示
            </AlertDialogHeader>

            <AlertDialogBody>
              确认选择该评论作为悬赏答案吗？确认后将不可更改！
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                取消
              </Button>
              <Button colorScheme="teal" onClick={handleExecConfirm} ml={3}>
                确认
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
