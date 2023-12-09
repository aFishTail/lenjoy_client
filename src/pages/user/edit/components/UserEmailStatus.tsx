import { useCountDownWithCache } from '@/hooks/useCountDownWithCache'
import { UserProvider } from '@/providers/user'
import { Badge, HStack, Button, useToast } from '@chakra-ui/react'
import { FC, useCallback } from 'react'

interface IProps {
  user: IUser
}

export const UserEmailStatus: FC<IProps> = ({ user }) => {
  const toast = useToast()

  const {
    seconds,
    isRunning: secondInProgress,
    startCountDown,
  } = useCountDownWithCache('verifyEmailBtnLastSecond', 60)

  const handleVerifyEmail = useCallback(async () => {
    await UserProvider.sendVerifyEmail()
    toast({
      title: '请在接收到系统邮件后进行验证',
      status: 'success',
      position: 'top',
    })
    startCountDown()
  }, [])
  if (!user) return
  if (user.emailVerified) {
    return <Badge colorScheme="yellow">{'已认证'}</Badge>
  }
  return (
    <HStack>
      <Badge colorScheme="red">{'未认证'}</Badge>
      {secondInProgress ? (
        <Button colorScheme={'blue'} onClick={handleVerifyEmail} isDisabled>
          {seconds + ' 秒'}
        </Button>
      ) : (
        <Button
          colorScheme={'blue'}
          variant="ghost"
          onClick={handleVerifyEmail}
        >
          校验邮箱
        </Button>
      )}
    </HStack>
  )
}
