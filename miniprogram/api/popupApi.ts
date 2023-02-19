import { Result } from "../common/Result";
import { Consts } from "../Consts";
import HttpUtils from "../utils/request";
import Utils from '../utils/util';
import {popupeItem} from '../pages/login/login';
import {fablouseItem} from '../pages/message/messageInfo/messageInfo';

const request = HttpUtils.getInstance();
const baseUrl = Utils.getBaseUrl();
const apiList = {
  // post /front/blog/page（前台接口需要登录）
  getPopup: baseUrl + '/api/v1/ad/ad/mini/appletAppearPopup',
  getFabulous:baseUrl + '/api/vi/ad/ad/mini/addPopupFabulousById',
}

// 获取是否出现弹窗
export const getPopup = async (popupeForm: popupeItem) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 你好 世界 </h1>");
  } else {
    return await request.post(apiList.getPopup,popupeForm);
  }
}
// 点赞量弹窗
export const getFabulous= async (popupeForm: fablouseItem) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 你好 世界 </h1>");
  } else {
    return await request.post(apiList.getFabulous,popupeForm);
  }
}