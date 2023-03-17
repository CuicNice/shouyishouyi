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
    nowDayData:'',
    time:[],
    ifClass:true
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
    // 获取缓存
  getdailySchedule(){
      var that = this;
      var ifClass=true
      var dailySchedule = wx.getStorageSync('widget-classSchedule').dailySchedule;
      var time=wx.getStorageSync('widget-classSchedule').time;
      var nowDayData=wx.getStorageSync('widget-classSchedule').nowDayData;
      if(dailySchedule.length==0){
        ifClass=false
      }
        that.setData({
          dailySchedule: dailySchedule,
          time:time,
          nowDayData:nowDayData,
          nowtime:(new Date().toTimeString().substring(0, 8)).slice(0, 5),
          dark:wx.getStorageSync('widget-classSchedule').dark,
          ifClass:ifClass
        });
  },

}
})
