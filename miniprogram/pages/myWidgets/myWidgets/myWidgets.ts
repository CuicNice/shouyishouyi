// pages/myWidgets/myWidgets/myWidgets.ts
import { loginApi } from '../../../api/userAPI';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //topBar顶部的高度
    topBarBottom: 80,
    topBarRgb:'255,255,255,0',
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
    // 列表数据
    widgetMiniNewsList: [] as any,
    //电费查讯
    widgetsElectricChargeData: [] as any,
    showBindDialog: false, // 显示绑定弹窗
    showLoginDialog: false,// 显示登录弹窗
    termTitleTapdetail: false,//弹窗蒙版显示
    tc_system: false,//系统默认弹窗
    zh:'',
    mm:''
  },
  show() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
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

  
  onPageScroll(ev) {
    var scrollTop = ev.scrollTop;
    var screenHeight = this.data.screenHeight;
    var op = 1;
    if(screenHeight > scrollTop){
      let nowLocal = 1 - (screenHeight - scrollTop)/screenHeight;
      if(nowLocal < 0.1){
        op = nowLocal*30;
        if(op > 0.95) op = 1;
      }
    }
    this.setData({
      topBarRgb:'255,255,255,'+op
    })
  },
  /**
   * 显示是否绑定页面
   */
  showBindDialog() {
    if(wx.getStorageSync('login').zh !== undefined){
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
      showLoginDialog: false,
      zz:'',
      mm:''
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
  async login() { //模仿写出存入缓存
    var zh = this.data.zh;
    var mm = this.data.mm;
    if(zh!='' && mm != ''){
      let login = {
        zh:zh,
        mm:mm
      } as any
      this.selectComponent('#toast').showToast("登陆中", "lodding");
      const res = await loginApi(login) as unknown as IResult<any>;
      this.selectComponent('#toast').hiddenToast();

      if(res.code != 20000){
        this.selectComponent('#toast').showToastAuto(res.msg, "error", 2);
      }else{
        wx.setStorageSync('login', login);
        wx.setStorageSync('userInfo', res.data);
        this.closeLoginDialog();
        this.onLoad();
        this.setData({
          userName:res.data.name
        })
      }
    }else{
      this.selectComponent('#toast').showToastAuto('请输入完整', "error", 2);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var that = this;
    // 获取屏幕高度
    var windowHeight = wx.getSystemInfoSync().windowHeight;
    let login = wx.getStorageSync('login');
    let isLogin = false;
    let userName = wx.getStorageSync('userInfo').name;
    if(login){
      isLogin = true;
    }
    that.setData({
      windowHeight: windowHeight,
      isLogin:isLogin,
      userName:userName
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
    that.getTarHeighgt();//获取顶部的状态栏信息
    var myWidgetTabListTemp = that.data.myWidgetTabListTemp
    try {
      let localTemp = wx.getStorageSync('myWidgetTabList')
      if (localTemp != undefined && localTemp.length != 0) {
        myWidgetTabListTemp = wx.getStorageSync('myWidgetTabList')
      }
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