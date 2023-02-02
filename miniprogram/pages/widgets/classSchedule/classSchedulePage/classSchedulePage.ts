// pages/widgets/classSchedule/classSchedulePage/classSchedulePage.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    week:[{index:1,type:false,day1:'8/28',day2:'8/29',day3:'8/30',day4:'8/31',day5:'9/1',day6:'9/2',day7:'9/3'},{index:2,type:true,day1:'9/4',day2:'9/5',day3:'9/6',day4:'9/7',day5:'9/8',day6:'9/9',day7:'9/10'},{index:3,type:true,day1:'9/11',day2:'9/12',day3:'9/13',day4:'9/14',day5:'9/15',day6:'9/16',day7:'9/17'},{index:4,type:true,day1:'9/18',day2:'9/19',day3:'9/20',day4:'9/21',day5:'9/22',day6:'9/23',day7:'9/24'},{index:5,type:true,day1:'9/25',day2:'9/26',day3:'9/27',day4:'9/28',day5:'9/29',day6:'9/30',day7:'10/1'},{index:6,type:true,day1:'10/2',day2:'10/3',day3:'10/4',day4:'10/5',day5:'10/6',day6:'10/7',day7:'10/8'},{index:7,type:true,day1:'10/9',day2:'10/10',day3:'10/11',day4:'10/12',day5:'10/13',day6:'10/14',day7:'10/15'},{index:8,type:true,day1:'10/16',day2:'10/17',day3:'10/18',day4:'10/19',day5:'10/20',day6:'10/21',day7:'10/22'},{index:9,type:true,day1:'10/23',day2:'10/24',day3:'10/25',day4:'10/26',day5:'10/27',day6:'10/28',day7:'10/29'},{index:10,type:true,day1:'10/30',day2:'10/31',day3:'11/1',day4:'11/2',day5:'11/3',day6:'11/4',day7:'11/5'},{index:11,type:true,day1:'11/6',day2:'11/7',day3:'11/8',day4:'11/9',day5:'11/10',day6:'11/11',day7:'11/12'},{index:12,type:true,day1:'11/13',day2:'11/14',day3:'11/15',day4:'11/16',day5:'11/17',day6:'11/18',day7:'11/19'},{index:13,type:true,day1:'11/20',day2:'11/21',day3:'11/22',day4:'11/23',day5:'11/24',day6:'11/25',day7:'11/26'},{index:14,type:true,day1:'11/27',day2:'11/28',day3:'11/29',day4:'11/30',day5:'12/1',day6:'12/2',day7:'12/3'},{index:15,type:true,day1:'12/4',day2:'12/5',day3:'12/6',day4:'12/7',day5:'12/8',day6:'12/9',day7:'12/10'},{index:16,type:true,day1:'12/11',day2:'12/12',day3:'12/13',day4:'12/14',day5:'12/15',day6:'12/16',day7:'12/17'},{index:17,type:true,day1:'12/18',day2:'12/19',day3:'12/20',day4:'12/21',day5:'12/22',day6:'12/23',day7:'12/24'},{index:18,type:true,day1:'12/25',day2:'12/26',day3:'12/27',day4:'12/28',day5:'12/29',day6:'12/30',day7:'12/31'},{index:19,type:true,day1:'1/1',day2:'1/2',day3:'1/3',day4:'1/4',day5:'1/5',day6:'1/6',day7:'1/7'}],
    showChange: false,
    semester:'大一上',
    multiArray: ['大一上', '大一下', '大二上', '大二下', '大三上', '大三下', '大四上', '大四下'], 
    number:0,
    day:2,
    Y:'',
    M:'',
    D:''
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

  closeBindDialog(){
    this.setData({
      showChange:false
    })
  },

  cleanBind(){
    this.setData({
      showChange:false
    })
  },

  selectSchoolTime(){
    this.setData({
      showChange:true
    })
  },

  selectWeek(e: any){
    this.setData({
      number:e.currentTarget.dataset.index
    })
    var week = this.data.week;
    week[this.data.number].type = false;
    this.setData({
       week:week
    });
    for(var i=0;i<this.data.number;i++){
      week[i].type = true;
      this.setData({
         week:week
      });
    }
    for(var i=this.data.number+1;i<19;i++){
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
/**
     * 获取当前年月
     */
    var timestamp = Date.parse(new Date() as unknown as string);
    var date = new Date(timestamp);
    this.setData({
      //获取年份
      Y: date.getFullYear() as unknown as string,
      //获取月份
      M: (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) as unknown as string,
      //获取当日日期
      D: date.getDate() < 10 ? '0' + date.getDate() : date.getDate() as unknown as string
    })
    for(var i=0;i<19;i++){
     if(this.data.M+'/'+this.data.D == this.data.week[i].day1){
      var week = this.data.week;
    week[i].type = false;
    this.setData({
       week:week
    })
    }
    if(this.data.M+'/'+this.data.D == this.data.week[i].day2){
      var week = this.data.week;
    week[i].type = false;
    this.setData({
       week:week
    })
    }
    if(this.data.M+'/'+this.data.D == this.data.week[i].day3){
      var week = this.data.week;
    week[i].type = false;
    this.setData({
       week:week
    })
    }
    if(this.data.M+'/'+this.data.D == this.data.week[i].day4){
      var week = this.data.week;
    week[i].type = false;
    this.setData({
       week:week
    })
    }
    if(this.data.M+'/'+this.data.D == this.data.week[i].day5){
      var week = this.data.week;
    week[i].type = false;
    this.setData({
       week:week
    })
    }
    if(this.data.M+'/'+this.data.D == this.data.week[i].day6){
      var week = this.data.week;
    week[i].type = false;
    this.setData({
       week:week
    })
    }
    if(this.data.M+'/'+this.data.D == this.data.week[i].day7){
      var week = this.data.week;
    week[i].type = false;
    this.setData({
       week:week
    })
    }
  }
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