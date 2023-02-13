// pages/widgets/versionStatement/versionStatementPage/versionStatementPage.ts
// 请求
// 暂时还没有接口
// import{getVersionContent,getDeclareContent,getDevelopmentContent}from "../../../../api/versionStarementApi";
// 构造参数
// 声明接口定义
export interface versionStarementItem{

}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rectangleIcon:"/static/svg/Rectangle.svg",

  },
  // 小程序版本详情
initVersionStatement(){
  let that= this;
  //设置标题
  that.setData({
    versionBoardTitle:"小程序版本详情"
  })
  // 请求渲染数据部分
  },
    // 声明详情
initDeclareStatement(){
  let that= this;
  //设置标题
  that.setData({
    declareBoardTitle:"小程序声明"
  })
  // 请求渲染数据部分
  },
    // 开发详情
initDevStatement(){
  let that= this;
  //设置标题
  that.setData({
    devBoardTitle:"开发贡献"
  })
  // 请求渲染数据部分
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 返回


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
    let that=this;
    // 初始化标题
    that.initVersionStatement()
    that.initDeclareStatement()
    that.initDevStatement()

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