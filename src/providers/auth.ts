import { httpProvider } from './http'

interface RegisterParams {
  username: string
  email: string
  password: string
  captchaId: string
  captchaCode: string
}
interface LoginParams {
  username: string
  password: string
  captchaId: string
  captchaCode: string
}

export class AuthProvider {
  /**
   * 获取所有帖子
   */
  static async loginWithGithub(code: string): Promise<IUser> {
    return httpProvider.post('/auth/loginWithGithub', { code })
  }

  static async register(params: RegisterParams): Promise<IUser> {
    return httpProvider.post('/auth/register', params)
  }
  static async login(params: LoginParams): Promise<IUser> {
    return httpProvider.post('/api/auth/login', params, {baseURL: '/'})
  }

  static async logout(): Promise<IUser> {
    return httpProvider.post('/api/auth/logout', {},{baseURL: '/'})
  }
}
