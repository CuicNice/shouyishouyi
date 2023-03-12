// export const 
const app = getApp() as IAppOption;
class Utils {
  private static instance: Utils;
  // 实例化
  public static getInstance() {
    if (!this.instance) {
      this.instance = new Utils();
    }
    return this.instance;
  }
  // 获取网络请求基本地址
  public static getBaseUrl(): string {
    return app.globalData.baseUrl;
  }
}

export = Utils;