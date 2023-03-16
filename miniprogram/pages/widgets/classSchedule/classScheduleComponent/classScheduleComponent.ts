// pages/widgets/classSchedule/classScheduleComponent/classScheduleComponent.ts
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
    dailySchedule:[],
    time:[],
    dayTime: [] as any,
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      this.getdailySchedule();
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    godailySchedule: function () { //进入日课表页面
    },
    // 获取缓存
  getdailySchedule(){
      var that = this;
      var dailySchedule = wx.getStorageSync('widget-classSchedule').dailySchedule;
      var time=wx.getStorageSync('widget-classSchedule').time;
        that.setData({
          dailySchedule: dailySchedule,
          time:time 
        });
        console.log(dailySchedule);
  },
}
})
