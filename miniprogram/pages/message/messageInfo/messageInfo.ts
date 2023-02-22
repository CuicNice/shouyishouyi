// pages/message/messageInfo/messageInfo.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isHidden:true,
    row:'',
    Info:[],
    popupId:'',
    popupAppear:{},
    Form:true//穿过来的途径，来决定显示哪一个

  },
  //通过传过来的popupId获取数据
  getInfo(){
      wx.request({
        url:'http://www.fmin-courses.com:9527/api/v1/ad/ad/mini/getPopupById',
        method:'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' //约定的数据格式
        },
        data:{
          popupId:this.data.popupId
        },
        fail:(()=>{this.getInfo()}),
        success:((res)=>{
          console.log(res)
          this.setData({
            popupAppear:res.data.data//第一次给值
          })
          this.data.popupAppear.show = "green";
          this.data.popupAppear.popupPublishTime =  this.data.popupAppear.popupPublishTime.slice(0,11)
          this.data.popupAppear.isShow = true; //插入是否已读
          this.setData({popupAppear:res.data.data})//插入show后再又给值
            var isUnread = wx.getStorageSync('unread');
            console.log(isUnread.length)
            if(isUnread){
              for(var a=0;a<isUnread.length;a++){
                if(this.data.popupAppear.popupId == isUnread[a].popupId){
                  isUnread[a] = this.data.popupAppear
                  wx.setStorageSync('unread',isUnread)
                }else if(this.data.popupAppear.popupId !== isUnread[a].popupId){
                  isUnread[isUnread.length]=this.data.popupAppear;
                  wx.setStorageSync('unread',isUnread);
                }
              }
            }
           if(isUnread.length==0){
            wx.setStorageSync('unreadOne',this.data.popupAppear)
          }
        })
      })

  },
  //点赞的函数
  getLike(){
    if(this.data.popupAppear.show == 'green'||this.data.Info[this.data.row].show == 'green'){
  //给接口这个的Id，来获取点赞量。很简单我就用request了
    wx.request({
      url:'http://www.fmin-courses.com:9527/api/v1/ad/ad/mini/addPopupFabulousById',
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //约定的数据格式
      },
      data:{
        popupId:this.data.popupAppear?this.data.popupAppear.popupId:this.data.Info[this.data.row].popupId
      },
    })
    if (this.data.row) {
    //点赞
    this.data.Info[this.data.row].show = 'active'; 
    this.data.Info[this.data.row].popupFabulous = this.data.Info[this.data.row].popupFabulous+1
    this.setData({
      Info:this.data.Info,
    }) 
    wx.setStorageSync('unread',this.data.Info); 
  }else{
    this.data.popupAppear.show ='active';
    this.data.popupAppear.popupFablous = this.data.popupAppear.popupFabulous+1
    this.setData({
      popupAppear:this.data.popupAppear,
    }) 
    var isUnread = wx.getStorageSync('unread');
    if(isUnread){
       for(var a=0;a<isUnread.length;a++){
        if(this.data.popupAppear.popupId == isUnread[a].popupId){
          isUnread[a] = this.data.popupAppear
        }
      }
      wx.setStorageSync('unread',isUnread)
    }else{
      isUnread = this.data.popupAppear;
      wx.setStorageSync('unreadOne',isUnread);
    }
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
      this.setData({
        Form:false,
        Info:Info
      })
    }
    //从一开始的pop弹窗过来的
    else if (options.popupId) {
      this.setData({
        Form:true,
        popupId:options.popupId,
      });
      if(wx.getStorageSync('unreadOne').popupId == options.popupId){
        var popupAppear=wx.getStorageSync('unreadOne') //单独存个，方便存入大数组里
        this.setData({popupAppear:popupAppear})
      }
      this.getInfo()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.getInfo()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getInfo()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    if (this.data.popupAppear) {
      var isUnread = wx.getStorageSync('unread');
      this.data.popupAppear.isShow = true //插入是否已读
        for(var a=0;a<isUnread.length;a++){
          if(this.data.popupAppear.popupId == isUnread[a].popupId){
            isUnread[a] == this.data.popupAppear
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