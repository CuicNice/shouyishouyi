import { Result } from "../common/Result";
import { Consts } from "../Consts";
import HttpUtils from "../utils/request";
import Utils from '../utils/util';

const request = HttpUtils.getInstance();
const baseUrl = Utils.getBaseUrl();
const apiList = {
  // post /front/blog/page（前台接口需要登录）
  addCountDownItemUrl: baseUrl + '/api/v1/tools/mini/countdown/get'
}
// http://www.fmin-courses.com:9527
// 获取coundown数据
export const getCountDownItem =  () => {
  if (Consts.DEBUG) {
    console.log("成功",Consts.DEBUG)
    return Result.mockSuccess("<h1> 倒计时查询成功 </h1>");
  } else {
    return  request.get(apiList.addCountDownItemUrl);
  }
}