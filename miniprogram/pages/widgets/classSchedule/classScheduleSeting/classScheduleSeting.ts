// pages/widgets/classSchedule/classScheduleSeting/classScheduleSeting.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classScheduleSetTitle: "设置",
    dialogTip: false,
    automatic: true,
    WC: '',
    JY: '',
    checked: false
  },
  /* 
  *关闭弹窗
  */
  closeDialogTip() {
    this.setData({ dialogTip: false })
  },
  /* 
  *选择是否展示全部课表
  */
  switchChange(e: any) {
    console.log(e.detail.value)
    this.setData({
      checked: e.detail.value
    })
    let value=wx.getStorageSync('widget-classSchedule')
    value.ifshowAllclass=!this.data.checked
    wx.setStorageSync("widget-classSchedule", value)
  },
  /* 
  *刷新
  */
  refresh() {
    var pages = getCurrentPages();
    var beforePage = pages[pages.length - 2]
    wx.navigateBack({
      delta: 1,
      success: function () {
        beforePage.refresh();
      }
    })
  },
  /* 
  *进入个性换肤界面
  */
  customskin() {
    wx.navigateTo({ url: '/pages/widgets/classSchedule/Customskin/Customskin' })
  },
  /* 
  *展开自动识别规则
  */
  details(e: any) {
    console.log(e.detail.value)
    this.setData({ dialogTip: true })
  },
  /* 
  *监听自动识别的选择
  */
  check(e: any) {
    console.log(e)
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
    this.setData({
      checked: !wx.getStorageSync('widget-classSchedule').ifshowAllclass
    })
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