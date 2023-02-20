// 新闻部分的接口请求
// 需要使用分页查询
// {
//   "currentPage": "1",
//   "pageSize": "5"
// }
// 版本生命接口请求
import { Result } from "../common/Result";
import { Consts } from "../Consts";
import HttpUtils from "../utils/request";
import Utils from '../utils/util';
// 分页的请求参数
import {outnewsListItem,innernewsListItem} from "../pages/news/list/list";
const request = HttpUtils.getInstance();
const baseUrl = Utils.getBaseUrl();
const apiList = {
  // 新闻列表内网
  // http://www.fmin-courses.com:9527/api/v1/sy/mini/outnews/appletOutNewsList
  getInnerNewsListitemUrl: baseUrl + '/api/v1/sy/mini/outnews/appletOutNewsList',
  // 新闻列表外网
  // http://www.fmin-courses.com:9527/api/v1/sy/mini/outnews/appletOutNewsList
  getOutNewsListitemUrl:baseUrl + '/api/v1/sy/mini/outnews/appletOutNewsList',
  // http://www.fmin-courses.com:9527/api/v1/sy/mini/innews/getNewsByTitle
  getPublicDesItemUrl: baseUrl + '/api/v1/sy/mini/innews/getNewsByTitle',
  // 根据ID获取新闻
  // http://www.fmin-courses.com:9527/api/v1/sy/mini/innews/getInNewsById
  getDevDesItemUrl: baseUrl + '/api/v1/sy/mini/innews/getInNewsById',
}
// http://www.fmin-courses.com:9527
// 内网新闻list
export const getInnerNewsListitem = async (innernewsListItem:any) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 倒计时查询成功 </h1>");
  } else {
    return await request.post(apiList.getInnerNewsListitemUrl,innernewsListItem);
  }
}
// 外网新闻
export const getOutNewsListitem = async (outnewsListItem:any) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 倒计时查询成功 </h1>");
  } else {
    return await request.post(apiList.getOutNewsListitemUrl,outnewsListItem);
  }
}