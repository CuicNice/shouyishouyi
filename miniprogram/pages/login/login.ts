//import { getScore } from "../../api/scoreInquiryApi";
import {getPopup} from '../../api/popupApi';
export interface popupeItem {
}
// pages/login/login.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDialog:true,
    currentPage:1,//默认初始第一页数据
    popupAppear:'',
    ima:'',
    info:'',
    popupSystemSubtitle:'',
    popupSystemHeadline:'',
    showBindDialog:false, // 显示绑定弹窗
    showLoginDialog:false,// 显示登录弹窗
    zh:'',
    mm:'',
    query:'',
    x:0,//x为0时，爪子图案为黑色
    messageList:[],
    pageSize:1000,
  },
  getList(){
    wx.request({
      url:'http://www.fmin-courses.com:9527/api/v1/ad/ad/mini/appletPopupList',
      method:'POST',
      data:{
        currentPage:1,
        pageSize:this.data.pageSize,
      },
      fail:(()=>{this.getList()}),
      success:((res)=>{
        this.setData({
           messageList:res.data.data.list,
        })  
        console.log(res)
        if(this.data.pageSize ==res.data.data.list.length+50){
          this.setData({
            pageSize:this.data.pageSize+1000,
          })
        }
        //判断是否有未读消息
        var isUnread;
        isUnread = wx.getStorageSync('unread')
        if(isUnread){
          if(isUnread.length <= res.data.data.list.length){
            for(var a=0;a<res.data.data.list.length;a++){
              for(var i=0;i<isUnread.length;a++)
              if(isUnread[i].popupId == res.data.data.list[a].popupId){
                if(isUnread[i].isShow == true){ 
              this.setData({x:0})
            }else{
              this.setData({x:1});
              break;        
            }
              }
            }
          }else{this.setData({x:0})}
        }else{
          if(wx.getStorageSync('unreadOne')){
            if(wx.getStorageSync('unreadOne').popupId ==this.data.popupAppear.popupId){this.setData({x:0})}
          }else if(!wx.getStorageSync('unreadOne')&&this.data.messageList.length>0){
            this.setData({x:1})
          }else if(this.data.messageList.length>0&&!isUnread&&!wx.getStorageSync('unreadOne')){
            this.setData({x:1})
          }
        }
      })
     })
   },
//关闭popup弹窗
closePhoto(){
  this.setData({
    termTitleTapdetail:false,
    tc1:false,
    tc2:false,
  })
  wx.setStorageSync('isNoread',this.data.popupAppear.popupId)//当不想点击弹窗看，而且不想去看信息时,限制弹一次
},
//点击popup弹窗的图片或点击查看详情，进入具体的信息页面
 loginInfo(){
   if (this.data.popupAppear.popupJumpType == 'noJump'){
     wx.setStorageSync('noJump',this.data.popupAppear.popupId)
     this.setData({tc1:false,tc2:false,termTitleTapdetail:false,})
   }else if(this.data.popupAppear.popupJumpType !== 'noJump'){
    if (this.data.popupAppear.popupJumpType == 'link'){
      wx.setStorageSync('Url',this.data.popupAppear.popupJumpUrl)
      wx.navigateTo({url:'../message/web-view/webView'});
    }
    if(this.data.popupAppear.popupJumpType == 'article'){
      wx.navigateTo({
     url:'../message/messageInfo/messageInfo?popupId='+this.data.popupAppear.popupId
   })
    } 
   }
 },
/**
 * 初始化页面渲染函数
 */
async initPageData() {
/**
 * 获取本地缓存，判断是否绑定数据
 */
 var bindData = { //bindData为空，因为请求这个接口不需要任何数据
} as popupeItem;
    this.getPopupData(bindData);
},
/**
* 发送请求，渲染数据
* @param from popup弹窗
*/
async getPopupData(from: popupeItem) {
const {data: popupAppear } = await getPopup(from) as unknown as IResult<any>;
if(!popupAppear){this.initPageData()}
console.log(popupAppear)
  /**
 * 渲染
 */
var popupImage = popupAppear.popupImage;
this.setData({
  popupAppear: popupAppear,
  ima:'http://'+popupImage,
})
/*
*数据处理
*/
var popupType = popupAppear.popupType;
if(popupType == 'custom'){
 this.setData({
  termTitleTapdetail:true,
  tc1:true,
  tc2:false,
})
}else if(popupType == 'system'){
 this.setData({
  termTitleTapdetail:true,
   tc1:false,
   tc2:true,
})
}
if(!popupAppear){
 this.setData({
  ima:'http://image-2023-01-30-14-08-04-182.png'
 })
}
if(popupAppear.popupId == wx.getStorageSync('unreadOne').popupId){
  this.setData({
    termTitleTapdetail:false,
     tc1:false,
     tc2:false,
  })
}
if(popupAppear.popupId == wx.getStorageSync('noJump').popupId){
  this.setData({
    termTitleTapdetail:false,
     tc1:false,
     tc2:false,
  })
}
if(popupAppear.popupId == wx.getStorageSync('isNoread')){
  this.setData({
    termTitleTapdetail:false,
     tc1:false,
     tc2:false,
  })
}
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initPageData();
    this.getList();
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
    wx.setStorageSync('zh',zh);
    wx.setStorageSync('mm',mm);
  },
  /**
   * 显示是否绑定页面
   */
  showBindDialog(){
    wx.navigateTo({
      url:'../message/messagePage/messagePage'
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
    this.initPageData();
    this.getList();
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.initPageData();
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