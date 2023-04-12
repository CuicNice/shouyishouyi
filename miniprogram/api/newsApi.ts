// 新闻部分的接口请求
import { Result } from "../common/Result";
import { Consts } from "../Consts";
import HttpUtils from "../utils/request";
import Utils from '../utils/util';
// 分页的请求参数
import {outnewsListItem,innernewsListItem} from "../pages/news/newsList/list";
import {newsKeyWordsItem} from "../pages/news/newsSearch/search";
const request = HttpUtils.getInstance();
const baseUrl = Utils.getBaseUrl();
const apiList = {
  // 新闻列表内网
  // http://www.fmin-courses.com:9527/api/v1/sy/mini/innews/listInNews
  getInnerNewsListitemUrl: baseUrl + '/api/v1/sy/mini/innews/listInNews',
  // 新闻列表外网
  // http://www.fmin-courses.com:9527/api/v1/sy/mini/outnews/listMiniOutNews
  getOutNewsListitemUrl:baseUrl + '/api/v1/sy/mini/outnews/listMiniOutNews',
  // http://www.fmin-courses.com:9527/api/v1/sy/mini/innews/getNewsByTitle
  getPublicDesItemUrl: baseUrl + '/api/v1/sy/mini/innews/getNewsByTitle',
  // 根据ID获取新闻
  // http://www.fmin-courses.com:9527/api/v1/sy/mini/innews/getInNewsById
  getDevDesItemUrl: baseUrl + '/api/v1/sy/mini/innews/getInNewsById',
  // 模糊查询
  // https://www.fmin-courses.com/api/v1/sy/mini/innews/listNewsByTitle
  getNewsByKeyWordsUrl:baseUrl+'/api/v1/sy/mini/innews/listNewsByTitle',
  // 获取根据新闻的url新闻详情
  // http://www.fmin-courses.com:9527/api/v1/sy/mini/innews/getNewsById
  getNewsDetailByID:baseUrl+'/api/v1/sy/mini/innews/getNewsById'
  
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
// 模糊查询,只需要输入关键字,由于请求的类型默认参数为json，所以需要再加一行
export const getNewsByKeyWords = async (newsKeyWordsItem:any) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 倒计时查询成功 </h1>");
  } else {
    return await request.get(apiList.getNewsByKeyWordsUrl,newsKeyWordsItem,"application/x-www-form-urlencoded");
  }
}
// 通过查询新闻详情
export const getNewsDetailByID = async (newsIDItem:any) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 倒计时查询成功 </h1>");
  } else {
    return await request.get(apiList.getNewsDetailByID,newsIDItem,"application/x-www-form-urlencoded");
  }
}
// post请求函数
// return this.request("POST", url, data, formType, headers);