import IEditor from '@/components/Editor'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
  Flex,
  Switch,
  HStack,
} from '@chakra-ui/react'
import { Field, Form, Formik, FormikProps } from 'formik'
import {
  FC,
  useContext,
  useState,
} from 'react'
import { GlobalContext } from '@/context/global'
import { ResourceProvider } from '@/providers/resource'
import { useRouter } from 'next/router'
import * as Yup from 'yup'

type FormValues = Pick<
  IResource,
  'name' | 'url' | 'code' | 'isPublic' | 'score' | 'content'
> & { categoryId: string }

interface IProps {
  id?: string
  resource?: IResource
}

const ResourceEditor: FC<IProps> = ({ id, resource }) => {
  const [content, setContent] = useState(resource?.content)
  const mode: IComponentMode = id ? 'update' : 'create'
  const { categories } = useContext(GlobalContext)

  const toast = useToast()
  const router = useRouter()

  const handleContentChange = (content: string) => {
    setContent(content)
  }

  return (
    <Box py="4" px="96">
      <Formik
        initialValues={{
          name: (resource?.name as string) || '',
          url: resource?.url || '',
          code: resource?.code || '',
          isPublic: resource?.isPublic ?? true,
          score: resource?.score,
          categoryId: resource?.category?.id || '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().max(30, '最长30个字符').required('请填写帖子标题'),
          url: Yup.string().required('请填写资源链接'),
          categoryId: Yup.string().required('请选择类型'),
          code: Yup.string().max(10, '最长不应该超过10位'),
        })}
        onSubmit={async (values: FormValues, actions) => {
          const { name, url, code, isPublic, score, categoryId } = values
          const params = {
            id,
            name,
            url,
            code,
            isPublic,
            score,
            categoryId,
            content,
          }
          if (mode === 'create') {
            await ResourceProvider.create(params)
            toast({
              title: '新增成功',
              status: 'success',
              position: 'top',
            })
          } else {
            await ResourceProvider.update(params)
            toast({
              title: '修改成功',
              status: 'success',
              position: 'top',
            })
          }
          router.replace('/')
        }}
      >
        {(formProps: FormikProps<any>) => (
          <Form>
            <Field name="name">
              {({ field, form }) => (
                <FormControl>
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    my="4"
                    placeholder="请输入名称"
                  />
                  {form.errors.name && form.touched.name ? (
                    <Text color="red.600" py={2}>
                      {form.errors.name}
                    </Text>
                  ) : null}
                </FormControl>
              )}
            </Field>
            <HStack spacing="24px">
              <Field name="url">
                {({ field, form }) => (
                  <FormControl>
                    <Input
                      {...field}
                      id="url"
                      type="text"
                      my="4"
                      placeholder="请输入资源链接"
                    />
                    {form.errors.url && form.touched.url ? (
                      <Text color="red.600" py={2}>
                        {form.errors.url}
                      </Text>
                    ) : null}
                  </FormControl>
                )}
              </Field>
              <Field name="code">
                {({ field, form }) => (
                  <FormControl>
                    <Input
                      {...field}
                      id="code"
                      type="text"
                      my="4"
                      placeholder="请输入链接密码"
                    />
                    {form.errors.code && form.touched.code ? (
                      <Text color="red.600" py={2}>
                        {form.errors.code}
                      </Text>
                    ) : null}
                  </FormControl>
                )}
              </Field>
            </HStack>
            <Flex>
              <Field name="isPublic">
                {({ field }) => (
                  <FormControl
                    display="flex"
                    alignItems="center"
                    w="150px"
                    mr={4}
                  >
                    <FormLabel>免费资源</FormLabel>
                    <Switch
                      colorScheme="teal"
                      id="isPublic"
                      {...field}
                      isChecked={field.value}
                    />
                  </FormControl>
                )}
              </Field>
              {!formProps.values.isPublic && (
                <Field name="score" validate={value => {
                  if(formProps.values.isPublic) return
                  return value ? false : '请输入查看资源所需的积分' 
                }}>
                  {({ field, form }) => (
                    <FormControl>
                      <Input
                        {...field}
                        id="score"
                        type="number"
                        my="4"
                        placeholder="请输入查看资源所需积分"
                      />
                      {form.errors.score && form.touched.score ? (
                        <Text color="red.600" py={2}>
                          {form.errors.score}
                        </Text>
                      ) : null}
                    </FormControl>
                  )}
                </Field>
              )}
            </Flex>
            <Field name="categoryId">
              {({ field, form }) => (
                <FormControl>
                  <Select
                    {...field}
                    id="categoryId"
                    my="4"
                    placeholder="请选择类型"
                  >
                    {categories.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                  </Select>
                  {form.errors.categoryId && form.touched.categoryId ? (
                    <Text color="red.600" py={2}>
                      {form.errors.categoryId}
                    </Text>
                  ) : null}
                </FormControl>
              )}
            </Field>
            <IEditor
              defaultContent={resource?.content as string}
              onChange={handleContentChange}
            ></IEditor>
            <Button
              bg={'green.400'}
              color={'white'}
              _hover={{
                bg: 'green.500',
              }}
              isLoading={formProps.isSubmitting}
              type="submit"
              my={'4'}
            >
              {mode === 'create' ? '发布资源' : '更新资源'}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}
export default ResourceEditor
