import { Consts } from "../Consts";
const app = getApp();
export type Method =
| 'OPTIONS'
| 'GET'
| 'HEAD'
| 'POST'
| 'PUT'
| 'DELETE'
| 'TRACE'
| 'CONNECT'

class HttpUtils {
  private static instance: HttpUtils;

  public static getInstance() {
    if (!HttpUtils.instance) {
      HttpUtils.instance = new HttpUtils();
    }
    return HttpUtils.instance;
  }

  public post(url: string, data?: object, formType = 'application/json', headers?: { [key: string]: string; }) {
    return this.request("POST", url, data, formType, headers);
  }
  public get(url: string, data?: object, formType = 'application/json', headers?: { [key: string]: string; }) {
    return this.request("GET", url, data, formType, headers);
  }
  public put(url: string, data?: object, formType = 'application/json', headers?: { [key: string]: string; }) {
    return this.request("PUT", url, data, formType, headers);
  }
  public detete(url: string, data?: object, formType = 'application/json', headers?: { [key: string]: string; }) {
    return this.request("DELETE", url, data, formType, headers);
  }

  private request<T = any>(method: Method, url: string, data?: object, formType?: string, headers?: {[key: string]: string}) {
    return new Promise((resolve: (res: IResult<T>) => void, reject) => {
      const comtentType = formType ? 'application/json' : 'application/x-www-form-urlencoded';
      // 检查 url
      const realUrl = /(http|https)/.test(url);
      if (!realUrl) {
        url = app.globalData.baseUrl + url;
      }
      wx.request<IResult<T>>({
        url: url,
        method: method,
        data: data,
        timeout: Consts.HTTP_REQUEST_TIMEOUT,
        dataType: "json",
        header: {
          "Content-Type": comtentType,
          ...headers
        },
        success(res) {
          resolve(res.data);
        },
        fail(err) {
          wx.showToast({
            title: "网络出错啦!",
            duration: 3000
          });
          reject(err);
        }
      })
    })
  }
}

export default HttpUtils;