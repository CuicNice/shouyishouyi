// pages/myWidgets/myWidgets/myWidgets.ts
import { getBanner } from '../../api/bannerApi';
import { getPopup } from '../../api/popupApi';
import { listPopup } from '../../api/popupApi'
import { Consts } from '../../Consts';
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
  /**
   * 关闭popup弹窗
   */
  closePhoto() {
    this.setData({
      termTitleTapdetail: false,
      tc_custom: false,
      tc_system: false,
    })
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
    var termTitleTapdetail = false;//蒙版的显示
    var tc_custom = false;//自定义图片是否显示
    var tc_system = false;//系统默认弹窗是否显示
    var x = 0;//右上角爪子的颜色
    var ima = ''//自定义图片
    var popup = wx.getStorageSync('popup');
    /**
     * popupAppear弹窗逻辑部分
     */
    if (popupAppear) {
      var popupType = popupAppear.popupType; //popupType 弹窗类型（自定义图片、系统默认弹窗）
      //拿出缓存里的popup判断是否显示过
      if (popup.popupAppear == {} || popup.popupAppear.popupId !== popupAppear.popupId) {//利用||的阻塞性
        //自定义图片弹窗显示（system）
        if (popupType == 'system') {
          tc_system = true;
          termTitleTapdetail = true;
          ima = 'http://' + popupAppear.popupImage;
        }
        //系统弹窗显示（custom）
        if (popupType == 'custom') {
          tc_custom = true;
          termTitleTapdetail = true;
        }
        //存缓存
        popup.Time = this.data.s2
        popup.Url = popupAppear.popupJumpUrl;
        popup.unreadOne = popupAppear;//这个变量是不动的，方便查看后合并到list里
        popup.popupAppear = popupAppear;
        wx.setStorageSync('popup', popup);
      }

    }
    /**
     * popupList信息列表逻辑部分
     */
    if (popupList&&popupList.length > 0) {
      /**
       * 拿出缓存部分判断是否有未读消息
       */
      if (popup.popupList){
        //遍历数据，对比是否一样
        first: for (var a = 0; a < popup.popupList.length; a++) {
          for (var b = 0; b < popup.popupList.length; b++) {
            if (popupList[a].popupId == popup.popupList[b].popupId) {
              if (popup.popupList[b].isShow !== true) {
                x = 1; break first;
              }
            } if (popupList[a].popupId !== popup.popupList[b].popupId) {
              x = 0; continue;
            }
          }
        }
      }else {
        x = 1;
      }
    }
    this.setData({
      tc_custom: tc_custom,
      tc_system: tc_system,
      termTitleTapdetail: termTitleTapdetail,
      ima: ima,
      popupId: popupAppear?popupAppear.popupId:'',
      popupAppear: popupAppear,
      x: x,
    })
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
    var pop = wx.getStorageSync('popup');
    var popupAppear = pop.popupAppear as any;
    var termTitleTapdetail = false;
    var tc_custom = false;
    var tc_system = false;
    /**
     * 当此弹窗为不跳转的弹窗时
     */
    if (popupAppear.popupJumpType == 'noJump') {
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
        pop.Url = popupAppear.popupJumpUrl;
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
    this.setData({
      termTitleTapdetail: termTitleTapdetail,
      tc_custom: tc_custom,
      tc_system: tc_system,
    });
  },
  /** 
    * 存入空数组，以存入其他缓存
    */
  getcache() {
    var popup = {
      'popupList': '',
      'popupAppear': '',
      'Time': '',
      'Url': '',
      'unreadOne': '',
    }
    wx.setStorageSync('popup', popup);
  },
  /**
   * 点击左上角进入消息中心
   */
  loginMessage() {
    //登陆后才能进入信息中心
    if (wx.getStorageSync('login')) {
      wx.navigateTo({
        url: '../message/messagePage/messagePage'
      })
    }
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
    //获取时间
    this.getCurrentTime();
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
  popupOnShow() {
    var termTitleTapdetail = false;
    var tc_custom = false;
    var tc_system = false;
    this.initPageData();
    if (!wx.getStorageSync('popup')) {
      this.getcache();
    }
    //解决连续两天弹窗的问题
    var pop = wx.getStorageSync('popup');
    if (this.data.s2 !== pop.Time) {
      pop.popupAppear = '';
      wx.setStorageSync('popup', pop);
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