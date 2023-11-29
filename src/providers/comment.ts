import { httpProvider } from './http'

export class CommentProvider {
  /**
   * 获取所有帖子
   */
  static async addComment(params: {
    entityId: string
    entityType: IEntityType
    content: string
  }) {
    return httpProvider.post('/comment/add', params)
  }

  static async getCommentList(params: {
    pageNum: number,
      pageSize: number,
      entityId: string,
      entityType: IEntityType,
  }): Promise<PagerList<IComment>> {
    return httpProvider.post('comment/list', params)
  }
}
