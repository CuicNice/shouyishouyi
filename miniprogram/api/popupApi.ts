import { Result } from "../common/Result";
import { Consts } from "../Consts";
import HttpUtils from "../utils/request";
import Utils from '../utils/util';
import { popupeItem } from '../pages/login/login';

const request = HttpUtils.getInstance();
const baseUrl = Utils.getBaseUrl();
const apiList = {
  // post /front/blog/page（前台接口需要登录）
  isPopup: baseUrl + '/api/v1/ad/mini/popup/getPopupByTime',
  getFabulous: baseUrl + '/api/v1/ad/mini/popup/insertPopupFabulousById',
  listPopup: baseUrl + '/api/v1/ad/mini/popup/listMiniPopups',
}

// 获取是否出现弹窗
export const getPopup = async (popupeForm: popupeItem) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 你好 世界 </h1>");
  } else {
    return await request.post(apiList.isPopup, popupeForm);
  }
}
// 获取弹窗列表
export const listPopup = async (popupeForm: popupeItem) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 你好 世界 </h1>");
  } else {
    return await request.post(apiList.listPopup, popupeForm);
  }
}