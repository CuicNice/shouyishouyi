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
    index: 0,
    homePics:['../../static/img/Vector 2.png',
    '../../static/img/Vector 2.png',
    '../../static/img/Vector 2.png',
    '../../static/img/Vector 2.png',
    '../../static/img/Vector 2.png']
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },

  chuangEvent: function (e: { currentTarget: { id: any; }; }) {
    this.setData({
      index: e.currentTarget.id
    })
  },

  swiperChange:function(e: { detail: { current: any; }; }){
    this.setData({
      index: e.detail.current   //获取当前轮播图片的下标
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
