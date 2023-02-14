// pages/widgets/library/libraryPage/libraryPage.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /* swiperCurrent: 0,
    libraryTitle:"首义图书馆",
    circular: false, //是否采用衔接滑动
    librarySvg: [
      '/static/svg/schoolBuilt/zhonglou.svg',
      '/static/svg/schoolBuilt/zhongqutushuguan.svg'
    ],
    xuehao:'',
    mima:'',
    haveBind:true */
    word: '',
    ifshow: true,
    swiper: 0,  //当前所在页面的 index
  },

  swiperChangeqian: function () {
    if (this.data.swiper == 3) {
      this.setData({
        swiper: 3
      })
    }
    else {
      this.setData({
        swiper: this.data.swiper + 1
      })
    }
  },

  getInputValue: function (e: any) {
    this.setData({ word: e.detail.value })
  },

  search() {
    if (this.data.word != "") {
      wx.request({
        url: 'http://www.fmin-courses.com:9527/api/v1/craw/library/searchBook',
        method:"POST",
        data: {
          "page": "1",
          "word": this.data.word
        },
        success(res) {
          console.log(res.data)
        }
      })
    }
  },

  /*login() {
    wx.request({
      url: 'http://www.fmin-courses.com:9527/api/v1/craw/library/login',
      method:"POST",
      data:{
        "userId": this.data.xuehao,
        "password": this.data.mima
      },
      success:(res)=>{
        console.log(res)
        if(res.data.code == 20000){
          this.selectComponent("#toast").showToastAuto("登录成功", "success");
          setTimeout(()=>{
            wx.navigateTo({
              url: '/pages/Widgets/libraryCollection/libraryCollection?userId=' + this.data.xuehao + '&password=' + this.data.mima,
            })
          }, 1000)
        }
        if(res.data.code == 30000){
          console.log('ddd')
          this.setData({
            haveBind:false
          })
        }
      }
    })
    try {
      wx.setStorageSync('key1',this.data.xuehao)
    } catch (e) {  
    }
    try {
      wx.setStorageSync('key2', this.data.mima)
    } catch (e) {  
    }
  },

  cancel(){
    wx.setClipboardData({
      data: 'http://ilas.lib.wsyu.edu.cn/index.aspx',
      success:()=> {
        wx.hideLoading()
        this.selectComponent("#toast").showToastAuto("复制链接成功", "success");
     }
    })
  },

  input1(res: { detail: { value: any } }){
    this.setData({
      xuehao:res.detail.value
    })
  },

  input2(res: { detail: { value: any } }){
    this.setData({
      mima:res.detail.value
    })
  },*/

  swiperChangeho: function () {
    if (this.data.swiper == 0) {
      this.setData({
        swiper: 0
      })
    }
    else {
      this.setData({
        swiper: this.data.swiper - 1
      })
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    /* var value1 = wx.getStorageSync('key1')
    var value2 = wx.getStorageSync('key2')
      var xx
      var yy 
      if(value1||value2){
        xx=wx.getStorageSync('key1')
        yy=wx.getStorageSync('key2')
        this.setData({
          xuehao:xx,
          mima:yy
        })
      } */
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