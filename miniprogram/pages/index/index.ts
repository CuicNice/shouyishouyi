// pages/myWidgets/myWidgets/myWidgets.ts
import { getBanner } from '../../api/bannerApi';
import { getPopup } from '../../api/popupApi';
import { listPopup } from '../../api/popupApi'
export interface popupeItem {
  currentPage: String,
  pageSize: String,
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //topBar顶部的高度
    topBarBottom: 80,
    topBarRgb: '255,255,255,0',
    //昨天，今天，明天的日期。
    s1: '',
    s2: '',
    s3: '',
    tc_custom: false,//自定义弹窗
    tc_system: false,//系统默认弹窗
    termTitleTapdetail: false,//弹窗蒙版显示
    currentPage: '1',//默认初始第一页数据
    popupAppear: '',//显示弹窗的数据
    listPopup: [],//信息的列表
    ima: '',//自定义弹窗的图片
    x: 0,//x为0时，爪子图案为黑色
    pageSize: '5',
    // 功能列表
    functionList: [
      {
        name: "全校课表",
        pageRouth: "/pages/allScedule/allScedule",
        icon: "https://introduce.mcdd.top/schoolBuilt/zhonglou.svg"
      },
      {
        name: "共同课表",
        pageRouth: "",
        icon: "https://introduce.mcdd.top/schoolBuilt/shoyiStanding.svg"
      },
      {
        name: "电费查询",
        pageRouth: "/pages/widgets/electricCharge/electricPage/electricPage",
        icon: "https://introduce.mcdd.top/schoolBuilt/zhongqutushuguan.svg"
      },
      {
        name: "图书查询",
        pageRouth: "/pages/widgets/library/libraryPage/libraryPage",
        icon: "https://introduce.mcdd.top/schoolBuilt/genlibrary.svg"
      },
      {
        name: "个性组件",
        pageRouth: "/pages/myWidgets/settingWidgets/settingWidgets",
        icon: "https://introduce.mcdd.top/schoolBuilt/jiayulibrary.svg"
      },
      {
        name: "成绩查询",
        pageRouth: "/pages/widgets/scoreInquiry/scoreInquiryPage/scoreInquiryPage",
        icon: "https://introduce.mcdd.top/schoolBuilt/setSail.svg"
      },
      {
        name: "首义通知",
        pageRouth: "/pages/widgets/news/newPage/newsList/list",
        icon: "https://introduce.mcdd.top/schoolBuilt/nanlibrary.svg"
      },
      {
        name: "倒计时",
        pageRouth: "/pages/widgets/countDown/countDownPage/countDownPage",
        icon: "https://introduce.mcdd.top/schoolBuilt/genlibrary.svg"
      },
      {
        name: "版本声明",
        pageRouth: "/pages/versionStatement/versionStatementPage/versionStatementPage",
        icon: "https://introduce.mcdd.top/schoolBuilt/jiayu_administorBuilding.svg"
      },
      {
        name: "联系我们",
        pageRouth: "",
        icon: "https://introduce.mcdd.top/schoolBuilt/tiyuguan.svg"
      }
    ],
    // 小组件页面
    indexTabListTemp: [{
      name: '每日课表',
      componentHeight: 252.52,
      svgSrc: '/static/svg/myWidget/weekSchedule.png',
      y: 0,
    },
    {
      name: '快讯闻',
      componentHeight: 272.84,
      svgSrc: '/static/svg/myWidget/miniNews.png',
      y: 0,
    },

    {
      name: '首义+倒计时',
      componentHeight: 119.07,
      svgSrc: '/static/svg/myWidget/countDown.png',
      y: 0,
    },
    {
      name: 'splitLine',//分割线上方展示在页面下方不展示
      componentHeight: 80,
      svgSrc: '/static/svg/myWidget/splitLine.png',
      y: 0
    },
    {
      name: '寝室电费',
      componentHeight: 117.66,
      svgSrc: '/static/svg/myWidget/electricCard.png',
      y: 0,
    },
    {
      name: '成绩单',
      componentHeight: 131.35,
      svgSrc: '/static/svg/myWidget/scoreCard.png',
      y: 0,
    }
    ], //移动元素区块
    /**
     * 成绩组件
     */
    widget_score: '',//请求到的每学期学年的成绩
    alljdxfs: '',//总学分加权平均分
    allxfscores: '',//总平均学分绩点
    semester: '',//学年学期
    scoreLevel: 0,//本学期称号

