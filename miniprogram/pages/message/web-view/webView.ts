// pages/message1/web-view/webView.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    webUrl:''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var pop = wx.getStorageSync('popup');
    for(var a=0;a<pop.popupList;a++){
      if(pop.popupList[a].popupJumpUrl==pop.Url){
        pop.popupList[a].isShow = true;
      }
    }
    if(pop.popupAppear){
      pop.popupId = pop.popupAppear.popupId
    }
    this.setData({webUrl:pop.Url});
    wx.setStorageSync('popup',pop);
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