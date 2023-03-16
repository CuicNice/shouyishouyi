// pages/myWidgets/myWidgets/myWidgets.ts
// 接口请求部分
export interface ScoreCompontItem {
  zh: string,
  mm: string,
};
import {
  // 内网新闻
  getInnerNewsListitem,
  // 外网新闻
  getOutNewsListitem,
} from "../../../api/newsApi"
// 请求数据定义
/**
 * 电费
 */
import { getElectric } from '../../../api/electricChargeApi';
import { widgetScore } from "../../../api/scoreInquiryApi";
interface innernewsListItem {
  "currentPage": string,
  "pageSize": string
}
interface outnewsListItem {
  "currentPage": string,
  "pageSize": string
}

export {
  innernewsListItem,
  outnewsListItem
}
/**
 * 电费
 */
export interface ElectriceItem {
  build: string,
  room: string
}
interface NodeSizeItem {
  width: number,
  height: number
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //topBar顶部的高度
    topBarBottom:80,
    // 小组件页面
    myWidgetTabListTemp: [{
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
      y: 0,

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
    /**
     * 新闻组件
     */
    // 内网：
    innerPageParams: {
      "currentPage": "1",
      "pageSize": "3"
    } as unknown as outnewsListItem,
    // 外网
    outPageParams: {
      "currentPage": "1",
      "pageSize": "3"
    } as unknown as outnewsListItem,
    tapbarCtrl: true as Boolean,
    // 列表数据
    widgetMiniNewsList: [] as any,
    //电费查讯
    widgetsElectricChargeData: [] as any,
  },
  /**新闻
   * 
   */
  /**
  * 发送请求，渲染数据
  * @param from 成绩
  */
  async getUserInfoData(from: ScoreCompontItem) {
    const { data: widget_score } = await widgetScore(from) as unknown as IResult<any>;
    var semester = this.data.semester;
    var score = '' as unknown as number;//本学期成绩
    /**
     * 展示本学期称号，如果本学期暂无成绩，则展示近学期的成绩称号
     */
    if (semester == '大一上') {
      score = widget_score.one.sxqall[0].xqxfscore;
    }
    else if (semester == '大一下') {
      score = widget_score.one.xxqall[0].xqxfscore;
      if (widget_score.one.xxqall[0].xqxfscore == 'None') {
        score = widget_score.one.sxqall[0].xqxfscore;
        semester = '大一上';
      }
    }
    else if (semester == '大二上') {
      score = widget_score.two.sxqall[0].xqxfscore;
      if (widget_score.two.sxqall[0].xqxfscore == 'None') {
        score = widget_score.one.xxqall[0].xqxfscore;
        semester = '大一下';
      }
    }
    else if (semester == '大二下') {
      score = widget_score.two.xxqall[0].xqxfscore;
      if (widget_score.two.xxqall[0].xqxfscore == 'None') {
        score = widget_score.two.sxqall[0].xqxfscore;
        semester = '大二上';
      }
    }
    else if (semester == '大三上') {
      score = widget_score.three.sxqall[0].xqxfscore;
      if (widget_score.three.sxqall[0].xqxfscore == 'None') {
        score = widget_score.two.xxqall[0].xqxfscore;
        semester = '大二下';
      }
    }
    else if (semester == '大三下') {
      score = widget_score.three.xxqall[0].xqxfscore;
      if (widget_score.three.xxqall[0].xqxfscore == 'None') {
        score = widget_score.three.sxqall[0].xqxfscore;
        semester = '大三上';
      }
    }
    else if (semester == '大四上') {
      score = widget_score.four.sxqall[0].xqxfscore;
      if (widget_score.four.sxqall[0].xqxfscore == 'None') {
        score = widget_score.three.xxqall[0].xqxfscore;
        semester = '大三下';
      }
    }
    else if (semester == '大四下') {
      score = widget_score.four.xxqall[0].xqxfscore;
      if (widget_score.four.xxqall[0].xqxfscore == 'None') {
        score = widget_score.four.sxqall[0].xqxfscore;
        semester = '大四上';
      }
    }
    /**
     * 传值给scoreLevel方法，判断称号显示
     */
    this.scoreLevels(score);
    this.setData({
      widget_score: widget_score,
      allxfscores: widget_score.allscore.allxfscores,
      alljdxfs: widget_score.allscore.alljdxfs,
      semester: semester,
    });
  },
  /**
   * 变化等级称号
   */
  scoreLevels(score: number) {
    var scoreLevel = this.data.scoreLevel as unknown as number;
    if (score >= 90) {
      scoreLevel = 1;
    } else if (score >= 85 && score < 90) {
      scoreLevel = 2;
    } else if (score >= 80 && score < 85) {
      scoreLevel = 3;
    } else if (score >= 70 && score < 80) {
      scoreLevel = 4;
    } else if (score >= 60 && score < 70) {
      scoreLevel = 5;
    } else if (score <= 60 && score >= 0) {
      scoreLevel = 6;
    } else {
      scoreLevel = 0;
    }
    this.setData({ scoreLevel: scoreLevel });
  },
  /**
   * 获取目前的学年学期 如大一下
   */
  getScoreTime() {
    /**
    * 获取当前年月
    */
    var timestamp = Date.parse(new Date() as unknown as string);
    var date = new Date(timestamp);
    var Y = date.getFullYear() as unknown as string;//年份
    var M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1) as unknown as string; //月份
    /**
     * 进行当前学期的判断
     */
    var year = 0;//储存年份的变量
    var schoolTime;//学期名
    if (8 <= parseInt(M) && parseInt(M) <= 12) {
      year = year + parseInt(Y) + 1;
    }
    if (1 <= parseInt(M) && parseInt(M) < 2) {
      year = year + parseInt(Y);
    }
    if (2 <= parseInt(M) && parseInt(M) < 8) {
      year = year + parseInt(Y);
    }
    if ((Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 4 && 8 <= parseInt(M) && parseInt(M) <= 12) || (Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 4 && 1 <= parseInt(M) && parseInt(M) < 2)) {
      schoolTime = '大四上';
    }
    if (Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 4 && 2 <= parseInt(M) && parseInt(M) < 8) {
      schoolTime = '大四下';
    }
    if ((Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 3 && 8 <= parseInt(M) && parseInt(M) <= 12) || (Y as unknown as number - wx.getStorageSync('zh').slice(0, 4) == 3 && 1 <= parseInt(M) && parseInt(M) < 2)) {
      schoolTime = '大三上';
    }
    if (Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 3 && 2 <= parseInt(M) && parseInt(M) < 8) {
      schoolTime = '大三下';
    }
    if ((Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 2 && 8 <= parseInt(M) && parseInt(M) <= 12) || (Y as unknown as number - wx.getStorageSync('zh').slice(0, 4) == 2 && 1 <= parseInt(M) && parseInt(M) < 2)) {
      schoolTime = '大二上';
    }
    if (Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 2 && 2 <= parseInt(M) && parseInt(M) < 8) {
      schoolTime = '大二下';
    }
    if ((Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 1 && 8 <= parseInt(M) && parseInt(M) <= 12) || (Y as unknown as number - wx.getStorageSync('zh').slice(0, 4) == 1 && 1 <= parseInt(M) && parseInt(M) < 2)) {
      schoolTime = '大一上';
    }
    if (Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 1 && 2 <= parseInt(M) && parseInt(M) < 8) {
      schoolTime = '大一下';
    }
    this.setData({
      semester: schoolTime,
    });
  },
  /**
   * 新闻结束
   */
  /**
  * 初始化页面渲染函数
  */
  async initPageData() {
    /**
     * 获取本地缓存
     */
    var bindData = {
      zh: wx.getStorageSync('login').zh,//缓存里的账号
      mm: wx.getStorageSync('login').mm,//缓存里的密码
    } as ScoreCompontItem;
    this.getUserInfoData(bindData);
  },
  /**
   * 
   * 新闻组件
   */
  async getInnerSchoolNews() {
    let that = this
    wx.showLoading({
      title: '正在加载...',
    });
    // 获取内网新闻
    let innerPageParams = that.data.innerPageParams
    let { data: innerRes } = await getInnerNewsListitem(innerPageParams) as unknown as IResult<any>;
    if (innerRes != null) {
      wx.hideLoading();
      let widgetMiniNewsList = innerRes.list;
      that.setData({
        widgetMiniNewsList: widgetMiniNewsList, //当天的
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
    const menuButtonWidth = menuButton.width;
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
    var topBarBottom=statusBarHeight+capsuleBoxHeight
    this.setData({
      capsuleBoxHeight,
      statusBarHeight,
      screenHeight,
      topBarBottom,
    })

  },
  /**
   * 电费请求
   */
  async webrequest() {
    /**
     * 获取组件内部要求的组件请求参数，进行网络请求
     */
    var value = wx.getStorageSync('widgets-electricCharge') as ElectriceItem;
    const { data: widgetsElectricChargeRes } = await getElectric(value) as unknown as IResult<any>;
    this.setData({
      widgetsElectricChargeData: widgetsElectricChargeRes
    })
  },
  // 页面监听组件TapBar
  handleEventListener: function (e: any) {
    var that = this
    //将组件B传递的tapbarCtrl通过e.detail.tapbarCtrl来获取
    this.setData({
      tapbarCtrl: e.detail.tapbarCtrl
    })
    // 初始化数据
    that.initNewsInfo()
  },
  // 外网首义
  async getOutSouyiNews() {
    // 发起网络请求
    /**
 * 发送请求，渲染数据
 * @param from 楼栋数据
 */
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    let that = this
    let outPageParams = that.data.outPageParams
    let { data: outRes } = await getOutNewsListitem(outPageParams) as unknown as IResult<any>;
    if (outRes.pageSize != 0) {
      var widgetMiniNewsList = outRes.list;
    } else {
      wx.showToast({
        title: '刷新失败',
        icon: 'error',
        duration: 1500
      })
      wx.hideToast();
    }
    that.setData({
      widgetMiniNewsList: widgetMiniNewsList,
    })
  },
  // 初始化新闻页面的数据
  async initNewsInfo() {
    // 根据tapBar初始值
    var that = this
    if (that.data.tapbarCtrl) {
      await that.getInnerSchoolNews()
    } else {
      // 外网请求
      await that.getOutSouyiNews()
    }
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
  /**
   * 
   * 滑动过程
   */
  remindTouchmove: function (e: any) {
    /**
     * 滑动过程控制
     */
    var that = this
    var data = that.data.moveRemindBoxData;
    if (data.check) {
      var mainPageTop = 0, drawerMenuLeft = 0;
      var remindMoveY = e.touches[0].clientX - data.remindFirstTouchY;
      if (data.remindState === 1) {
        //处理边界状态
        if (remindMoveY < 0) {
          remindMoveY = 0;
        }
        if (remindMoveY > data.remindMaxMoveY) {
          remindMoveY = data.remindMaxMoveY;
        }
        if (remindMoveY >= 0 && remindMoveY <= data.remindMaxMoveY) {
          data.remindMoveY = remindMoveY;
          remindMoveY = remindMoveY - data.remindLastTranlateY;
          mainPageTop = remindMoveY;
          drawerMenuLeft = -800 + remindMoveY;
        }
      }
      else if (data.remindState === 2) {
        //处理边界状态
        if (remindMoveY > 0) {
          remindMoveY = 0;
        }
        if (remindMoveY < -data.remindMaxMoveY) {
          remindMoveY = -data.remindMaxMoveY;
        }
        if (remindMoveY <= 0 && remindMoveY >= -data.remindMaxMoveY) {
          data.remindMoveY = remindMoveY;
          remindMoveY = remindMoveY - data.remindLastTranlateY;
          //px转为rpx
          var remindMaxMoveY = data.remindMaxMoveY;
          mainPageTop = remindMaxMoveY + remindMoveY;
          drawerMenuLeft = remindMaxMoveY - 800 + remindMoveY;
        }
      }

      this.setData({
        mainPageTop: mainPageTop,
        drawerMenuLeft: drawerMenuLeft
      });

    }

  },

  /**
   * 
   * 滑动结束控制
   */
  remindBartouchEnd: function (e: any) {
    var that = this
    var data = that.data.moveRemindBoxData;
    if (!data.check) {
      return;
    }
    data.check = false;
    data.remindFirstTouchY = 0;
    var remindMoveY = data.remindMoveY;
    data.remindMoveY = 0;
    var animation = wx.createAnimation({ duration: 100 });
    var translateY = 0;
    var mainPageTop = 0;
    var windowWidth = that.data.windowHeight; //获取屏幕的高度
    if (data.remindState === 1) {
      if (remindMoveY === 0 || remindMoveY === data.maxremindMoveY) {
        data.remindState = (remindMoveY === 0) ? 0 : 3;
        return;
      }
      mainPageTop = remindMoveY;
      //滑动距离是否超过窗口宽度一半
      if (mainPageTop > (that.data.windowHeight / 2)) {
        translateY = data.maxremindMoveY - remindMoveY;
        data.remindState = 3;
      }
      else {
        translateY = -remindMoveY;
        data.remindState = 0;
      }
    }
    else if (data.remindState === 2) {
      if (remindMoveY === 0 || remindMoveY === -data.maxremindMoveY) {
        data.remindState = (remindMoveY === 0) ? 3 : 0;
        return;
      }
      //滑动距离是否超过窗口宽度一半
      mainPageTop = data.maxremindMoveY + remindMoveY
      if (mainPageTop > (that.data.windowHeight / 2)) {
        translateY = -remindMoveY;
        data.remindState = 3;
      }
      else {
        translateY = -mainPageTop;
        data.remindState = 0;
      }
    }
    translateY += data.lastTranlateX;
    data.lastTranlateX = translateY;
    animation.translateY(translateY).step();// step * 表示一组动画完成。可以在一组动画中调用任意多个动画方法，一组动画中的所有动画会同时开始，一组动画完成后才会进行下一组动画。 */
    this.setData({
      animationData: animation.export()
    });
  },
  onPageScroll(ev) {
    var that = this
    if (ev.scrollTop <= 0) {
      // 使用CSS选择器
      ev.scrollTop = 0;
    } else if (ev.scrollTop > that.data.windowHeight) {
      ev.scrollTop = wx.getSystemInfoSync().windowHeight;
    }
    if (ev.scrollTop > this.data.scrollTop || ev.scrollTop == wx.getSystemInfoSync().windowHeight) {
      this.setData({
        hiddenRemindBox: true
      })
    } else {
      this.setData({
        hiddenRemindBox: false
      })
    }
    setTimeout(() => {
      this.setData({
        scrollTop: ev.scrollTop
      })
    }, 0)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var that = this

    // 获取屏幕高度
    // TODO: 迁移到app.js中因为已经多处调用
    var windowHeight = wx.getSystemInfoSync().windowHeight;
    that.setData({
      windowHeight: windowHeight
    })
    //组件序列
    var myWidgetTabListTemp = that.data.myWidgetTabListTemp
    try {
      myWidgetTabListTemp = wx.getStorageSync('myWidgetTabList')
    } catch {
    }
    myWidgetTabListTemp=that.deleteBelowSplitWidget(myWidgetTabListTemp)//数据存到data中
    that.setData({
      myWidgetTabListTemp: myWidgetTabListTemp
    })

    that.initNewsInfo()//初始化新闻
    that.initPageData();//初始化成绩
    that.getScoreTime();//初始化成绩
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
  deleteBelowSplitWidget(listTemp:AnyArray) {
    var that = this
    var tempWigetList = listTemp
    var myWidgetTabListTemp = [] as AnyArray
    var splitTag = 0
    for (var i = 0; i < tempWigetList.length; i++) {
      if (tempWigetList[i].name == "splitLine") {
        splitTag = i
      }
    }
    if(tempWigetList.length!=0&&tempWigetList){
      tempWigetList.splice(splitTag)
    }
    return tempWigetList
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that = this
    that.webrequest();//电费
    that.getTarHeighgt();//获取顶部的状态栏信息
    var myWidgetTabListTemp = that.data.myWidgetTabListTemp
    try {
      myWidgetTabListTemp = wx.getStorageSync('myWidgetTabList')
    } catch {
    }
    that.setData({
      myWidgetTabListTemp: that.deleteBelowSplitWidget(myWidgetTabListTemp)//数据存到data中
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
   * 点击跳转
   */
  toSettingPage() {
    wx.navigateTo({
      'url': "/pages/myWidgets/settingWidgets/settingWidgets"
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})