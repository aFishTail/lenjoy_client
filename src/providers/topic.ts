import { httpProvider } from "./http";

export class TopicProvider {
    /**
   * 获取所有帖子
   */
  static async list(params: any): Promise<PagerList<ITopic>> {
    return httpProvider.post('/topic/list', params);
  }
}