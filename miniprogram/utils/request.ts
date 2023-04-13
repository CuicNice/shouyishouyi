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
| 'CONNECT';

export type  RequestFormType = 'application/json' | 'application/x-www-form-urlencoded' | "multipart/form-data;";

class HttpUtils {
  private static instance: HttpUtils;

  public static getInstance() {
    if (!HttpUtils.instance) {
      HttpUtils.instance = new HttpUtils();
    }
    return HttpUtils.instance;
  }

  public post(url: string, data?: object, contentType: RequestFormType = 'application/json', headers?: { [key: string]: string; }) {
    return this.request("POST", url, data, contentType, headers);
  }
  public get(url: string, data?: object, contentType: RequestFormType = 'application/json', headers?: { [key: string]: string; }) {
    return this.request("GET", url, data, contentType, headers);
  }
  public put(url: string, data?: object, contentType: RequestFormType = 'application/json', headers?: { [key: string]: string; }) {
    return this.request("PUT", url, data, contentType, headers);
  }
  public detete(url: string, data?: object, contentType: RequestFormType = 'application/json', headers?: { [key: string]: string; }) {
    return this.request("DELETE", url, data, contentType, headers);
  }

  private request<T = any>(method: Method, url: string, data?: object, contentType: RequestFormType = 'application/json', headers?: {[key: string]: string}) {
    return new Promise((resolve: (res: IResult<T>) => void, reject) => {
      // 检查 url
      const realUrl = /(http|https)/.test(url);
      if (!realUrl) {
        url = app.globalData.baseUrl + url;
      }
      wx.request<IResult<T>>({
        url: url,
        method: method,
        data: data,
        timeout:20*1000,
        dataType: "json",
        header: {
          "Content-Type": contentType,
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