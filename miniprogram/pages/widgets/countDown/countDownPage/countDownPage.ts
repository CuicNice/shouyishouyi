// pages/widgets/countDown/countDownPage/countDownPage.ts

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // countdwonWedget
    countDownTitle: "首义＋倒计时",
    // dialog
    dialogtitle: "设置失败，请重新设置",
    schoolBuiltSrc: "/static/svg/schoolBuilt/zhonglou.svg",
    sportBuild: "/static/svg/schoolBuilt/tiyuguan.svg",
    BackIcon: "/static/svg/back.svg",
    date: undefined,
    bname: '联系南南',
    b1name: '确定',
    isInputTextMove: false as boolean,
  },
  // 解决input输入完毕字体上浮问题
  // 等待输入
  stationNameFocus() {
    this.setData({
      isInputTextMove: true
    })
  },
  stationNameBlur() {
    this.setData({
      isInputTextMove: true
    })
  },
  // 将问题带给后台
  //提交信息
  submitError(error: String) {
    // if(err)
    console.log("error", error)
    let str = '你好！我目前有：' + error + '等BUGS,请尽快解决';
    wx.setClipboardData({
      data: str,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
          }
        })
      }
    })
  },
  // 跳转
  gotoBd() {
    setTimeout(() => {
      wx.redirectTo({
        url: '/pages/widgets/countDown/testCountDownComponentPage/testCountDownComponentPage',

      })
    }, 500)
  },
  // 跳转
  mCancel() {
    setTimeout(() => {
      wx.redirectTo({
        url: '/miniprogram/pages/index/index',

      })
    }, 500)
  },
  returnPage() {
    console.log("chufa1")
    wx.redirectTo({
      url: '/pages/widgets/countDown/testCountDownComponentPage/testCountDownComponentPage',
    })
  },
  // 时间选择器
  bindDateChange(e: any) {
    this.setData({
      goalTime: e.detail.value
    })
  },
  // 获取当前的时间
  //获取当天的时间差 
  getNowFormatDate() {
    let goalTime = new Date();
    let seperator1 = "-";
    let year = goalTime.getFullYear();
    let month = String(goalTime.getMonth() + 1);
    let strDate = String(goalTime.getDate());
    if (Number(month) >= 1 && Number(month) <= 9) {
      month = "0" + String(month);
    }
    if (Number(strDate) >= 0 && Number(strDate) <= 9) {
      strDate = "0" + strDate;
    }
    let currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },

  // 获取表单信息
  formSubmit(e: any) {
    let that = this

    try {

      // 存储数据
      let goalName = e.detail.value.thingsInputTxt
      let goalTime = e.detail.value.timeInputTxt
      let countDownList = []

      // 之前存在

      if (wx.getStorageSync('widgets-userCountDown')) {


        countDownList = wx.getStorageSync('widgets-userCountDown')

      }
      if (goalName && goalTime) {
        countDownList.push({
          countDownName: goalName,
          countDownEndDate: goalTime
        })
        wx.setStorage({
          key: "widgets-userCountDown",
          data: countDownList
        })

        wx.getStorage({
          key: 'widgets-userCountDown',
          success(res) {
            that.selectComponent("#toast").showToastAuto("设置成功", "success", 1);
            that.gotoBd()
          }, fail(error) {
            that.submitError(error.errMsg)
            that.setData({
              showDialog: true
            })
          }
        })

      } else {
        that.selectComponent("#toast").showToastAuto("未填写完毕", "error", 1);
      }
    }
    catch (e) {
      // 如果出现问题创建失败
      that.submitError(e.errMsg)
      that.setData({
        showDialog: true
      })
    }

    // 判断name和time是不是都存在

    // 缓存处理
  },
  // chun
  formReset() {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initDate()
  },
  initDate() {
    let startDate = this.getNowFormatDate();
    this.setData({
      startDate: startDate,
    })
    let goalTimePre = this.getNowFormatDate()
    this.setData({
      goalTimePre: goalTimePre,
    })
    this.setData({
      title: "倒计时"
    })

  },
  // 顶部
  getTarHeighgt() {
    // 获取胶囊的信息
    const menuButton = wx.getMenuButtonBoundingClientRect()
    const menuButtonHeight = menuButton.height;
    const menuButtonWidth = menuButton.width;
    const menuButtonTop = menuButton.top;
    // 获取设备的信息  
    let systemInfo = wx.getSystemInfoSync()
    // 获取信号区高度
    let statusBarHeight = systemInfo['statusBarHeight']
    // 设置胶囊行的高度
    const capsuleBoxHeight = menuButtonHeight + (menuButtonTop - statusBarHeight) * 2;
    console.log("capsuleBoxHeight", capsuleBoxHeight);

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
    this.setData({
      capsuleBoxHeight,
      statusBarHeight
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.getTarHeighgt()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTarHeighgt()


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