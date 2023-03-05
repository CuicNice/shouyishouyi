// pages/myWidgets/settingWidgets/settingWidgets.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    settingWidgetTitle:"设置小组件",
    // 隐藏remindBox
    hiddenRemindBox:false,
    scrollTop: 20
  },
  /**
   * 滑动remindBox消失
   */
  
  onPageScroll(ev){
    console.log("ev",ev)
    if (ev.scrollTop <= 0) {
      // 使用CSS选择器
      ev.scrollTop = 0;
    } else if (ev.scrollTop > wx.getSystemInfoSync().windowHeight) {
      ev.scrollTop = wx.getSystemInfoSync().windowHeight;
    }
    if (ev.scrollTop > this.data.scrollTop || ev.scrollTop == wx.getSystemInfoSync().windowHeight) {
     this.setData({
      hiddenRemindBox:true
     })
    } else {
      this.setData({
        hiddenRemindBox:false
      })
    }
    setTimeout( () => {
      this.setData({
        scrollTop: ev.scrollTop
      })
    }, 0)
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