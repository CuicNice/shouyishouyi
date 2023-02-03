// pages/widgets/classSchedule/classSchedulePage/classSchedulePage.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    week:[{index:1,type:true,day1:'8/28',day2:'8/29',day3:'8/30',day4:'8/31',day5:'9/1',day6:'9/2',day7:'9/3'},{index:2,type:true,day1:'9/4',day2:'9/5',day3:'9/6',day4:'9/7',day5:'9/8',day6:'9/9',day7:'9/10'},{index:3,type:true,day1:'9/11',day2:'9/12',day3:'9/13',day4:'9/14',day5:'9/15',day6:'9/16',day7:'9/17'},{index:4,type:true,day1:'9/18',day2:'9/19',day3:'9/20',day4:'9/21',day5:'9/22',day6:'9/23',day7:'9/24'},{index:5,type:true,day1:'9/25',day2:'9/26',day3:'9/27',day4:'9/28',day5:'9/29',day6:'9/30',day7:'10/1'},{index:6,type:true,day1:'10/2',day2:'10/3',day3:'10/4',day4:'10/5',day5:'10/6',day6:'10/7',day7:'10/8'},{index:7,type:true,day1:'10/9',day2:'10/10',day3:'10/11',day4:'10/12',day5:'10/13',day6:'10/14',day7:'10/15'},{index:8,type:true,day1:'10/16',day2:'10/17',day3:'10/18',day4:'10/19',day5:'10/20',day6:'10/21',day7:'10/22'},{index:9,type:true,day1:'10/23',day2:'10/24',day3:'10/25',day4:'10/26',day5:'10/27',day6:'10/28',day7:'10/29'},{index:10,type:true,day1:'10/30',day2:'10/31',day3:'11/1',day4:'11/2',day5:'11/3',day6:'11/4',day7:'11/5'},{index:11,type:true,day1:'11/6',day2:'11/7',day3:'11/8',day4:'11/9',day5:'11/10',day6:'11/11',day7:'11/12'},{index:12,type:true,day1:'11/13',day2:'11/14',day3:'11/15',day4:'11/16',day5:'11/17',day6:'11/18',day7:'11/19'},{index:13,type:true,day1:'11/20',day2:'11/21',day3:'11/22',day4:'11/23',day5:'11/24',day6:'11/25',day7:'11/26'},{index:14,type:true,day1:'11/27',day2:'11/28',day3:'11/29',day4:'11/30',day5:'12/1',day6:'12/2',day7:'12/3'},{index:15,type:true,day1:'12/4',day2:'12/5',day3:'12/6',day4:'12/7',day5:'12/8',day6:'12/9',day7:'12/10'},{index:16,type:true,day1:'12/11',day2:'12/12',day3:'12/13',day4:'12/14',day5:'12/15',day6:'12/16',day7:'12/17'},{index:17,type:true,day1:'12/18',day2:'12/19',day3:'12/20',day4:'12/21',day5:'12/22',day6:'12/23',day7:'12/24'},{index:18,type:true,day1:'12/25',day2:'12/26',day3:'12/27',day4:'12/28',day5:'12/29',day6:'12/30',day7:'12/31'},{index:19,type:true,day1:'1/1',day2:'1/2',day3:'1/3',day4:'1/4',day5:'1/5',day6:'1/6',day7:'1/7'}],
    suorec:'',
    semester:'大一上',
    multiArray: ['大一上', '大一下', '大二上', '大二下', '大三上', '大三下', '大四上', '大四下'], 
    number:'20',
    day:0,
    Y:'',
    M:'',
    D:'',
    classSchedule:{},
    hidden: false,
    Semesterswitchingdetail:false,
    semesterList:['大一上学期','大一下学期','大二上学期','大二下学期','大三上学期','大三下学期','大四上学期','大四下学期'],
    selectedIdx:0,
    showSelector:true
  },
   //导航栏动画
   scrollToLower: function () {
    var that = this;
    that.setData({
      hidden: true
    });
  },
  scrollToUpper: function () {
    var that = this;
    that.setData({
      hidden: false
    });
  },

  bindEletricCharge(){
    if(this.data.suorec == '大一下' ||this.data.suorec == '大二下' ||this.data.suorec == '大三下' ||this.data.suorec == '大四下'){
      this.setData({
        week:[{index:1,type:true,day1:'2/19',day2:'2/20',day3:'2/21',day4:'2/22',day5:'2/23',day6:'2/24',day7:'2/25'},{index:2,type:true,day1:'2/26',day2:'2/27',day3:'2/28',day4:'3/1',day5:'3/2',day6:'3/3',day7:'3/4'},{index:3,type:true,day1:'3/5',day2:'3/6',day3:'3/7',day4:'3/8',day5:'3/9',day6:'3/10',day7:'3/11'},{index:4,type:true,day1:'3/12',day2:'3/13',day3:'3/14',day4:'3/15',day5:'3/16',day6:'3/17',day7:'3/18'},{index:5,type:true,day1:'3/19',day2:'3/20',day3:'3/21',day4:'3/22',day5:'3/23',day6:'3/24',day7:'3/25'},{index:6,type:true,day1:'3/26',day2:'3/27',day3:'3/28',day4:'3/29',day5:'3/30',day6:'3/31',day7:'4/1'},{index:7,type:true,day1:'4/2',day2:'4/3',day3:'4/4',day4:'4/5',day5:'4/6',day6:'4/7',day7:'4/8'},{index:8,type:true,day1:'4/9',day2:'4/10',day3:'4/11',day4:'4/12',day5:'4/13',day6:'4/14',day7:'4/15'},{index:9,type:true,day1:'4/16',day2:'4/17',day3:'4/18',day4:'4/19',day5:'4/20',day6:'4/21',day7:'4/22'},{index:10,type:true,day1:'4/23',day2:'4/24',day3:'4/25',day4:'4/26',day5:'4/27',day6:'4/28',day7:'4/29'},{index:11,type:true,day1:'4/30',day2:'5/1',day3:'5/2',day4:'5/3',day5:'5/4',day6:'5/5',day7:'5/6'},{index:12,type:true,day1:'5/7',day2:'5/8',day3:'5/9',day4:'5/10',day5:'5/11',day6:'5/12',day7:'5/13'},{index:13,type:true,day1:'5/14',day2:'5/15',day3:'5/16',day4:'5/17',day5:'5/18',day6:'5/19',day7:'5/20'},{index:14,type:true,day1:'5/21',day2:'5/22',day3:'5/23',day4:'5/24',day5:'5/25',day6:'5/26',day7:'5/27'},{index:15,type:true,day1:'5/28',day2:'5/29',day3:'5/30',day4:'5/31',day5:'6/1',day6:'6/2',day7:'6/3'},{index:16,type:true,day1:'6/4',day2:'6/5',day3:'6/6',day4:'6/7',day5:'6/8',day6:'6/9',day7:'6/10'},{index:17,type:true,day1:'6/11',day2:'6/12',day3:'6/13',day4:'6/14',day5:'6/15',day6:'6/16',day7:'6/17'},{index:18,type:true,day1:'6/18',day2:'6/19',day3:'6/20',day4:'6/21',day5:'6/22',day6:'6/23',day7:'6/24'},{index:19,type:true,day1:'6/25',day2:'6/26',day3:'6/27',day4:'6/28',day5:'6/29',day6:'6/30',day7:'7/1'}]
      })
    }
    if(this.data.suorec == '大一上' ||this.data.suorec == '大二上' ||this.data.suorec == '大三上' ||this.data.suorec == '大四上'){
      this.setData({
        week:[{index:1,type:true,day1:'8/28',day2:'8/29',day3:'8/30',day4:'8/31',day5:'9/1',day6:'9/2',day7:'9/3'},{index:2,type:true,day1:'9/4',day2:'9/5',day3:'9/6',day4:'9/7',day5:'9/8',day6:'9/9',day7:'9/10'},{index:3,type:true,day1:'9/11',day2:'9/12',day3:'9/13',day4:'9/14',day5:'9/15',day6:'9/16',day7:'9/17'},{index:4,type:true,day1:'9/18',day2:'9/19',day3:'9/20',day4:'9/21',day5:'9/22',day6:'9/23',day7:'9/24'},{index:5,type:true,day1:'9/25',day2:'9/26',day3:'9/27',day4:'9/28',day5:'9/29',day6:'9/30',day7:'10/1'},{index:6,type:true,day1:'10/2',day2:'10/3',day3:'10/4',day4:'10/5',day5:'10/6',day6:'10/7',day7:'10/8'},{index:7,type:true,day1:'10/9',day2:'10/10',day3:'10/11',day4:'10/12',day5:'10/13',day6:'10/14',day7:'10/15'},{index:8,type:true,day1:'10/16',day2:'10/17',day3:'10/18',day4:'10/19',day5:'10/20',day6:'10/21',day7:'10/22'},{index:9,type:true,day1:'10/23',day2:'10/24',day3:'10/25',day4:'10/26',day5:'10/27',day6:'10/28',day7:'10/29'},{index:10,type:true,day1:'10/30',day2:'10/31',day3:'11/1',day4:'11/2',day5:'11/3',day6:'11/4',day7:'11/5'},{index:11,type:true,day1:'11/6',day2:'11/7',day3:'11/8',day4:'11/9',day5:'11/10',day6:'11/11',day7:'11/12'},{index:12,type:true,day1:'11/13',day2:'11/14',day3:'11/15',day4:'11/16',day5:'11/17',day6:'11/18',day7:'11/19'},{index:13,type:true,day1:'11/20',day2:'11/21',day3:'11/22',day4:'11/23',day5:'11/24',day6:'11/25',day7:'11/26'},{index:14,type:true,day1:'11/27',day2:'11/28',day3:'11/29',day4:'11/30',day5:'12/1',day6:'12/2',day7:'12/3'},{index:15,type:true,day1:'12/4',day2:'12/5',day3:'12/6',day4:'12/7',day5:'12/8',day6:'12/9',day7:'12/10'},{index:16,type:true,day1:'12/11',day2:'12/12',day3:'12/13',day4:'12/14',day5:'12/15',day6:'12/16',day7:'12/17'},{index:17,type:true,day1:'12/18',day2:'12/19',day3:'12/20',day4:'12/21',day5:'12/22',day6:'12/23',day7:'12/24'},{index:18,type:true,day1:'12/25',day2:'12/26',day3:'12/27',day4:'12/28',day5:'12/29',day6:'12/30',day7:'12/31'},{index:19,type:true,day1:'1/1',day2:'1/2',day3:'1/3',day4:'1/4',day5:'1/5',day6:'1/6',day7:'1/7'}]
      })
    }
    this.setData({
      number:'20',
      semester:this.data.suorec,
      Semesterswitchingdetail:false
    })
  },

  xqchange(e:any){
    this.setData({
      suorec:this.data.multiArray[e.detail.value[0]]
    })
  },

  selectSchoolTime(){
    this.setData({
      Semesterswitchingdetail:true
    })
  },

  selectWeek(e: any){
    this.setData({
      number:e.currentTarget.dataset.index
    })
    var week = this.data.week;
    week[this.data.number as unknown as number].type = false;
    this.setData({
       week:week
    });
    var k=this.data.number as unknown as number
    for(var i=0;i<k;i++){
      week[i].type = true;
      this.setData({
         week:week
      });
    }
    for(var i=this.data.number as unknown as number+1;i<19;i++){
      week[i].type = true;
      this.setData({
         week:week
      });
    }
  },

  changdata1(){
    console.log('111')
    this.setData({
      day:1
    })
  },
  changdata2(){
    console.log('222')
    this.setData({
      day:2
    })
  },
  changdata3(){
    console.log('333')
    this.setData({
      day:3
    })
  },
  changdata4(){
    console.log('444')
    this.setData({
      day:4
    })
  },
  changdata5(){
    console.log('555')
    this.setData({
      day:5
    })
  },
  changdata6(){
    console.log('666')
    this.setData({
      day:6
    })
  },
  changdata7(){
    console.log('777')
    this.setData({
      day:7
    })
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
    wx.request({
      url: 'http://www.fmin-courses.com:9527/api/v1/craw/user/classTable', 
      method:'POST',
      data: {
        "zh": "20191107124",
        "mm": "200169wxf",
        "year": 2022,
        "num": 3
      },
      success:(res)=> {
        console.log(res.data)
        this.setData({
          classSchedule:res.data
        })
      }
    })
     /**
     * 获取当前年月
     */
    var timestamp = Date.parse(new Date() as unknown as string);
    var date = new Date(timestamp);
    this.setData({
      //获取年份
      Y: date.getFullYear() as unknown as string,
      //获取月份
      M:(date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1) as unknown as string,
      //获取当日日期
      D:date.getDate() < 10 ?(date.getDate())as unknown as string : date.getDate() as unknown as string
    })
    console.log(this.data.M+'/'+this.data.D)
    for(var i=0;i<19;i++){
     if(this.data.M+'/'+this.data.D == this.data.week[i].day1){
       console.log('111')
      var week = this.data.week;
    week[i].type = false;
    this.setData({
      day:1,
      week:week,
      number:i as unknown as string
   })
    }
    if(this.data.M+'/'+this.data.D == this.data.week[i].day2){
      console.log('222')
      var week = this.data.week;
    week[i].type = false;
    this.setData({
      week:week,
      day:2,
      number:i as unknown as string
   })
    }
    if(this.data.M+'/'+this.data.D == this.data.week[i].day3){
      console.log('333')
      var week = this.data.week;
    week[i].type = false;
    this.setData({
       week:week,
       day:3,
       number:i as unknown as string
    })
    }
    if(this.data.M+'/'+this.data.D == this.data.week[i].day4){
      console.log('444')
      var week = this.data.week;
    week[i].type = false;
    this.setData({
      week:week,
      day:4,
      number:i as unknown as string
   })
    }
    if(this.data.M+'/'+this.data.D == this.data.week[i].day5){
      console.log('555')
      var week = this.data.week;
    week[i].type = false;
    this.setData({
      week:week,
      day:5,
      number:i as unknown as string
   })
    }
    if(this.data.M+'/'+this.data.D == this.data.week[i].day6){
      console.log('666')
      var week = this.data.week;
    week[i].type = false;
    this.setData({
      week:week,
      day:6,
      number:i as unknown as string
   })
    }
    if(this.data.M+'/'+this.data.D == this.data.week[i].day7){
      console.log('777')
      var week = this.data.week;
    week[i].type = false;
    this.setData({
      week:week,
      day:7,
      number:i as unknown as string
   })
    }
  }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  cancelBindEletricCharge(){
    this.setData({
      Semesterswitchingdetail:false
    })
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