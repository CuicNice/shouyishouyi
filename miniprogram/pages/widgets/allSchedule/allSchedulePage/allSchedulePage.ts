// pages/widgets/allSchedule/allSchedulePage/allSchedulePage.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gradeId: 0,
    gradeArray: [],
    grade: '',
    academy: '',
    academyArray: [],
    academyId: 0,
    Class: '',
    ClassArray: [],
    ClassId: 0,
    semesters: '',
    semesterArray: [],
    semesterId: 0,
    electricChargedetail: true,//默认显示，之后需要更改为点击显示,
  },
  /**
   * 选择年级
   */
  bindGrade(e: any) {
    console.log(e)
    var that = this;
    this.setData({
      gradeId: e.detail.value,
      grade: that.data.gradeArray[e.detail.value]
    })
  },
  /**
  * 选择学院
  */
  bindAcademy(e: any) {
    var that = this;
    if (this.data.gradeId !== 0) {
      console.log(e)
      var that = this;
      this.setData({
        academyId: e.detail.value,
        academy: that.data.academyArray[e.detail.value],
      })
    }
    else {
      that.selectComponent("#toast").showToastAuto("请先选择年级", "", 0.5);
    }
  },
  /**
 * 选择班级
 */
  bindClass(e: any) {
    var that = this;
    if (this.data.gradeId !== 0 && this.data.academyId !== 0) {
      console.log(e)
      var that = this;
      this.setData({
        ClassId: e.detail.value,
        Class: that.data.ClassArray[e.detail.value]
      })
    }
    else {
      if (this.data.gradeId == 0) {
        that.selectComponent("#toast").showToastAuto("请先选择年级", "", 0.5);
      }
      if (this.data.gradeId !== 0 && this.data.academyId == 0)
        that.selectComponent("#toast").showToastAuto("请先选择学院", "", 0.5);
    }
  },
  /**
   * 选择学期
   */
  bindSemester(e: any) {
    var that = this;
    if (this.data.gradeId !== 0 && this.data.academyId !== 0 && this.data.ClassId !== 0) {
      console.log(e)
      var that = this;
      this.setData({
        semesterId: e.detail.value,
        semesters: that.data.semesterArray[e.detail.value]
      })
    }
    else {
      if (this.data.gradeId == 0) {
        that.selectComponent("#toast").showToastAuto("请先选择年级", "", 0.5);
      }
      if (this.data.gradeId !== 0 && this.data.academyId == 0)
        that.selectComponent("#toast").showToastAuto("请先选择学院", "", 0.5);
      if (this.data.gradeId !== 0 && this.data.academyId !== 0 && this.data.ClassId == 0) {
        that.selectComponent("#toast").showToastAuto("请先选择班级", "", 0.5);
      }
    }
  },

  changeInfo() {
    var gradeArray = this.data.gradeArray as any;
    gradeArray = ['2017', '2018', '2019', '2020', '2021', '2023']
    var academyArray = this.data.academyArray as any;
    academyArray = ['', '信息科学与工程学院', '机电与自动化学院', '城市建设学院', '外国语学院', '经济管理学院', '新闻与文法学院', '艺术设计学院']
    this.setData({
      gradeArray: gradeArray,
      academyArray: academyArray,
    })
  },
  /**
   * 取消绑定
   */
  cancelBind() {
    this.setData({
      electricChargedetail: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.changeInfo();
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