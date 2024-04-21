import { httpProvider } from "./http";

export class NotificationProvider {
    /**
   * 获取所有分类
   */
  static async list(params: {pageNum: number; pageSize: number;}): Promise<PagerList<Notification>> {
    return httpProvider.post('/event/findUserEvents', params);
  }

  static async read(id: string): Promise<any> {
    return httpProvider.post('/event/read',{id});
  }
}