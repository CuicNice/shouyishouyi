import { Result } from "../common/Result";
import { Consts } from "../Consts";
import HttpUtils from "../utils/request";
import Utils from '../utils/util';
import {BannerItem} from '../pages/index';

const request = HttpUtils.getInstance();
const baseUrl = Utils.getBaseUrl();
const apiList = {
  // post /front/blog/page（前台接口需要登录）
  getBanner: baseUrl + '/mini/banner/listMiniBanners'
}

// 获取广告
export const getBanner = async (bannerForm: BannerItem) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 你好 世界 </h1>");
  } else {
    return await request.post(apiList.getBanner,bannerForm);
  }
}
