import { getInfo } from '../../../api/popupApi'
import { messageItem } from '../messagePage/messagePage';
export interface infoItem {
  popupId:String
}
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
 /**
   * 初始化页面渲染函数
   */
  async initPageData() {
    /**
     * 获取本地缓存，判断是否绑定数据
     */
    var bindData = {
      popupId: this.data.popupId,
    } as infoItem;
    this.getPopupData(bindData);
  },
  /**
  * 发送请求，渲染数据
  * @param from message信息中心
  */
  async getPopupData(from: infoItem) {
    const { data: Info } = await getInfo(from) as unknown as IResult<any>;
    console.log(Info)},
      
      //     this.data.popupAppear.show = "green";
      //     this.data.popupAppear.popupPublishTime =  this.data.popupAppear.popupPublishTime.slice(0,10)
      //     this.data.popupAppear.isShow = true; //插入是否已读
      //     this.setData({popupAppear:res.data.data})//插入show后再又给值
      //       var isUnread = wx.getStorageSync('unread');
      //       if(isUnread){
      //         for(var a=0;a<isUnread.length;a++){
      //           if(this.data.popupAppear.popupId == isUnread[a].popupId){
      //             isUnread[a] = this.data.popupAppear
      //             wx.setStorageSync('unread',isUnread)
      //           }else if(this.data.popupAppear.popupId !== isUnread[a].popupId&&this.data.popupAppear.popupIsSave !== false){
      //             isUnread[isUnread.length]=this.data.popupAppear;
      //             wx.setStorageSync('unread',isUnread);
      //           }
      //         }
      //       }
      //      if(isUnread.length==0){
      //       wx.setStorageSync('unreadOne',this.data.popupAppear)
      //     }
      //   })
      // })
  //点赞的函数
  getLike(){
    var popupAppear = this.data.popupAppear as any;
    var info = this.data.Info as any;
    if(popupAppear!==null?popupAppear.show  == 'green':info[this.data.row as unknown as number].show == 'green' ){
      console.log(1)
  //给接口这个的Id，来获取点赞量。很简单我就用request了
    wx.request({
      url:'http://www.fmin-courses.com:9527/api/v1/ad/ad/mini/addPopupFabulousById',
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //约定的数据格式
      },
      data:{
        popupId:popupAppear!==null?popupAppear.popupId:info[this.data.row].popupId
      },
    })
    if (this.data.row=='0'?true:this.data.row) {
    //点赞
     info[this.data.row as unknown as number].show = 'active'; 
     info[this.data.row as unknown as number].popupFabulous =info[this.data.row as unknown as number].popupFabulous+1
    this.setData({
      Info:this.data.Info,
    }) 
    wx.setStorageSync('unread',this.data.Info); 
  }if(this.data.popupId){
    popupAppear.show ='active';
    popupAppear.popupFabulous = popupAppear.popupFabulous+1
    this.setData({
      popupAppear:this.data.popupAppear,
    }) 
    var bindCache= wx.getStorageSync('bindCache');
    var isUnread = bindCache.unread;
    if(isUnread){
       for(var a=0;a<isUnread.length;a++){
        if(popupAppear.popupId == isUnread[a].popupId){
          isUnread[a] = this.data.popupAppear
        }
      }
      bindCache.unread = isUnread;
      wx.setStorageSync('bindCache',bindCache);
    }else{
      isUnread = this.data.popupAppear;
      bindCache.unreadOne = isUnread;
      wx.setStorageSync('bindCache',bindCache);
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
      this.initPageData()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.initPageData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.initPageData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    var popupAppear = this.data.popupAppear as any;
    if (this.data.popupAppear) {
      var isUnread = wx.getStorageSync('unread');
      if(popupAppear.popupIsSave == true){
         popupAppear.isShow = true //插入是否已读
      }
        for(var a=0;a<isUnread.length;a++){
          if(popupAppear.popupId == isUnread[a].popupId){
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