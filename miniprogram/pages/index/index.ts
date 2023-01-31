// index.ts
// 获取应用实例
import {getElectric} from '../../api/test';

export interface ElectriceItem {
  build: string,
  room: string
}

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    // index: 0,
    homePics:[
      {
        src:"http://introduce.mcdd.top/certificate/fin-min-certificate-5cf4382e-98ac-11ed-aad6-fa163ee0d876.png",
        url:"第0个"
      },
      {
        src:"http://introduce.mcdd.top/certificate/fin-min-certificate-5cf4382e-98ac-11ed-aad6-fa163ee0d876.png",
        url:"第1个"
      },
      {
        src:"http://introduce.mcdd.top/certificate/fin-min-certificate-5cf4382e-98ac-11ed-aad6-fa163ee0d876.png",
        url:"第2个"
      },]
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },

  tap(e:any){
    console.log(e.detail)
  },

  onLoad() {
    // this.initPageData();
  },
  async initPageData(){
    var from = {
      build:"西区2栋",
      room:"507"
    }as ElectriceItem;
    const { data } = await getElectric(from) as unknown as IResult<ElectriceItem>;
    console.log(data);
  }
})
