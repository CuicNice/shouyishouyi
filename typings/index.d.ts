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

// 默认 tap 事件传递
interface ITapEvent<T = any> {
  currentTarget: { dataset: T; };
}

// 分页 page 参数
interface IPage<T = any> {
  currentPage: number,
  index: number | undefined,
  pageSize: number,
  totalPage?: number,
  totalCount?: number,
  list: Array<T>,
  params?: any,
  sortColumn?: string,
  sortMethod?: string
}

// 通用 string 对象类型
interface StringReflectI {
  [key: string]: string
}