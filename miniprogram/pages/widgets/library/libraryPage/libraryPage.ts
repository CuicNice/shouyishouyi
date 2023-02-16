// pages/widgets/library/libraryPage/libraryPage.ts

/* import uCharts from "../../../../utils/u-charts";
import { getlibrary } from '../../../../api/libraryApi';
export interface libraryItem {
  page: string,
  word: string
} */

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
    allbook: [],
    a: 1,
    b: 0,
    ifshowXiang:true,
    num:0,
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

  returnEvent() {
    this.setData({ ifsearch: true, word: '',a:1,b:0 })
    this.get()
  },

  return(){
    this.setData({ifshowXiang:true})
  },

  getInputValue: function (e: any) {
    this.setData({ word: e.detail.value })
  },

  //添加缓存
  cache(abc: string) {
    // 先获取缓存中的内容
    let array = wx.getStorageSync(abc) || []
    if (array.length <= 9) {
      // 向数组中追加
      array.push({
        item: this.data.word,
      })
      // 重新设置缓存
      wx.setStorage({
        key: abc,
        data: array,
        success: function () { }
      })
    }
  },

  markMake(e: any) {
    var num = wx.getStorageSync('item').length - e.currentTarget.dataset.index - 1
    var add = wx.getStorageSync('item')[num].item
    this.setData({ word: add, ifsearch: false })
    setTimeout(() => {
      this.webrequest(this.data.a)
    }, 500)
  },



  //网络请求
  /* async webrequest(from: libraryItem) {
    console.log(from)
    const { data: res } = await getlibrary(from) as unknown as IResult<any>;
    if (!res) {
      console.log("网络请求失败")
    } else {
      console.log("网络请求成功")
    }}, */
  webrequest(a: number) {
    this.selectComponent("#toast").showToast("请求中....", "lodding");
    wx.request({
      url: 'http://www.fmin-courses.com:9527/api/v1/craw/library/searchBook',
      method: "POST",
      data: {
        "page": a,
        "word": this.data.word
      },
      success:(res:any)=> {
        var arr = res.data.data
        console.log(arr)
        for(var j=0;j<10;j++){
          var num={}
          arr[j].num=num
          var jianum=0
          var zongnum=0
          var zhongnum=0
          var nannum=0
        for(var i=0;i<arr[j].books.length;i++){
        if(arr[j].books[i].local.indexOf("嘉鱼")!=-1){
          var jiaArr={}
          arr[j].num.jiaArr=jiaArr
          var myarr={}
          arr[j].num.jiaArr.myarr=myarr
          var add={num:arr[j].books[i].barcode,zhuangtai:arr[j].books[i].localstatu,leixing:arr[j].books[i].cirType}
          arr[j].num.jiaArr.myarr.shuzu=add
          jianum=jianum+1
          var showjia=true
          var place="嘉鱼"
          var image="../../../../static/svg/jiayulibrary.svg"
          var hao=arr[j].books[i].callno
          arr[j].showjia=showjia
          arr[j].num.jiaArr.num=jianum
          arr[j].num.jiaArr.hao=hao
          arr[j].num.jiaArr.place=place
          arr[j].num.jiaArr.image=image
        }
        if(arr[j].books[i].local.indexOf("总馆")!=-1){
          var zongArr={}
          arr[j].num.zongArr=zongArr
          var myarr={}
          arr[j].num.zongArr.myarr=myarr
          var add={num:arr[j].books[i].barcode,zhuangtai:arr[j].books[i].localstatu,leixing:arr[j].books[i].cirType}
          arr[j].num.zongArr.myarr.shuzu=add
          zongnum=zongnum+1
          var showzong=true
          var place="总馆"
          var image="../../../../static/svg/genlibrary.svg"
          var hao=arr[j].books[i].callno
          arr[j].showzong=showzong
          arr[j].num.zongArr.num=zongnum
          arr[j].num.zongArr.hao=hao
          arr[j].num.zongArr.place=place
          arr[j].num.zongArr.image=image
        }
        if(arr[j].books[i].local.indexOf("南区")!=-1){
          var nanArr={}
          arr[j].num.nanArr=nanArr
          var myarr={}
          arr[j].num.nanArr.myarr=myarr
          var add={num:arr[j].books[i].barcode,zhuangtai:arr[j].books[i].localstatu,leixing:arr[j].books[i].cirType}
          arr[j].num.nanArr.myarr.shuzu=add
          nannum=nannum+1
          var shownan=true
          var place="南区"
          var image="../../../../static/svg/nanlibrary.svg"
          var hao=arr[j].books[i].callno
          arr[j].shownan=shownan
          arr[j].num.nanArr.num=nannum
          arr[j].num.nanArr.hao=hao
          arr[j].num.nanArr.place=place
          arr[j].num.nanArr.image=image
        }
        if(arr[j].books[i].local.indexOf("中区")!=-1||arr[j].books[i].local.indexOf("南湖")!=-1){
          var zhongArr={}
          arr[j].num.zhongArr=zhongArr
          var myarr={}
          arr[j].num.zhongArr.myarr=myarr
          var add={num:arr[j].books[i].barcode,zhuangtai:arr[j].books[i].localstatu,leixing:arr[j].books[i].cirType}
          arr[j].num.zhongArr.myarr.shuzu=add
          zhongnum=zhongnum+1
          var showzhong=true
          var place="中区"
          var image="../../../../static/svg/schoolBuilt/zhongqutushuguan.svg"
          var hao=arr[j].books[i].callno
          arr[j].showzhong=showzhong
          arr[j].num.zhongArr.num=zhongnum
          arr[j].num.zhongArr.hao=hao
          arr[j].num.zhongArr.place=place
          arr[j].num.zhongArr.image=image
        }
      }}
        this.setData({ allbook: arr })
        var array = wx.getStorageSync('book') || []
        //console.log(this.data.allbook)
        array.push({
          item: this.data.allbook,
        })
        //console.log(this.data.allbook)
        wx.setStorage({
          key: 'book',
          data: array,
        })
        this.selectComponent("#toast").showToastAuto("请求成功", "success");
      }
    })
  },

  againrequest() {
    if (this.data.a == this.data.b+1&&wx.getStorageSync('book')[this.data.b].item.length!=0) {
      this.setData({ a: this.data.a + 1, b: this.data.b + 1 })
      this.webrequest(this.data.a)
    }
    if(this.data.a != this.data.b+1) { 
      this.setData({ b: this.data.b + 1})
     this.setData({allbook:wx.getStorageSync('book')[this.data.b].item})}
  },

  showXQ(res: any){
    this.setData({
      ifshowXiang:false
    })
    console.log(res.currentTarget.dataset.index)
    this.setData({num:res.currentTarget.dataset.index})
  },

  leftrequest() {
    console.log(wx.getStorageSync('book')[this.data.b])
    if (this.data.b != 0) { this.setData({ b: this.data.b - 1})
    this.setData({allbook:wx.getStorageSync('book')[this.data.b].item}) }
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

  search() {
    this.setData({a:1,b:0})
    wx.removeStorage({
      key: 'book',
    })
    if (this.data.word != "") {
      this.webrequest(this.data.a)
      if (wx.getStorageSync('item').length < 9) {
        this.cache('item')
        var arr = this.objHeavy(wx.getStorageSync('item'))
        wx.setStorage({
          key: 'item',
          data: arr,
        })
      }
      if (wx.getStorageSync('item').length == 9) {
        this.cache('item')
        var arr = this.objHeavy(wx.getStorageSync('item'))
        if (arr.length == 9) {
          // 重新设置缓存
          wx.setStorage({
            key: 'item',
            data: arr,
          })
        }
        if (arr.length == 10) {
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
        }
      }
      this.setData({
        ifsearch: false
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
  objHeavy: function (arr: { [x: string]: any }) {
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