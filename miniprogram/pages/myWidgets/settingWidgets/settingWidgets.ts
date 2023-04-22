Page({
  /**
   * 页面的初始数据
   */

  data: {
    topBarBottom: 80,//topBar顶部的高度
    settingIndexWIidgetTitle: "设置小组件",
    schoolBuiltSrc: 'https://introduce.mcdd.top/schoolBuilt/jiayu_administorBuilding.svg',
    isChooseIndexSeetingWidget: true,
    cancelSettingName: "取消",
    certainSettingName: "保存",
    dialogtitle: "是否保存修改",
    showDialog: false,//修改弹窗
    settingWidgetTitle: "设置小组件",
    scrollTop: 40,
    isRemindDisplayTag: true,
    // 滑动检测
    pageScrollState: 1,
    //屏幕高度问题
    remindHeight: 56,
    remindOpacity: 1,
    windowHeight: 0,
    screenHeight: 0,
    topVarTop: 192,
    nowItem: null,
    tag: true,
    moveItemRightSvg: "/static/svg/myWidget/choose.svg", //右边按钮
    tmpH: 174,
    // 主页小组件
    indexTabListTemp: [{
      name: '每日课表',
      componentHeight: 250.52,
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
      name: 'splitLine',//分割线上方展示在页面下方不展示
      componentHeight: 80,
      svgSrc: '/static/svg/myWidget/splitLine.png',
      y: 0,

    },
    {
      name: '首义+倒计时',
      componentHeight: 119.07,
      svgSrc: '/static/svg/myWidget/countDown.png',
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
    tabList: [{
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
      name: 'splitLine',//分割线上方展示在页面下方不展示
      componentHeight: 80,
      svgSrc: '/static/svg/myWidget/splitLine.png',
      y: 0,

    },
    {
      name: '首义+倒计时',
      componentHeight: 119.07,
      svgSrc: '/static/svg/myWidget/countDown.png',
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
    //移动的是哪个元素块
    moveId: -1, //移动块ID,为了不影响其他的滑块暂时给数值为-1
    lastY: null,
    enable: false
  },
  /**
   * 设置弹窗取消
   */
  cancelSetting() {
    /**
     * 数据不存
     */
    var that = this
    that.setData({
      showDialog: false//关闭弹窗
    })
  },
  /**
   * 顶部的状态栏
   */
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
      topBarBottom,
    })

  },
  /**
   * 设置弹窗确定
   */
  certainSetting() {
    /**
 * 数据存储
 */
    var that = this
    that.setData({
      showDialog: false//关闭弹窗
    })
    //1、判断是那个地方的更改
    if (that.data.isChooseIndexSeetingWidget) {
      try {
        // 2、存储
        wx.setStorageSync('indexTabList', that.data.tabList)
        // 3、存储成功后操作
        that.selectComponent("#toast").showToastAuto("保存成功", "success", 1);
      } catch (e) {
        // 失败模态窗
        that.selectComponent("#toast").showToastAuto("保存失败", "error", 1);
      }
    } else {
      try {
        wx.setStorageSync('myWidgetTabList', that.data.tabList)
        that.selectComponent("#toast").showToastAuto("保存成功", "success", 1);
      } catch (e) {
        // 失败模态窗
        that.selectComponent("#toast").showToastAuto("保存失败", "error", 1);
      }

    }
  },
  /*
   * 选择主页组件还是我组件页面设置
   */
  chooseSeetingWidget() {
    /**
     * 选择组件页面设置
     */
    var that = this
    that.setData({
      isChooseIndexSeetingWidget: true
    })
    that.initTablistData()
    var tabList = that.data.tabList//顺序需要注意
    that.initSortData(tabList);//初始化主页排序的数组
  },
  /**
   * 选择主页小组件
   */
  chooseIndexWidget() {
    /**
     * 选择组件页面设置
     */
    var that = this
    that.setData({
      isChooseIndexSeetingWidget: false //选择主页组件设置
    })
    that.initTablistData()
    var tabList = that.data.tabList//顺序需要注意
    that.initSortData(tabList);//初始化主页排序的数组
  },
  /**
   * 
   * 初始化排序
   */
  initSortData(tabList: AnyArray) {
    var height = 0;
    var ls = [];
    for (var i = 0; i < tabList.length; i++) {
      var obj = tabList[i];
      obj.y = height; //当前元素的高度
      ls.push(obj); //增加一个对象
      height = height + obj.componentHeight + 17; //计算下一个滑动区块高度
    }
    this.setData({
      tabList: ls,
      viewHeight: height
    })
  },
  //计算位置
  moveStatus(e: any) {
    if (e.type == 'touchmove' && this.data.enable) {
      //最终坐标
      var y = e.changedTouches[0].pageY; //鼠标在页面上的位置,从页面左上角开始,即是以页面为参考点,不随滑动条移动而变化；
      var clientY = e.changedTouches[0].clientY; //鼠标的可视化范围（鼠标点击的可见范围）
      var nowItem = null;
      var tabList = this.data.tabList;
      tabList.forEach(function (obj, i) {
        if (y > obj.y + 300 && y < (obj.y + obj.componentHeight) + 300) {
          nowItem = i; //如果鼠标页面高度属于改选取块上下高度范围内》》标记该元素为当前块
        }
      })
      this._pageScroll(clientY);
      this.setData({
        nowItem: nowItem
      })
    }
  },
  moveEnd(e: any) {
    var that = this
    var moveId = this.data.moveId;
    var nowItem = this.data.nowItem;
    var tabList = this.data.tabList;
    if (nowItem != null) {
      // 做选中元素替换
      var tmp = tabList[moveId];
      // tabList[moveId] = tabList[nowItem]
      // tabList[nowItem] = tmp;
      tabList.splice(moveId, 1); //splice（）删除tabList中moveid所在位置的一项
      tabList.splice(nowItem, 0, tmp); //插入tabList中nowItem位置的temp项
    }
    that.setData({
      moveId: -1,
      nowItem: null,
      enable: false
    })
    that.initSortData(tabList);
  },
  onShow() {
    // this.fadeOnScroll("remind")
  },
  /** 页面滑动 */
  _pageScroll(clientY: any) {
    if (clientY + this.data.windowHeight * 0.2 >= this.data.windowHeight) {
      // 下滑接近屏幕底部
      wx.pageScrollTo({
        scrollTop: this.data.scrollTop + (this.data.windowHeight * 0.1), //调用pageScroll部分的函数进行获取scrollTop（实时）， (this.data.windowHeight  * 0.1)
        duration: 100
      }); //将页面滚动到目标位置，支持选择器和滚动距离两种方式定位
    } else if (clientY - this.data.windowHeight * 0.2 <= 0) {
      // 上滑接近屏幕顶部
      wx.pageScrollTo({
        scrollTop: this.data.scrollTop - (this.data.windowHeight * 0.1),
        duration: 100
      })
    }
  },
  /**
   * 判断是不是划出remind框
   *  */
  onPageScroll(e) {
    var that = this
    var topBarBottom=that.data.topBarBottom
    var remindOpacity = that.data.remindOpacity; // 1~0
    var isRemindDisplayTag = that.data.isRemindDisplayTag// true-fasle
    var topVarTop = that.data.topVarTop; // 192 ~ 0
    var scrollTop = e.scrollTop;
    if (scrollTop > 40) {
      var tmp = scrollTop - 40; // 1~60
      // 透明度映射
      remindOpacity = (60 - tmp) / 60;
      // topbar上滑映射
      topVarTop = ((60 - tmp) / 60) * topVarTop;
      // 限制范围，防止值违规
      if (remindOpacity < 0) {
        remindOpacity = 0;
        isRemindDisplayTag = false

      }
      if (topVarTop < topBarBottom) {
        topVarTop = topBarBottom;
        isRemindDisplayTag = false
      }
      that.setData({
        remindOpacity: remindOpacity, //透明度
        topVarTop: topVarTop, //吸顶元素高度
        scrollTop: scrollTop,//滚动高度
        isRemindDisplayTag: isRemindDisplayTag
      })
    } else {
      that.setData({
        isRemindDisplayTag: true,
        remindOpacity: 1, //提示栏透明度
        topVarTop: 192, //topBar高度
      })
    }

  },
  onLongPress(e: any) {
    var that = this
    var moveId = e.currentTarget.dataset.moveid; //获取长按对象的ID
    that.setData({
      enable: true, //允许按压
      moveId: moveId //移动元素的ID
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var windowHeight = wx.getSystemInfoSync().windowHeight; //获取屏幕高度
    that.setData({
      windowHeight: windowHeight
    })
    that.getTarHeighgt()
  },
  /**
   * 保存设置
   */
  saveSetting: function () {
    // 保存当前设置
    var that = this
    that.setData({
      showDialog: true//弹出弹窗
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  /**
   * 初始化tabList
   */
  initTablistData: function () {
    var that = this
    var tabList = that.data.tabList
    try {
      var myWidgetTabListTemp = wx.getStorageSync('myWidgetTabList')
      var indexTabListTemp = wx.getStorageSync('indexTabList')
      if (that.data.isChooseIndexSeetingWidget) {
        if (indexTabListTemp && indexTabListTemp.length != 0) {
          // Do something with return value
          tabList = indexTabListTemp
        } else {
          tabList = that.data.indexTabListTemp
        }
      } else {
        if (myWidgetTabListTemp && myWidgetTabListTemp.length != 0) {
          // Do something with return value
          tabList = myWidgetTabListTemp
        } else {
          tabList = that.data.myWidgetTabListTemp
        }
      }
    } catch (e) {
      tabList = that.data.tabList
      that.selectComponent("#toast").showToastAuto("页面加载失败", "error", 1);
      // Do something when catch error
    }
    that.setData({
      tabList: tabList
    })
  },
  onReady: function () {
    var that = this
    that.initTablistData()
    var tabList = that.data.tabList//顺序需要注意
    that.initSortData(tabList);//初始化主页排序的数组
    // 获取设备的信息  
    var systemInfo = wx.getSystemInfoSync()
    // 获得屏幕高度
    var screenHeight = systemInfo['screenHeight'];
    that.setData({
      screenHeight: screenHeight
    })
  },
})