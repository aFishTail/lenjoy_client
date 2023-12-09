import { TopicList } from '@/components/topicList'
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Badge,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import InfiniteScroll from 'react-infinite-scroller'
import { Field, FieldInputProps, Form, Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import FileUpload from '@/components/form/FileUpload'
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { UserProvider } from '@/providers/user'
import { FileProvider } from '@/providers/file'
import { GlobalContext } from '@/context/global'
import UpdateInfo from './components/UpdateInfo'
import { useCountDownWithCache } from '@/hooks/useCountDownWithCache'
import { UserEmailStatus } from './components/UserEmailStatus'
import { useRouter } from 'next/router'

type SettingType = 'email' | 'password'
type PageTab = 'basic' | 'setting'
const tabMap = {
  basic:0,
  setting:1,
}

interface FormValues {
  nickname: string
  description: string
}

const EditUser: NextPage = (props) => {
  const toast = useToast()
  const { user, setUser } = useContext(GlobalContext)
  const [initialFormValues, setInitialFormValues] = useState<FormValues>({
    nickname: '',
    description: '',
  })
  const [avatar, setAvatar] = useState<string>(user?.avatar)
  const avatarSrc = useMemo(() => 'http://localhost:3000' + avatar, [avatar])
  const [settingType, setSettingType] = useState<SettingType>('email')
  const handleUpdatePassword = useCallback(() => {
    setSettingType('password')
    openSettingModal()
  }, [])
  const { isOpen, onOpen: openSettingModal, onClose } = useDisclosure()
  const [tabIndex, setTabIndex] = useState<number>(0)
  const router = useRouter()
  const {tab} = router.query
  const queryTabKey = useMemo(() => router.query.tab, [router.query])

  useEffect(() => {
    console.log('tab', queryTabKey)
    setTabIndex(tabMap[queryTabKey as string])
  }, [queryTabKey])

  useEffect(() => {
    setInitialFormValues({
      nickname: user?.nickname || '',
      description: user?.description || '',
    })
  }, [user])


  const handleAvatarChange = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const { url } = await FileProvider.uploadAvatar(formData)
    setAvatar(url)
  }

  const handleGoTab = (tab: PageTab) => {
    router.push({
      pathname: '/user/edit',
      query: {
        tab
      }
    })
  }
  
  return (
    <Container maxW={'container.lg'} mt={4}>
      <Tabs bg="white" index={tabIndex}>
        <TabList>
          <Tab onClick={() => handleGoTab('basic')}>个人资料</Tab>
          <Tab onClick={() => handleGoTab('setting')}>账号设置</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box overflow="auto" h="500px">
              <Formik
                initialValues={{
                  nickname: user?.nickname,
                  description: user?.description,
                }}
                validationSchema={Yup.object({
                  nickname: Yup.string()
                    .max(15, '最长15个字符')
                    .required('请填写昵称'),
                })}
                enableReinitialize
                onSubmit={async (values: FormValues, actions) => {
                  const user = await UserProvider.updateBasicInfo({
                    avatar,
                    nickname: nickname,
                    description,
                  })
                  setUser(user)
                  toast({
                    title: '保存成功',
                    status: 'success',
                    position: 'top',
                  })
                }}
              >
                {(formProps: FormikProps<any>) => (
                  <Form>
                    <FormControl display="flex" py={4}>
                      <FormLabel
                        w={48}
                        textAlign="right"
                        flexShrink={0}
                        htmlFor="avatar"
                      >
                        头像
                      </FormLabel>
                      <FileUpload
                        avatar={avatarSrc}
                        onChange={handleAvatarChange}
                      ></FileUpload>
                    </FormControl>

                    <Field name="nickname">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.nickname}
                          display="flex"
                          py={4}
                        >
                          <FormLabel w={48} textAlign="right" flexShrink={0}>
                            昵称
                          </FormLabel>
                          <Box flex={1}>
                            <Input {...field} />
                            <FormErrorMessage>
                              {form.errors.nickname}
                            </FormErrorMessage>
                          </Box>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="description">
                      {({ field, form }) => (
                        <FormControl display="flex" py={4}>
                          <FormLabel w={48} textAlign="right" flexShrink={0}>
                            个性签名
                          </FormLabel>
                          <Input {...field} />
                        </FormControl>
                      )}
                    </Field>
                    {/* <FormControl display="flex" py={4}>
                      <FormLabel
                        w={48}
                        textAlign="right"
                        flexShrink={0}
                      ></FormLabel>
                    
                    </FormControl> */}
                    <Button
                      ml={48}
                      bg={'green.400'}
                      color={'white'}
                      _hover={{
                        bg: 'green.500',
                      }}
                      isLoading={formProps.isSubmitting}
                      type="submit"
                    >
                      保存
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box overflow="auto" h="500px">
              {/* <HStack>
                <Text as={'b'} w="24">用户名</Text>
                <Button>点击设置</Button>
              </HStack> */}
              <HStack>
                <Text as={'b'} w="24">
                  邮箱
                </Text>
                <Text>{user?.email}</Text>
                <UserEmailStatus user={user}></UserEmailStatus>
              </HStack>
              <HStack>
                <Text as={'b'} w="24">
                  密码
                </Text>
                <Button
                  colorScheme={'blue'}
                  variant="ghost"
                  onClick={handleUpdatePassword}
                >
                  点击设置
                </Button>
              </HStack>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {settingType === 'email' ? ' 修改邮箱' : '修改密码'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UpdateInfo closeModal={onClose}></UpdateInfo>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default EditUser
