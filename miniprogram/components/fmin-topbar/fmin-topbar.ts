// components/fmin-topbar/fmin-topbar.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,  //属性类型
      value: ''  // 默认值
    },
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow:true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    returnEvent(){
      this.triggerEvent('sync1');
      //wx.navigateBack();

    }
  }
})
