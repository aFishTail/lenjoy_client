import { GlobalContext } from '@/context/global'
import { UserProvider } from '@/providers/user'
import storage from '@/utils/storage'
import { useToast } from '@chakra-ui/react'
import { useCallback, useContext, useEffect, useState } from 'react'

export function useSignIn() {
  const [signStatus, setSignStatus] = useState(true)
  const { user, refreshUser } = useContext(GlobalContext)
  const toast = useToast()

  const getSignInStatus = useCallback(async () => {
    console.log('token:', storage.getItem('token'))
    const status = await UserProvider.getDailySignIn()
    setSignStatus(status)
  }, [])

  const dailySignIn = useCallback(async () => {
    try {
      const {score} = await UserProvider.dailySignIn()
      toast({ title: `签到成功，获得${score}积分`, position: 'top', status: 'success' })
      setTimeout(() => {
        location.reload()
      }, 1000)
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
