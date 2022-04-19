import { httpProvider } from './http'

interface IGetCaptcha {
  id: string
  imgUrl: string
}

export class CaptchaProvider {
  /**
   * 获取验证码
   */
  static async get(): Promise<IGetCaptcha> {
    return httpProvider.post('/captcha/get')
  }

  /**
   * 查看验证码
   */
  static async show(): Promise<any> {
    return httpProvider.post('/captcha/show')
  }
  /**
   * 查看验证码
   */
  static async verify(): Promise<unknown> {
    return httpProvider.post('/captcha/verify')
  }
}
