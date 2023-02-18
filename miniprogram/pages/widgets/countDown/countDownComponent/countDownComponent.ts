// pages/widgets/countDown/countDownComponment/countDownComponent.ts
// pages/widgets/countDown/countDownComponment/counDownWedget/countDownWedget.ts
import { getCountDownItem } from "../../../../api/countDownApi"
import { dateFormater } from "../../../../utils/date"
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
    countDownTitle: {
      type: String,
      value: "首义+倒计时"
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
    // zhan
    // test
    show: function () {

      // 页面被展示
      let that = this;

      //  初始化页面
      that.initPageData()
      let today = new Date();
      let countDownNowDate = dateFormater("YYY/MM/dd", today);
      that.setData({
        countDownNowDate,
      })
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function () {
      // 页面尺寸变化
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 时间转换,
    formatNumber: (n: any) => {
      n = n.toString()
      return n[1] ? n : `0${n}`
    },
    retDate(time: string) {
      let dateBegin = new Date(time);
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
      //  设置当前时间
      // 网络请求  
      let { data: res } = await getCountDownItem() as unknown as IResult<any>;
      if (res == false) {
        that.selectComponent("#toast").showToastAuto("请求失败", "error");
      } else {
        // 请求成功渲染数据
        let cdlist = [];
        // 判断用户之前有无缓存，有缓存直接获取
        if (wx.getStorageSync('widgets-userCountDown')) {
          cdlist = wx.getStorageSync("widgets-userCountDown")
        } else {
          cdlist = []
        }
        //公共处理部分，将网络请求与用户缓存的数据处理
        while (cdlist.length < 3) {
          cdlist.push(res.pop())
        }
        let cdlist3 = [];
        // 变成数字
        // 处理时间列表
        // 不可以使用foreach,因为是异步的代码
        cdlist.some((item: any) => {
          let endDate = this.retDate(item.countDownEndDate)
          if (item.countDownEndDate && endDate > 0) {
            item.countDownEndDate = this.retDate(item.countDownEndDate)
          } else {
            // 过期的时间，以及空的异常的时间直接给END
            item.countDownEndDate = "到期"
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
    // 点击使用editcountDownData
    editcountDownData(e: any) {
      let that = this
      /**
       * 逻辑说明：关于倒计时：如果是远程倒计时，只能给予新增覆盖
       * 如果是本地设置的倒计时，只能通过修改本地的数据
       */
      // 判断这个数据本地是不是存在
      // 获取当前ID
      console.log("guany1e", e.currentTarget.dataset.id)
      // id存起来
      let dateItemId = e.currentTarget.dataset.id;
      // 判断这个值本地有没有
      let tapCountDownDataItem = that.data.cdlist3[dateItemId]
      let tapCountDownName = tapCountDownDataItem["countDownName"]
      let tapCountDownEndDate = tapCountDownDataItem["countDownEndDate"]
      console.log("localCountDownDat--a", tapCountDownName)
      // if()
      try {
        let localCountDownDataDic = wx.getStorageSync('widgets-userCountDown')
        // 需要做判空
        console.log("localCountDownDataDic.length", localCountDownDataDic.length);

        if (localCountDownDataDic.length != 0) {
          console.log("loca", localCountDownDataDic)
          // 循环遍历做判断
          for (let dicItemID in localCountDownDataDic) {
            let item = localCountDownDataDic[dicItemID]
            //  网络请求
            if (item["countDownName"] == tapCountDownName) {
              let isNetWork = false as boolean
              setTimeout(() => {
                wx.redirectTo({
                  key: 'localCountDownName',
                  url: '/pages/widgets/countDown/countDownPage/countDownPage?localCountDownName=' + item["countDownName"] + '&localCountDownEndDate=' + item["countDownEndDate"] + '&isNetWork=' + isNetWork + '&localItemPosition=' + dicItemID
                })
              }, 500)
              return 0
            }
            // 如果是远程的
          }
          // 远程数据，其他的本地参数不传递
          let isNetWork = true as boolean
          setTimeout(() => {
            wx.redirectTo({
              key: 'localCountDownName',
              url: '/pages/widgets/countDown/countDownPage/countDownPage?isNetWork=' + isNetWork
            })
          }, 500)
          return 0

        } else {
          let isNetWork = true as boolean
          setTimeout(() => {
            wx.redirectTo({
              key: 'localCountDownName',
              url: '/pages/widgets/countDown/countDownPage/countDownPage?isNetWork=' + isNetWork
            })
          }, 500)

        }
      } catch (err) {
        console.log("显示出现问题", err)
      }
    },
    // 点击返回按钮
    returnPage: () => {
      const page = getCurrentPages()
      wx.navigateBack({
        delta: 1
      })

    },
    // 设置点击事件函数
    // setTime1: function () { //设置倒计时
    //   setTimeout(() => {
    //     wx.redirectTo({
    //       url: '/pages/widgets/countDown/countDownPage/countDownPage',
    //     })
    //   }, 500)

    // }

  }
})
