// components/intview/intview.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
    itemurl: {
      type: String,
      value: ""
    },


  },
  /**
   * 跳转到新闻详情页面
   * url="miniprogram\pages\news\inDetail\inDetail?href={{item.outNewsHref}}"
   * 
   */
  /**
 * 组件的方法列表
 */
  methods: {
    gotoNewsDeatil() {
      // 跳转并且携带新闻的url参数
      let that = this
      wx.navigateTo({
        url: "../newsDetail/inDetail?href={{item.outNewsHref}}",
        fail(e) {
          console.log("ee", e)
        }
      })
    },
  },

  /**
   * 组件的初始数据
   */
  data: {


  },







})
