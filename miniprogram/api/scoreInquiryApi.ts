import { Result } from "../common/Result";
import { Consts } from "../Consts";
import HttpUtils from "../utils/request";
import Utils from '../utils/util';
import {ScoreInquiryeItem} from '../pages/widgets/scoreInquiry/scoreInquiryPage/scoreInquiryPage';
import {ScoreCompontItem} from '../pages/widgets/scoreInquiry/textScoreComponet/textCompont';

const request = HttpUtils.getInstance();
const baseUrl = Utils.getBaseUrl();
const apiList = {
  // post /front/blog/page（前台接口需要登录）
  getUserInfo: baseUrl + '/api/v1/craw/user/userInfo',
  getScoreInfo:baseUrl + '/api/v1/craw/user/userScore',
  getScoreDetail:baseUrl + '/api/v1/craw/user/scoreDetail',
  widgetScore:baseUrl + '/api/v1/craw/user/userScore',
}

// 获取用户信息
export const getUserInfo = async (ScoreInquiryeForm: ScoreInquiryeItem) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 你好 世界 </h1>");
  } else {
    return await request.post(apiList.getUserInfo,ScoreInquiryeForm);
  }
}
//获取成绩列表
export const widgetScore = async (ScoreInquiryeForm: ScoreCompontItem) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 你好 世界 </h1>");
  } else {
    return await request.post(apiList.getScoreInfo,ScoreInquiryeForm);
  }
}
//获取组件成绩
export const getScoreInfo = async (ScoreInquiryeForm: ScoreInquiryeItem) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 你好 世界 </h1>");
  } else {
    return await request.post(apiList.getScoreInfo,ScoreInquiryeForm);
  }
}
//获取成绩详情
export const getScoreDetail = async (ScoreInquiryeForm: ScoreInquiryeItem) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 你好 世界 </h1>");
  } else {
    return await request.post(apiList.getScoreDetail,ScoreInquiryeForm);
  }
}