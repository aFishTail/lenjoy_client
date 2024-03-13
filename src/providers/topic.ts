import { httpProvider } from "./http";

export class TopicProvider {
    /**
   * 获取所有帖子
   */
  static async list(params: any, config = {}): Promise<PagerList<ITopic>> {
    if(params.categoryLabel === 'all') {
      params.categoryLabel = ''
    }
    return httpProvider.post('/topic/list', params, config);
  }

  static async listFindOne(params: {id: string}): Promise<ITopic> {
    return httpProvider.post('/topic/list/findOne', params);
  }

  static async create(params: any): Promise<any> {
    return httpProvider.post('/topic/create', params);
  }

  static async update(params: any): Promise<any> {
    return httpProvider.post('/topic/update', params);
  }

  static async detail(params: {id: string}): Promise<ITopic> {
    return httpProvider.post('/topic/detail', params);
  }

  static async remove(params: {id: string}): Promise<ITopic> {
    return httpProvider.post('/topic/delete', params);
  }
}