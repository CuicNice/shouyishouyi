// pages/widgets/message/messagePage/messagePage.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:true,
    show:'green',
    bottomText:'喜欢就点个赞吧~',
    num:0,
    color : [' #4BDCAB','#3EBAD0','#FBDE71'],
    colorList:[],
  },

//点击进入信息详情
getMessage(){
  this.setData({
    isShow:false,
  })
},
//点赞，点赞
getLike(){
  if(this.data.show == 'green')
  this.setData({
    show:'active',
    bottomText:'211人赞过',
    num:1,
  })
  else if(this.data.show == 'active'){
    this.setData({
      show:'green',
      bottomText:'喜欢就点个赞吧~',
    })
  }
},

//随机颜色
getColor(){
  let arr1 = this.data.color;
  let arr2 = this.data.color;
  let res = arr1.concat(arr2);
  this.setData({
    colorList:res
  })
  console.log('colorList')
//  let colorList = this.data.color;
//  //var color = [' #4BDCAB','#3EBAD0','#FBDE71'];
//  let res = colorList.concat(colorList);
//  this.setData ({
//   colorList:res
// })
},
getChild(){
  this.setData({isShow:true})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
   this.getLike();
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
    this.getColor()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})