import { httpProvider } from "./http";

export class CategoryProvider {
    /**
   * 获取所有分类
   */
  static async list(): Promise<[ICategory[], number]> {
    return httpProvider.post('/category/list');
  }
}