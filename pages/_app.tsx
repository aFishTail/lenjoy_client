import '@/styles/globals.css'
// import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { TopicProvider } from '@/providers/topic'
import { useEffect, useState } from 'react'
import { CategoryProvider } from '@/providers/category'
import App from 'next/app'
import { GlobalContext, IGlobalContext } from '@/content/global'
import { loadGetInitialProps } from 'next/dist/shared/lib/utils'
import { AppLayout } from '@/layout/app-layout'

function MyApp({ Component, pageProps, ...contextValue }: AppProps) {
  const [user, setUser] = useState<IUser>()
  return (
    <GlobalContext.Provider
      value={{
        ...contextValue,
        user,
        setUser
      }}
    >
      <ChakraProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ChakraProvider>
    </GlobalContext.Provider>
  )
}
MyApp.getInitialProps = async (appContext: any) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  const categories = await CategoryProvider.list()
  categories.unshift({ name: '全部', id: '-99', value: 'all' })
  // const tags = await CategoryProvider.list({})
  return { ...appProps, categories }
}

export default MyApp
