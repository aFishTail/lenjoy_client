import { GlobalContext } from '@/context/global'
import { UserProvider } from '@/providers/user'
import { useToast } from '@chakra-ui/react'
import { useCallback, useContext, useEffect, useState } from 'react'

export function useSignIn() {
  const [signStatus, setSignStatus] = useState(false)
  const { user, refreshUser } = useContext(GlobalContext)
  const toast = useToast()

  const getSignInStatus = useCallback(async () => {
    const status = await UserProvider.getDailySignIn()
    setSignStatus(status)
  }, [])

  const dailySignIn = useCallback(async () => {
    try {
      await UserProvider.dailySignIn()
      toast({ title: '签到成功', position: 'top', status: 'success' })
      setSignStatus(true)
    } catch (error) {
      setSignStatus(false)
    }
    refreshUser()
  }, [])

  useEffect(() => {
    if (user) {
      getSignInStatus()
    }
  }, [user, getSignInStatus])

  return {
    signStatus,
    getSignInStatus,
    dailySignIn,
  }
}
