// pages/message/messageInfo/messageInfo.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHidden:true,
    row:'',
    Info:[],
  },
  /**
 * 初始化页面渲染函数
 */

 

  //点赞的函数
  getLike(){
    //给接口这个的Id，来获取点赞量。很简单我就用request了
    wx.request({
      url:'http://www.fmin-courses.com:9527/api/v1/ad/ad/mini/addPopupFabulousById',
      data:{
        popupId:this.data.Info[this.data.row].popupId
      }
    })
    //点赞
    this.data.Info[this.data.row].show = 'active'; 
    this.setData({Info:this.data.Info}) 
    wx.setStorageSync('unread',this.data.Info); 
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({row:options.row})
    var Info = wx.getStorageSync('unread');
    this.setData({Info:Info})
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