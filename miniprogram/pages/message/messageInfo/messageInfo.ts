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
    popupId:'',
    popupApear:'',
  },
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
        popupId:this.data.popupApear?this.data.popupApear.popupId:this.data.Info[this.data.row].popupId
      },
    })
    if (this.data.row) {
    //点赞
    this.data.Info[this.data.row].show = 'active'; 
    this.data.Info[this.data.row].popupFabulous = this.data.Info[this.data.row].popupFabulous+1
    this.setData({
      Info:this.data.Info,
      xz:2
    }) 
    wx.setStorageSync('unread',this.data.Info); 
  }else{
    this.data.popupApear.show = 'active';
    this.data.popupApear.popupFablous = this.data.popupApear.popupFabulous+1
    this.setData({
      popupApear:this.data.popupApear,
      xz:2
    }) 
    var isUnread = wx.getStorageSync('unread');
    this.data.popupApear.isShow = true //插入是否已读
      for(var a=0;a<isUnread.length;a++){
        if(this.data.popupApear.popupId == isUnread[a].popupId){
          isUnread[a] == this.data.popupApear
        }
      }
      wx.setStorageSync('unread',isUnread)
  }
} 
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //从消息中心弹过来
    if(options.row){
      this.setData({row:options.row});
      var Info = wx.getStorageSync('unread');
      this.setData({Info:Info})
    }
    //从一开始的pop弹窗过来的
    else if (options.popupApear) {
      this.setData({popupApear:options.popupApear})
    }
   
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
    if (this.data.popupAppear) {
      var isUnread = wx.getStorageSync('unread');
      this.data.popupApear.isShow = true //插入是否已读
        for(var a=0;a<isUnread.length;a++){
          if(this.data.popupApear.popupId == isUnread[a].popupId){
            isUnread[a] == this.data.popupApear
          }
        }
    }
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