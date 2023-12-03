import { AxiosRequestConfig } from "axios";
import { httpProvider } from "./http";

export class RewardProvider {
    /**
   * 获取所有帖子
   */
  static async list(params: any): Promise<PagerList<IReward>> {
    if(params.categoryLabel === 'all') {
      params.categoryLabel = ''
    }
    return httpProvider.post('/reward/query', params);
  }

  static async create(params: any): Promise<any> {
    return httpProvider.post('/reward/create', params);
  }

  static async update(params: any): Promise<any> {
    return httpProvider.post('/reward/update', params);
  }

  static async detail(params: {id: string}, config: AxiosRequestConfig = {}): Promise<IReward> {
    return httpProvider.post('/reward/detail', params, config);
  }

  static async remove(params: {id: string}): Promise<IReward> {
    return httpProvider.post('/reward/delete', params);
  }

  static async confirmRewardAnswer(params:{rewardId: string, rewardAnswerId: string} ): Promise<any> {
    return httpProvider.post('/reward/confirm', params);
  }

  static async addComment(params: {rewardId: string, content: string}): Promise<any> {
    return httpProvider.post('/rewardAnswer/create', params);
  }

  static async getCommentList(params:{rewardId: string, pageNum: number, pageSize: number} ): Promise<any> {
    return httpProvider.post('/rewardAnswer/query', params);
  }
}