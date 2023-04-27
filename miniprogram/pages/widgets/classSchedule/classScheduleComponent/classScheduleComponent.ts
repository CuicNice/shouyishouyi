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
    dailySchedule: [],
    nowDayData: '',
    time: [],
    ifClass: true
  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
      this.getdailySchedule();
    },
  },
  lifetimes:{
    ready(){
      // 页面被展示
      this.getdailySchedule();
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取缓存
    getdailySchedule() {
      var that = this;
      var ifClass = true;
      var classSchedule = wx.getStorageSync('widget-classSchedule');
      var cls = wx.getStorageSync('login');
      if(cls){
        var dailySchedule = classSchedule.dailySchedule;
        var time = classSchedule.time;
        var nowDayData = classSchedule.nowDayData;
        if (dailySchedule.length == 0) {
          ifClass = false
        }
        that.setData({
          dailySchedule: dailySchedule,
          time: time,
          nowDayData: nowDayData,
          nowtime: (new Date().toTimeString().substring(0, 8)).slice(0, 5),
          dark: classSchedule.dark,
          ifClass: ifClass
        });
      }else{
        this.setData({
          nowDayData:"用户未绑定,无法显示课表"
        })
      }
    },
    // 跳转课表tabbar
    godailySchedule(){
      console.log("goto TabBar!")
      wx.switchTab({
        url: '/pages/widgets/classSchedule/classSchedulePage/classSchedulePage'
        })
    }
  }
})
