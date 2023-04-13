import { getInfo } from '../../../api/popupApi'
import { getFabulous } from '../../../api/popupApi'
export interface infoItem {
  popupId: String
}
export interface Fabulous {
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isHidden: true,
    row: '',//信息列表的下标
    Info: [],//储存信息
    popupId: '',//弹窗对应id
    popupAppear: {},
    Form: true//穿过来的途径，来决定显示哪一个

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
    var popupAppear = this.data.popupAppear as any;
    var bindInfo = wx.getStorageSync('bindCache');
    popupAppear.show = "green";
    popupAppear.popupPublishTime = popupAppear.popupPublishTime.slice(0, 10)
    popupAppear.isShow = true; //插入是否已读
    this.setData({ popupAppear: Info })//插入show后再又给值
    var isUnread = bindInfo.unread;
    if (isUnread) {
      for (var a = 0; a < isUnread.length; a++) {
        if (popupAppear.popupId == isUnread[a].popupId) {
          isUnread[a] = popupAppear;
        } else if (popupAppear.popupId !== isUnread[a].popupId && popupAppear.popupIsSave !== false) {
          isUnread[isUnread.length] = popupAppear;
        }
      }
    }
    if (isUnread.length == 0) {
      bindInfo.unreadOne = popupAppear;
    }
    wx.setStorageSync('bindCache', bindInfo);
  },

  /**
   * 点赞的函数
   */
  /**
   * 初始化页面渲染函数
   */
  async initPageData_2() {
    /**
     * 获取本地缓存，判断是否绑定数据
     */
    var bindData = {//只需要触发接口
    } as Fabulous;
    this.getFabulous(bindData);
  },
  /**
  * 发送请求，渲染数据
  * @param from message信息中心
  */
  async getFabulous(from: Fabulous) {
    const { } = await getFabulous(from) as unknown as IResult<any>;//无返回值，不需要
    var popupAppear = this.data.popupAppear as any;
    var info = this.data.Info as any;
    if (popupAppear !== null ? popupAppear.show == 'green' : info[this.data.row as unknown as number].show == 'green') {
      var bindCache = wx.getStorageSync('bindCache');
      if (this.data.row == '0' ? true : this.data.row) {
        //点赞
        info[this.data.row as unknown as number].show = 'active';
        info[this.data.row as unknown as number].popupFabulous = info[this.data.row as unknown as number].popupFabulous + 1
        this.setData({
          Info: this.data.Info,
        })
        bindCache.unread = this.data.Info;
      } if (this.data.popupId) {
        popupAppear.show = 'active';
        popupAppear.popupFabulous = popupAppear.popupFabulous + 1
        this.setData({
          popupAppear: this.data.popupAppear,
        })
        var bindCache = wx.getStorageSync('bindCache');
        var isUnread = bindCache.unread;
        if (isUnread) {
          for (var a = 0; a < isUnread.length; a++) {
            if (popupAppear.popupId == isUnread[a].popupId) {
              isUnread[a] = this.data.popupAppear
            }
          }
          bindCache.unread = isUnread;
          wx.setStorageSync('bindCache', bindCache);
        } else {
          isUnread = this.data.popupAppear;
          bindCache.unreadOne = isUnread;
          wx.setStorageSync('bindCache', bindCache);
        }
      }
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //从消息中心弹过来
    if (options.row) {
      this.setData({ row: options.row });
      var Info = wx.getStorageSync('bindCache').unread;
      this.setData({
        Form: false,
        Info: Info
      })
    }
    //从一开始的pop弹窗过来的
    else if (options.popupId) {
      this.setData({
        Form: true,
        popupId: options.popupId,
      });
      if (wx.getStorageSync('bindCache').unreadOne.popupId == options.popupId) {
        var popupAppear = wx.getStorageSync('bindCache').unreadOne //单独存个，方便存入大数组里
        this.setData({ popupAppear: popupAppear })
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
      var isUnread = wx.getStorageSync('bindCache').unread;
      if (popupAppear.popupIsSave == true) {
        popupAppear.isShow = true //插入是否已读
      }
      for (var a = 0; a < isUnread.length; a++) {
        if (popupAppear.popupId == isUnread[a].popupId) {
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