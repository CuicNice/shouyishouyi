import {
  promisic
} from "./util";

class Http {
  /**
   * 
   * 封装的get请求 
   */
  static async request_get({url,header}) {
    const res = await promisic(wx.request)({
      url: url,
      method:'GET',
      header
    })
    return res
  }

    /**
   * 
   * 封装的post请求 
   */
  static async request_post({url,data,header}) {
    const res = await promisic(wx.request)({
      url: url,
      data,
      method:'POST',
      header
    })
    return res
  }

    /**
   * 
   * 封装的wx.login()请求 
   */
  static async login() {
    const res = await promisic(wx.login)()
    return res
  }


}

export {
  Http
}