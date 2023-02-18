// pages/widgets/countDown/countDownPage/countDownPage.ts

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 第一个输入框
    name: "",
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
    isEdit: false,
    isInputTextMove: false as boolean,
    // 默认的位置是local位置是第一个
    localItemPosition: 0,
    isNetwork: false as boolean
  },
  // 去重
  duplicatedArray(arr: any) {
    // 去重完全
    //本地缓存数据关于重复的数据进行去重,使用reduce去重
    let tempObj = [{}, {}, {}];
    const res = arr.reduce((returnVal: any, currentVal: any) => {
      // 观察同一属性的值，并放入对象中，若对象中存在该值，则表明重复不进行处理，若对象中不存在该值，表示新值，需要存进去
      console.log(tempObj)  // 所有存在的值放入这个对象当中
      if (!tempObj[currentVal.name]) {
        tempObj[currentVal.name] = true; // 若值为true，表示这个值存在，不会走里面的push方法
        // 添加元素
        returnVal.push(currentVal);
      }
      // a总和，也就是每一次处理后的返回结果 b当前值 c 索引值
      return returnVal
    }, []);
    return res
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
  // 数组重复判定
  isDuplicated(countDownList: any, goalName: string) {
    for (let countDownListItemID = 0; countDownListItemID < countDownList.length; countDownListItemID++) {
      let countDownListItem = countDownList[countDownListItemID]
      console.log("重复的", countDownListItem["countDownName"])
      if (countDownListItem["countDownName"] !== goalName) {
        // 不重复的情况
        // 直接set
        // return array重复的下标
        return false
      } else {
        // 重复
        return countDownListItemID
      }
    }

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
        // 本地的数据
        countDownList = wx.getStorageSync('widgets-userCountDown')
      }
      if (goalName && goalTime) {
        // 如果条件满足那么就添加
        // 如果这个值存在那么只进行修改,
        // 非重复数据
        let isNetwork = that.data.isNetwork
        if (isNetwork) {
          countDownList.push({
            countDownName: goalName,
            countDownEndDate: goalTime
          })
        } else {
          console.log("修改")
          // 重复数据,修改日期值
          let eidtID = that.data.localItemPosition
          // 修改本地缓存
          countDownList[eidtID]["countDownName"] = goalName
          countDownList[eidtID]["countDownEndDate"] = goalTime
          console.log("eidtID+++++++++++++++++", eidtID, goalName, goalTime)
          wx.removeStorageSync('widgets-userCountDown')
        }
        // 删除重复的数据
        // countDownList = this.duplicatedArray(countDownList)
        console.log("concocococooc", countDownList);
        wx.setStorageSync("widgets-userCountDown",
          // 本地数据去重
          countDownList
        )
        try {
          console.log("0o0o0o", wx.getStorageSync('widgets-userCountDown'))
          that.selectComponent("#toast").showToastAuto("设置成功", "success", 1);
          that.gotoBd()
        } catch (error) {
          that.submitError(error.errMsg)
          that.setData({
            showDialog: true
          })
        }
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
  onLoad(options) {
    // 接收跳转的传参    

    this.initInputDate(options)
    this.initDate()
    // 解决数据重复的问题
  },
  setSomeDate(dayNumber:number) {
      // 设置当前距离今天时间XXX天后的时间格式为yy-mmm-xx
    let nowDateObj = new Date();
    let nowTimeStem = nowDateObj.getTime();
    let endTimeStem = nowTimeStem + 24 * 60 * 60 * 1000 * dayNumber;
    let endDateObj = new Date(endTimeStem);
    let month = endDateObj.getMonth() + 1;
    let monthStr = month > 10 ? month : '0' + month;
    let day = endDateObj.getDate();
    let dayStr = day > 10 ? day : '0' + day;
    let endDateStr = endDateObj.getFullYear() + '-' + monthStr + '-' + dayStr;
    console.log("endDateStr", endDateStr)
    return endDateStr

  },

  // 输入框设置初始参数
  initInputDate(op: any) {
    let that = this
    // 可以新建
    let isNetWorkContent = true as boolean
    that.setData({
      isNetwork: isNetWorkContent
    })
    // 本地的数据
    // 是否是网络请求
    try {
      isNetWorkContent = JSON.parse(op["isNetWork"])
    } catch (e) {
    }
    // 如果是远程请求
    if (isNetWorkContent) {
      // 远程做添加
      that.setData({
        isNetwork: isNetWorkContent
      })
    } else {
      // 本地做修改
      let localItemPosition = op["localItemPosition"]
      let inputCountDownName = op["localCountDownName"]
      let localCountDownEndDate = op["localCountDownEndDate"]
      that.setData({
        isNetwork: isNetWorkContent,
        localItemPosition: localItemPosition,
        // 本地名字
        goalTime: localCountDownEndDate,
        name: inputCountDownName,
        // 允许修改
        isEdit: true
      })
    }
    // 修改缓存的数值
    // 确认才能是
  },


  initDate() {
    let startDate = this.getNowFormatDate();
    // 设置结束时间
    let endDate= this.setSomeDate(999)

    let goalTimePre = this.getNowFormatDate()
    this.setData({
      startDate: startDate,
      endDate:endDate,
      goalTimePre: goalTimePre,
      title: "倒计时"
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