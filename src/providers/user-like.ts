import { httpProvider } from './http'

interface LikeParams {
  entityId: string
  status: 0 | 1
}

export class UserLikeProvide {
  /**
   * 获取所有帖子
   */
  static async doLikeTopic(params: LikeParams): Promise<any> {
    return httpProvider.post('/userLike/topic', params)
  }

  static async doLikeComment(params: LikeParams): Promise<any> {
    return httpProvider.post('/userLike/comment', params)
  }
}
