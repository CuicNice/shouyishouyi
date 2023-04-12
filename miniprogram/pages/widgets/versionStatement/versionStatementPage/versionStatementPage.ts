// pages/widgets/versionStatement/versionStatementPage/versionStatementPage.ts
// 请求
// 暂时还没有接口
import{getDevDesItem,getPublicDesItem,getVersionDesItem}from "../../../../api/versionStarementApi";
// 构造参数
// 声明接口定义
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rectangleIcon:"/static/svg/Rectangle.svg",
  },
  // 小程序版本详情
    /**
   * 发送请求，渲染数据
   * @param from 楼栋数据
   */
  async initVersionStatement(){
  let that= this;
  //设置标题
  that.setData({
    versionBoardTitle:"小程序版本详情"
  })
  // console.log(from)
  // 分页请求查询
  // 请求渲染数据部分
  let { data: res } = await getVersionDesItem() as unknown as IResult<any>;
  if (!res) {
    // that.selectComponent("#toast").showToastAuto("请求失败", "error");
    console.log("请求失败，请重新绑定",res)
    that.setData({
      showImg: false,
      data: null
    })
  } else {
    // 请求成功对小程序版本声明进行渲染
    console.log("版本详情",res)
    that.setData({
      versionList:res,
      showImg: true
    })
    console.log("请求成功",res)
    // that.selectComponent("#toast").showToastAuto("请求成功", "success");
  }
  },
    // 声明详情
    async initDeclareStatement(){
  let that= this;
  // 请求渲染数据部分
   // 分页请求查询
  // 请求渲染数据部分
  let { data: res } = await getPublicDesItem() as unknown as IResult<any>;
  if (!res) {
    // that.selectComponent("#toast").showToastAuto("请求失败", "error");
    console.log("请求失败，请重新绑定",res)
    that.setData({
      showImg: false,
      data: null
    })
  } else {
    that.setData({
      showImg: true
    })
    console.log("请求成功",res)
    // that.selectComponent("#toast").showToastAuto("请求成功", "success");
      //设置标题
    let versionPublishTime=res["miniStatementTitle"]
    let versionPublishContent=res["miniStatementContent"]
  that.setData({
    declareBoardTitle:versionPublishTime,
    versionPublishContent:versionPublishContent
  })
  }
  },
    // 开发详情
async initDevStatement(){
  let that= this;
  //设置标题
  that.setData({
    devBoardTitle:"开发贡献"
  })
  // 请求渲染数据部分
   // 分页请求查询
  // 请求渲染数据部分
  let { data: res } = await getDevDesItem() as unknown as IResult<any>;
  if (!res) {
    // that.selectComponent("#toast").showToastAuto("请求失败", "error");
    console.log("请求失败，请重新绑定",res)
    that.setData({
      showImg: false,
      data: null
    })
  } else {
    that.setData({
      showImg: true
    })
    console.log("请求成功",res)
    console.log("okok",Object.keys(res))
    let devClassList=Object.keys(res)
    let devList=res
    console.log("devList",devList)
    console.log(res)
    that.setData({
      devClassList,
      devList
    })
  }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 返回
  onLoad() {
    this.setData({
      title: "我们努力的小伙伴"
    })
    let that=this
    that.initVersionStatement()
    that.initDeclareStatement()
    that.initDevStatement()
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