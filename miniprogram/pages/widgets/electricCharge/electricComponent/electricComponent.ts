// pages/widgets/electricCharge/electricComponent/electricComponent.ts
import { getElectric } from '../../../../api/electricChargeApi';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    arr:{build:"未绑定"},
    remainingPower: '0',//剩余电量
    remainingAmount: '0',//剩余金额
    sinceLastRecharge: '0',//距上次充值天数
  },
  pageLifetimes:{
    show(){
      this.webrequest();//电费
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
     /**
   * 电费请求
   */
  async webrequest() {
    /**
     * 获取组件内部要求的组件请求参数，进行网络请求
     */
    var value = wx.getStorageSync('widgets-electricCharge');
    if(value){
      const { data: widgetsElectricChargeRes } = await getElectric(value) as unknown as IResult<any>;
      this.dataHandling(widgetsElectricChargeRes);
    }
  },
    /**
     * 计算距离上次充值时间
     */
    num_data: function (form: string) {
      var start_date = new Date(form.replace(/-/g, "/"));
      var end_date = new Date(new Date().toLocaleDateString().replace(/-/g, "/"));
      var days = end_date.getTime() - start_date.getTime();
      var day = parseInt(days / (1000 * 60 * 60 * 24) as unknown as string);
      return day;
    },
    /**
     * 前往电费查询页面
     */
    goElectric() {
      wx.navigateTo({
        url: "/pages/widgets/electricCharge/electricPage/electricPage",
      });
    },
    /**
     * 数据处理
     */
    dataHandling(arr:any) {
      try {
        let money = arr.remainMoney.slice(0, 5);
        let power;
        power = arr.remain.slice(0, 5);
        this.setData({
          remainingAmount: money,
          remainingPower: power,
          sinceLastRecharge: (this.num_data(arr.allRecharges[0].orderTime)) as unknown as string,
          arr:arr
        });
      } catch { };//try{}catch{}是为了避免第一次arr的变化为空报错
    }
  }
})
