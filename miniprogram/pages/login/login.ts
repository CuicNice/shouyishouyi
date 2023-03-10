
import { getPopup } from '../../api/popupApi';
import { listPopup } from '../../api/popupApi'
export interface popupeItem {
  currentPage: String,
  pageSize: String,
}
// pages/login/login.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //昨天，今天，明天的日期。
    s1: '',
    s2: '',
    s3: '',

    tc_custom: false,//自定义弹窗
    tc_system: false,//系统默认弹窗
    termTitleTapdetail: false,//弹窗蒙版显示
    showDialog: true,
    currentPage: '1',//默认初始第一页数据
    popupAppear: '',
    ima: '',
    showBindDialog: false, // 显示绑定弹窗
    showLoginDialog: false,// 显示登录弹窗
    zh: '',
    mm: '',
    x: 0,//x为0时，爪子图案为黑色
    messageList: [],
    pageSize: '5',
  },
  // getList() {
  //   wx.request({
  //     url: 'http://www.fmin-courses.com:9527/api/v1/ad/ad/mini/appletPopupList',
  //     method: 'POST',
  //     data: {
  //       currentPage: 1,
  //       pageSize: this.data.pageSize,
  //     },
  //     fail: (() => { this.getList() }),
  //     success: ((res) => {
  //       this.setData({
  //         messageList: res.data.data.list,
  //       })
  //       if (this.data.pageSize >= res.data.data.list.length + 11) {
  //         this.setData({
  //           pageSize: this.data.pageSize + 10,
  //         })
  //         this.getList();
  //       }
  //       //判断是否有未读消息
  //       var unreadOne = wx.getStorageSync('unreadOne');
  //       var isUnread = wx.getStorageSync('unread')
  //       if (this.data.messageList.length > 0) {//信息中心有数据时
  //         if (!(unreadOne.length > 0 && isUnread.length > 0)) {
  //           for (var k = 0; k < this.data.messageList.length; k++) {
  //             if (wx.getStorageSync('isNoread') == this.data.messageList[k].popupId) {//未点击过其他信息，或者未点击过弹窗
  //               this.setData({ x: 1 }); break;
  //             } if (wx.getStorageSync('isNoread') == unreadOne.popupId) {
  //               this.setData({ x: 0 })
  //             }
  //           }
  //         }
  //         if (isUnread.length > 0) {//点击过其他信息
  //           if (isUnread.length <= res.data.data.list.length) {
  //             for (var a = 0; a < res.data.data.list.length; a++) {
  //               for (var i = 0; i < isUnread.length; i++)
  //                 if (isUnread[i].popupId == res.data.data.list[a].popupId) {
  //                   if (isUnread[i].isShow == true) {
  //                     this.setData({ x: 0 })
  //                   } else if (isUnread[i].isShow !== true) {
  //                     this.setData({ x: 1 });
  //                     break;
  //                   }
  //                 }
  //             }
  //           } else if (isUnread.length > res.data.data.list.length) {
  //             hdd: for (var a = 0; a < res.data.data.list.length; a++) {
  //               for (var i = 0; i < isUnread.length; i++)
  //                 if (isUnread[i].popupId == res.data.data.list[a].popupId) {
  //                   if (isUnread[i].isShow == true) {
  //                     this.setData({ x: 0 })
  //                   } else if (isUnread[i].isShow !== true) {
  //                     this.setData({ x: 1 }); break hdd; //hdd第一个循环的名字，直接跳出第一个循环，当有一个未读时  
  //                   }
  //                 } break;
  //             }
  //           }
  //         } if (unreadOne.length > 0) {//点击过弹窗
  //           for (var c = 0; c < this.data.messageList.length; c++) {
  //             if (unreadOne.popupId == this.data.messageList[c].popupId) {
  //               if (unreadOne.isShow == true) {
  //                 this.setData({ x: 0 })
  //               } else if (unreadOne.isShow !== true) { this.setData({ x: 1 }); break; }
  //             }
  //           }
  //         }
  //       }
  //     })
  //   })
  // },
  //关闭popup弹窗
  closePhoto() {
    this.setData({
      termTitleTapdetail: false,
      tc_custom: false,
      tc_system: false,
    })
    var bindCache = wx.getStorageSync('bindCache');
    var popupAppear = this.data.popupAppear as any;
    /**
     *  当用户不想点击弹窗看，而且不想去看信息时,存入缓存，方便限制弹一次
     */
    bindCache.isNoread = popupAppear.popupId;
    wx.setStorageSync('bindCache', bindCache);
  },
  /**
   * 点击popup弹窗的图片或点击查看详情，进入具体的信息页面
   */
  loginInfo() {
    var bindCache = wx.getStorageSync('bindCache');
    bindCache.isNoread = '';
    var popupAppear = this.data.popupAppear as any;
    var termTitleTapdetail = false;
    var tc_custom = false;
    var tc_system = false;
    /**
     * 当此弹窗为不跳转的弹窗时
     */
    if (popupAppear.popupJumpType == 'noJump') {
      bindCache.noJump = popupAppear.popupId;
      termTitleTapdetail = false;
      tc_custom = false;
      tc_system = false;
    }
    /**
     * 当弹窗可以点击跳转时
     */
    else if (popupAppear.popupJumpType !== 'noJump') {
      /**
       * 当弹窗时微信推文时
       */
      if (popupAppear.popupJumpType == 'link') {
        bindCache.unreadOne = popupAppear;
        bindCache.Url = popupAppear.popupJumpUrl;
        wx.navigateTo({ url: '../message/web-view/webView' });
      }
      /**
       * 当弹窗是文本内容时
       */
      if (popupAppear.popupJumpType == 'article') {
        wx.navigateTo({
          url: '../message/messageInfo/messageInfo?popupId=' + popupAppear.popupId
        })
      }
    }

    if (popupAppear.popupId == bindCache.unreadOne.popupId) {
      termTitleTapdetail = false;
      tc_custom = false;
      tc_system = false;
    }
    if (popupAppear.popupId == bindCache.noJump.popupId) {
      termTitleTapdetail = false;
      tc_custom = false;
      tc_system = false;
    }
    if (popupAppear.popupId == bindCache.isNoread) {
      termTitleTapdetail = false;
      tc_custom = false;
      tc_system = false;
    }
    this.setData({
      termTitleTapdetail: termTitleTapdetail,
      tc_custom: tc_custom,
      tc_system: tc_system,
    });
    wx.setStorageSync('bindCache', bindCache);
  },
  /** 
    * 存入空数组，以存入其他缓存
    */
  getcache() {
    var bindCache = [{
      'unreadOne': {},
      'unread': [],
      'isNoread': '',
      'Time': '',
      'noJump': '',
      'Url': '',
    }]
    wx.setStorageSync('bindCache', bindCache)
  },
  /**
   * 初始化页面渲染函数
   */
  async initPageData() {
    /**
     * 获取本地缓存，判断是否绑定数据
     */
    var currentPage = this.data.currentPage;
    var pageSize = this.data.pageSize;
    var bindData = {
      currentPage: currentPage,
      pageSize: pageSize,
    } as popupeItem;
    this.getPopupData(bindData);
  },
  /**
  * 发送请求，渲染数据
  * @param from popup弹窗
  */
  async getPopupData(from: popupeItem) {
    const { data: popupAppear } = await getPopup(from) as unknown as IResult<any>;
    const { data: popupList } = await listPopup(from) as unknown as IResult<any>;
    console.log(popupList.list)
    console.log(popupAppear)
    // if (!popupAppear) { this.initPageData() }
    //if (popupAppear.popupId == null) { wx.removeStorageSync('Time'); }
    /**
     *数据处理
     */
    var bindCache = wx.getStorageSync('bindCache');
    var popupType = popupAppear.popupType; //popupType 弹窗类型（自定义图片、系统默认弹窗）
    var termTitleTapdetail = this.data.termTitleTapdetail;//蒙版的显示
    var tc_custom = this.data.tc_custom;//自定义图片是否显示
    var tc_system = this.data.tc_system;//系统默认弹窗是否显示
    /** 
     * 当弹窗类型为自定义图片（custom）时
     */
    if (popupType == 'custom') {
      termTitleTapdetail = true;
      tc_custom = true;
      tc_system = false;
    }
    /** 
     * 当弹窗类型为系统默认弹窗（system）时
     */
    else if (popupType == 'system') {
      termTitleTapdetail = true;
      tc_custom = false;
      tc_system = true;
    }
    if(bindCache.unreadOne !== undefined){
    /** 
     * 检测 今日出现的弹窗的ID是否出现过，并保存在缓存里
     */
    if (popupAppear.popupId == wx.getStorageSync('bindCache').unreadOne.popupId) {
        termTitleTapdetail= false;
        tc_custom= false;
        tc_system= false;
    }
    if (popupAppear.popupId == wx.getStorageSync('bindCache').noJump.popupId) {
        termTitleTapdetail= false;
        tc_custom= false;
        tc_system= false;
    }
    if (popupAppear.popupId == wx.getStorageSync('bindCache').isNoread) {
        termTitleTapdetail= false;
        tc_custom= false;
        tc_system= false;
    }
  }
    /** 
     * 避免两个同样ID的弹窗连续两天弹出。
     */
    var unreadOne = popupAppear;
    var arr = [unreadOne.popupFirstTime, unreadOne.popupSecondTime, unreadOne.popupSecondTime]
    for (var i = 0; i < 3; i++) {
      if (arr[i].substring(8, 10) == this.data.s1.substring(7, 10)) {
        if (this.data.s2.substring(7, 10) == arr[i + 1].substring(8, 10)) {
          if (wx.getStorageSync('bindCache').Time !== this.data.s2 || wx.getStorageSync('time') == 'undefined') {
            bindCache.Time = this.data.s1;
            bindCache.unreadOne = '';
            bindCache.isUnread = '';
          }
          break;
        }
      }
    }
    var popupImage = popupAppear.popupImage;
    this.setData({
      tc_custom: tc_custom,
      tc_system: tc_system,
      termTitleTapdetail: termTitleTapdetail,
      popupAppear: popupAppear,
      ima: 'http://' + popupImage,
    })
    bindCache.unreadOne = popupAppear;
    console.log(bindCache)
    wx.setStorageSync('bindCache', bindCache)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    /**
     * 计算昨天，今天，明天的时间，解决连续两天弹窗问题
     */
    //昨天的时间
    var day1 = new Date();
    day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
    var s1 = day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate();
    //今天的时间
    var day2 = new Date();
    day2.setTime(day2.getTime());
    var s2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
    //明天的时间
    var day3 = new Date();
    day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000);
    var s3 = day3.getFullYear() + "-" + (day3.getMonth() + 1) + "-" + day3.getDate();
    this.setData({
      s1: s1,
      s2: s2,
      s3: s3,
    })
  },
  /**
   * 获取学号和密码
   */
  getXh(e: any) { this.setData({ zh: e.detail.value }) },
  getMm(e: any) { this.setData({ mm: e.detail.value }) },
  /**
   * 点击完成按钮
   */
  login() { //模仿写出存入缓存
    var zh = this.data.zh;
    var mm = this.data.mm;
    wx.setStorageSync('zh', zh);
    wx.setStorageSync('mm', mm);
  },
  /**
   * 显示是否绑定页面
   */
  showBindDialog() {
    wx.navigateTo({
      url: '../message/messagePage/messagePage'
    })
    this.setData({
      showBindDialog: true
    })
  },
  /**
   * 关闭是否绑定页面
   */
  closeBindDialog() {
    this.setData({
      showBindDialog: false
    })
  },
  /**
   * 开启登录弹窗
   */
  showLoginDialog() {
    this.closeBindDialog();
    this.setData({
      showLoginDialog: true
    })
  },
  /**
   * 关闭登录弹窗
   */
  closeLoginDialog() {
    this.setData({
      showLoginDialog: false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // if (wx.getStorageSync('unreadOne').length > 0) {
    //   if (this.data.popupAppear.popupId == wx.getStorageSync('unreadOne').popupId) {
    //     if (wx.getStorageSync('unreadOne').isShow !== true) {
    //       this.initPageData();
    //     }
    //   } if (this.data.popupAppear.popupId !== wx.getStorageSync('unreadOne').popupId && wx.getStorageSync('unreadOne').length > 0) {

    //     this.initPageData();
    //   }
    //   if (this.data.popupAppear.popupId == wx.getStorageSync('unreadOne').popupId) {
    //     this.setData({
    //       termTitleTapdetail: false,
    //       tc_custom: false,
    //       tc2: false,
    //     })
    //   }
    // }

    // if (this.data.popupAppear.popupId == wx.getStorageSync('noJump').popupId) {
    //   this.setData({
    //     termTitleTapdetail: false,
    //     tc_custom: false,
    //     tc2: false,
    //   })
    // }
    // if (this.data.popupAppear.popupId == wx.getStorageSync('isNoread')) {
    //   this.setData({
    //     termTitleTapdetail: false,
    //     tc1: false,
    //     tc2: false,
    //   })
    // }


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var bindCache = wx.getStorageSync('bindCache');
    var popupAppear = this.data.popupAppear as any;
    var termTitleTapdetail = this.data.termTitleTapdetail;
    var tc_custom = this.data.tc_custom;
    var tc_system = this.data.tc_system;
    this.initPageData();
    this.getcache();
    var bindCache = wx.getStorageSync('bindCache');
    var popupAppear = this.data.popupAppear as any;
    /**
     * 当用户点击蒙版不看弹窗的时候，存入的缓存ID存在时
     */
    if (bindCache.isUnread !== undefined) {
      /**
       * 判断弹窗的Id是否与缓存中的Id相同
       */
      if (popupAppear.popupId == bindCache.isUnread.popupId) {
        /**
         * 判断缓存中的unreadOne，是否已读
         */
        if (bindCache.unreadOne.isShow !== true) {
          this.initPageData();
        }
      }
      /**
       * 判断缓存的Id是否等于弹窗的Id时
       */
      if (popupAppear.popupId !== bindCache.isUnread.popupId) {
        this.initPageData();
      }
      if (popupAppear.popupId == bindCache.isUnread.popupId) {
        termTitleTapdetail = false;
        tc_custom = false;
        tc_system = false;
      }
    } else {
      this.initPageData();
    }
    /**
     * 判断是否有点击弹窗存入的缓存
     */
    if (bindCache.unreadOne !== undefined) {
      /**
       * 判断弹窗是否与点击弹窗后存入的缓存unreadOne的ID是否相同
       */
      if (popupAppear.popupId == bindCache.unreadOne.popupId) {
        /**
         * 判断是否点击过弹窗
         */
        if (bindCache.unreadOne.isShow !== true) {
          this.initPageData();
        }
        if (bindCache.unreadOne.isShow == true) {
          this.setData({
            termTitleTapdetail: false,
            tc_custom: false,
            tc_system: false,
          })
        }
      }
      else if (popupAppear.popupId !== bindCache.unreadOne.popupId) {
        this.initPageData();
      }
    }
    if(bindCache.noJump !== undefined){
    /**
     * 判断是否与'不跳转'存入的缓存相同
     */
    if (popupAppear.popupId == bindCache.noJump.popupId) {
      termTitleTapdetail = false;
      tc_custom = false;
      tc_system = false;
    }
    /**
     * 判断是否与’不点击‘存入的缓存相同
     */
    if (popupAppear.popupId == bindCache.isNoread) {
      termTitleTapdetail = false;
      tc_custom = false;
      tc_system = false;
    }
  }
    this.setData({
      termTitleTapdetail: termTitleTapdetail,
      tc_custom: tc_custom,
      tc_system: tc_system,
    })
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