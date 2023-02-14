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
    ima:'',
    info:'',
    popupSystemSubtitle:'',
    popupSystemHeadline:'',
  },
  //关闭弹窗
  closePhoto(){
    wx.navigateTo({
      url:'../../login/login'
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
  var popupImage = res1.popupImage;
  this.setData({
    data1: res1,
    ima:'http://'+popupImage,
  })
  /*
 *数据处理
 */
 var popupType = res1.popupType;
 if(popupType == 'custom'){
   this.setData({tc1:true,
    tc2:false,
  })
 }else if(popupType == 'sys'){
   this.setData({tc1:false,
  tc2:true,
})
 }
 if(!res1){
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