// pages/widgets/countDown/countDownComponment/countDownComponent.ts
// pages/widgets/countDown/countDownComponment/counDownWedget/countDownWedget.ts
import { getCountDownItem } from "../../../../api/countDownApi"

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
      let that=this;
      that.initPageData()

    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function() {
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
   * 页面数据渲染&&数据请求
   */
async initPageData() {
    let that = this
    // 网络请求  
    let { data: res } = await getCountDownItem() as unknown as IResult<any>;
    if (res==false) {
      that.selectComponent("#toast").showToastAuto("请求失败", "error");
    } else {
      // 请求成功渲染数据
      let cdlist = [];
      // 判断用户之前有无缓存，有缓存直接获取
      if (wx.getStorageSync('userCountDown')) {
        cdlist = wx.getStorageSync("userCountDown")
      }else{
        cdlist = []
      }
      //公共处理部分，将网络请求与用户缓存的数据处理
      while (cdlist.length < 3) {
        cdlist.push(res.pop())
      }
      let cdlist3 = [];
      // 变成数字
      
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
    }

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
