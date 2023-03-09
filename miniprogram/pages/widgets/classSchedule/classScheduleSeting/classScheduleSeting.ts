// pages/widgets/classSchedule/classScheduleSeting/classScheduleSeting.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classScheduleSetTitle: "设置",
    dialogTip: false,
    voluntarily: true,
    wu: false,
    jia: false,
    checked: false,
  },
  /* 
  *关闭弹窗
  */
  closeDialogTip() {
    this.setData({ dialogTip: false })
  },
  /* 
  *选择是否展示全部课表
  */
  switchChange(e: any) {
    this.setData({
      checked: e.detail.value
    })
    let value=wx.getStorageSync('widget-classSchedule')
    value.ifshowAllclass=!this.data.checked
    wx.setStorageSync("widget-classSchedule", value)
  },
  /* 
  *刷新
  */
  refresh() {
    var pages = getCurrentPages();
    var beforePage = pages[pages.length - 2]
    wx.navigateBack({
      delta: 1,
      success: function () {
        beforePage.refresh();
      }
    })
  },
  /* 
  *进入个性换肤界面
  */
  customskin() {
    wx.navigateTo({ url: '/pages/widgets/classSchedule/Customskin/Customskin' })
  },
  /* 
  *展开自动识别规则
  */
  details(e: any) {
    console.log(e.detail.value)
    this.setData({ dialogTip: true })
  },
  /* 
  *监听自动识别的选择
  */
  check(e: any) {
    let voluntarily;
    let jia;
    let wu;
    var arr=e.detail.value[0];
    if(arr==undefined){
        voluntarily=this.data.voluntarily;
        jia=this.data.jia;
        wu=this.data.wu;
    };
    if(arr=='voluntarily'){
        voluntarily=true;
        jia=false;
        wu=false;
    };
    if(arr=='jia'){
        voluntarily=false;
        jia=true;
        wu=false;
    };
    if(arr=='wu'){
        voluntarily=false;
        jia=false;
        wu=true;
    };
    this.setData({
      voluntarily:voluntarily,
      jia:jia,
      wu:wu
    });
   let value= wx.getStorageSync('widget-classSchedule')
   if(this.data.voluntarily==true){
    value.place='';
   };
   if(this.data.jia==true){
    value.place='嘉鱼';
   };
   if(this.data.wu==true){
    value.place='武昌';
   };
   wx.setStorageSync('widget-classSchedule',value);
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
    var value=wx.getStorageSync('widget-classSchedule');
    var wu=false;
    var jia=false;
    var voluntarily=false;
    if(value.place!=''){
      if(value.place=='武昌'){
        wu=true;
      };
      if(value.place=='嘉鱼'){
        jia=true;
      };
    }else{
      voluntarily=true;
    };
    this.setData({
      checked: !value.ifshowAllclass,
      wu:wu,
      jia:jia,
      voluntarily:voluntarily
    });
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