    /**
     * 状态；栏
     */
    screenHeight: 0,

    /**
     * 设置页面的动画
     */
    windowHeight: 0 as number,//屏幕高度
    settingWidgetTitle: "设置小组件",
    hiddenRemindBox: false, // 隐藏remindBox
    scrollTop: 20,
    /**
     * remindBox滑动参数
     */
    moveRemindBoxData: {
      remindMovecheck: false,//remindbox是否滑动的判断
      remindState: 0,    //0:初始状态 1:remindBox弹出中状态 2:remindBox弹入状态中 3:remindBox弹出状态
      remindFirstTouchY: 0,  //首次触摸Y坐标值
      remindTouchCheckY: 60,  //触发滑动的触摸Y
      remindMoveY: 0,   // 滑动操作纵向的移动距离
      remindMaxMoveY: (200 - 60), //抽屉remindBox最大移动距离
      remindLastTranlateY: 0  //上次动画效果的平移距离，用于校准top值
    } as any,
  },
  /**
   * 这是tapbar的消抖函数，必须得有的
   */
  show() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
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
    this.initPageData();
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
    /**
     *数据处理
     */
    var bindCache = wx.getStorageSync('bindCache');
    var termTitleTapdetail = this.data.termTitleTapdetail;//蒙版的显示
    var tc_custom = this.data.tc_custom;//自定义图片是否显示
    var tc_system = this.data.tc_system;//系统默认弹窗是否显示
    var x = this.data.x;//右上角爪子的颜色
    if (popupAppear !== null) {
      var popupType = popupAppear.popupType; //popupType 弹窗类型（自定义图片、系统默认弹窗）
      var popupImage = popupAppear.popupImage;
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
      if (bindCache.unreadOne !== '') {
        /** 
         * 检测今日出现的弹窗的ID是否出现过，并保存在缓存里
         */
        if (popupAppear.popupId == wx.getStorageSync('bindCache').unreadOne.popupId) {
          termTitleTapdetail = false;
          tc_custom = false;
          tc_system = false;
        }
        if (popupAppear.popupId == wx.getStorageSync('bindCache').noJump.popupId) {
          termTitleTapdetail = false;
          tc_custom = false;
          tc_system = false;
        }
        if (popupAppear.popupId == wx.getStorageSync('bindCache').isNoread) {
          termTitleTapdetail = false;
          tc_custom = false;
          tc_system = false;
        }
      }
    }
    /**
     * 如果不是连续两天的，则清除存入缓存的time
     */
    if (popupAppear == null) {
      bindCache.Time = '';
    }
    /** 
     * 避免两个同样ID的弹窗连续两天弹出。
     */
    var unreadOne = popupAppear as any;
    if (unreadOne) {
      var arr = [unreadOne.popupFirstTime, unreadOne.popupSecondTime, unreadOne.popupSecondTime]
      for (var i = 0; i < 3; i++) {
        if (arr[i].slice(8, 10) == this.data.s1.slice(7, 10)) {
          if (this.data.s2.slice(7, 10) == arr[i + 1].slice(8, 10)) {
            if (wx.getStorageSync('bindCache').Time !== this.data.s2 || wx.getStorageSync('bindCache').Time == '') {
              bindCache.Time = this.data.s1;
              bindCache.unreadOne = '';
              bindCache.isUnread = '';
            }
            break;
          }
        }
      }
    }

    /**
     * 判断是否有未读消息，从而判断右上角爪子是否为红色
     */
    if (popupList.list !== []) {
      bindCache.unread = popupList.list;
      /**
       * 用户没点击过弹窗，也没点击过空白处
       */
      if (!(bindCache.unread.length > 0 && bindCache.unreadOne.length > 0)) {
        for (var k = 0; k < popupList.list.length; k++) {
          if (bindCache.isNoread == popupList.list[k].popupId) {//未点击过其他信息，或者未点击过弹窗
            console.log(1)
            x = 1; break;
          } if (bindCache.isNoread == bindCache.unreadOne.popupId) {
            x = 0
          }
        }
      }
      if (bindCache.unread !== '') {//点击过其他信息
        if (bindCache.unread.length <= popupList.list.length) {
          for (var a = 0; a < popupList.list.length; a++) {
            for (var i = 0; i < bindCache.unread.length; i++)
              if (bindCache.unread[i].popupId == popupList.list[a].popupId) {
                if (bindCache.unread[i].isShow == true) {
                  x = 0
                } else if (bindCache.unread[i].isShow !== true) {
                  x = 1;
                  break;
                }
              }
          }
        } else if (bindCache.unread.length > popupList.list.length) {
          hdd: for (var a = 0; a < popupList.list.length; a++) {
            for (var i = 0; i < bindCache.unread.length; i++)
              if (bindCache.unread[i].popupId == popupList.list[a].popupId) {
                if (bindCache.unread[i].isShow == true) {
                  x = 0
                } else if (bindCache.unread[i].isShow !== true) {
                  x = 1; break hdd; //hdd第一个循环的名字，直接跳出第一个循环，当有一个未读时  
                }
              } break;
          }
        }
      } if (bindCache.unreadOne.length > 0) {//点击过弹窗
        for (var c = 0; c < popupList.list.length; c++) {
          if (bindCache.unreadOne.popupId == popupList.list[c].popupId) {
            if (bindCache.unreadOne.isShow == true) {
              x = 0
            } else if (bindCache.unreadOne.isShow !== true) { x = 1; break; }
          }
        }
      }
    }

    this.setData({
      tc_custom: tc_custom,
      tc_system: tc_system,
      termTitleTapdetail: termTitleTapdetail,
      popupAppear: popupAppear,
      listPopup: popupList,
      ima: 'http://' + popupImage,
      x: x,
    })
    wx.setStorageSync('bindCache', bindCache)
  },
  /**
 * 显示是否绑定页面
 */
  showBindDialog() {
    if (wx.getStorageSync('login').zh !== undefined) {
      wx.navigateTo({
        url: '../message/messagePage/messagePage'
      })
    }
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
     * 计算昨天，今天，明天的时间，解决连续两天弹窗问题
     */
  getCurrentTime() {

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
    var bindCache = {
      'unreadOne': {},
      'unread': [],
      'isUnread': [],
      'isNoread': '',
      'Time': '',
      'noJump': '',
      'Url': '',
    }
    wx.setStorageSync('bindCache', bindCache);
  },
  // 页面跳转
  goToPage(e: any) {
    var path = e.currentTarget.dataset.path;
    wx.navigateTo({
      url: path
    })
  },
  /**
   * banner点击事件
   */
  bannerTap(e: any) {
    let tapThins = e.detail;
    if (tapThins.bannerType == "miniLink") {
      wx.navigateTo({
        url: tapThins.bannerContent
      })
    } else if (tapThins.bannerType == "article") {
      wx.setStorage({
        key: "widget-banner",
        data: tapThins,
        success() {
          wx.navigateTo({ url: "/pages/indexText/indexText" })
        }
      })
    }
  },
  /**
   * 获取顶部的状态栏的信息
   */
  getTarHeighgt() {
    // 获取胶囊的信息
    const menuButton = wx.getMenuButtonBoundingClientRect()
    const menuButtonHeight = menuButton.height;
    const menuButtonTop = menuButton.top;
    // 获取设备的信息  
    let systemInfo = wx.getSystemInfoSync()
    // 获得屏幕高度
    let screenHeight = systemInfo['screenHeight'];
    // 获取信号区高度
    let statusBarHeight = systemInfo['statusBarHeight']
    // 设置胶囊行的高度
    const capsuleBoxHeight = menuButtonHeight + (menuButtonTop - statusBarHeight) * 2;
    /* 
    根据我的测验，实际的信号区高度在真机上表现与于实际的不服，所以我们这里还需要根据不同的设备进行调整
    开发工具 = 获取的高度
    安卓真机 = 获取的高度 + 1
    苹果真机 = 获取的高度 - 1
    我本人这里也只测试了iPhonex 华为和小米手机，
    如果有出入根据实际情况进行调整就行了
    */
    if (systemInfo.model === 'andorid') {
      statusBarHeight = statusBarHeight + 1
    } else if (systemInfo.platform === 'ios') {
      statusBarHeight = statusBarHeight - 2
    } else {
      statusBarHeight = statusBarHeight
    }
    var topBarBottom = statusBarHeight + capsuleBoxHeight
    this.setData({
      capsuleBoxHeight,
      statusBarHeight,
      screenHeight,
      topBarBottom,
    })

  },
  /**
   * 滑动remindBox消失
   */
  remindBartouchStart: function (e: any) {
    /**
     * 
     * 滑动触发函数
     */
    var that = this
    var data = that.data.moveRemindBoxData;
    var clientY = e.touches[0].clientY;
    //初识状态
    if (data.remindState === 0) {
      //remindBox弹出状态
      if (clientY <= data.remindTouchCheckY && clientY > 20) {
        data.check = true;
        data.remindState = 1;
        data.remindFirstTouchY = clientY;
      }
    } else if (data.remindState === 3) {
      if (clientY >= data.remindMaxMoveY) {
        data.check = true;
        data.remindState = 2;
        data.remindFirstTouchY = clientY;
      }
    } else {
    }
  },
  async getBannerList() {
    var that = this;
    const res = await getBanner({
      currentPage: 1,
      pageSize: 5
    }) as unknown as IResult<any>;
    if (res.code == 20000) {
      let list = res.data.list;
      for (let i = 0; i < list.length; i++) {
        list[i].src = "https://" + list[i].bannerImage;
      }
      that.setData({
        bannerList: res.data.list
      })
    } else {
      console.log(res)
    }
  },
  onPageScroll(ev) {
    var scrollTop = ev.scrollTop;
    var screenHeight = this.data.screenHeight;
    var op = 1;
    if (screenHeight > scrollTop) {
      let nowLocal = 1 - (screenHeight - scrollTop) / screenHeight;
      if (nowLocal < 0.1) {
        op = nowLocal * 30;
        if (op > 0.95) op = 1;
      }
    }
    this.setData({
      topBarRgb: '255,255,255,' + op
    })
  },
  /**
   * 用户登录
   */
  gotoLogin() {
    wx.navigateTo({
      url: "/pages/login/login"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var that = this;
    // 获取屏幕高度
    var windowHeight = wx.getSystemInfoSync().windowHeight;
    this.getBannerList();
    that.setData({
      windowHeight: windowHeight,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },
  /**

  /**
   * 删除spplitLline后面的数据
   */
  deleteBelowSplitWidget(listTemp: AnyArray) {
    var tempWigetList = listTemp;
    var splitTag = -1;
    for (var i = 0; i < tempWigetList.length; i++) {
      if (tempWigetList[i].name == "splitLine") {
        splitTag = i;
        break;
      }
    }
    if (tempWigetList.length != 0 && tempWigetList && splitTag != -1) {
      tempWigetList.splice(splitTag)
    }
    return tempWigetList
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that = this;
    this.show();
    this.popupOnShow();
    that.getTarHeighgt();//获取顶部的状态栏信息
    let login = wx.getStorageSync('login');
    let isLogin = false;
    let userName = wx.getStorageSync('userInfo').name;
    if (login) {
      isLogin = true;
    }
    var indexTabListTemp = that.data.indexTabListTemp
    let localTemp = wx.getStorageSync('indexTabList')
      if (localTemp != undefined && localTemp.length != 0) {
        indexTabListTemp = wx.getStorageSync('indexTabList')
      }
    that.setData({
      isLogin: isLogin,
      userName: userName,
      indexTabListTemp: that.deleteBelowSplitWidget(indexTabListTemp)//数据存到data中
    })
  },
    /**
   * popup的一些onshow处理逻辑
   */
  popupOnShow(){
    var bindCache = wx.getStorageSync('bindCache');
    var popupAppear = this.data.popupAppear as any;
    var termTitleTapdetail = this.data.termTitleTapdetail;
    var tc_custom = this.data.tc_custom;
    var tc_system = this.data.tc_system;
    this.initPageData();
    if(!wx.getStorageSync('bindCache')){
          this.getcache();
    }
    /**
     * 当用户点击蒙版不看弹窗的时候，存入的缓存ID存在时
     */
    if (bindCache.isNoread !== '') {
      /**
       * 判断弹窗的Id是否与缓存中的Id相同
       */
      if (popupAppear.popupId == bindCache.unreadOne.popupId) {
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
      if (popupAppear.popupId !== bindCache.unreadOne.popupId) {
        this.initPageData();
      }
      if (popupAppear.popupId == bindCache.unreadOne.popupId) {
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
    if (bindCache.unreadOne !== '') {
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
    if (bindCache.noJump !== '') {
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