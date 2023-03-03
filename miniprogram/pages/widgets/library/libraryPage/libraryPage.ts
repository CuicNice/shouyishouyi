// pages/widgets/library/libraryPage/libraryPage.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    word: '',
    ifshow: true,
    swiper: 0,  //当前所在页面的 
    shuju: [] as any,
    allbook: [] as any,
    electricChargeTitle: '首义图书馆',
  },

  /**
   * 轮播图右划
   */
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

  /**
   * 点击输入框进行输入书名
   */
  getInputValue: function (e: any) {
    this.setData({ word: e.detail.value });
  },

  /**
   * 添加缓存
   */
  cache(abc: string) {
    // 先获取缓存中的内容
    let array = wx.getStorageSync(abc) || [];
    // 向数组中追加
    var ifshow = false;
    if (this.data.word.length > 6) { ifshow = !ifshow }
    array.item.push({
      item: this.data.word,
      ifshow: ifshow
    });
    // 重新设置缓存
    wx.setStorageSync(abc, array);
  },

  /**
   * 点击搜索记录里的方框进行搜索
   */
  markMake(e: any) {
    var num = wx.getStorageSync('widget-library').item.length - e.currentTarget.dataset.index - 1;
    var add = wx.getStorageSync('widget-library').item[num].item;
    this.setData({ word: add });
    setTimeout(() => {
      wx.navigateTo({ url: '/pages/widgets/library/librarytext/librarytext?word=' + this.data.word }),
        this.setData({ word: '' });
      this.get();
    }, 500);
  },

  /**
   * 清除搜索记录
   */
  deleteMark() {
    let arr = wx.getStorageSync('widget-library');
    arr.item = [];
    wx.setStorageSync('widget-library', arr);
    this.get();
    this.setData({
      ifshow: true,
      word: ''
    });
  },

  /**
   * 查重
   */
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

  /**
   * 搜索
   */
  search() {
    if (this.data.word != "") {
      if (wx.getStorageSync('widget-library').item.length < 6) {
        this.cache('widget-library');
        var arr = { item: this.objHeavy(wx.getStorageSync('widget-library').item), book: [] };
        wx.setStorageSync('widget-library', arr);
      }
      if (wx.getStorageSync('widget-library').item.length == 6) {
        this.cache('widget-library');
        var arr = { item: this.objHeavy(wx.getStorageSync('widget-library').item), book: [] };
        if (arr.item.length == 6) {
          // 重新设置缓存
          wx.setStorageSync('widget-library', arr);
        }
        if (arr.item.length == 7) {
          let array = wx.getStorageSync('widget-library');
          let arrays = { item: [] as any, book: [] as any };
          for (var i = 0; i < array.item.length; i++) {
            if (i != 0) {
              arrays.item.push(array.item[i]);
            }
          }
          // 重新设置缓存
          wx.setStorageSync('widget-library', arrays);
        }
      }
      this.get();
      wx.navigateTo({ url: '/pages/widgets/library/librarytext/librarytext?word=' + this.data.word });
      this.setData({ word: '' });
    }
  },

  /**
   * 轮播图左划
   */
  swiperChangeho: function () {
    if (this.data.swiper == 0) {
      this.setData({
        swiper: 0
      });
    }
    else {
      this.setData({
        swiper: this.data.swiper - 1
      });
    }
  },

  /**
   * 获取缓存的内容
   */
  get() {
    if (wx.getStorageSync('widget-library')) {
      var myarr = wx.getStorageSync('widget-library');
      if (myarr.item.length != 0) {
        var arr = [];
        for (var i = myarr.item.length - 1; i >= 0; i--) {
          arr.push(myarr.item[i]);
        };
        this.setData({
          shuju: arr,
          ifshow: false
        });
      }
    } else {
      let arrays = { item: [] as any, book: [] as any };
      wx.setStorageSync('widget-library', arrays);
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if (wx.getStorageSync('widget-library').item) {
      var arr = wx.getStorageSync('widget-library');
      arr.book = [];
      wx.setStorageSync('widget-library', arr);
    };//避免用户第一次进入没有widget-library这个缓存
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
    if(wx.getStorageSync('widget-library')){
    var arr = wx.getStorageSync('widget-library')
    arr.book = [];
    wx.setStorageSync('widget-library', arr)}else{
      let value= { item: [] as any, book: [] as any };
      wx.setStorageSync('widget-library', value)
    }
    this.get();//初始化获取缓存
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