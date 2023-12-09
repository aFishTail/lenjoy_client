import { GlobalContext } from '@/context/global'
import { UserProvider } from '@/providers/user'
import storage from '@/utils/storage'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { Field, Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/router'
import { FC, useCallback, useContext } from 'react'
import * as Yup from 'yup'

interface FormValues {
  oldPassword?: string
  newPassword?: string
  confirmPassword?: string
}

interface IProps {
  closeModal: () => void
}

const UpdateInfo: FC<IProps> = ({ closeModal }) => {
  const router = useRouter()
  const successToast = useToast({position: 'top', status: 'success'})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, setUser } = useContext(GlobalContext)
  const initialValues: FormValues = {
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }
  const validationSchema = Yup.object({
          oldPassword: Yup.string().required('旧密码不能为空'),
          newPassword: Yup.string().required('新密码不能为空'),
          confirmPassword: Yup.string().required('确认密码不能为空'),
        })
  const handleSubmit = useCallback(
    async (values: FormValues) => {
      const {  oldPassword, newPassword, confirmPassword } = values
        const params = {
          oldPassword: oldPassword!,
          newPassword: newPassword!,
        }
        const user = await UserProvider.changePassword(params)
        setUser(user)
        successToast({
          title: '密码重置成功， 请重新登录',
        })
        storage.clearAll()
        setUser(null)
        router.replace('/signin')
      closeModal()
    },
    [closeModal]
  )
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {(formProps: FormikProps<any>) => (
        <Form>
              <Field name="oldPassword">
                {({ field, form }) => (
                  <FormControl display="flex" py={4} isInvalid={form.errors.oldPassword}>
                    <FormLabel w={24} textAlign="right" flexShrink={0}>
                      旧密码
                    </FormLabel>
                    <Box>
                      <Input {...field} type="password" />
                      <FormErrorMessage>{form.errors.oldPassword}</FormErrorMessage>
                    </Box>
                  </FormControl>
                )}
              </Field>
              <Field name="newPassword">
                {({ field, form }) => (
                  <FormControl display="flex" py={4} isInvalid={form.errors.newPassword}>
                    <FormLabel w={24} textAlign="right" flexShrink={0}>
                      新密码
                    </FormLabel>
                    <Box>
                    <Input {...field} type="password" />
                    <FormErrorMessage>{form.errors.newPassword}</FormErrorMessage>
                    </Box>
                  </FormControl>
                )}
              </Field>
              <Field name="confirmPassword">
                {({ field, form }) => (
                  <FormControl display="flex" py={4} isInvalid={form.errors.confirmPassword}>
                    <FormLabel w={24} textAlign="right" flexShrink={0}>
                      确认密码
                    </FormLabel>
                    <Box>
                    <Input {...field} type="password" />
                    <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                    </Box>
                  </FormControl>
                )}
              </Field>
          <Button
            ml={24}
            bg={'green.400'}
            color={'white'}
            _hover={{
              bg: 'green.500',
            }}
            isLoading={formProps.isSubmitting}
            type="submit"
          >
            确认
          </Button>
        </Form>
      )}
    </Formik>
  )
}
export default UpdateInfo
