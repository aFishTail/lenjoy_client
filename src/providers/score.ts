import { httpProvider } from "./http";

export class ScoreProvider {
    /**
   * 获取积分排行榜
   */
  static async rank(): Promise<[IUserScore[], number]> {
    return httpProvider.post('/score/rank');
  }
}