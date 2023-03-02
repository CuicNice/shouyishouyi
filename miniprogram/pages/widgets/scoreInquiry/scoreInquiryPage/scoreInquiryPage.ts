// pages/Widgets/scoreInquiry/scoreInquiry.js
import { getScoreDetail, getScoreInfo, getUserInfo } from '../../../../api/scoreInquiryApi';
export interface ScoreInquiryeItem {
  zh: string,
  mm: string,
  id: string,
  xnm: string,
  xqm: string,
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '',//个人信息专业班级
    userScoreInfo: '',//成绩列表
    scoreTitle: "成绩查询",
    courseTapdetail: false,//成绩详情卡片是否显示
    termTitleTapdetail: false,//称号规则是否显示
    scoreCountdetail: false,//算法规则是否显示
    academic_year: 1, // 学年 默认是大一
    academic_year_y: 'one',
    term: 1, // 学期 默认是上学期
    term_y: 'sxq',
    scoreLevel: 0,//默认为等待入榜
    xqxfscores: '',//本学期加权平均分
    scoreDetail: '',//成绩详情
    color: '',//专修必修选修的颜色
    height: '' //弹窗的长度
  },
  /**
 * 变化等级称号
 */
  scoreLevels(xqxfscores: number) {
    var scoreLevel = this.data.scoreLevel;
    if (xqxfscores >= 90) {
      scoreLevel = 1;
    } else if (xqxfscores >= 85 && xqxfscores < 90) {
      scoreLevel = 2;
    } else if (xqxfscores >= 80 && xqxfscores < 85) {
      scoreLevel = 3;
    } else if (xqxfscores >= 70 && xqxfscores < 80) {
      scoreLevel = 4;
    } else if (xqxfscores >= 60 && xqxfscores < 70) {
      scoreLevel = 5;
    } else if (xqxfscores <= 60 && xqxfscores >= 0) {
      scoreLevel = 6;
    } else {
      scoreLevel = 0;
    }
    this.setData({ scoreLevel: scoreLevel })
  },
  /**
 * 显示查询中或请求成功的小弹窗
 */
  showToast(showToast: boolean, toastIcon: string, toastTitle: string) {
    this.setData({
      showToast: showToast,
      toastIcon: toastIcon,
      toastTitle: toastTitle
    })
  },
  /**
 * 点击成绩卡片
 */
  async courseTap(e: any) {
    var row = e.currentTarget.dataset.row;;//成绩列表的下标
    var term_y = this.data.term_y;
    this.showToast(true, "lodding", "查询中……");
    var userScoreInfo = this.data.userScoreInfo as any
    var academic_year_y = this.data.academic_year_y;
    var Jd = userScoreInfo[academic_year_y][term_y][row].jd //绩点
    this.setData({
      Jd: parseInt(Jd)
    })
    /**
     * 获取本地缓存，判断是否绑定数据
     */
    var bindScore = {
      zh: wx.getStorageSync('login').zh,
      mm: wx.getStorageSync('login').mm,
      id: userScoreInfo[academic_year_y][term_y][row].jxb_id,
      xnm: userScoreInfo[academic_year_y][term_y][row].xnm,
      xqm: userScoreInfo[academic_year_y][term_y][row].xqm,
    } as ScoreInquiryeItem;
    if (bindScore) {
      this.showToast(true, 'lodding', "查询中......");
      this.courseTaped(bindScore);
    }
    else if (!bindScore) {
      this.showToast(true, 'error', "请求失败");
    }
  },
  /**
       * 关闭成绩弹窗
       */
  closeTap: function () {
    var that = this;
    that.setData({
      courseTapdetail: false,
      termTitleTapdetail: false,
      scoreCountdetail: false
    })
  },
  /**
     * 成绩详情弹窗
     */
  async courseTaped(from: ScoreInquiryeItem) {
    //Detail 用来接受成绩详情的变量
    const { data: Detail } = await getScoreDetail(from) as unknown as IResult<any>
    if (!Detail) {
      this.showToast(true, 'error', "请求失败");
      setTimeout(() => {
        this.setData({
          showToast: false,
        })
      }, 800);
    } else {
      this.showToast(true, 'success', "请求成功");
    }
    /**
    *数据修饰
    */
    var kcxzmc = Detail.allDetails.kcxzmc;
    var color = '';//专修必修选修的颜色
    if (kcxzmc == "必修") {
      kcxzmc = "必修";
      color = '#3EBAD0';
    }
    else if (kcxzmc == '公共选修') {
      kcxzmc = "公选";
      color = '#20C38C';
    } else if (kcxzmc == '专业选修') {
      kcxzmc = "专选";
      color = '#FBDE71';
    }
    var score = Detail.allDetails.score;
    if (score.indexOf(".0") >= 0) {
      score = parseInt(score);
    }
    /**
   * 渲染
   */
    var height = this.data.height;
    if (Detail.Details.length >= 4) {
      height = '700';
    }
    else if (Detail.Details.length == 3) {
      height = '640';
    } else if (Detail.Details.length == 2) {
      height = '594';
    } else if (Detail.Details.length == 1) {
      height = '488';
    }
    this.setData({
      height: height,
      Detail: Detail,
      Details: Detail.Details,
      bj: Detail.allDetails.bj,
      jsxm: Detail.allDetails.jsxm,
      kcmc: Detail.allDetails.kcmc,
      score: score,
      xf: Detail.allDetails.xf,
      xnmmc: Detail.allDetails.xnmmc,
      xqmmc: Detail.allDetails.xqmmc,
      kcxzmc: kcxzmc,
      color: color,
    })
    setTimeout(() => {
      this.setData({
        showToast: false,
        courseTapdetail: true
      })
    }, 800);
  },

  /**
    * 点击学期称号打开弹窗
    */
  termTitleTap: function () {
    this.setData({
      termTitleTapdetail: true
    })
  },
  /**
  * 点击成绩计算打开弹窗
  */
  scoreCountTap: function () {
    this.setData({
      scoreCountdetail: true
    })
  },
  /**
  * 渲染学期按钮 (学年，学期) 均为int类型
  */
  renderAcademicAndTermTap: function (academic_year:number,term:number) {
    var academic_year_y = this.data.academic_year_y;
    var term_y = this.data.term_y;
    var fs = ''; //大一 Fresh
    var sh = ''; // 大二 Sophomore
    var jn = '';// 大三 Junior
    var sn = '';// 大四 Senior
    var last = '';//上学期 last
    var next = ''; //下学期 next
    if (academic_year == 1 && term == 1) { //大一 上
      term = term;
      academic_year = academic_year;
      academic_year_y = 'one';
      term_y = 'sxq';
      fs = "#20C38C";
      sh = "rgba(41, 41, 69, 0.2)";
      jn = "rgba(41, 41, 69, 0.2)";
      sn = "rgba(41, 41, 69, 0.2)";
      last = "#20C38C";
      next = "rgba(41, 41, 69, 0.2)";
    } else if (academic_year == 1 && term == 2) { //下
      term = term;
      academic_year = academic_year;
      academic_year_y = 'one';
      term_y = 'xxq';
      fs = "#20C38C";
      sh = "rgba(41, 41, 69, 0.2)";
      jn = "rgba(41, 41, 69, 0.2)";
      sn ="rgba(41, 41, 69, 0.2)";
      last = "rgba(41, 41, 69, 0.2)";
      next = "#20C38C";
    } else if (academic_year == 2 && term == 1) { //大二上
      term = term;
      academic_year = academic_year;
      academic_year_y = 'two';
      term_y = 'sxq';
      fs ="rgba(41, 41, 69, 0.2)";
      sh = "#20C38C";
      jn = "rgba(41, 41, 69, 0.2)";
      sn ="rgba(41, 41, 69, 0.2)";
      last = "#20C38C";
      next = "rgba(41, 41, 69, 0.2)";
    } else if (academic_year == 2 && term == 2) { //大二下
      term = term;
      academic_year = academic_year;
      academic_year_y = 'two';
      term_y = 'xxq';
      fs = "rgba(41, 41, 69, 0.2)";
      sh = "#20C38C";
      jn = "rgba(41, 41, 69, 0.2)";
      sn = "rgba(41, 41, 69, 0.2)";
      last = "rgba(41, 41, 69, 0.2)";
      next = "#20C38C";
    } else if (academic_year == 3 && term == 1) { //大三上
      term = term;
      academic_year = academic_year;
      academic_year_y = 'three';
      term_y = 'sxq';
      fs = "rgba(41, 41, 69, 0.2)";
      sh = "rgba(41, 41, 69, 0.2)";
      jn = "#20C38C";
      sn = "rgba(41, 41, 69, 0.2)";
      last = "#20C38C";
      next = "rgba(41, 41, 69, 0.2)";
    } else if (academic_year == 3 && term == 2) { //大三下
      term = term;
      academic_year = academic_year;
      academic_year_y = 'three';
      term_y = 'xxq';
      fs = "rgba(41, 41, 69, 0.2)";
      sh = "rgba(41, 41, 69, 0.2)";
      jn = "#20C38C";
      sn = "rgba(41, 41, 69, 0.2)";
      last = "rgba(41, 41, 69, 0.2)";
      next = "#20C38C";
    } else if (academic_year == 4 && term == 1) { //大四上
      term = term;
      academic_year = academic_year;
      academic_year_y = 'four';
      term_y = 'sxq';
      fs = "rgba(41, 41, 69, 0.2)";
      sh = "rgba(41, 41, 69, 0.2)";
      jn ="rgba(41, 41, 69, 0.2)";
      sn = "#20C38C";
      last = "#20C38C";
      next = "rgba(41, 41, 69, 0.2)";
    } else if (academic_year == 4 && term == 2) { //大四下
      term = term;
      academic_year = academic_year;
      academic_year_y = 'four';
      term_y = 'xxq';
      fs ="rgba(41, 41, 69, 0.2)";
      sh ="rgba(41, 41, 69, 0.2)";
      jn = "rgba(41, 41, 69, 0.2)";
      sn = "#20C38C";
      last ="rgba(41, 41, 69, 0.2)";
      next = "#20C38C";
    }
    this.setData({
      academic_year: academic_year,
      term: term,
      academic_year_y: academic_year_y,
      term_y: term_y,
      fs: fs,
      sh: sh,
      jn: jn,
      sn: sn,
      last: last,
      next: next,
    })
  },
  /**
   * 点击更换学期学年
   */
  choose: function (e: { currentTarget: { dataset: { academic_year: number; term: number; row: any, } } }) {
    console.log( e.currentTarget.dataset.academic_year)
    console.log(e.currentTarget.dataset.term)
    var academic_year = e.currentTarget.dataset.academic_year;
    var term = e.currentTarget.dataset.term;
    this.setData({academic_year:academic_year,term:term})
    this.renderAcademicAndTermTap(academic_year, term);
    /**
     *  改变称号
     */
    var that = this;
    var academic_year_y = that.data.academic_year_y;
    var term_y = that.data.term_y;
    var userScoreInfo = this.data.userScoreInfo as any;
    var xqxfscores = userScoreInfo[academic_year_y][term_y+'all'][0].xqxfscore;
    that.scoreLevels(xqxfscores);
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
    } as ScoreInquiryeItem;
      this.showToast(true, 'lodding', "查询中......");
      this.getUserInfoData(bindData);
  },
  /**
   * 发送请求，渲染数据
   * @param from 用户信息和成绩列表
   */
  async getUserInfoData(from: ScoreInquiryeItem) {
    const { data: info } = await getUserInfo(from) as unknown as IResult<any>;
    const { data: userScoreInfo } = await getScoreInfo(from) as unknown as IResult<any>
    if (!info) {
      this.showToast(true, 'error', "请求失败");
      setTimeout(() => {
        this.setData({
          showToast: false,
        })
      }, 800);
    } else if (info) {
      this.showToast(true, 'success', "请求成功");
    }
    /**
   * 渲染
   */
    this.setData({
      info: info,
      userScoreInfo: userScoreInfo
    })
    setTimeout(() => {
      this.setData({
        showToast: false
      })
    }, 800);
    this.renderAcademicAndTermTap(this.data.academic_year, this.data.term);
    /**
     * 在未点击学期更换时，进入默认的大一上称号
     */
    var academic_year_y = this.data.academic_year_y;
    var term_y = this.data.term_y + 'all';
    var xqxfscores = userScoreInfo[academic_year_y][term_y][0].xqxfscore;
    this.scoreLevels(xqxfscores);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
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
    this.initPageData();
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

  },
  lifetimes: {
    // 生命周期函数
    ready: function () {
      const windowHeight = wx.getSystemInfoSync().windowHeight; // 屏幕的高度
      const windowWidth = wx.getSystemInfoSync().windowWidth; // 屏幕的宽度
      console.log(windowWidth)
      this.setData({
        windowHeight,
        windowWidth
      })
    },
  },
})