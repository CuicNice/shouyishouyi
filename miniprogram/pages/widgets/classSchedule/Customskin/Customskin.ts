var utils=require('../../../../utils/addCache');
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

  /**
   * 点击简约白
   */
  background1() {
    this.setData({
      white: true,
      black: false,
      picture: ''
    });
  },

  /**
   * 点击暗夜黑
   */
  background2() {
    this.setData({
      white: false,
      black: true,
      picture: ''
    });
  },

  /**
   * 点击自定义
   */
  background3() {
    var that = this;
    this.setData({
      white: false,
      black: false
    });
    //从相册获取照片
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
      sizeType: ['original'],
      success(res) {
        var tempFilePath = res.tempFiles[0].tempFilePath;
        try {
          const FileSystemManager = wx.getFileSystemManager();
          var url = FileSystemManager.saveFileSync(tempFilePath, wx.env.USER_DATA_PATH + '/' + tempFilePath.replace("wxfile://", ""));
          that.setData({
            library: false,
            administrativeBuilding: false,
            bellTower: false,
            black: false,
            white: true,
            picture: url
          });
        } catch {
          wx.showToast({
            title: '设置失败',
            icon: 'error',
            duration: 2000
          });
        }
        if (that.data.picture != "") {
          utils.mySetStorage('widget-classSchedule','picture',that.data.picture)
          utils.mySetStorage('widget-classSchedule','background',"")
          utils.mySetStorage('widget-classSchedule','buliding',"")
        };
        //返回课表页面
        wx.navigateBack({
          delta: 2
        });
      },
      fail() {
        wx.showToast({
          title: '上传失败',
          icon: 'error',
          duration: 2000
        });
      }
    });
  },

  /**
   * 点击首义钟楼
   */
  bellTower() {
    let bellTower = true;
    if (this.data.picture != "") {
      bellTower = false;
    };
    this.setData({
      bellTower: bellTower,
      administrativeBuilding: false,
      library: false
    });
  },

  /**
   * 点击嘉鱼行政楼
   */
  administrativeBuilding() {
    let administrativeBuilding = true;
    if (this.data.picture != "") {
      administrativeBuilding = false
    };
    this.setData({
      bellTower: false,
      administrativeBuilding: administrativeBuilding,
      library: false
    });
  },

  /**
   * 点击图书馆总馆
   */
  library() {
    let library = true;
    if (this.data.picture != "") {
      library = false;
    };
    this.setData({
      bellTower: false,
      administrativeBuilding: false,
      library: library
    });
  },

  /**
   * 点击深色色系卡片
   */
  darking() {
    this.setData({
      darking: true,
      lighting: false
    });
  },

  /**
   * 点击浅色色系卡片
   */
  lighting() {
    this.setData({
      darking: false,
      lighting: true
    });
  },

  /**
   * 点击取消按钮
   */
  cancel() {
    wx.navigateBack();
  },

  /**
   * 点击确定将更改的数据存至缓存
   */
  login() {
    if (this.data.white == true) {
      utils.mySetStorage('widget-classSchedule','background',"")
      utils.mySetStorage('widget-classSchedule','picture',"")
    };
    if (this.data.black == true) {
      utils.mySetStorage('widget-classSchedule','background',"#333333")
      utils.mySetStorage('widget-classSchedule','picture',"")
    };
    if (this.data.bellTower == true) {
      utils.mySetStorage('widget-classSchedule','buliding',"zhonglou")
    };
    if (this.data.administrativeBuilding == true) {
      utils.mySetStorage('widget-classSchedule','buliding',"jiayuxingzhenluo")
    };
    if (this.data.library == true) {
      utils.mySetStorage('widget-classSchedule','buliding',"zhongqutushuguan")
    };
    if (this.data.lighting == true) {
      utils.mySetStorage('widget-classSchedule','dark',false)
    };
    if (this.data.darking == true) {
      utils.mySetStorage('widget-classSchedule','dark',true)
    }
    utils.mySetStorage('widget-classSchedule','picture',this.data.picture)
    if (this.data.picture == "" && this.data.bellTower == false && this.data.administrativeBuilding == false && this.data.library == false) {
      utils.mySetStorage('widget-classSchedule','buliding',"zhonglou")
    };
    var pages = getCurrentPages();
    var beforePage = pages[pages.length - 2]
    wx.navigateBack({
      delta: 1,
      success: function () {
        beforePage.personalitySet();
      }
    })    
  },

  /**
   * 生命周期函数--监听页面加载，读取缓存
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
    let picture = '';
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
      picture = arr.picture
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
      picture: picture
    });
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