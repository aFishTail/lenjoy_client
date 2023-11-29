import { GetServerSideProps, NextPage } from "next";
import { Text, useToast } from "@chakra-ui/react";
import { useCallback, useContext, useEffect } from "react";
import { AuthProvider } from "@/providers/auth";
import { GlobalContext } from "@/context/global";
import { useRouter } from "next/router";
interface IProps {
    code: string;
    from: string;
  }
const ThirdAccountRedirect: NextPage<IProps> = ({code, from}: IProps) => {
    const toast = useToast()
    const router = useRouter()
    const {setUser} = useContext(GlobalContext)

    const handeLogin = useCallback(async () => {
        const user = await AuthProvider.loginWithGithub(code)
         setUser(user)
         toast({
            title: '登录成功',
            status: 'success',
            position: 'top'
          })
         console.log('third user:', user)
        router.push('/')
    }, [])

    useEffect(() => {
        if (!code) return
         handeLogin()
    }, [])
    return <Text>第三方登录...</Text>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {code, from} = context.query
    return {
        props: {
            code, from
        }
    }
}

export default ThirdAccountRedirect