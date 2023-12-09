import { httpProvider } from './http'

export class UserProvider {
  
  static async updateBasicInfo(data: {
    avatar?: string
    nickname?: string
    description?: string
    email?: string
  }): Promise<IUser> {
    return httpProvider.post('/user/update/basic', data)
  }

  static async changePassword(data: {
    oldPassword: string
    newPassword: string
  }): Promise<IUser> {
    return httpProvider.post('/user/updatePassword', data)
  }

  static async getIsEmailVerified(): Promise<IUser> {
    return httpProvider.post('/user/getIsEmailVerified')
  }

  static async sendVerifyEmail(): Promise<IUser> {
    return httpProvider.post('/email/sendVerifyEmail')
  }

  static async getDailySignIn(): Promise<boolean> {
    return httpProvider.post('/user/getDailySignIn')
  }

  static async dailySignIn(): Promise<IUser> {
    return httpProvider.post('/user/dailySignIn')
  }
}
