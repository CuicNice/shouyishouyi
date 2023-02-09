// pages/widgets/message/messagePage/messagePage.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHidden:true,
    show:'green',
    bottomText:'喜欢就点个赞吧~',
    num:0,
    colors : [' #4BDCAB','#3EBAD0','#FBDE71'],
    color:'#4BDCAB',
    messageList:[],
    message1:[],
    r:'',
    row:'',
  },
  getList(){
    wx.request({
      url:'http://www.fmin-courses.com:9527/api/v1/ad/ad/mini/appletPopupList',
      method:'POST',
      data:{
        currentPage:1,
        pageSize:5,
      },
      success:((res)=>{
        let data1 = res.data.data.list;
        //打乱颜色数组
        for (let k = 1; k < this.data.colors.length; k++) { 
          const random = Math.floor(Math.random() * (k + 1));
           [this.data.colors[k], 
           this.data.colors[random]] = [this.data.colors[random], 
           this.data.colors[k]]; 
        }
          //console.log(this.data.colors)
           console.log(data1)
        //渲染颜色
        for(let i=0,j=0;i<data1.length&&j<=2;j++,i++){ 
          try{
              if(i == 3){ j = 0}
            let number = j ;
            let color = this.data.color;
            if(this.data.colors[j]){
              color = this.data.colors[j]
            }
            data1[i].color = color;
            data1[i].number = number;  
          }catch(e){
            console.log(e)
          }                 
        }
        this.setData({
          message1:data1, 
        }) 
         //判断数据是否已读
         var isUnread;
         isUnread=wx.getStorageSync('unread');
         if(isUnread){
         this.setData({message1:isUnread})
         console.log(this.data.message1)  
         }
      })
     })
   },
   

//点击进入信息详情
getMessage(e){
  this.setData({
    row:e.currentTarget.dataset.row,
    isHidden:false,
  }) 
 //已读和未读的处理
   let Array = this.data.message1;
   let index =0;
   for(let item of Array){
     if(item.number == e.currentTarget.dataset.row){
       if(Array[index].isShow==''||Array[index].isShow==undefined){
        Array[index].isShow='true'
        console.log(Array[index])
       }else{
         Array[index].isShow=''
       }
     }index++
   }
   this.setData({message1:Array})
   wx.setStorageSync('unread',this.data.message1);
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

getChild(){
  this.setData({isShow:true})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
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