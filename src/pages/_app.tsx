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


export default function MyApp({ Component, pageProps, ...contextValue }: AppProps) {
  const [user, setUserInfo] = useState<IUser>()
  const setUser = (user: IUser) => {
    storage.setItem('user', user, 60 * 60)
    storage.setItem('token', user?.token, 60 * 60)
    setUserInfo(user)
  }
  useEffect(() => {
    const user = storage.getItem('user')
    if (user) {
      setUser(user)
    }
  }, [])
  return (
    <GlobalContext.Provider
      value={{
        ...(contextValue as any),
        user: user!,
        setUser
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
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  const categories = await CategoryProvider.list()
  const scoreRankList = await ScoreProvider.rank()
  // const tags = await CategoryProvider.list({})
  return { ...appProps, categories, scoreRankList }
}