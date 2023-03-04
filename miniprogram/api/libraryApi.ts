import { Result } from "../common/Result";
import { Consts } from "../Consts";
import HttpUtils from "../utils/request";
import Utils from '../utils/util';
import {LibraryItem} from '../pages/widgets/library/librarytext/librarytext';

const request = HttpUtils.getInstance();
const baseUrl = Utils.getBaseUrl();
const apiList = {
  // post /front/blog/page（前台接口需要登录）
  getlibrary: baseUrl + '/api/v1/craw/library/searchBook'
}

// 获取图书
export const getlibrary = async (libraryForm: LibraryItem) => {
  if (Consts.DEBUG) {
    return Result.mockSuccess("<h1> 你好 世界 </h1>");
  } else {
    return await request.post(apiList.getlibrary,libraryForm);
  }
}
