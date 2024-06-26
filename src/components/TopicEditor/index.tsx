import { NextPage } from "next";
import IEditor from "@/components/Editor/index";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import {
  createContext,
  createRef,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { GlobalContext } from "@/context/global";
import { topicEditorContent } from "@/context/topic";
import { TopicProvider } from "@/providers/topic";
import { useRouter } from "next/router";
import { trimText } from "@/utils/dom";
import * as Yup from "yup";

interface FormValues {
  title: string;
  categoryId: string;
}

interface IProps {
  id?: string;
  topic?: ITopic;
}

const TopicEditor: FC<IProps> = ({ id, topic }) => {
  const [content, setContent] = useState(topic?.content);
  const mode: IComponentMode = id ? "update" : "create";
  const { categories } = useContext(GlobalContext);

  const toast = useToast();
  const router = useRouter();

  const handleContentChange = (content: string) => {
    setContent(content);
  };

  return (
    <Box my="4" mx={{ base: 4, md: 96 }} px={4} bg={"white"} borderRadius={4}>
      <Formik
        initialValues={{
          title: topic?.title as string,
          categoryId: topic?.category?.id as string,
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(50, "最长50个字符")
            .required("请填写帖子标题"),
          categoryId: Yup.string().required("请选择类型"),
        })}
        onSubmit={async (values: FormValues, actions) => {
          const { title, categoryId } = values;
          const summary = trimText(content!);
          const params = {
            id,
            title,
            categoryId,
            content,
            summary,
          };
          if (mode === "create") {
            await TopicProvider.create(params);
            toast({
              title: "新增成功",
              status: "success",
              position: "top",
            });
          } else {
            await TopicProvider.update(params);
            toast({
              title: "修改成功",
              status: "success",
              position: "top",
            });
          }
          router.replace("/topic");
        }}
      >
        {(formProps: FormikProps<any>) => (
          <Form>
            <Field name="title">
              {({ field, form }) => (
                <FormControl>
                  <Input
                    {...field}
                    id="title"
                    type="text"
                    my="4"
                    placeholder="请输入标题"
                  />
                  {form.errors.title && form.touched.title ? (
                    <Text color="red.600" py={2}>
                      {form.errors.title}
                    </Text>
                  ) : null}
                </FormControl>
              )}
            </Field>
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
              defaultContent={topic?.content as string}
              onChange={handleContentChange}
            ></IEditor>
            <Button
              bg={"green.400"}
              color={"white"}
              _hover={{
                bg: "green.500",
              }}
              isLoading={formProps.isSubmitting}
              type="submit"
              my={"4"}
            >
              {mode === "create" ? "发布话题" : "编辑话题"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
    // </topicEditorContent.Provider>
  );
};
export default TopicEditor;
