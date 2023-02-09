// pages/widgets/popup/popupPage/popupPage.ts
import {getPopup} from '../../../api/popupApi';
export interface popupeItem {
 currentPage:Number,
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
    currentPage:1,//默认初始第一页数据
    data1:'',
    popupId:'',
    popupType:'',
    ima:'',
    info:'',
    popupSystemSubtitle:'',
    popupSystemHeadline:'',
    s3:'',
    feed:1,
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
var time = this.data.Y+'-'+this.data.M + '-'+ this.data.D;
console.log(time)
var j = 0; 
for(j=0,res1.list[j];j<res1.list.length;j++){ 
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
      ima:'http://'+res1.list[j].popupImage,
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
      ima:'http://'+res1.list[j].popupImage
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
      ima:'http://'+res1.list[j].popupImage
    })}
  }
}
  //切换页面,未解决，询问
//   if(this.data.data1.length >= 2){
//   if(res1.list[0].popupThirdTime.substring(0,10) == time){
//     this.setData({
//      feed : 2,
//     })
//     if(this.data.feed == 2){
//       this.setData({currentPage:this.data.currentPage+1,feed:1})
//       console.log(this.data.s3)
//         this.initPageData();
//     }
//   }
// }
}
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
     //明天的时间
   var day3 = new Date();
   day3.setTime(day3.getTime()+24*60*60*1000) ;
   var s3 = day3.getFullYear()+"-"+(day3.getMonth()+1)+ "-" + day3.getDate();
   this.setData({s3:s3})
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