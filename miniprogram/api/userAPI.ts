import { Result } from "../common/Result";
import { Consts } from "../Consts";
import HttpUtils from "../utils/request";
import Utils from '../utils/util';

const request = HttpUtils.getInstance();
const baseUrl = Utils.getBaseUrl();
const apiList = {
  // post /front/blog/page（前台接口需要登录）
  loginUrl: baseUrl + '/api/v1/craw/user/userInfo'
}
// http://www.fmin-courses.com:9527
// 获取coundown数据
export const loginApi =  async(loginItem:any) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 倒计时查询成功 </h1>");
  } else {
    return  await request.post(apiList.loginUrl,loginItem);
  }
}