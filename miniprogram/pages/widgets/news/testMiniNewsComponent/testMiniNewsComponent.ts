// pages/widgets/news/testMiniNewsComponent/testMiniNewsComponent.ts
// 接口请求部分
import {
  // 内网新闻
  getInnerNewsListitem,
  // 外网新闻
  getOutNewsListitem
} from "../../../../api/newsApi"
// 请求数据定义
interface innernewsListItem {
  "currentPage": string,
  "pageSize": string
}
interface outnewsListItem {
  "currentPage": string,
  "pageSize": string
}

export {
  innernewsListItem,
  outnewsListItem
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 内网：
    innerPageParams: {
      "currentPage": "1",
      "pageSize": "3"
    } as unknown as outnewsListItem,
    // 外网
    outPageParams: {
      "currentPage": "1",
      "pageSize": "3"
    } as unknown as outnewsListItem,
    tapbarCtrl:true as Boolean,
    // 列表数据
    list: [] as any,
  },
  // 页面监听组件TapBar
  handleEventListener: function(e:any) {
    var that=this
    //将组件B传递的num通过e.detail.num来获取
    this.setData({
      tapbarCtrl: e.detail.tapbarCtrl
    })
    // 初始化数据
  that.initNewsInfo()
},
  async getInnerSchoolNews() {
    let that = this
    wx.showLoading({
      title: '正在加载...',
    });
    // 获取内网新闻
    let innerPageParams = that.data.innerPageParams
    let { data: innerRes } = await getInnerNewsListitem(innerPageParams) as unknown as IResult<any>;
    console.log("innerRes",innerRes);
     if (innerRes != null) {
      wx.hideLoading();
      let list = innerRes.list;
      that.setData({
        list: list, //当天的
      })
    }
  },
  // 外网首义
  async getOutSouyiNews() {
    // 发起网络请求
    /**
 * 发送请求，渲染数据
 * @param from 楼栋数据
 */
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    let that = this
    let outPageParams = that.data.outPageParams
    let { data: outRes } = await getOutNewsListitem(outPageParams) as unknown as IResult<any>;
    if (outRes.pageSize != 0) {
      var list = outRes.list;
      console.log("listmm",list)
    } else {
      wx.showToast({
        title: '刷新失败',
        icon: 'error',
        duration: 1500
      })
      wx.hideToast();
    }
    that.setData({
      list: list,
    })
  },
  // 初始化页面的数据
  async initNewsInfo() {
    // 根据tapBar初始值
    var that = this
    if (that.data.tapbarCtrl) {
      await that.getInnerSchoolNews()
    } else {
      // 外网请求
      await that.getOutSouyiNews()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
this.initNewsInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})