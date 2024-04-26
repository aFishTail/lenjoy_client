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
  Flex,
  Switch,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import { FC, useContext, useState } from "react";
import { GlobalContext } from "@/context/global";
import { RewardProvider } from "@/providers/reward";
import { useRouter } from "next/router";
import * as Yup from "yup";

type FormValues = Pick<IReward, "title" | "isPublic" | "score" | "content"> & {
  categoryId: string;
};

interface IProps {
  id?: string;
  reward?: IReward;
}

const RewardEditor: FC<IProps> = ({ id, reward }) => {
  const [content, setContent] = useState(reward?.content);
  const mode: IComponentMode = id ? "update" : "create";
  const { categories } = useContext(GlobalContext);

  const toast = useToast();
  const router = useRouter();

  const handleContentChange = (content: string) => {
    setContent(content);
  };

  return (
    <Box py="4" px="96">
      <Formik
        initialValues={{
          title: (reward?.title as string) || "",
          content: reward?.content || "",
          isPublic: reward?.isPublic ?? true,
          score: reward?.score || null,
          categoryId: reward?.category?.id || "",
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(50, "最长50个字符")
            .required("请填写帖子标题"),
          categoryId: Yup.string().required("请选择类型"),
          score: Yup.number().required("请输入悬赏积分"),
          code: Yup.string().max(10, "最长不应该超过10位"),
        })}
        onSubmit={async (values: FormValues, actions) => {
          const { title, isPublic, score, categoryId } = values;
          const params = {
            id,
            title,
            isPublic,
            score,
            categoryId,
            content,
          };
          if (mode === "create") {
            await RewardProvider.create(params);
            toast({
              title: "新增成功",
              status: "success",
              position: "top",
            });
          } else {
            await RewardProvider.update(params);
            toast({
              title: "修改成功",
              status: "success",
              position: "top",
            });
          }
          router.replace("/");
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
            <Flex>
              <Field name="isPublic">
                {({ field }) => (
                  <FormControl
                    display="flex"
                    alignItems="center"
                    w="150px"
                    mr={4}
                  >
                    <FormLabel>公开悬赏</FormLabel>
                    <Switch
                      colorScheme="teal"
                      id="isPublic"
                      {...field}
                      isChecked={field.value}
                    />
                  </FormControl>
                )}
              </Field>

              <Field name="score">
                {({ field, form }) => (
                  <FormControl>
                    <Input
                      {...field}
                      id="score"
                      type="number"
                      my="4"
                      placeholder="请输入悬赏积分"
                    />
                    {form.errors.score && form.touched.score ? (
                      <Text color="red.600" py={2}>
                        {form.errors.score}
                      </Text>
                    ) : null}
                  </FormControl>
                )}
              </Field>
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
              defaultContent={reward?.content as string}
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
              {mode === "create" ? "发布悬赏" : "更新悬赏"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default RewardEditor;
