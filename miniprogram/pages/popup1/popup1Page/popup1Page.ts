// pages/widgets/popup/popupPage/popupPage.ts
import {getPopup} from '../../../api/popupApi';
export interface popupeItem {
 currentPage:String,
 pageSize:String,
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Y:'',
    M:'',
    D:'',
    title:"默认页面",
    showDialog:true,
    currentPage:'1',//默认初始第一页数据
    data1:'',
    popupId:'',
    popupType:'',
    ima:'',
    info:'',
    popupSystemSubtitle:'',
    popupSystemHeadline:'',
  },
  //关闭弹窗
  closePhoto(){
    wx.navigateTo({
      url:'../../login/login?id='+this.data.popupId
    })
  },
  /**
   * 初始化页面渲染函数
   */
 async initPageData() {
  /**
   * 获取本地缓存，判断是否绑定数据
   */
   var bindData = { 
    currentPage:this.data.currentPage,
     pageSize:'5'
  } as popupeItem;
    console.log(bindData)
    if (bindData) {
      this.getPopupData(bindData);
    }  
},
/**
 * 发送请求，渲染数据
 * @param from 弹窗
 */
async getPopupData(from: popupeItem) {
  console.log(from);
 const {data: res1 } = await getPopup(from) as unknown as IResult<any>;
 console.log(res1)
    /**
   * 渲染
   */
  
  this.setData({
    data1: res1.list,
  })
  /*
 *数据处理
 */
var time = this.data.Y+'-'+this.data.M+'-'+this.data.D;
console.log(time)
var j = 0;
for(j=0,res1.list[j];j<=4;j++){ 
  //首发时间
  if(res1.list[j].popupFirstTime.substring(0,10) == time){
    if(res1.list[j].popupFirstTimeState){
    this.setData({
      popupId:res1.list[j].popupId,
      popupType:res1.list[j].popupType,
      popupSystemSubtitle:res1.list[j].popupSystemSubtitle,
      popupSystemHeadline:res1.list[j].popupSystemHeadline,
    })
   //console.log(res1.list[j].popupId)
    if(res1.list[j].popupType == 'custom'){
      this.setData({
        tc1:true,
        tc2:false,
        ima:'http://'+res1.list[j].popupImage,
      })
    }else{ 
      this.setData({
      tc1:false,
      tc2:true,
   
      ima:res1.list[j].popupImage,
    })}
  }
}
  //第二次时间
  if(res1.list[j].popupSecondTime.substring(0,10) == time){
    if(res1.list[j].popupSecondTimeState){
    this.setData({
      popupId:res1.list[j].popupId,
      popupType:res1.list[j].popupType,
      popupSystemSubtitle:res1.list[j].popupSystemSubtitle,
      popupSystemHeadline:res1.list[j].popupSystemHeadline,
    })
   //console.log(res1.list[j].popupId)
    if(res1.list[j].popupType == 'custom'){
      this.setData({
        tc1:true,
        tc2:false,
        ima:'http://'+res1.list[j].popupImage,
      })
    }else{ 
      this.setData({
      tc1:false,
      tc2:true,
      ima:res1.list[j].popupImage,
    })}
}}
  //第三次时间
  if(res1.list[j].popupThirdTime.substring(0,10) == time){
    if(res1.list[j].popupThirdTimeState){
    this.setData({
      popupId:res1.list[j].popupId,
      popupType:res1.list[j].popupType,
      popupSystemSubtitle:res1.list[j].popupSystemSubtitle,
      popupSystemHeadline:res1.list[j].popupSystemHeadline,
    })
   //console.log(res1.list[j].popupId)
    if(res1.list[j].popupType == 'custom'){
      this.setData({
        tc1:true,
        tc2:false,
        ima:'http://'+res1.list[j].popupImage,
      })
    }else{ 
      this.setData({
      tc1:false,
      tc2:true,
      ima:res1.list[j].popupImage,
    })}
  }
}}
},
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initPageData();
    var timestamp = Date.parse(new Date());
   var date = new Date(timestamp);
    //获取年份  
  this.setData({
    Y :date.getFullYear(),
    //获取月份  
    M : (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
    //获取当日日期 
    D : date.getDate() < 10 ? '0' + date.getDate() : date.getDate() })
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