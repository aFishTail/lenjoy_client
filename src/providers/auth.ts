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
    return httpProvider.post('/api/auth/loginWithGithub', { code }, {baseURL: '/'})
  }

  static async register(params: RegisterParams): Promise<IUser> {
    return httpProvider.post('/api/auth/register', params, {baseURL: '/'})
  }
  static async login(params: LoginParams): Promise<IUser> {
    return httpProvider.post('/api/auth/login', params, { baseURL: '/' })
  }

  static async logout(): Promise<IUser> {
    return httpProvider.post('/api/auth/logout', {}, { baseURL: '/' })
  }

  static async getUserInfo(): Promise<IUser> {
    return httpProvider.post('/auth/userInfo')
  }
}
