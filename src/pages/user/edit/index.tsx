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

type SettingType = 'email' | 'password'

interface FormValues {
  nickname: string
  description: string
}

const EditUser: NextPage = (props) => {
  const toast = useToast()

  const { user, setUser } = useContext(GlobalContext)

  useEffect(() => {
    setInitialFormValues({
      nickname: user?.nickname || '',
      description: user?.description || '',
    })
  }, [user])

  const [initialFormValues, setInitialFormValues] = useState<FormValues>({
    nickname: '',
    description: '',
  })
  const [avatar, setAvatar] = useState<string>(user?.avatar)

  const avatarSrc = useMemo(() => 'http://localhost:3000' + avatar, [avatar])

  const handleAvatarChange = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const { url } = await FileProvider.uploadAvatar(formData)
    setAvatar(url)
  }

  const [settingType, setSettingType] = useState<SettingType>('email')

  const handleUpdateEmail = useCallback(() => {
    setSettingType('email')
    openSettingModal()
  }, [])

  const handleUpdatePassword = useCallback(() => {
    setSettingType('password')
    openSettingModal()
  }, [])

  const { isOpen, onOpen: openSettingModal, onClose } = useDisclosure()

  return (
    <Container maxW={'container.lg'} mt={4}>
      <Tabs bg="white">
        <TabList>
          <Tab>个人资料</Tab>
          <Tab>账号设置</Tab>
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
                <Button
                  colorScheme={'blue'}
                  variant="ghost"
                  onClick={handleUpdateEmail}
                >
                  点击设置
                </Button>
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
          <ModalHeader>{settingType === 'email' ? ' 修改邮箱': '修改密码'}</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <UpdateInfo type={settingType} closeModal={onClose}></UpdateInfo>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default EditUser
