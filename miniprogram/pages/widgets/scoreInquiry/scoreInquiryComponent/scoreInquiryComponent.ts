
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    alljdxfs: {
      type: Number,//传过来的总平均学分绩点
    },
    allxfscores: {
      type: Number,//传过来的总学分加权平均分
    },
    semester: {
      type: String,//传过来的学期学年
    },
    scoreLevel: {
      type: Number,//传过来的称号序号
      value: 0,
    }
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
  /**
   * 点击右上角的箭头跳转成绩查询页面
   */
    loginScore() {
      wx.navigateTo({
        url: '../scoreInquiryPage/scoreInquiryPage'
      })
    }
  }
})
