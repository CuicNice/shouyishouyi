//import { getScore } from "../../api/scoreInquiryApi";

// pages/login/login.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Y:'',
    M:'',
    D:'',
    showBindDialog:false, // 显示绑定弹窗
    showLoginDialog:false,// 显示登录弹窗
    zh:'',
    mm:'',
    query:'',
    x:0,
    messageList:{},
  },
  getList(){
    wx.request({
      url:'http://www.fmin-courses.com:9527/api/v1/ad/ad/mini/appletPopupList',
      method:'POST',
      data:{
        currentPage:1,
        pageSize:5,
      },
      success:((res)=>{
        this.setData({
           messageList:res.data.data.list,
        }) 
        for(let i=0;i<res.data.data.list.length;i++){
          let time = this.data.Y+'-'+this.data.M+'-'+this.data.D
            //首发时间
            if(res.data.data.list[i].popupFirstTime.substring(0,10) == time){
              if(res.data.data.list[i].popupFirstTimeState){
            wx.navigateTo({url:'../popup1/popup1Page//popup1Page'})
          }}
            //第二次时间
            if(res.data.data.list[i].popupSecondTime.substring(0,10) == time){
              if(res.data.data.list[i].popupSecondTimeState){
                wx.navigateTo({url:'../popup1/popup1Page//popup1Page'})
          }}
            //第三次时间
            if(res.data.data.list[i].popupThirdTime.substring(0,10) == time){
              if(res.data.data.list[i].popupThirdTimeState){
                wx.navigateTo({url:'../popup1/popup1Page//popup1Page'})
              }
            }
          }  
        //判断是否有未读消息
        var isUnread;
        isUnread=wx.getStorageSync('unread')
        console.log(isUnread)
        if(isUnread){
          for(let a=0;a<isUnread.length;a++){
          if(isUnread[a].isShow == 'true'){
            this.setData({x:0});
          }else{
            this.setData({x:1})        
          }
          }
        }if(res.data.data.list.length > 0&&!isUnread){
          this.setData({x:1})
        }
        
      })
     })
   },
   //是否出现弹窗
  //  isPop(){
  //    wx.request({
  //      url:'http://www.fmin-courses.com:9527/api/v1/ad/ad/mini/appletAppearPopup',
  //      method:'POST',
  //      success:((res)=>{
  //        console.log(res)
  //        this.setData({
  //         popupState:res.data.data
  //        })
  //        if(){
  //          wx.navigateTo({
  //            url:'../popup1/popup1Page/popup1Page'
  //          })
  //        }
  //      })
  //    })
  //  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.isPop();
    this.getList();
    //获取弹窗的Id
    this.setData({
      query:options.id
    })
    var timestamp = Date.parse(new Date());
   var date = new Date(timestamp);
    //获取年份  
  this.setData({
    Y :date.getFullYear(),
    //获取月份  
    M : (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
    //获取当日日期 
    D : date.getDate() < 10 ? '0' + date.getDate() : date.getDate() })

    // this.selectComponent("#toast").showToastAuto("test", "success",2);
  },
  /**
   * 获取学号和密码
   */
  getXh(e:any){this.setData({zh:e.detail.value})},
  getMm(e:any){this.setData({mm:e.detail.value})},
  /**
   * 点击完成按钮
   */
  login(){ //模仿写出存入缓存
    var zh = this.data.zh;
    var mm = this.data.mm; 
    wx.setStorageSync('key1',zh);
    wx.setStorageSync('key2',mm);
  },
  /**
   * 显示是否绑定页面
   */
  showBindDialog(){
    wx.navigateTo({
      url:'/pages/message1/message1Page/message1Page'
    })
    this.setData({
      showBindDialog:true
    })
  },
  /**
   * 关闭是否绑定页面
   */
  closeBindDialog(){
    this.setData({
      showBindDialog:false
    })
  },
  /**
   * 开启登录弹窗
   */
  showLoginDialog(){
    this.closeBindDialog();
    this.setData({
      showLoginDialog:true
    })
  },
  /**
   * 关闭登录弹窗
   */
  closeLoginDialog(){
    this.setData({
      showLoginDialog:false
    })
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