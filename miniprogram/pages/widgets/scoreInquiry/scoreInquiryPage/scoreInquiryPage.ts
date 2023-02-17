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
    userScoreInfo:{},
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
    scoreDetail:''
  },
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
  showToast(showToast: boolean, toastIcon: string, toastTitle: string) { 
    this.setData({ 
      showToast: showToast, 
      toastIcon: toastIcon, 
      toastTitle: toastTitle 
    }) 
  }, 
  //点击传值
 async courseTap(e:any){
    var row = e.currentTarget.dataset.row;
    var zh;
    var mm;
    //console.log(row);
    var academic_year_y = this.data.academic_year_y;
    var term_y = this.data.term_y;
    this.showToast(true,"lodding","查询中……");
    var jd = this.data.userScoreInfo[academic_year_y][term_y][row].jd
    this.setData({
      jd:parseInt(jd)
    })
    /**
     * 获取本地缓存，判断是否绑定数据
     */
     var bindScore = { 
      zh:'20191107124',
      mm:'200169wxf',
      id: this.data.userScoreInfo[academic_year_y][term_y][row].jxb_id,
      xnm:this.data.userScoreInfo[academic_year_y][term_y][row].xnm,
      xqm:this.data.userScoreInfo[academic_year_y][term_y][row].xqm,
    } as ScoreInquiryeItem;
      console.log(bindScore)
      if (bindScore) {
        this.showToast(true,'lodding',"查询中......");
        this.courseTaped(bindScore);
      }  

},
// 关闭成绩弹窗
closeTap: function (e:any) {
  var that = this;
  that.setData({
    courseTapdetail: false,
    termTitleTapdetail: false,
    scoreCountdetail: false
  })
},
  //弹窗
    async courseTaped(from: ScoreInquiryeItem) {
      console.log(from);
     const {data: res3 } = await getScoreDetail(from) as unknown as Iresult<any>
     console.log(res3)
     if(!res3){
       this.showToast(true,'error',"请求失败");
     }else{
      this.showToast(true,'success',"请求成功");
     }
     /*
     *数据修饰
     */
    
    var kcxzmc = res3.allDetails.kcxzmc
      if(kcxzmc == "必修"){
       this.setData({
         kcxzmc:"必修",
        color:'#3EBAD0'
      }) 
      }
      else if (kcxzmc == '公共选修') {
      this.setData({
        kcxzmc :"公选",
        color :'#20C38C',
      })
      } else if ( kcxzmc == '专业选修') {
        this.setData({
          kcxzmc : "专选",
          color : '#FBDE71',
        })
      };
      var score = res3.allDetails.score;
      if (score.indexOf(".0") >= 0) {
        score = parseInt(score);
      };
        /**
       * 渲染
       */
      this.setData({
        Detail:res3,
        Details:res3.Details,
        bj:res3.allDetails.bj,
        jsxm:res3.allDetails.jsxm,
        kcmc:res3.allDetails.kcmc,
        score:score,
        xf:res3.allDetails.xf,
        xnmmc:res3.allDetails.xnmmc,
        xqmmc:res3.allDetails.xqmmc,
      })
      setTimeout(() => {
        this.setData({
          showToast:false,
          courseTapdetail:true
        })
      }, 800);
      
  /*
        success (res) {
          if (res.data.code == 20000){
            //console.log(res.data.data)
            that.setData({
              Details:res.data.data,
              showToast:false,
            },function(){
              console.log(that.data)
              var jsxm =that.data.Details.allDetails.jsxm;
              var Details = this.data.Details;
              var row = e.currentTarget.dataset.row;
              var userScoreInfo = this.data.userScoreInfo;
              var academic_year_y = this.data.academic_year_y;
              var term_y = this.data.term_y;
              var kcname= userScoreInfo[academic_year_y][term_y][row].name;
              var score=userScoreInfo[academic_year_y][term_y][row].score;
              if (score.indexOf(".0") >= 0) {
                score = parseInt(score);
              };
              var my_class = userScoreInfo[academic_year_y][term_y][row].my_class;
              var jd =  userScoreInfo[academic_year_y][term_y][row].jd;
              var class_score =userScoreInfo[academic_year_y][term_y][row].class_score;
              var xnm = userScoreInfo[academic_year_y][term_y][row].xnm;
              var type =userScoreInfo[academic_year_y][term_y][row].type;
              if (type == '公共选修') {
                type = "公选"
              } else if ( type == '专业选修') {
                type  = "专选"
              };
              var xf = that.data.Details.allDetails.xf;
              var xnmmc =that.data.Details.allDetails.xnmmc;
              var xqmmc = that.data.Details.allDetails.xqmmc;
              var Details = that.data.Details.Details;
              var leng = Details.length;
              if (leng != 0) {
                for (var i = 0; i < Details.length; i++) {
                  if (Details[i].cjfx == '平时成绩') {
                    Details[i].cjfx = '平时'
                  } else if (Details[i].cjfx == '考试成绩') {
                    Details[i].cjfx = '考试'
                  } else if (Details[i].cjfx == '实验成绩') {
                    Details[i].cjfx = '实验'
                  } else if (Details[i].cjfx == '实训内容成绩') {
                    Details[i].cjfx = '实训'
                  }
                }
              }
                this.setData({
                    jsxm:jsxm,
                    type:type,
                    my_class:my_class,
                    score:score,
                    kcname:kcname,
                    jd:parseInt(jd),
                    class_score:class_score,
                    xf: xf,
                    xnmmc: xnmmc,
                    xqmmc: xqmmc,
                    Details: Details,
                    leng: leng,
                    courseTapdetail: true,
                    
                })
                
            })
        }else{
          console.log(res.data.msg);
        }
      }
    });
    wx.hideLoading();*/
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
   // wx.vibrateShort(); // 1、使手机震动15ms
   //this.showToast(true,"loading","查询中……");
    // console.log( e.currentTarget.dataset)
    var academic_year = e.currentTarget.dataset.academic_year;
    var term = e.currentTarget.dataset.term;
    var row = e.currentTarget.dataset.row;
    // var userScoreInfo = this.data.userScoreInfo;
    // var academic_year_y = this.data.academic_year_y;
    // var term_y = this.data.term_y;
    // var score=userScoreInfo[academic_year_y][term_y][row].score;
    // if (score.indexOf(".0") >= 0) {
    //   score = parseInt(score);
    // };
    // console.log(academic_year, term)
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
    var zh;
    var mm;
    /**
     * 获取本地缓存，判断是否绑定数据
     */
     var bindData = { 
      zh:'20191107124',
      mm:'200169wxf',
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
   const {data: res2 } = await getScoreInfo(from) as unknown as Iresult<any>
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
    /*this.setData({
      toastTitle:"查询中......",
      toastIcon:'lodding',
      showToast:true,
      })
    wx.request({
      url: `http://www.fmin-courses.com:9527/api/v1/craw/user/userInfo`,
      method:'POST',
      data:{
        zh: zh=wx.getStorageSync('key1'),
        mm: mm=wx.getStorageSync('key2'),
      },
      success:((res) =>{
        this.setData({
          showinfo:res.data.data
        })
        console.log(res.data)
      }), 
    }),
     
    //this.initPageData();
   this.renderAcademicAndTermTap(this.data.academic_year, this.data.term);
   var zh;
   var mm;
    var that = this;
    wx.request({
      url: 'http://www.fmin-courses.com:9527/api/v1/craw/user/userScore',
      method:"POST",
      data: {
        zh: zh=wx.getStorageSync('key1'),
        mm: mm=wx.getStorageSync('key2'),
      },
      success:((res)=> {
        //console.log(res.data)
        if (res.data){
         // console.log(res.data.data)
          var academic_year_y = that.data.academic_year_y;
          var term_y = that.data.term_y;
          that.scoreLevels(res.data.data[academic_year_y][term_y+'all'][0].xqxfscore)
          that.setData({
            userScoreInfo: res.data.data,
            xqxfscore:res.data.data[academic_year_y][term_y+'all'][0].xqxfscore
            
          })
          this.setData({
            toastTitle:"绑定成功",
            toastIcon:'success',
            showToast:true,
            })
            setTimeout(() => {
              this.setData({
            showToast:false
          })
            }, 500);
          
        }else{
          console.log(res.data.msg);
        }
      })
    })*/
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