// pages/widgets/scoreInquiry/scoreInquiryComponent/scoreInquiryComponent.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
 termTitleTapdetail:Boolean,

/*成绩详情弹窗*/
 courseTapdetail:Boolean,
 scoreCountdetail:Boolean,
 jd:String,
 Details:Array,
 bj:String,
 jsxm:String,
 kcmc:String,
 score:String,
 xf:String,
 xnmmc:String,
 xqmmc:String,
 kcxzmc:String,
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
// 关闭成绩弹窗
  closeTap: function (e:any) {
    var that = this;
    that.setData({
      courseTapdetail: false,
      termTitleTapdetail: false,
      scoreCountdetail: false
    })
  },
  }
})
