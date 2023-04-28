import { getInfo } from '../../../api/popupApi'
import { getFabulous } from '../../../api/popupApi'
export interface infoItem {
  popupId: String
}
export interface Fabulous {
  popupId: String
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    popupId: '',//弹窗对应id
    popupAppear: {},
  },
  /**
    * 初始化页面渲染函数
    */
  async initPageData() {
    /**
     * 获取本地缓存，判断是否绑定数据
     */
    console.log(this.data.popupId)
    var popupId=this.data.popupId;
    var bindData = {
      popupId:popupId
    } as infoItem;
    this.getPopupData(bindData);
  },
  /**
  * 发送请求，渲染数据
  * @param from message信息中心
  */
  async getPopupData(from: infoItem) {
    const { data: popupAppear } = await getInfo(from) as unknown as IResult<any>;
    console.log(popupAppear)
    popupAppear.show = "green";
    popupAppear.popupPublishTime = popupAppear.popupPublishTime.slice(0, 10);
    popupAppear.isShow = true; //插入是否已读
    this.setData({ popupAppear: popupAppear })//插入show后再又给值
  },

  /**
   * 点赞的函数
   */
  async initPageData_2() {
    /**
     * 获取本地缓存，判断是否绑定数据
     */
    var bindData = {
      popupId:this.data.popupId
    } as Fabulous;
    this.getFabulous(bindData);
  },
  /**
  * 发送请求，渲染数据
  * @param from message信息中心
  */
  async getFabulous(from: Fabulous) {
    const { } = await getFabulous(from) as unknown as IResult<any>;
    
    var popupAppear = this.data.popupAppear as any;
    var pop = wx.getStorageSync('popup');
    if (popupAppear.show == 'green') {
        //点赞
        popupAppear.show = 'active';
        popupAppear.popupFabulous = popupAppear.popupFabulous + 1
      }
        if (pop.popupList.length>0) {
          for (var a = 0; a < pop.popupList.length; a++) {
            if (popupAppear.popupId == pop.popupList[a].popupId) {
              pop.popupList[a] = popupAppear
            }
          }
          pop.popupList= pop.popupList;
          wx.setStorageSync('popup', pop);
        }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      this.setData({
        popupId: options.popupId,
      });
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
    var pop = wx.getStorageSync('popup');
    var popupAppear = pop.unreadOne as any;
    if (this.data.popupAppear) {
        popupAppear.isShow = true //插入是否已读
      for (var a = 0; a < pop.popupList.length; a++) {
        if (popupAppear.popupId ==  pop.popupList[a].popupId) {
          pop.popupList[a] == this.data.popupAppear;
        }
      }
    }
    wx.setStorageSync('popup',pop)
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