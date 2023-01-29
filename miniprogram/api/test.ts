import { Result } from "../common/Result";
import { Consts } from "../Consts";
import HttpUtils from "../utils/request";
import Utils from '../utils/util';
import {ElectriceItem} from '../pages/index';

const request = HttpUtils.getInstance();
const baseUrl = Utils.getBaseUrl();
const testApi = {
  // post /front/blog/page（前台接口需要登录）
  getElectric: baseUrl + '/api/v1/craw/electric/get_electric'
}

// 获取电费
export const getElectric = async (electriceForm: ElectriceItem) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 你好 世界 </h1>");
  } else {
    return await request.post(testApi.getElectric,electriceForm);
  }
}
