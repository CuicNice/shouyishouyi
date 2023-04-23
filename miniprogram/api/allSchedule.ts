import { Result } from "../common/Result";
import { Consts } from "../Consts";
import HttpUtils from "../utils/request";
import Utils from '../utils/util';
const request = HttpUtils.getInstance();
const baseUrl = Utils.getBaseUrl();
const apiList = {
  // post /front/blog/page（前台接口需要登录）
  getAllClasses: baseUrl + '/api/v1/craw/user/classList',
  getAllSchedule: baseUrl + '/api/v1/craw/user/allTable',
}

// 获取班级
export const getAllClasses = async (AllScheduleForm: any) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 你好 世界 </h1>");
  } else {
    return await request.post(apiList.getAllClasses, AllScheduleForm);
  }
}
// 获取课程
export const getAllSchedule = async (AllScheduleForm: any) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 你好 世界 </h1>");
  } else {
    return await request.post(apiList.getAllSchedule, AllScheduleForm);
  }
}