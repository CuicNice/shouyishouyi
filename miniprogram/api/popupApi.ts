import { Result } from "../common/Result";
import { Consts } from "../Consts";
import HttpUtils from "../utils/request";
import Utils from '../utils/util';
import { popupeItem } from '../pages/login/login';
import {messageItem} from '../pages/message/messagePage/messagePage';
import{infoItem} from '../pages/message/messageInfo/messageInfo';

const request = HttpUtils.getInstance();
const baseUrl = Utils.getBaseUrl();
const apiList = {
  // post /front/blog/page（前台接口需要登录）
  isPopup: baseUrl + '/api/v1/ad/mini/popup/getPopupByTime',
  getFabulous: baseUrl + '/api/v1/ad/mini/popup/insertPopupFabulousById',
  listPopup: baseUrl + '/api/v1/ad/mini/popup/listMiniPopups',
  listMessage :baseUrl + '/api/v1/ad/mini/popup/listMiniPopups',
  getInfo:baseUrl +'/api/v1/ad/mini/popup/getPopupById',

}

// 获取是否出现弹窗
export const getPopup = async (popupeForm: popupeItem) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 你好 世界 </h1>");
  } else {
    return await request.post(apiList.isPopup, popupeForm);
  }
}

// 获取弹窗列表 login页面的，必须有，需要去判断是否有未读消息
export const listPopup = async (popupeForm: popupeItem) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 你好 世界 </h1>");
  } else {
    return await request.post(apiList.listPopup, popupeForm);
  }
}

// 获取弹窗列表 message页面的，必须有，需要上拉更新
export const listMessage= async (popupeForm: messageItem) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 你好 世界 </h1>");
  } else {
    return await request.post(apiList.listMessage, popupeForm);
  }
}
// 获取弹窗列表 message页面的，必须有，需要上拉更新
export const getInfo= async (popupeForm: infoItem) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 你好 世界 </h1>");
  } else {
    return await request.post(apiList.getInfo, popupeForm);
  }
}