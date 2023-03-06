// pages/widgets/electricCharge/electricComponent/electricComponent.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arr: {} as any,
    remainingPower: {
      type: String,
      value: '',
    },//剩余电量
    remainingAmount: {
      type: String,
      value: '',
    },//剩余金额
    sinceLastRecharge: {
      type: String,
      value: '',
    },//距上次充值天数
  },

  /**
   * 组件的初始数据
   */
  data: {
    remainingPower: '',//剩余电量
    remainingAmount: '',//剩余金额
    sinceLastRecharge: '',//距上次充值天数
  },
  /**
   * 监听arr的变化
   */
  observers: {
    'arr': function () {
      this.webRequest()
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 计算距离上次充值时间
     */
    num_data: function (form: string) {
      var start_date = new Date(form.replace(/-/g, "/"));
      var end_date = new Date(new Date().toLocaleDateString().replace(/-/g, "/"));
      var days = end_date.getTime() - start_date.getTime();
      var day = parseInt(days / (1000 * 60 * 60 * 24) as unknown as string);
      return day
    },
    /**
     * 前往电费查询页面
     */
    goElectric() {
      wx.navigateTo({
        url: "/pages/widgets/electricCharge/electricPage/electricPage",
      })
      this.setData({
        remainingPower: '',
        remainingAmount: '',
        sinceLastRecharge: '',
      })
    },
    /**
     * 进行网络请求
     */
    webRequest() {
      try {
        let money = this.data.arr.remainMoney.slice(0, 5)
        let power = this.data.arr.remain.slice(0, 5)
        this.setData({
          remainingAmount: money,
          remainingPower: power,
          sinceLastRecharge: (this.num_data(this.data.arr.allRecharges[0].orderTime)) as unknown as string
        })
      } catch { }//try{}catch{}是为了避免第一次arr的变化为空报错
    }
  }
})
