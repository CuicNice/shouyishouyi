import { Result } from "../common/Result";
import { Consts } from "../Consts";
import HttpUtils from "../utils/request";
import { AllScheduleItem } from '../pages/widgets/allSchedule/allSchedulePage/allSchedulePage';

const request = HttpUtils.getInstance();
const apiList = {
  // post /front/blog/page（前台接口需要登录）
  getAllClasses: 'https://syj.kkya.xyz/shouyijia/api/v2/user/getClassList',
  getAllSchedule: 'https://syj.kkya.xyz/shouyijia/api/v2/user/getAllTable',
}

// 获取班级
export const getAllClasses = async (AllScheduleForm: AllScheduleItem) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 你好 世界 </h1>");
  } else {
    return await request.post(apiList.getAllClasses, AllScheduleForm);
  }
}
// 获取课程
export const getAllSchedule = async (AllScheduleForm: AllScheduleItem) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 你好 世界 </h1>");
  } else {
    return await request.post(apiList.getAllSchedule, AllScheduleForm);
  }
}