import { Result } from "../common/Result";
import { Consts } from "../Consts";
import HttpUtils from "../utils/request";
import Utils from '../utils/util';
import {ClassScheduleItem} from '../pages/widgets/classSchedule/classSchedulePage/classSchedulePage';

const request = HttpUtils.getInstance();
const baseUrl = Utils.getBaseUrl();
const apiList = {
  // post /front/blog/page（前台接口需要登录）
  getClassSchedule: baseUrl + '/api/v1/craw/user/classTable'
}

// 获取课程
export const getClassSchedule = async (classScheduleForm: ClassScheduleItem) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 你好 世界 </h1>");
  } else {
    return await request.post(apiList.getClassSchedule,classScheduleForm);
  }
}
