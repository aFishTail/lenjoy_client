import { httpProvider } from "./http";

export class ResourceProvider {
    /**
   * 获取所有帖子
   */
  static async list(params: any, config = {}): Promise<PagerList<IResource>> {
    if(params.categoryLabel === 'all') {
      params.categoryLabel = ''
    }
    return httpProvider.post('/resource/query', params, config);
  }

  static async listFindOne(params: {id: string}): Promise<ITopic> {
    return httpProvider.post('/resource/query/findOne', params);
  }

  static async create(params: any): Promise<any> {
    return httpProvider.post('/resource/create', params);
  }

  static async update(params: any): Promise<any> {
    return httpProvider.post('/resource/update', params);
  }

  static async detail(params: {id: string}, config = {}): Promise<IResource> {
        return httpProvider.post('/resource/detail', params, config);
  }

  static async remove(params: {id: string}): Promise<IResource> {
    return httpProvider.post('/resource/delete', params);
  }

  static async pay(id: string): Promise<IResource> {
    return httpProvider.post('/resource/pay', {id});
  }

  static async viewResourceUrl(id: string): Promise<Pick<IResource, 'url' | 'code'>> {
    return httpProvider.post('/resource/viewResourceUrl', {id});
  }
}