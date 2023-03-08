Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomskinTitle: "个性换肤",
    darking: true,
    lighting: false,
    library: false,
    administrativeBuilding: false,
    bellTower: true,
    black: false,
    white: true,
    picture: ''
  },

  background1() {
    this.setData({
      white: true,
      black: false,
      picture: ''
    })
  },

  background2() {
    this.setData({
      white: false,
      black: true,
      picture: ''
    })
  },

  background3() {
    var that = this
    this.setData({
      white: false,
      black: false
    })
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
      sizeType: ['original'],
      success(res) {
        var tempFilePath = res.tempFiles[0].tempFilePath
        // console.log(tempFilePath)
        try {
          const FileSystemManager = wx.getFileSystemManager()
          //FileSystemManager.saveFile 的同步版本 
          var url = FileSystemManager.saveFileSync(tempFilePath, wx.env.USER_DATA_PATH + '/' + tempFilePath.replace("wxfile://", ""));
          console.log(url)
          that.setData({
            library: false,
            administrativeBuilding: false,
            bellTower: false,
            black: false,
            white: true,
            picture: url
          })
        } catch {
          wx.showToast({
            title: '设置失败',
            icon: 'error',
            duration: 2000
          })
        }
        if (that.data.picture != "") {
          let value = wx.getStorageSync('widget-classSchedule')
          value.picture = that.data.picture;
          value.background = "";
          value.buliding = "";
          wx.setStorageSync('widget-classSchedule', value)
        }
        wx.navigateBack({
          delta: 2
        })
      },
      fail() {
        wx.showToast({
          title: '上传失败',
          icon: 'error',
          duration: 2000
        })
      }
    })
  },

  bellTower() {
    let bellTower = true
    if (this.data.picture != "") {
      bellTower = false
    }
    this.setData({
      bellTower: bellTower,
      administrativeBuilding: false,
      library: false
    })
  },

  administrativeBuilding() {
    let administrativeBuilding = true
    if (this.data.picture != "") {
      administrativeBuilding = false
    }
    this.setData({
      bellTower: false,
      administrativeBuilding: administrativeBuilding,
      library: false
    })
  },

  library() {
    let library = true
    if (this.data.picture != "") {
      library = false
    }
    this.setData({
      bellTower: false,
      administrativeBuilding: false,
      library: library
    })
  },

  darking() {
    this.setData({
      darking: true,
      lighting: false
    })
  },

  lighting() {
    this.setData({
      darking: false,
      lighting: true
    })
  },

  cancel() {
    wx.navigateBack()
  },

  login() {
    if (this.data.white == true) {
      let value = wx.getStorageSync('widget-classSchedule')
      value.background = ""
      value.picture = ""
      wx.setStorageSync('widget-classSchedule', value)
    }
    if (this.data.black == true) {
      let value = wx.getStorageSync('widget-classSchedule')
      value.background = "#333333",
        value.picture = ""
      wx.setStorageSync('widget-classSchedule', value)
    }
    if (this.data.bellTower == true) {
      let value = wx.getStorageSync('widget-classSchedule')
      value.buliding = "zhonglou"
      wx.setStorageSync('widget-classSchedule', value)
    }
    if (this.data.administrativeBuilding == true) {
      let value = wx.getStorageSync('widget-classSchedule')
      value.buliding = "jiayuxingzhenluo"
      wx.setStorageSync('widget-classSchedule', value)
    }
    if (this.data.library == true) {
      let value = wx.getStorageSync('widget-classSchedule')
      value.buliding = "zhongqutushuguan"
      wx.setStorageSync('widget-classSchedule', value)
    }
    if (this.data.lighting == true) {
      let value = wx.getStorageSync('widget-classSchedule')
      value.dark = false
      wx.setStorageSync('widget-classSchedule', value)
    }
    if (this.data.darking == true) {
      let value = wx.getStorageSync('widget-classSchedule')
      value.dark = true
      wx.setStorageSync('widget-classSchedule', value)
    }
    let value = wx.getStorageSync('widget-classSchedule');
    value.picture = this.data.picture;
    wx.setStorageSync('widget-classSchedule', value);
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let arr = wx.getStorageSync('widget-classSchedule');
    let darking;
    let lighting;
    let library;
    let administrativeBuilding;
    let bellTower;
    let black;
    let white;
    let picture;
    if (arr.dark == false) {
      lighting = true;
      darking = false;
    };
    if (arr.dark == true) {
      lighting = false;
      darking = true;
    };
    if (arr.buliding == '') {
      bellTower = false;
      administrativeBuilding = false;
      library = false;
    }
    if (arr.buliding == 'zhonglou') {
      bellTower = true;
      administrativeBuilding = false;
      library = false;
    };
    if (arr.buliding == 'jiayuxingzhenluo') {
      bellTower = false;
      administrativeBuilding = true;
      library = false;
    };
    if (arr.buliding == 'zhongqutushuguan') {
      bellTower = false;
      administrativeBuilding = false;
      library = true;
    };
    if (arr.background == '') {
      white = true;
      black = false;
    };
    if (arr.picture != '') {
      white = false;
      black = false;
      bellTower = false;
      administrativeBuilding = false;
      library = false;
      picture=arr.picture
    };
    if (arr.background == '#333333') {
      white = false;
      black = true;
    };
    this.setData({
      lighting: lighting,
      darking: darking,
      library: library,
      administrativeBuilding: administrativeBuilding,
      bellTower: bellTower,
      black: black,
      white: white,
      picture:picture
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