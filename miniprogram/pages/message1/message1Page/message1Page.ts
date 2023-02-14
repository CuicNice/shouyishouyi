
// pages/widgets/message/messagePage/messagePage.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show:'',
    isHidden:true,
    colors : [' #4BDCAB','#3EBAD0','#FBDE71'],
    list:[],
    row:'',
    popupFabulous:'',
  },
  getList(){
    wx.request({
      url:'http://www.fmin-courses.com:9527/api/v1/ad/ad/mini/appletPopupList',
      method:'POST',
      data:{
        currentPage:1,
        pageSize:10000,
        popupFabulous:this.data.popupFabulous,
      },
      success:((res)=>{
        this.putColors();
        //渲染颜色 
        for(var i=0,j=0;i<res.data.data.list.length;i++,j++){
             if(j>=3){j=0;this.putColors();}
             if(i>=3&&i%3==0&&res.data.data.list[i-1].color ==this.data.colors[0]){this.putColors();}//防止连续两个颜色一样
              var number = i;
              var color = this.data.colors[j];
              var show = this.data.show;
              res.data.data.list[i].show = show;
              res.data.data.list[i].color = color;
              res.data.data.list[i].number = number;     
          }                   
        this.setData({
          list:res.data.data.list,
        }) 
         //判断数据是否已读
         var isUnread;
         isUnread=wx.getStorageSync('unread');
         if(isUnread.length == res.data.data.list.length){
          for(var i=0;i<res.data.data.list.length;i++){
            if(this.data.list[i].color !== undefined || this.data.list[i].color !== '' )
             this.setData({list:isUnread})
          } 
         } 
      })
     })
   },
 //打乱颜色
 putColors(){
   //打乱颜色数组
   for (let k = 1; k < this.data.colors.length; k++) { 
    const random = Math.floor(Math.random() * (k + 1));
     [this.data.colors[k], 
     this.data.colors[random]] = [this.data.colors[random], 
     this.data.colors[k]]; 
  }
 },
//点击进入信息详情
getMessage(e){
  this.setData({
    row:e.currentTarget.dataset.row,
    isHidden:false,
  }) 
 //已读和未读的处理
   let Array = this.data.list;
   let index =0;
   for(let item of Array){
     if(item.number == e.currentTarget.dataset.row){
       if(Array[index].isShow == '' || Array[index].isShow == undefined){
        Array[index].isShow= true,
        console.log(Array[index])
       }
     }index++
   }
   this.setData({list:Array})
   wx.setStorageSync('unread',this.data.list);
},
getLike(){
      this.setData({popupFabulous:this.data.list[this.data.row].popupFabulous + 1})
      //点赞
      let show = "active";
      this.data.list[this.data.row].show = show; 
      this.data.list[this.data.row].popupFabulous = this.data.popupFabulous
      this.setData({
        list:this.data.list,
      })           
},
getChild(){
  this.setData({isHidden:true})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){
   this.getList();
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
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})