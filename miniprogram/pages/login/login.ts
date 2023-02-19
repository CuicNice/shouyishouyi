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
      success:((res)=>{
        this.setData({
           messageList:res.data.data.list,
        })  
        if(this.data.pageSize ==res.data.data.list.length+50){
          this.setData({
            pageSize:this.data.pageSize+1000,
          })
        }
        //判断是否有未读消息
        var isUnread;
        isUnread = wx.getStorageSync('unread')
        if(isUnread.length == res.data.data.list.length){
          for(var a=0;a<res.data.data.list.length;a++){
            if(isUnread[a].popupId == res.data.data.list[a].popupId){
              if(isUnread[a].isShow == true){ 
            this.setData({x:0})
          }else{
            this.setData({x:1});
            break;        
          }
            }
          
          }
        }else if(res.data.data.list.length > 0){
          this.setData({x:1})
        }else{this.setData({x:0})}
      })
     })
   },
//关闭popup弹窗
closePhoto(){
  this.setData({
    tc1:false,
    tc2:false,
  })
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
  console.log(bindData)
  if (bindData) {
    this.getPopupData(bindData);
  }  
},
/**
* 发送请求，渲染数据
* @param from popup弹窗
*/
async getPopupData(from: popupeItem) {
console.log(from);
const {data: popupAppear } = await getPopup(from) as unknown as IResult<any>;
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
  tc1:true,
  tc2:false,
})
}else if(popupType == 'system'){
 this.setData({
   tc1:false,
   tc2:true,
})
}
if(!popupAppear){
 this.setData({
  ima:'http://image-2023-01-30-14-08-04-182.png'
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
   
    this.isPop();
    this.getList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    var appear = this.data.messageList[0].popupPublishTime;
    wx.setStorageSync('key3',appear);
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