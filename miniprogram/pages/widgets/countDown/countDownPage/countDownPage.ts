// pages/widgets/countDown/countDownPage/countDownPage.ts

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialogtitle:"设置失败，请重新设置", 
    schoolBuiltSrc:"/static/svg/schoolBuilt/zhonglou.svg", 
    sportBuild:"/static/svg/schoolBuilt/Group.svg",
    BackIcon:"/static/svg/Black.svg",
    date:undefined, 
    bname:'联系南南', 
    b1name:'确定' 
  },
  // toast
  showToast(showToast:boolean, toastIcon:string, toastTitle:string) { 
    this.setData({ 
      showToast: showToast, 
      toastIcon: toastIcon, 
      toastTitle: toastTitle 
    }) 
  }, 

// 跳转
gotoBd(e:any) {
  setTimeout(()=>{
    wx.redirectTo({
  url: '/pages/widgets/countDown/countDownWedget/countDownWedget',
      
    })
  },500)
}, 
returnPage() {
  console.log("chufa1")
  wx.redirectTo({
  url: '/pages/widgets/countDown/countDownWedget/countDownWedget',
  })  },
  // 时间选择器
  bindDateChange(e:any){ 
    this.setData({ 
      goalTime:e.detail.value
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
    // 存储数据
    let that=this
    console.log("e", e)
    let goalName = e.detail.value.thingsInputTxt
    let goalTime = e.detail.value.timeInputTxt
    let countDownList = JSON.stringify(e.detail.value)
    console.log("goalTime", goalTime)
    console.log("type goalTime", typeof (goalTime))
    // 判断name和time是不是都存在
    if (goalName && goalTime) {
      wx.setStorageSync("userCountDown", countDownList)
      try {
        const res = wx.getStorage({
          key: 'userCountDown',
          success(res) {
            console.log("user", res.data)
            that.showToast(true,"complete","设置成功") 
            // setTimeout(()=>{ 
            //   that.onLoad() 
            // },1500) 
            wx.hideToast()

          }
        })
      } catch (e) {
        console.log("error")
              // this.showToast(true,"error","设置失败") 
      this.setData({ 
        showDialog:true 
      }) 

        // Do something when catch error
      }
    } else {
      console.log("空白格",)
      // this.showToast(true,"error","设置失败") 
      this.setData({ 
        showDialog:true 
      }) 

    }


    // 缓存处理
    try {
      wx.setStorageSync('key', 'value')
      console.log("纯数据中")
    } catch (e) {
      // TODO:做toast
    }
    try {
      var value = wx.getStorageSync('key')
      if (value) {
        console.log("wode", value)

        // Do something with return value
      }
    } catch (e) {
      // Do something when catch error
    }


  },
  // chun
  formReset() {
    console.log('form发生了reset事件')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    let goalTime = this.getNowFormatDate()
    this.setData({
      goalTime: goalTime,
    })
    this.setData({
      title: "倒计时"
    })
    // console.log("do", that.data.title)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    /* 
在组件的生命周期函数内 获取信号区的高度 这一步也可以在app.js里面获取,来减少资源浪费
*/

    // 获取设备的信息  
    let systemInfo = wx.getSystemInfoSync()
    // 获取信号区高度
    let statusBarHeight = systemInfo['statusBarHeight']

    /* 
    根据我的测验，实际的信号区高度在真机上表现与于实际的不服，所以我们这里还需要根据不同的设备进行调整
    开发工具 = 获取的高度
    安卓真机 = 获取的高度 + 1
    苹果真机 = 获取的高度 - 1
    我本人这里也只测试了iPhonex 华为和小米手机，
    如果有出入根据实际情况进行调整就行了
    */
    //  console.log("systemInfo",systemInfo.model)

    if (systemInfo.model === 'andorid') {
      statusBarHeight = statusBarHeight + 1
    } else if (systemInfo.platform === 'ios') {
      statusBarHeight = statusBarHeight - 2
    } else {
      statusBarHeight = statusBarHeight
    }
    this.setData({
      statusBarHeight
    })

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