// pages/widgets/classSchedule/Customskin/Customskin.ts
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
    white: true
  },

  background1() {
    this.setData({
      white: true,
      black: false
    })
  },

  background2() {
    this.setData({
      white: false,
      black: true
    })
  },

  background3() {
    this.setData({
      white: false,
      black: false
    })
  },

  bellTower() {
    this.setData({
      bellTower: true,
      administrativeBuilding: false,
      library: false
    })
  },
  administrativeBuilding() {
    this.setData({
      bellTower: false,
      administrativeBuilding: true,
      library: false
    })
  },
  library() {
    this.setData({
      bellTower: false,
      administrativeBuilding: false,
      library: true
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
  cancel(){
    wx.navigateBack()
  },
  login(){
    if(this.data.white==true){
      let value=wx.getStorageSync('widget-classSchedule')
      value.background=""
      wx.setStorageSync('widget-classSchedule',value)
    }
    if(this.data.black==true){
      let value=wx.getStorageSync('widget-classSchedule')
      value.background="#333333"
      wx.setStorageSync('widget-classSchedule',value)
    }
    if(this.data.bellTower==true){
      let value=wx.getStorageSync('widget-classSchedule')
      value.buliding="zhonglou"
      wx.setStorageSync('widget-classSchedule',value)
    }
    if(this.data.administrativeBuilding==true){
      let value=wx.getStorageSync('widget-classSchedule')
      value.buliding="jiayuxingzhenluo"
      wx.setStorageSync('widget-classSchedule',value)
    }
    if(this.data.library==true){
      let value=wx.getStorageSync('widget-classSchedule')
      value.buliding="zhongqutushuguan"
      wx.setStorageSync('widget-classSchedule',value)
    }
    if(this.data.lighting==true){
      let value=wx.getStorageSync('widget-classSchedule')
      value.dark=false
      wx.setStorageSync('widget-classSchedule',value)
    }
    if(this.data.darking==true){
      let value=wx.getStorageSync('widget-classSchedule')
      value.dark=true
      wx.setStorageSync('widget-classSchedule',value)
    }
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let arr=wx.getStorageSync('widget-classSchedule');
    let darking;
    let lighting;
    let library;
    let administrativeBuilding;
    let bellTower;
    let black;
    let white;
    if(arr.dark==false){
      lighting=true;
      darking=false;
    };
    if(arr.dark==true){
      lighting=false;
      darking=true;
    };
    if(arr.buliding=='zhonglou'){
      bellTower=true;
      administrativeBuilding=false;
      library=false;
    };
    if(arr.buliding=='jiayuxingzhenluo'){
      bellTower=false;
      administrativeBuilding=true;
      library=false;
    };
    if(arr.buliding=='zhongqutushuguan'){
      bellTower=false;
      administrativeBuilding=false;
      library=true;
    };
    if(arr.background==''){
      white=true;
      black=false;
    };
    if(arr.background=='#333333'){
      white=false;
      black=true;
    };
    this.setData({
      lighting:lighting,
      darking:darking,
      library:library,
      administrativeBuilding:administrativeBuilding,
      bellTower:bellTower,
      black:black,
      white:white
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