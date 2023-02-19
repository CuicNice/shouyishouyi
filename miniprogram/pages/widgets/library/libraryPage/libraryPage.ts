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
    swiper: 0,  //当前所在页面的 
    shuju: [] as any,
    allbook: [] as any,
    a: 1,
    b: 0,
    num: 0,
    electricChargeTitle: '首义图书馆',
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

  //添加缓存
  cache(abc: string) {
    // 先获取缓存中的内容
    let array = wx.getStorageSync(abc) || []
    // 向数组中追加
    var ifshow = false
    if (this.data.word.length > 6) { ifshow = !ifshow }
    array.push({
      item: this.data.word,
      ifshow: ifshow
    })
    // 重新设置缓存
    wx.setStorageSync(abc, array)
  },

  markMake(e: any) {
    var num = wx.getStorageSync('item').length - e.currentTarget.dataset.index - 1
    var add = wx.getStorageSync('item')[num].item
    this.setData({ word: add })
    setTimeout(() => {
      wx.navigateTo({ url: '/pages/widgets/library/librarytext/librarytext?word=' + this.data.word }),
        this.setData({ word: '' })
      this.get()
    }, 500)
  },

  deleteMark() {
    wx.removeStorage({
      key: 'item',
      success() {
        console.log("清除缓存")
      }
    })
    this.get()
    this.setData({
      ifshow: true,
      word: ''
    })
  },

  //查重
  objHeavy: function (arr: { [x: string]: any }) {
    let arr1 = [];
    let newArr = [];
    for (let i in arr) {
      if (arr1.indexOf(arr[i].item) == -1) {
        arr1.push(arr[i].item);
        newArr.push(arr[i]);
      }
    }
    return newArr;
  },

  search() {
    if (this.data.word != "") {
      if (wx.getStorageSync('item').length < 6) {
        this.cache('item')
        var arr = this.objHeavy(wx.getStorageSync('item'))
        wx.setStorage({
          key: 'item',
          data: arr,
        })
      }
      if (wx.getStorageSync('item').length == 6) {
        this.cache('item')
        var arr = this.objHeavy(wx.getStorageSync('item'))
        if (arr.length == 6) {
          // 重新设置缓存
          wx.setStorage({
            key: 'item',
            data: arr,
          })
        }
        if (arr.length == 7) {
          let array = wx.getStorageSync('item')
          let arrays = []
          for (var i = 0; i < array.length; i++) {
            if (i != 0) {
              arrays.push(array[i])
            }
          }
          // 重新设置缓存
          wx.setStorageSync('item', arrays)
        }
      }
      this.get()
      wx.navigateTo({ url: '/pages/widgets/library/librarytext/librarytext?word=' + this.data.word })
      this.setData({ word: '' })
    }
  },

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

  //获取缓存的内容
  get() {
    var myarr = wx.getStorageSync('item')
    if (myarr.length != 0) {
      var arr = []
      console.log(myarr)
      for (var i = myarr.length - 1; i >= 0; i--) {
        arr.push(myarr[i])
      }
      console.log(arr)
      this.setData({
        shuju: arr,
        ifshow: false
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.removeStorage({
      key: 'book',
    })
    this.get()//初始化获取缓存

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