// pages/message/messageInfo/messageInfo.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHidden:true,
    row:'',
    Info:[],
    xz:1,//限制点赞量，点一次变为2
  },
  /**
 * 初始化页面渲染函数
 */

 

  //点赞的函数
  getLike(){
    if(this.data.xz == 1){
      //给接口这个的Id，来获取点赞量。很简单我就用request了
    wx.request({
      url:'http://www.fmin-courses.com:9527/api/v1/ad/ad/mini/addPopupFabulousById',
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //约定的数据格式
      },
      data:{
        popupId:this.data.Info[this.data.row].popupId
      },
    })
    //点赞
    this.data.Info[this.data.row].show = 'active'; 
    this.data.Info[this.data.row].popupFabulous = this.data.Info[this.data.row].popupFabulous+1
    }
    this.setData({
      Info:this.data.Info,
      xz:2
    }) 
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