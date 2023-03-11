// pages/myWidgets/settingWidgets/settingWidgets.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 选择小组件页面
     */
    isChooseSeetingwidget: false as Boolean,
    windowHeight: 0 as number,//屏幕高度
    settingWidgetTitle: "设置小组件",
    hiddenRemindBox: false, // 隐藏remindBox
    scrollTop: 40,
    isRemindDisplayTag: true,
    // 滑动检测
    pageScrollState: 1,
    //屏幕高度问题
    remindHeight: 96,
    remindOpacity: 1,
    screenHeight: 0,
    topVarTop: 50,
    tag: true,
    nowItem: -1 as number,
    tmpH: 50,
    tabList: [{
      name: '十步杀一人',
      width: 30
    },
    {
      name: '千里不留行',
      width: 80
    },
    {
      name: '事了拂衣去',
      width: 120
    },
    {
      name: '深藏身与名',
      width: 60
    },
    {
      name: '千里不留行2',
      width: 200
    },
    {
      name: '千里不留行3',
      width: 200
    },
    {
      name: '千里不留行4',
      width: 200
    },
    {
      name: '千里不留行5',
      width: 200
    },
    {
      name: '千里不留行6',
      width: 200
    },
    {
      name: '事了拂衣去',
      width: 120
    },
    {
      name: '深藏身与名',
      width: 150
    }
    ],//移动元素区块
    //移动的是哪个元素块
    moveId: -1,//移动块ID
    lastY: null,//
    enable: false
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
      isChooseSeetingwidget: true
    })
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
      isChooseSeetingwidget: false//选择主页组件设置
    })
  },
  /**
   * 移动组件
   */

  /**
   * 顶部消失remindBox
   */
  /**
  * 
  * 初始化排序
  */
  initSortData(tabList: any) {
    var height = 0;
    var ls = [];
    for (var i = 0; i < tabList.length; i++) {
      var obj = tabList[i];
      obj.y = height;//当前元素的高度
      ls.push(obj);//增加一个对象
      height = height + obj.width + 20;//计算下一个滑动区块高度
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
      var y = e.changedTouches[0].pageY;//鼠标在页面上的位置,从页面左上角开始,即是以页面为参考点,不随滑动条移动而变化；
      var clientY = e.changedTouches[0].clientY;//鼠标的可视化范围（鼠标点击的可见范围）
      var nowItem = -1;
      var tabList = this.data.tabList;
      tabList.forEach(function (obj: any, i) {
        // 顶部大概有300的距离,需要平移顶部的距离
        if (y > obj.y+300 && y < (obj.y + obj.width)+300) {
          nowItem = i;//如果鼠标页面高度属于改选取块上下高度范围内》》标记该元素为当前块
        }
      })
      this._pageScroll(clientY);
      this.setData({
        nowItem: nowItem
      })
    }
  },
  moveEnd(e: any) {
    var moveId = this.data.moveId;
    var nowItem = this.data.nowItem;
    var tabList = this.data.tabList;
    if (nowItem != -1) {
      // 做选中元素替换
      var tmp = tabList[moveId];
      // tabList[moveId] = tabList[nowItem]
      // tabList[nowItem] = tmp;
      tabList.splice(moveId, 1);//splice（）删除tabList中moveid所在位置的一项
      tabList.splice(nowItem, 0, tmp);//插入tabList中nowItem位置的temp项
    }
    this.setData({
      moveId: -1,
      nowItem: -1,
      enable: false
    })
    this.initSortData(tabList);
  },
  onShow() {
    // this.fadeOnScroll("remind")
  },
  /** 页面滑动 */
  _pageScroll(clientY: any) {
    if (clientY + this.data.windowHeight * 0.2 >= this.data.windowHeight) {
      // 下滑接近屏幕底部
      wx.pageScrollTo({
        scrollTop: this.data.scrollTop + (this.data.windowHeight * 0.1),//调用pageScroll部分的函数进行获取scrollTop（实时）， (this.data.windowHeight  * 0.1)
        duration: 100
      });//将页面滚动到目标位置，支持选择器和滚动距离两种方式定位
    } else if (clientY - this.data.windowHeight * 0.2 <= 0) {
      // 上滑接近屏幕顶部
      // console.log("up",clientY + (clientY - this.data.windowHeight*0.2)*20)
      wx.pageScrollTo({
        scrollTop: this.data.scrollTop - (this.data.windowHeight * 0.1),
        duration: 100
      })
    }
  },
  /**
   * 判断是不是划出remind框
   *  */

  remindIsDisplay(remindScroll: number, scrollTop: number) {
    // 获取滑动值：
    var scrollTop = scrollTop
    var remindScroll = remindScroll
    // 向上划出：remind消失
    if (scrollTop > 0) {
      // 滑动高度大于remindBoxHeight
      if (scrollTop > remindScroll) {
        return true
      }
    } else {
      // 向下划出：remind出现
      // 滑动高度小于等于 0
      return true
    }
  },
  onPageScroll(e) {
    var that = this
    var remindOpacity = that.data.remindOpacity; // 1~0
    var topVarTop = that.data.topVarTop; // 50 ~ 0
    var scrollTop = e.scrollTop;
    if (scrollTop > 40) {
      var tmp = scrollTop - 40; // 1~60
      // 透明度映射
      remindOpacity = (60 - tmp) / 60;
      // topbar上滑映射
      topVarTop = ((60 - tmp) / 60) * 50;
      // 限制范围，防止值违规
      if (remindOpacity < 0) {
        remindOpacity = 0;
      }
      if (topVarTop < 0) {
        topVarTop = 0;
      }
      that.setData({
        remindOpacity: remindOpacity,//透明度
        topVarTop: topVarTop,//吸顶元素高度
        scrollTop: scrollTop//滚动高度
      })
    } else {
      that.setData({
        remindOpacity: 1,//提示栏透明度
        topVarTop: 50,//topBar高度
      })
    }
  },
  onLongPress(e: any) {
    console.log(e)
    var moveId = e.currentTarget.dataset.moveid;//获取长按对象的ID
    this.setData({
      enable: true,//允许按压
      moveId: moveId//移动元素的ID
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var windowHeight = wx.getSystemInfoSync().windowHeight;//获取屏幕高度
    this.setData({
      windowHeight: windowHeight
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var tabList = this.data.tabList;
    // 获取设备的信息  
    var systemInfo = wx.getSystemInfoSync()
    // 获得屏幕高度
    var screenHeight = systemInfo['screenHeight'];
    this.setData({
      screenHeight: screenHeight
    })
    console.log("screenHeight", this.data.screenHeight)
    this.initSortData(tabList);//初始化排序的数组
  },
})