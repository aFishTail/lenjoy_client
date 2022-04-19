import { GetServerSideProps, NextPage } from "next";
import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { AuthProvider } from "@/providers/auth";
interface IProps {
    code: string;
    from: string;
  }
const ThirdAccountRedirect: NextPage<IProps> = ({code, from}: IProps) => {
    useEffect(() => {
        if (!code) return
         AuthProvider.loginWithGithub(code)
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