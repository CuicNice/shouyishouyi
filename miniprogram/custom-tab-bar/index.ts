// pages/custom-tab-bar/index.ts
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
    selected:0,
    color: "#999999",
    selectedColor: "#1990FF",
    position: "bottom",
    borderStyle: "white",
    list:[		
      {
         "pagePath": "/pages/widgets/classSchedule/classSchedulePage/classSchedulePage",
         "text": "课程表",
         "iconPath": "/static/svg/tapBar/courseTable_grey.svg",
         "tapStyle":"width: 64rpx;height: 94rpx;",
         "selectedIconPath": "/static/svg/tapBar/courseTable_blue.svg"
     },
   {
         "pagePath": "/pages/test1/test",
         "text": "首页",
         "iconPath": "/static/svg/tapBar/nanaHome_grey.png",
         "tapStyle":"width: 130rpx;height: 160rpx;display: flex;flex-direction: column;justify-content: center;align-items: center;    padding: 0px;gap: 5px;isolation: isolate; ",
         "selectedIconPath": "/static/svg/tapBar/nananHome_green.svg"
     },
     {
       "pagePath": "/pages/widgets/widgetsPages/widgetsPages",
       "text": "组件",
       "iconPath": "/static/svg/tapBar/wedgetsBox_grey.svg",
       "tapStyle":"width: 64rpx;height: 94rpx;",
       "selectedIconPath": "/static/svg/tapBar/wedgetsBox_yellow.svg"
   }
]
  },

  /**
   * 组件的方法列表
   */
  
  methods: {
    // 切换tab
    switchLab: function(e:any){
      const {jumppath,index} = e.currentTarget.dataset;
      // 跳转是失败
      // 注意 switchTab 只能跳转到带有 tab 的页面，不能跳转到不带 tab 的页面
      console.log("juanana",jumppath,index);
      var that = this;
      wx.switchTab({
        url: jumppath
      })
      that.setData({
        selected:index,
      })
    }
  },
  observers:{

  }
})


