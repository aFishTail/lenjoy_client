import { AppLayout } from '@/layout'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import '@/utils/dayjs'
import { GlobalContext } from '@/context/global'
import storage from '@/utils/storage'
import { useEffect, useState } from 'react'
import App from 'next/app'
import { CategoryProvider } from '@/providers/category'
import { ScoreProvider } from '@/providers/score'
import { ToastContainer } from '@/utils/toast'
import { AuthProvider } from '@/providers/auth'
import { UserProvider } from '@/providers/user'

export default function MyApp({
  Component,
  pageProps,
  ...contextValue
}: AppProps) {
  console.log('app:', pageProps, contextValue)
  const [user, setUserInfo] = useState<IUser|null>()
  const setUser = (user: IUser | null) => {
    storage.setItem('user', user, 60 * 60 * 24)
    storage.setItem('token', user?.token, 60 * 60 * 24)
    setUserInfo(user)
  }

  const refreshUser = async () => {
    const token = storage.getItem('token')
    if (token) {
      const user = await AuthProvider.getUserInfo()
      setUserInfo(user)
    } else {
      setUserInfo(null)
    }
  }
  const removeUser = async () => {
    setUser(null)
  }

  useEffect(() => {
    refreshUser()  
  }, [])
  return (
    <GlobalContext.Provider
      value={{
        ...(contextValue as any),
        user: user!,
        setUser,
        refreshUser,
        removeUser
      }}
    >
      <ChakraProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
        <ToastContainer></ToastContainer>
      </ChakraProvider>
    </GlobalContext.Provider>
  )
}

MyApp.getInitialProps = async (appContext: any) => {
  console.log('getInitialProps')
  const appProps = await App.getInitialProps(appContext)
  const categories = await CategoryProvider.list()
  const scoreRankList = await ScoreProvider.rank()
  return { ...appProps, categories, scoreRankList }
}

