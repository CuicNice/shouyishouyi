// pages/message1/web-view/webView.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    webUrl:'https://mp.weixin.qq.com/s/X4o8i1PyTnjLc7Fyp1m_Gw'
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({webUrl:wx.getStorageSync('Url')})
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