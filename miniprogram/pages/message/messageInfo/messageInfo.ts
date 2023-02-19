// pages/message/messageInfo/messageInfo.ts
import {getFabulous} from '../../../api/popupApi';
export interface fablouseItem {
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHidden:true,
    row:'',
    Info:[],
  },
  /**
 * 初始化页面渲染函数
 */
async initPageData() {
  /**
   * 获取本地缓存，判断是否绑定数据
   */
   var bindData = { //bindData为空，因为请求这个接口不需要任何数据
  } as fablouseItem;
    console.log(bindData)
    if (bindData) {
      this.getPopupData(bindData);
    }  
  },
  /**
  * 发送请求，渲染数据
  * @param from popup弹窗
  */
  async getPopupData(from: fablouseItem) {
  const {data: FablousById } = await getFabulous(from) as unknown as IResult<any>;
    /**
   * 渲染
   */
  this.setData({FablousById:FablousById})
  /*
  *数据处理
  */
 
  },
  //点赞的函数
  getLike(){
    wx.
    var row = this.data.row;
    if(this.data.Info[row].show == 'green'||this.data.Info[row].show == undefined){
      this.setData({popupFabulous:1})
    } 
    //点赞
    this.data.Info[row].show = 'active'; 
    this.setData({Info:this.data.Info}) 
    wx.setStorageSync('unread',this.data.Info); 
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initPageData();
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