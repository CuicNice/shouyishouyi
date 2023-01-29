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
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
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
