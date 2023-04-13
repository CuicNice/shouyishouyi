// pages/widgets/news/miniNews/miniNews.ts
import {
  // 内网新闻
  getInnerNewsListitem,
  // 外网新闻
  getOutNewsListitem,
} from "../../../../../api/newsApi"
Component({
  /**
   * 组件的属性列表
   */
  /*
  新闻内容
  */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tapbarCtrl:false,
    list:[],
    // 内网：
    innerPageParams: {
      "currentPage": "1",
      "pageSize": "3"
    },
    // 外网
    outPageParams: {
      "currentPage": "1",
      "pageSize": "3"
    },
  },
  /**
   * 小组件的生命周期函数
   */
  lifetimes: {
    created: function () {
      // 在组件实例进入页面节点树时执行
      this.initNewsInfo();
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 校园新闻,选中样式
    ChooseShcoolNews: function () {
      // 校园新闻选中后字体样式
      let that = this
      this.setData({
        tapbarCtrl: false,
      })
      this.initNewsInfo();
    },
    // 首义快讯
    ChooseInNews: function () {
      this.setData({
        tapbarCtrl: true,
      })
      this.initNewsInfo();
    },
    // 跳转
    gotoNews() {
      wx.navigateTo({
        url: "/pages/widgets/news/newPage/newsList/list"
      })
    },
    // 初始化新闻页面的数据
    async initNewsInfo() {
      // 根据tapBar初始值
      var that = this;
      if (that.data.tapbarCtrl) {
        await that.getInnerSchoolNews()
      } else {
        // 外网请求
        await that.getOutSouyiNews()
      }
    },
    async getInnerSchoolNews() {
      let that = this
      wx.showLoading({
        title: '正在加载...',
      });
      // 获取内网新闻
      let innerPageParams = that.data.innerPageParams
      let { data: innerRes } = await getInnerNewsListitem(innerPageParams) as unknown as IResult<any>;
      if (innerRes != null) {
        wx.hideLoading();
        let widgetMiniNewsList = innerRes.list;
        that.setData({
          list: widgetMiniNewsList, //当天的
        })
      }
    }, 
    async getOutSouyiNews() {
      // 调用函数时，传入new Date()参数，返回值是日期和时间
      let that = this
      let outPageParams = that.data.outPageParams
      let { data: outRes } = await getOutNewsListitem(outPageParams) as unknown as IResult<any>;
      if (outRes.pageSize != 0) {
        var widgetMiniNewsList = outRes.list;
      } else {
        wx.showToast({
          title: '刷新失败',
          icon: 'error',
          duration: 1500
        })
        wx.hideToast();
      }
      that.setData({
        list: widgetMiniNewsList,
      })
    }
  }
})
