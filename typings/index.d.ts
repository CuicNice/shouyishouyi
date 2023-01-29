/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    baseUrl: string,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}


declare namespace ApiService {
  interface IResult {
    code: number,
    msg: string,
    <T = any> (data: T): Promise<T>
  }
}

interface IResult<T> {
  code: number,
  msg: string
  data?: T
}