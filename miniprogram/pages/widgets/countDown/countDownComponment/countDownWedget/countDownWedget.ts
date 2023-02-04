// pages/widgets/countDown/countDownComponment/counDownWedget/countDownWedget.ts
import { getCountDownItem } from "../../../../../api/countDownApi"

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 传值部分
    cdlist3: {            
      type: Array,      
      value: []     
    },
    countDownTitle:{
      type:String,
      value:"首义+倒计时"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    obj: {
    }
  },
  // 组件的生命周期
  pageLifetimes: {
    show: function() {
      // 页面被展示
      var that=this;
      that.initPageData()

    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
      // 时间转换
  formatNumber: (n: any) => {
    n = n.toString()
    return n[1] ? n : `0${n}`
  },
  retDate(time: string) {
    let dateBegin = new Date(time);//将-转化为/，使用new Date
    let dateEnd = new Date();//获取当前时间
    let dateDiff = dateBegin.getTime() - dateEnd.getTime();//时间差的毫秒数
    let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000) + 1);//计算出相差天数
    return dayDiff >= 10 ? dayDiff : dayDiff
  },
  /**
   * 生命周期函数--监听页面加载
   */
async initPageData() {
    var that = this
    // 网络请求  
    let { data: res } = await getCountDownItem() as unknown as IResult<any>;
    if (res=="false") {
      that.selectComponent("#toast").showToastAuto("请求失败", "error");
      // console.log("请求失败，请重新绑定",res)
    } else {
      // 渲染数据
      let cdlist = [];
      let infolist=wx.getStorageInfo()
      // console.log("getStorageInfoinfolist",infolist)
      if (wx.getStorageSync('userCountDown')) {
        cdlist = wx.getStorageSync("userCountDown")
        // console.log("typepeppepepe",typeof(cdlist))
        // console.log("getStorageInfocdlistioioio", cdlist);      
      while (cdlist.length < 3) {
        cdlist.push(res.pop())
      }
      let cdlist3 = [];
      cdlist.forEach((item: any) => {
        if (item.countDownEndDate) {
          item.countDownEndDate = this.retDate(item.countDownEndDate)
        }
      })
      for (let i = 0; i < 3; i++) {
        let cd = cdlist.pop()
        cdlist3.push(cd);
      }
      this.setData({
        cdlist3: cdlist3.reverse(),
      })
    }}

  },
  // 设置点击事件函数
  setTime1: function () { //设置倒计时
    setTimeout(()=>{
      wx.redirectTo({
        url: '/pages/widgets/countDown/countDownPage/countDownPage',
          })
    },500)

  }

  }
})
