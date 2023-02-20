// pages/widgets/library/libraryPage/libraryPage.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    allbook: [] as any,
    num: 0,
    electricChargeTitle: '图书详情'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    this.setData({ num: (e.num) as unknown as number, allbook: JSON.parse((e.all) as unknown as string) })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    /* var value1 = wx.getStorageSync('key1')
    var value2 = wx.getStorageSync('key2')
      var xx
      var yy 
      if(value1||value2){
        xx=wx.getStorageSync('key1')
        yy=wx.getStorageSync('key2')
        this.setData({
          xuehao:xx,
          mima:yy
        })
      } */
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