// 版本生命接口请求
import { Result } from "../common/Result";
import { Consts } from "../Consts";
import HttpUtils from "../utils/request";
import Utils from '../utils/util';
// 分页的请求参数
import {versionStatementItem,souyiDevItem} from "../pages/widgets/versionStatement/versionStatementPage/versionStatementPage";
const request = HttpUtils.getInstance();
const baseUrl = Utils.getBaseUrl();
const apiList = {
  // 版本
  // http://www.fmin-courses.com:9527/api/v1/sy/mini/version/getAllVersions
  getVersionDesItemUrl: baseUrl + '/api/v1/sy/mini/version/getAllVersions',
  // 小程序声明
  // http://www.fmin-courses.com:9527/api/v1/sy/mini/miniStatement/appletMiniStatementByTime

  getPublicDesItemUrl: baseUrl + '/api/v1/sy/mini/miniStatement/appletMiniStatementByTime',
  // 开发者
  // http://www.fmin-courses.com:9527/api/v1/sy/mini/development/appletDeveloperList
  getDevDesItemUrl: 'http://www.fmin-courses.com:9527/api/v1/sy/mini/development/appletDeveloperList',
}
// http://www.fmin-courses.com:9527
// 版本
export const getVersionDesItem = async (VersionDesForm:versionStatementItem) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 倒计时查询成功 </h1>");
  } else {
    return await request.post(apiList.getVersionDesItemUrl,VersionDesForm);
  }
}
// 声明
export const getPublicDesItem = async () => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 倒计时查询成功 </h1>");
  } else {
    return await request.post(apiList.getPublicDesItemUrl);
  }
}
// 开发

export const getDevDesItem = async (souyiDevItemsForm:souyiDevItem) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 倒计时查询成功 </h1>");
  } else {
    // console.log(souyiDevItemsForm)
    return await request.post(apiList.getDevDesItemUrl,souyiDevItemsForm);
  }
}