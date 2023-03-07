import { widgetScore } from '../../../../api/scoreInquiryApi';
export interface ScoreCompontItem {
  zh: string,
  mm: string,
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    widget_score: '',//请求到的每学期学年的成绩
    alljdxfs: '',//总学分加权平均分
    allxfscores: '',//总平均学分绩点
    semester: '',//学年学期
    scoreLevel: 0,//本学期称号
  },
  /**
    * 初始化页面渲染函数
    */
  async initPageData() {
    /**
     * 获取本地缓存，判断是否绑定数据
     */
    var bindData = {
      zh: wx.getStorageSync('login').zh,
      mm: wx.getStorageSync('login').mm,
    } as ScoreCompontItem;
    this.getUserInfoData(bindData);
  },
  /**
   * 发送请求，渲染数据
   * @param from 成绩
   */
  async getUserInfoData(from: ScoreCompontItem) {
    const { data: widget_score } = await widgetScore(from) as unknown as IResult<any>;
    var semester = this.data.semester;
    var score = '' as unknown as number;//本学期成绩
    /**
     * 展示本学期称号，如果本学期暂无成绩，则展示近学期的成绩称号
     */
    if (semester == '大一上') {
      score = widget_score.one.sxqall[0].xqxfscore;
    }
    else if (semester == '大一下') {
      score = widget_score.one.xxqall[0].xqxfscore;
      if (widget_score.one.xxqall[0].xqxfscore == 'None') {
        score = widget_score.one.sxqall[0].xqxfscore;
        semester = '大一上';
      }
    }
    else if (semester == '大二上') {
      score = widget_score.two.sxqall[0].xqxfscore;
      if (widget_score.two.sxqall[0].xqxfscore == 'None') {
        score = widget_score.one.xxqall[0].xqxfscore;
        semester = '大一下';
      }
    }
    else if (semester == '大二下') {
      score = widget_score.two.xxqall[0].xqxfscore;
      if (widget_score.two.xxqall[0].xqxfscore == 'None') {
        score = widget_score.two.sxqall[0].xqxfscore;
        semester = '大二上';
      }
    }
    else if (semester == '大三上') {
      score = widget_score.three.sxqall[0].xqxfscore;
      if (widget_score.three.sxqall[0].xqxfscore == 'None') {
        score = widget_score.two.xxqall[0].xqxfscore;
        semester = '大二下';
      }
    }
    else if (semester == '大三下') {
      score = widget_score.three.xxqall[0].xqxfscore;
      if (widget_score.three.xxqall[0].xqxfscore == 'None') {
        score = widget_score.three.sxqall[0].xqxfscore;
        semester = '大三上';
      }
    }
    else if (semester == '大四上') {
      score = widget_score.four.sxqall[0].xqxfscore;
      if (widget_score.four.sxqall[0].xqxfscore == 'None') {
        score = widget_score.three.xxqall[0].xqxfscore;
        semester = '大三下';
      }
    }
    else if (semester == '大四下') {
      score = widget_score.four.xxqall[0].xqxfscore;
      if (widget_score.four.xxqall[0].xqxfscore == 'None') {
        score = widget_score.four.sxqall[0].xqxfscore;
        semester = '大四上';
      }
    }
    this.scoreLevels(score);
    this.setData({
      widget_score: widget_score,
      allxfscores: widget_score.allscore.allxfscores,
      alljdxfs: widget_score.allscore.alljdxfs,
      semester: semester,
    })
  },
  /**
   * 变化等级称号
   */
  scoreLevels(score: number) {
    var scoreLevel = this.data.scoreLevel as unknown as number;
    if (score >= 90) {
      scoreLevel = 1;
    } else if (score >= 85 && score < 90) {
      scoreLevel = 2;
    } else if (score >= 80 && score < 85) {
      scoreLevel = 3;
    } else if (score >= 70 && score < 80) {
      scoreLevel = 4;
    } else if (score >= 60 && score < 70) {
      scoreLevel = 5;
    } else if (score <= 60 && score >= 0) {
      scoreLevel = 6;
    } else {
      scoreLevel = 0;
    }
    this.setData({ scoreLevel: scoreLevel });
  },
  /**
   * 获取目前的学年学期 如大一下
   */
  getScoreTime() {
    /**
    * 获取当前年月
    */
    var timestamp = Date.parse(new Date() as unknown as string);
    var date = new Date(timestamp);
    //获取年份
    var Y = date.getFullYear() as unknown as string;
    //获取月份
    var M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1) as unknown as string;
    /**
     * 进行当前学期的判断
     */
    var year = 0//储存年份的变量
    var schoolTime//学期名
    if (8 <= parseInt(M) && parseInt(M) <= 12) {
      year = year + parseInt(Y) + 1
    }
    if (1 <= parseInt(M) && parseInt(M) < 2) {
      year = year + parseInt(Y)
    }
    if (2 <= parseInt(M) && parseInt(M) < 8) {
      year = year + parseInt(Y)
    }
    if ((Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 4 && 8 <= parseInt(M) && parseInt(M) <= 12) || (Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 4 && 1 <= parseInt(M) && parseInt(M) < 2)) {
      schoolTime = '大四上';
    }
    if (Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 4 && 2 <= parseInt(M) && parseInt(M) < 8) {
      schoolTime = '大四下';
    }
    if ((Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 3 && 8 <= parseInt(M) && parseInt(M) <= 12) || (Y as unknown as number - wx.getStorageSync('zh').slice(0, 4) == 3 && 1 <= parseInt(M) && parseInt(M) < 2)) {
      schoolTime = '大三上';
    }
    if (Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 3 && 2 <= parseInt(M) && parseInt(M) < 8) {
      schoolTime = '大三下';
    }
    if ((Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 2 && 8 <= parseInt(M) && parseInt(M) <= 12) || (Y as unknown as number - wx.getStorageSync('zh').slice(0, 4) == 2 && 1 <= parseInt(M) && parseInt(M) < 2)) {
      schoolTime = '大二上';
    }
    if (Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 2 && 2 <= parseInt(M) && parseInt(M) < 8) {
      schoolTime = '大二下';
    }
    if ((Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 1 && 8 <= parseInt(M) && parseInt(M) <= 12) || (Y as unknown as number - wx.getStorageSync('zh').slice(0, 4) == 1 && 1 <= parseInt(M) && parseInt(M) < 2)) {
      schoolTime = '大一上';
    }
    if (Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 1 && 2 <= parseInt(M) && parseInt(M) < 8) {
      schoolTime = '大一下';
    }
    this.setData({
      semester: schoolTime,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initPageData();
    this.getScoreTime();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})