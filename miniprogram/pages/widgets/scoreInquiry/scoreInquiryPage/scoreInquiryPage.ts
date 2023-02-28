// pages/Widgets/scoreInquiry/scoreInquiry.js
import { getScoreDetail, getScoreInfo, getUserInfo } from '../../../../api/scoreInquiryApi';
export interface ScoreInquiryeItem {
zh: string,
mm: string,
id:string,
xnm:string,
xqm:string,
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userScoreInfo:[],
    scoreTitle:"成绩查询",
    courseTapdetail: false,
    termTitleTapdetail:false,
    scoreCountdetail:false,
    academic_year:1, // 学年 默认是大一
    academic_year_y: 'one',
    term:1, // 学期 默认是上学期
    term_y:'sxq',
    scoreLevel:0,//默认为等待入榜
    xqxfscore:'',
    scoreDetail:'',
    color:''//专修必修选修的颜色
  },
      /**
     * 变化等级称号
     */
  scoreLevels(xqxfscore: number){
    if(xqxfscore >=90 ){
      this.setData({
        scoreLevel: 1,
      })
    }else if(xqxfscore >=85 && xqxfscore < 90 ){
      this.setData({
        scoreLevel: 2,
      })
    }else if(xqxfscore>=80 && xqxfscore< 85){
      this.setData({
        scoreLevel: 3,
      })
    }else if(xqxfscore>=70 && xqxfscore< 80){
      this.setData({
        scoreLevel: 4,
      })
    }else if(xqxfscore>=60 && xqxfscore< 70){
      this.setData({
        scoreLevel: 5,
      })
    }else if(xqxfscore<=60&&xqxfscore>=0){
      this.setData({
        scoreLevel: 6,
      })
    }else{
      this.setData({
        scoreLevel:0,
      })
    }
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
 async courseTap(e:any){
    var row = e.currentTarget.dataset.row;//成绩列表的下标
    var term_y = this.data.term_y;
    var academic_year_y=this.data.academic_year_y
    this.showToast(true,"lodding","查询中……");
    var jd = this.data.userScoreInfo[academic_year_y][term_y][row]["jd"]
    this.setData({
      jd:parseInt(jd)
    })
    /**
     * 获取本地缓存，判断是否绑定数据
     */
     var bindScore = { 
      zh:wx.getStorageSync('login').zh,
      mm:wx.getStorageSync('login').mm,
      id: this.data.userScoreInfo[academic_year_y][term_y][row]["jxb_id"],
      xnm:this.data.userScoreInfo[academic_year_y][term_y][row]["xnm"],
      xqm:this.data.userScoreInfo[academic_year_y][term_y][row]["xqm"],
    } as ScoreInquiryeItem;
      if (bindScore) {
        this.showToast(true,'lodding',"查询中......");
        this.courseTaped(bindScore);
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
     const {data:Detail} = await getScoreDetail(from) as unknown as Iresult<any>
     if(!Detail){
       this.showToast(true,'error',"请求失败");
     }else{
      this.showToast(true,'success',"请求成功");
     }
     /*
     *数据修饰
     */
      var kcxzmc = Detail.allDetails.kcxzmc;
      var color  = '';//专修必修选修的颜色
      if(kcxzmc == "必修"){
         kcxzmc="必修";
         color='#3EBAD0';
      }
      else if (kcxzmc == '公共选修') {
        kcxzmc="公选";
        color='#20C38C';
      } else if ( kcxzmc == '专业选修') {
          kcxzmc = "专选";
          color ='#FBDE71';
      }
      var score = Detail.allDetails.score;
      if (score.indexOf(".0") >= 0) {
        score = parseInt(score);
      }
        /**
       * 渲染
       */
      if(Detail.Details.length >=4 ){
        this.setData({height:700})
      }
      else if(Detail.Details.length ==3){
        this.setData({height:640})
      }else if(Detail.Details.length ==2){
        this.setData({height:594})
      }else if(Detail.Details.length ==1){
        this.setData({height:488})
      }
      this.setData({
        Detail:Detail,
        Details:Detail.Details,
        bj:Detail.allDetails.bj,
        jsxm:Detail.allDetails.jsxm,
        kcmc:Detail.allDetails.kcmc,
        score:score,
        xf:Detail.allDetails.xf,
        xnmmc:Detail.allDetails.xnmmc,
        xqmmc:Detail.allDetails.xqmmc,
        kcxzmc:kcxzmc,
        color:color,
      })
      setTimeout(() => {
        this.setData({
          showToast:false,
          courseTapdetail:true
        })
      }, 800);
  },
  

  //点击学期称号打开弹窗
  termTitleTap:function(){
    this.setData({
      termTitleTapdetail: true 
  })
  },
 //点击成绩计算打开弹窗
  scoreCountTap:function(){
    this.setData({
      scoreCountdetail: true 
  })
  },
  // 渲染学期按钮 (学年，学期) 均为int类型
  renderAcademicAndTermTap: function(academic_year: number, term: number){
    if (academic_year == 1 && term == 1) { //大一 上
      this.setData({
            academic_year: academic_year,
            term: term,
            academic_year_y:'one',
            term_y:'sxq',
            bdc_1: "#20C38C",
            bdc_2: "rgba(41, 41, 69, 0.2)",
            bdc_3: "rgba(41, 41, 69, 0.2)",
            bdc_4: "rgba(41, 41, 69, 0.2)",
            bdc_5: "#20C38C",
            bdc_6: "rgba(41, 41, 69, 0.2)",   
          }) 
        } else if (academic_year ==1 && term == 2) { //下
          this.setData({
            academic_year: academic_year,
            term: term,
            academic_year_y:'one',
            term_y:'xxq',
            bdc_1: "#20C38C",
            bdc_2: "rgba(41, 41, 69, 0.2)",
            bdc_3: "rgba(41, 41, 69, 0.2)",
            bdc_4: "rgba(41, 41, 69, 0.2)",
            bdc_5: "rgba(41, 41, 69, 0.2)",
            bdc_6: "#20C38C",
          })
         
        } else if (academic_year == 2 && term == 1) { //大二上
          this.setData({
            academic_year: academic_year,
            term: term,
            academic_year_y:'two',
            term_y:'sxq',
            bdc_1: "rgba(41, 41, 69, 0.2)",
            bdc_2: "#20C38C",
            bdc_3: "rgba(41, 41, 69, 0.2)",
            bdc_4: "rgba(41, 41, 69, 0.2)",
            bdc_5: "#20C38C",
            bdc_6: "rgba(41, 41, 69, 0.2)",
          })
          
        } else if (academic_year == 2 && term == 2) { //大二下
          this.setData({
            academic_year: academic_year,
            term: term,
            academic_year_y:'two',
            term_y:'xxq',
            bdc_1: "rgba(41, 41, 69, 0.2)",
            bdc_2: "#20C38C",
            bdc_3: "rgba(41, 41, 69, 0.2)4",
            bdc_4: "rgba(41, 41, 69, 0.2)",
            bdc_5: "rgba(41, 41, 69, 0.2)",
            bdc_6: "#20C38C",
          })
         
        } else if (academic_year == 3 && term == 1) { //大三上
          this.setData({
            academic_year: academic_year,
            term: term,
            academic_year_y:'three',
            term_y:'sxq',
            bdc_1: "rgba(41, 41, 69, 0.2)",
            bdc_2: "rgba(41, 41, 69, 0.2)",
            bdc_3: "#20C38C",
            bdc_4: "rgba(41, 41, 69, 0.2)",
            bdc_5: "#20C38C",
            bdc_6: "rgba(41, 41, 69, 0.2)",
          })
          
        } else if (academic_year == 3 && term == 2) { //大三下
          this.setData({
            academic_year: academic_year,
            term: term,
            academic_year_y:'three',
            term_y:'xxq',
            bdc_1: "rgba(41, 41, 69, 0.2)",
            bdc_2: "rgba(41, 41, 69, 0.2)",
            bdc_3: "#20C38C",
            bdc_4: "rgba(41, 41, 69, 0.2)",
            bdc_5: "rgba(41, 41, 69, 0.2)",
            bdc_6: "#20C38C",
          })
          
        } else if (academic_year == 4 && term == 1) { //大四上
          this.setData({
            academic_year: academic_year,
            term: term,
            academic_year_y:'four',
            term_y:'sxq',
            bdc_1: "rgba(41, 41, 69, 0.2)",
            bdc_2: "rgba(41, 41, 69, 0.2)",
            bdc_3: "rgba(41, 41, 69, 0.2)",
            bdc_4: "#20C38C",
            bdc_5: "#20C38C",
            bdc_6: "rgba(41, 41, 69, 0.2)",
          })
          
        } else if (academic_year == 4 && term == 2) { //大四下
          this.setData({
            academic_year: academic_year,
            term: term,
            academic_year_y:'four',
            term_y:'xxq',
            bdc_1: "rgba(41, 41, 69, 0.2)",
            bdc_2: "rgba(41, 41, 69, 0.2)",
            bdc_3: "rgba(41, 41, 69, 0.2)",
            bdc_4: "#20C38C",
            bdc_5: "rgba(41, 41, 69, 0.2)",
            bdc_6: "#20C38C",
          })
         
        }
  },


  choose: function (e: { currentTarget: { dataset: { academic_year: any; term: any; row: any } } }) {
    var academic_year = e.currentTarget.dataset.academic_year;
    var term = e.currentTarget.dataset.term;
    var row = e.currentTarget.dataset.row;
    this.renderAcademicAndTermTap(academic_year, term);
    //wx.hideLoading();
    //改变称号
    var that = this;
    var academic_year_y = that.data.academic_year_y;
    var term_y = that.data.term_y;
    that.scoreLevels(that.data.userScoreInfo[academic_year_y][term_y+'all'][0].xqxfscore);                      
  },
/**
   * 初始化页面渲染函数
   */
 async initPageData() {
    /**
     * 获取本地缓存，判断是否绑定数据
     */
     var bindData = { 
      zh:wx.getStorageSync('login').zh,
      mm:wx.getStorageSync('login').mm,
    } as ScoreInquiryeItem;
      console.log(bindData)
      if (bindData) {
        this.showToast(true,'lodding',"查询中......");
        this.getUserInfoData(bindData);
      }  
  },
  /**
   * 发送请求，渲染数据
   * @param from 用户信息
   */
  async getUserInfoData(from: ScoreInquiryeItem) {
    console.log(from);
   const {data: res1 } = await getUserInfo(from) as unknown as IResult<any>;
   const {data: res2 } = await getScoreInfo(from) as unknown as IResult<any>
   console.log(res1)
   if(!res1){
     this.showToast(true,'error',"请求失败");
   }else if(res1){
    this.showToast(true,'success',"请求成功");
   }
   
      /**
     * 渲染
     */
    
    this.setData({
      data1: res1,
      userScoreInfo: res2,

    })
    setTimeout(() => {
      this.setData({
        showToast:false
      })
    }, 800);
    this.renderAcademicAndTermTap(this.data.academic_year, this.data.term);
    /*
   *数据处理
   */
  var that = this;
  var academic_year_y = that.data.academic_year_y;
  var term_y = that.data.term_y;
  that.scoreLevels(that.data.userScoreInfo[academic_year_y][term_y+'all'][0].xqxfscore);
    
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
    this.initPageData();
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

  },
  lifetimes: {
    // 生命周期函数
    ready: function() {
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