// pages/widgets/news/miniNews/miniNews.ts
Component({
  /**
   * 组件的属性列表
   */
  /*
  新闻内容
  */
  properties: {
    /**
     * 点击左右切换的部分
     */
    tapbarCtrl: {
      type: Boolean,
      value: true
    },
    list:{
      type: Array,
      value: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
  // 校园新闻,选中样式
  ChooseShcoolNews: function () {
    // 校园新闻选中后字体样式
    let that = this
    console.log("tapbar", that.data.tapbarCtrl);
    this.setData({
      tapbarCtrl: false,
    })
    // 并且切换请求数据
    //在这里添加所要监听的事件，事件名为eventListener（这个是页面A要监听的事件），参数是num
    this.triggerEvent('eventListener', {tapbarCtrl: this.data.tapbarCtrl})
  },
  // 首义快讯
  ChooseInNews: function () {
    console.log("tapbarinNews", this.data.tapbarCtrl);
    this.setData({
      tapbarCtrl: true,
    })
    // 并且切换请求数据
    // 并且切换请求数据
    //在这里添加所要监听的事件，事件名为eventListener（这个是页面A要监听的事件），参数是num
    this.triggerEvent('eventListener', {tapbarCtrl: this.data.tapbarCtrl})
  },
  }
})
