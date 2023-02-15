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
    ifsearch: true,
    a:1
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

  returnEvent(){
    this.setData({ifsearch:true,word:''})
    this.get()
  },

  getInputValue: function (e: any) {
    this.setData({ word: e.detail.value })
  },

  //添加缓存
  cache() {
    // 先获取缓存中的内容
    let array = wx.getStorageSync('item') || []
    if (array.length <= 9) {
      // 向数组中追加
      array.push({
        item: this.data.word,
      })
      // 重新设置缓存
      wx.setStorage({
        key: 'item',
        data: array,
        success: function () { }
      })
    }
  },

  markMake(e: any){
    var num=wx.getStorageSync('item').length-e.currentTarget.dataset.index-1
    var add=wx.getStorageSync('item')[num].item
    this.setData({word:add,ifsearch:false})
    setTimeout(() =>{
      this.webrequest()
  },500)
  },

//网络请求
  async webrequest(){
  var that=this
  this.selectComponent("#toast").showToast("请求中....", "lodding");
  for(var i=1;i<10;i++){
  await wx.request({
    url: 'http://www.fmin-courses.com:9527/api/v1/craw/library/searchBook',
    method: "POST",
    data: {
      "page": i,
      "word": this.data.word
    },
    success:(res)=> {
      console.log(res)
      console.log(res.data.data.length)
      if(res.data.data.length==0){
        console.log("000")
        this.data.a=0
    }
    },
    fail(res) {
      console.log(res)
      that.selectComponent("#toast").showToastAuto("请求失败", "error");
    }
  })
  console.log(this.data.a)
  if(this.data.a==0){
    console.log("ddd")
    break;}
}
that.selectComponent("#toast").showToastAuto("请求成功", "success");
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
      word:''
    })
  },

  search() {
    if (this.data.word != "") {
      this.webrequest()
      if (wx.getStorageSync('item').length < 9) { 
        this.cache()
        var arr=this.objHeavy(wx.getStorageSync('item'))
        wx.setStorage({
          key: 'item',
          data: arr,
        })
      }
      if (wx.getStorageSync('item').length == 9) {
        let array = wx.getStorageSync('item')
        let arrays = []
        for (var i = 0; i < array.length; i++) {
          if (i != 0) {
            arrays.push(array[i])
          }
        }
        // 重新设置缓存
        wx.setStorage({
          key: 'item',
          data: arrays,
        })
        this.cache()
      }
      this.setData({
        ifsearch:false
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

  //获取缓存的内容
  get() {
    if (wx.getStorageSync('item').length != 0) {
      var arr = []
      var myarr = wx.getStorageSync('item')
      for (var i = wx.getStorageSync('item').length - 1; i >= 0; i--) {
        arr.push(myarr[i])
      }
      this.setData({
        shuju: arr,
        ifshow: false
      })
    }
  },

  //查重
  objHeavy:function(arr: { [x: string]: any }){ 
    let arr1 = []; //存名字
    let newArr = []; //存新数组
    for (let i in arr) {
      if (arr1.indexOf(arr[i].item) == -1) {
        arr1.push(arr[i].item);
        newArr.push(arr[i]);
      }
    }
    return newArr;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
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