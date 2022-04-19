import { httpProvider } from "./http";

export class TopicProvider {
    /**
   * 获取所有帖子
   */
  static async list(params: any): Promise<[IArticle[], number]> {
    return httpProvider.post('/topic/list', params);
  }
}