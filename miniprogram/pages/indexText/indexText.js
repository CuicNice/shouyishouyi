<<<<<<<< HEAD:miniprogram/pages/widgets/electricCharge/testElectricComponent/testElectricComponent.ts
// pages/widgets/electricCharge/testElectricComponent/testElectricComponent.ts
import { getElectric } from '../../../../api/electricChargeApi';
export interface ElectriceItem {
  build: string,
  room: string
}
========
// pages/indexText/indexText.js
>>>>>>>> 494cb37889219171c3144f9e3df0d14c28ee599c:miniprogram/pages/indexText/indexText.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[] as any
  },

  async webrequest(){
    var value = wx.getStorageSync('widgets-electricCharge') as ElectriceItem;
    const { data: res } = await getElectric(value) as unknown as IResult<any>;
    this.setData({
      data:res
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    
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
    this.webrequest();
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