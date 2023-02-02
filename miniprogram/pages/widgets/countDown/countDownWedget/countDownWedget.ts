// pages/widgets/countDown/counDownWedGet/countDownWedget.ts
import { getCountDownItem } from "../../../../api/countDownApi"
// import
// export interface CountDownItem {
// }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj: {
    }
  },
  // 时间转换


  formatNumber: (n: any) => {
    n = n.toString()
    return n[1] ? n : `0${n}`
  },



  retDate(time: string) {
    console.log(">>>>>", time);
    let dateBegin = new Date(time);//将-转化为/，使用new Date
    let dateEnd = new Date();//获取当前时间
    let dateDiff = dateBegin.getTime() - dateEnd.getTime();//时间差的毫秒数
    let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000) + 1);//计算出相差天数
    console.log(">>>>>", dayDiff);
    return dayDiff >= 10 ? dayDiff : dayDiff
  },


  /**
   * 生命周期函数--监听页面加载
   */
async initPageData() {
    var that = this
    const { data: res } = await getCountDownItem() as unknown as IResult<any>;
    if (!res) {

      console.log("请求失败，请重")

    } else {
      // 渲染数据

      let cdlist = [];
      if (wx.getStorageSync('cdlist')) {
        cdlist = wx.getStorageSync('countDownList')
        console.log("cdlistioioio", cdlist);
      }
      while (cdlist.length < 3) {
        cdlist.push(res.pop())
      }
      console.log("cdlist", cdlist)
      let cdlist3 = [];
      cdlist.forEach((item: any) => {
        if (item.countDownEndDate) {
          item.countDownEndDate = this.retDate(item.countDownEndDate)
        }
      })
      for (let i = 0; i < 3; i++) {
        let cd = cdlist.pop()
        console.log("cd", cd);
        cdlist3.push(cd);
      }
      this.setData({
        cdlist3: cdlist3.reverse(),
      })


      // that.selectComponent("#toast").showToastAuto("请求成功", "success");
    }

  },
onLoad(options) {
  this.initPageData()
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.initPageData();
  },

  setTime1: function () { //设置倒计时
    wx.redirectTo({
  url: '/pages/widgets/countDown/countDownPage/countDownPage',
    })
  }
})