import { PAGE_SIZE } from "@/common/constant";
import { CommentProvider } from "@/providers/comment";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  Textarea,
  useToast,
  Card,
  CardBody
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CommentList } from "./commentList";
import { RewardProvider } from "@/providers/reward";

interface IProps {
  user: IUser;
  reward: IReward;
}

export const RewardComment: React.FC<IProps> = ({ user, reward }) => {
  const router = useRouter();
  const toast = useToast();
  const [commentValue, setCommentValue] = useState<string>("");

  const handleInputChange = useCallback((e) => {
    setCommentValue(e.target.value);
  }, []);

  const handleLogin = useCallback(() => {
    router.push("/signin");
  }, []);

  const handleSubmit = async () => {
    if (!commentValue) {
      toast({
        status: "warning",
        title: "请先输入评论内容",
        position: "top",
      });
      return;
    }
    const params = {
      rewardId: reward.id,
      content: commentValue,
    };
    await RewardProvider.addComment(params);
    toast({
      title: "发表成功",
      status: "success",
      position: "top",
    });
    setCommentValue([] as any);
    getList();
  };

  const [commentList, setCommentList] = useState<IRewardAnswer[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false)
  const hasMore = useMemo(() => pageNum * PAGE_SIZE < total, [pageNum, total]);
  const isOwnReward = useMemo(() => reward.user.id === user?.id, [reward, user])
  const notShowCommentList = useMemo(() => !reward.isPublic && !isOwnReward, [reward, isOwnReward])
  const getList = useCallback(async () => {
    setLoading(true)
    const params = {
      pageNum,
      pageSize: PAGE_SIZE,
      rewardId: reward.id,
    };
    const res = await RewardProvider.getCommentList(params);
    setLoading(false)
    setCommentList([...commentList, ...res.records]);
    setTotal(res.total);
  }, [reward.id, pageNum]);

  useEffect(() => {
    if(notShowCommentList) return
    getList();
  }, [getList]);

  const handleLoadMore = () => {
    setPageNum(pageNum + 1);
  };

  if(notShowCommentList) {
    return <Card>
    <CardBody>
      <Text>非公开悬赏，评论不可见</Text>
    </CardBody>
  </Card>
  }

  return (
    <Box bg={"white"} pt={4} px={2}>
      <Text mb={2} fontSize={"sm"}>
        {total} 条评论
      </Text>
      {!user ? (
        <HStack borderColor={"gray.200"} border="1px" color={"gray.300"} px={4}>
          <Text>请</Text>
          <Button variant={"ghost"} colorScheme="teal" onClick={handleLogin}>
            登录
          </Button>
          <Text>后发表观点</Text>
        </HStack>
      ) : (
        <Box my={2}>
          <Textarea
            value={commentValue}
            onChange={handleInputChange}
          ></Textarea>
          <Flex justifyContent={"flex-end"} py={2}>
            <Button colorScheme={"teal"} size={"sm"} onClick={handleSubmit}>
              发布
            </Button>
          </Flex>
          <Divider></Divider>
        </Box>
      )}

      <CommentList reward={reward} list={commentList}></CommentList>
      {total > 0 && (
        <Flex justifyContent={"center"} py={2}>
          <Button
            onClick={handleLoadMore}
            disabled={!hasMore}
            colorScheme="teal"
            size={"sm"}
            w={24}
          >
            {/* TODO:需要添加加载中功能 */}
            {loading ? '加载中...' : hasMore ? "加载更多" : "到底啦"}
            {}
          </Button>
        </Flex>
      )}
    </Box>
  );
};
