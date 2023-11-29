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
}
