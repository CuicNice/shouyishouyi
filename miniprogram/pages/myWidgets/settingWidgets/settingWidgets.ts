// pages/myWidgets/settingWidgets/settingWidgets.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    } as any

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
    console.log("e.touches[0]", e.touches[0]);
    var clientY = e.touches[0].clientY;
    //初识状态
    if (data.remindState === 0) {
      //remindBox弹出状态
      if (clientY <= data.remindTouchCheckY && clientY > 20) {
        console.log("remindBox弹出状态1");

        data.check = true;
        data.remindState = 1;
        data.remindFirstTouchY = clientY;
      }
    } else if (data.remindState === 3) {
      console.log("remindBox弹出状态2");

      if (clientY >= data.remindMaxMoveY) {
        data.check = true;
        data.remindState = 2;
        data.remindFirstTouchY = clientY;
      }
    } else {
      console.log("不知道是什么状态", data.remindState);
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
    console.log("ev", ev)
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
    // 获取屏幕高度
    // TODO: 迁移到app.js中因为已经多处调用
    var windowHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      windowHeight: windowHeight
    })
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