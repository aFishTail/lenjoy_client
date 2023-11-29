import { httpProvider } from './http'

interface IGetCaptcha {
  id: string
  imgUrl: string
}

export class FileProvider {
  static async uploadArticleImage(formData: any): Promise<{url: string}> {
    return httpProvider.post('/file/upload/img/article', formData)
  }

  static async uploadAvatar(formData: any): Promise<{url: string}> {
    return httpProvider.post('/file/upload/img/avatar', formData)
  }
}
