// pages/widgets/testTapBar/testTapBar.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  onShow: function () {
  /* 在list中每一个页面中设置，在页面显示时，动态设置一下getTabBar获得组件中的selected值，这样也确保了入口不固定时，每次高亮的tabBar都是正确的*/
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({  // 文档中有介绍 getTabBar用于获取当前组件实例
        selected: 2 //这个部分的数值只需要填写，你需要填写当前页面对应的数值
      })
    }
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