import type { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'
import { useToast } from '@chakra-ui/react'
import {
  Center,
  Square,
  Circle,
  Button,
  List,
  ListItem,
  HStack,
  VStack,
  Avatar,
  Flex,
  Text,
  Icon,
  Image,
  Stack,
  Heading,
  Box,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Link,
  Divider,
  FormErrorMessage,
  AlertIcon,
  Alert,
} from '@chakra-ui/react'
import { AiOutlineGithub, AiOutlineQq } from 'react-icons/ai'
import { useCallback, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { CaptchaProvider } from '@/providers/captcha'
import { useMount } from 'react-use'
import { Field, Form, Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { AuthProvider } from '@/providers/auth'
import { GlobalContext } from '@/context/global'

const pageSize = 12

const Category: NextPage = (props) => {
  const boxBg = useColorModeValue('white', 'gray.700')
  const toast = useToast()
  const router = useRouter()
  const { setUser } = useContext(GlobalContext)
  const [captchaId, setCaptchaId] = useState<string>('')
  const [captchaUrl, setCaptchaUrl] = useState<string>('')
  const getCaptcha = useCallback(async () => {
    const { id, imgUrl } = await CaptchaProvider.get()
    setCaptchaId(id)
    setCaptchaUrl(imgUrl)
  }, [])

  useMount(() => {
    getCaptcha()
  })

  const loginWithGithub = useCallback(() => {
    router.replace(
      `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${location.origin}/thirdaccount/redirect?from=${location.href}`
    )
  }, [])

  interface FormValues {
    username: string
    password: string
    confirmPassword: string
    email: string
    captcha: string
  }
  return (
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={4} px={6}>
      <Box rounded={'lg'} bg={boxBg} boxShadow={'lg'} p={6}>
        <Stack spacing={'4'}>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
              captcha: '',
            }}
            validationSchema={Yup.object({
              username: Yup.string()
                .max(15, '最长15个字符')
                .required('请填写昵称'),
              password: Yup.string()
                .min(8, '最短8位密码')
                .max(16, '最长16位密码')
                .required('请填写密码'),
              confirmPassword: Yup.string()
                .min(8, '最短8位密码')
                .max(16, '最长16位密码')
                .required('请确认密码'),
              email: Yup.string()
                .email('请输入正确的邮箱地址')
                .required('请填写邮箱'),
              captcha: Yup.string().required('请填写验证码'),
            })}
            onSubmit={async (values: FormValues, actions) => {
              const { username, password, email, captcha } = values as any
              const params = {
                username: username,
                password,
                email,
                captchaId,
                captchaCode: captcha,
              }
              const user = await AuthProvider.register(params)
              setUser(user)
              toast({
                title: '注册成功',
                status: 'success',
                position: 'top',
              })
              router.replace('/')
            }}
          >
            {(formProps: FormikProps<any>) => (
              <Form>
                <Heading
                  size="sm"
                  borderBottom="1px"
                  borderColor="gray.200"
                  pb={'2'}
                  mb={'2'}
                >
                  注册
                </Heading>
                <Field name="username">
                  {({ field, form }) => (
                    <FormControl>
                      <FormLabel htmlFor="username">昵称</FormLabel>
                      <Input {...field} id="username" type="text" />
                      {form.errors.username ? (
                        <Text color="red.600" py={2}>
                          {form.errors.username}
                        </Text>
                      ) : null}
                    </FormControl>
                  )}
                </Field>
                <Field name="email">
                  {({ field, form }) => {
                    return (
                      <FormControl>
                        <FormLabel htmlFor="email">邮箱</FormLabel>
                        <Input {...field} id="email" type="email" />
                        {form.errors.email ? (
                          <Text color="red.600" py={2}>
                            {form.errors.email}
                          </Text>
                        ) : null}
                      </FormControl>
                    )
                  }}
                </Field>
                <Field name="password">
                  {({ field, form }) => (
                    <FormControl>
                      <FormLabel htmlFor="password">密码</FormLabel>
                      <Input {...field} id="password" type="password" />
                      {form.errors.password ? (
                        <Text color="red.600" py={2}>
                          {form.errors.password}
                        </Text>
                      ) : null}
                    </FormControl>
                  )}
                </Field>
                <Field name="confirmPassword">
                  {({ field, form }) => (
                    <FormControl>
                      <FormLabel htmlFor="confirmPassword">确认密码</FormLabel>
                      <Input {...field} id="confirmPassword" type="password" />
                      {form.errors.confirmPassword ? (
                        <Text color="red.600" py={2}>
                          {form.errors.confirmPassword}
                        </Text>
                      ) : null}
                    </FormControl>
                  )}
                </Field>
                <Field name="captcha">
                  {({ field, form }) => (
                    <FormControl>
                      <FormLabel htmlFor="captcha">验证码</FormLabel>
                      <HStack>
                        <Input {...field} type="text" id="captcha" />
                        <Image
                          w="100px"
                          h="40px"
                          src={captchaUrl}
                          onClick={getCaptcha}
                          alt="captcha"
                        ></Image>
                      </HStack>
                      {form.errors.captcha ? (
                        <Text color="red.600" py={2}>
                          {form.errors.captcha}
                        </Text>
                      ) : null}
                    </FormControl>
                  )}
                </Field>
                <Stack
                  spacing={10}
                  direction={{ base: 'row' }}
                  align="center"
                  py={4}
                >
                  <Button
                    bg={'green.400'}
                    color={'white'}
                    _hover={{
                      bg: 'green.500',
                    }}
                    isLoading={formProps.isSubmitting}
                    type="submit"
                  >
                    注册
                  </Button>
                  <Link as={NextLink} href="/signin">
                    {'已有帐号？前往登录>>'}
                  </Link>
                </Stack>
                <Stack direction="column">
                  <Stack direction="row" align="center">
                    <Divider orientation="horizontal" />
                    <Text flexShrink={0} fontSize="xs" color="gray.500">
                      第三方登录
                    </Text>
                    <Divider orientation="horizontal" />
                  </Stack>
                  <Stack direction="row" justify="center">
                    <Button
                      bg="black"
                      color="white"
                      leftIcon={<AiOutlineGithub></AiOutlineGithub>}
                      onClick={loginWithGithub}
                    >
                      Github登录
                    </Button>
                    {/* <Button
                      bg="blue.500"
                      color="white"
                      leftIcon={<AiOutlineQq></AiOutlineQq>}
                    >
                      QQ登录
                    </Button> */}
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Box>
    </Stack>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  }
}

export default Category
