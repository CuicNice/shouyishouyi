// pages/widgets/classSchedule/classSchedulePage/classSchedulePage.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    week:[{index:1,type:true},{index:2,type:true},{index:3,type:true},{index:4,type:true},{index:5,type:true},{index:6,type:true},{index:7,type:true},{index:8,type:true},{index:9,type:true},{index:10,type:true},{index:11,type:true},{index:12,type:true},{index:13,type:true},{index:14,type:true},{index:15,type:true},{index:16,type:true},{index:17,type:true},{index:18,type:true},{index:19,type:true},{index:20,type:true},{index:21,type:true},{index:22,type:true},{index:23,type:true},{index:24,type:true},{index:25,type:true},{index:26,type:true},{index:27,type:true}],
    showChange: false,
    semester:'大一上',
    multiArray: ['大一上', '大一下', '大二上', '大二下', '大三上', '大三下', '大四上', '大四下'], 
    number:0
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
    for(var i=this.data.number+1;i<27;i++){
      week[i].type = true;
      this.setData({
         week:week
      });
    }
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
      Y: date.getFullYear(),
      //获取月份  
      M: (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
      //获取当日日期 
      D: date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    })
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