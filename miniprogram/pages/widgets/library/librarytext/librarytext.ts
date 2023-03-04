// pages/widgets/library/libraryPage/libraryPage.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    word: '',
    shuju: [] as any,
    allbook: [] as any,
    a: 1,
    b: 0,
    num: 0,
    electricChargeTitle: '首义图书馆',
  },

  returnEvent() {
    this.setData({ ifsearch: true, })

  },

  return() {
    this.setData({ ifshowXiang: true })
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
    this.setData({ word: add, ifsearch: false })
    setTimeout(() => {
      this.webrequest(this.data.a)
    }, 500)
  },

  search() {
    this.setData({ a: 1, b: 0, allbook: [] })
    wx.removeStorage({
      key: 'book',
    })
    if (this.data.word != "") {
      this.webrequest(this.data.a)
      if (wx.getStorageSync('item').length < 10) {
        this.cache('item')
        var arr = this.objHeavy(wx.getStorageSync('item'))
        wx.setStorage({
          key: 'item',
          data: arr,
        })
      }
      if (wx.getStorageSync('item').length == 10) {
        this.cache('item')
        var arr = this.objHeavy(wx.getStorageSync('item'))
        if (arr.length == 10) {
          // 重新设置缓存
          wx.setStorage({
            key: 'item',
            data: arr,
          })
        }
        if (arr.length == 11) {
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
    }
  },

  webrequest(a: number) {
    this.selectComponent("#toast").showToast("请求中....", "lodding");
    wx.request({
      url: 'http://www.fmin-courses.com:9527/api/v1/craw/library/searchBook',
      method: "POST",
      data: {
        "page": a,
        "word": this.data.word
      },
      success: (res: any) => {
        var arr = res.data.data
        //console.log(arr)
        try {
          if (arr.length != 0) {
            for (var j = 0; j < 10; j++) {
              var num = {}
              arr[j].num = num
              var jianum = 0
              var zongnum = 0
              var zhongnum = 0
              var nannum = 0
              var jiaArr = {}
              arr[j].num.jiaArr = jiaArr
              var myarr: never[] = []
              arr[j].num.jiaArr.myarr = myarr
              var zongArr = {}
              arr[j].num.zongArr = zongArr
              var myarr: never[] = []
              arr[j].num.zongArr.myarr = myarr
              var nanArr = {}
              arr[j].num.nanArr = nanArr
              var myarr: never[] = []
              arr[j].num.nanArr.myarr = myarr
              var zhongArr = {}
              arr[j].num.zhongArr = zhongArr
              var myarr: never[] = []
              arr[j].num.zhongArr.myarr = myarr
              var add = 0
              for (var i = 0; i < arr[j].books.length; i++) {
                if (arr[j].books[i].local.indexOf("嘉鱼") != -1) {
                  let dataAll = arr[j].num.jiaArr.myarr
                  add = add + parseInt(arr[j].books[i].hldallnum)
                  var item = { leixing: "外借图书", num: "A0427181", zhuangtai: "入藏" }
                  item.leixing = arr[j].books[i].barcode
                  item.num = arr[j].books[i].localstatu
                  item.zhuangtai = arr[j].books[i].cirType
                  dataAll.push(item)
                  jianum = jianum + 1
                  var showjia = true
                  var place = "嘉鱼"
                  var image = "../../../../static/svg/jiayulibrary.svg"
                  var hao = arr[j].books[i].callno
                  arr[j].showjia = showjia
                  arr[j].num.jiaArr.num = jianum
                  arr[j].num.jiaArr.hao = hao
                  arr[j].num.jiaArr.place = place
                  arr[j].num.jiaArr.image = image
                }
                if (arr[j].books[i].local.indexOf("总馆") != -1) {
                  let dataAll = arr[j].num.zongArr.myarr
                  add = add + parseInt(arr[j].books[i].hldallnum)
                  var item = { leixing: "外借图书", num: "A0427181", zhuangtai: "入藏" }
                  item.leixing = arr[j].books[i].barcode
                  item.num = arr[j].books[i].localstatu
                  item.zhuangtai = arr[j].books[i].cirType
                  dataAll.push(item)
                  zongnum = zongnum + 1
                  var showzong = true
                  var place = "总馆"
                  var image = "../../../../static/svg/genlibrary.svg"
                  var hao = arr[j].books[i].callno
                  arr[j].showzong = showzong
                  arr[j].num.zongArr.num = zongnum
                  arr[j].num.zongArr.hao = hao
                  arr[j].num.zongArr.place = place
                  arr[j].num.zongArr.image = image
                }
                if (arr[j].books[i].local.indexOf("南区") != -1) {
                  let dataAll = arr[j].num.nanArr.myarr
                  add = add + parseInt(arr[j].books[i].hldallnum)
                  var item = { leixing: "外借图书", num: "A0427181", zhuangtai: "入藏" }
                  item.leixing = arr[j].books[i].barcode
                  item.num = arr[j].books[i].localstatu
                  item.zhuangtai = arr[j].books[i].cirType
                  dataAll.push(item)
                  nannum = nannum + 1
                  var shownan = true
                  var place = "南区"
                  var image = "../../../../static/svg/nanlibrary.svg"
                  var hao = arr[j].books[i].callno
                  arr[j].shownan = shownan
                  arr[j].num.nanArr.num = nannum
                  arr[j].num.nanArr.hao = hao
                  arr[j].num.nanArr.place = place
                  arr[j].num.nanArr.image = image
                }
                if (arr[j].books[i].local.indexOf("中区") != -1 || arr[j].books[i].local.indexOf("南湖") != -1) {
                  let dataAll = arr[j].num.zhongArr.myarr
                  add = add + parseInt(arr[j].books[i].hldallnum)
                  var item = { leixing: "外借图书", num: "A0427181", zhuangtai: "入藏" }
                  item.leixing = arr[j].books[i].barcode
                  item.num = arr[j].books[i].localstatu
                  item.zhuangtai = arr[j].books[i].cirType
                  dataAll.push(item)
                  zhongnum = zhongnum + 1
                  var showzhong = true
                  var place = "中区"
                  var image = "../../../../static/svg/schoolBuilt/zhongqutushuguan.svg"
                  var hao = arr[j].books[i].callno
                  arr[j].showzhong = showzhong
                  arr[j].num.zhongArr.num = zhongnum
                  arr[j].num.zhongArr.hao = hao
                  arr[j].num.zhongArr.place = place
                  arr[j].num.zhongArr.image = image
                }
              }
              try {
                arr[j].add = add
              } catch { }//此处是为了防止第一个数据中为空产生报错
            }
            this.setData({ allbook: arr })
            for (var i = 0; i < 10; i++) {
              if (this.data.allbook[i].num.jiaArr.myarr.length == 0) {
                delete this.data.allbook[i].num.jiaArr
              }
              if (this.data.allbook[i].num.nanArr.myarr.length == 0) {
                delete this.data.allbook[i].num.nanArr
              }
              if (this.data.allbook[i].num.zhongArr.myarr.length == 0) {
                delete this.data.allbook[i].num.zhongArr
              }
              if (this.data.allbook[i].num.zongArr.myarr.length == 0) {
                delete this.data.allbook[i].num.zongArr
              }
            }
            this.setData({ allbook: this.data.allbook })
            var array = wx.getStorageSync('book') || []
            //console.log(this.data.allbook)
            array.push({
              item: this.data.allbook,
            })
            //console.log(this.data.allbook)
            wx.setStorageSync('book', array)
          }
        } catch { }
        this.selectComponent("#toast").showToastAuto("请求成功", "success")
      }
    })
  },

  againrequest() {
    try {
      if (this.data.a == this.data.b + 1 && wx.getStorageSync('book')[this.data.b].item.length != 0) {
        this.setData({ a: this.data.a + 1, b: this.data.b + 1 })
        this.webrequest(this.data.a)
      }
      if (this.data.a != this.data.b + 1) {
        this.setData({ b: this.data.b + 1 })
        this.setData({ allbook: wx.getStorageSync('book')[this.data.b].item })
      }
    } catch { }
  },

  showXQ(res: any) {
    this.setData({ num: res.currentTarget.dataset.index })
    var all = JSON.stringify(this.data.allbook)
    wx.navigateTo({ url: '/pages/widgets/library/librarycom/librarycom?all=' + all + '&num=' + this.data.num })
  },

  leftrequest() {
    console.log(wx.getStorageSync('book')[this.data.b])
    if (this.data.b != 0) {
      this.setData({ b: this.data.b - 1 })
      this.setData({ allbook: wx.getStorageSync('book')[this.data.b].item })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    console.log(e)
    this.setData({ word: e.word })
    this.webrequest(this.data.a)
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