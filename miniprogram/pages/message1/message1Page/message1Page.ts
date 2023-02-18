
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
    title:"消息中心",
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
        console.log(res.data.data.list)
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
              res.data.data.list[i].popupPublishTime =    res.data.data.list[i].popupPublishTime.slice(0,11)
          }                   
        this.setData({
          list:res.data.data.list,
        }) 
         //判断数据是否已读;
         var isUnread;
         isUnread=wx.getStorageSync('unread');
         if(isUnread){
          if(isUnread.length == res.data.data.list.length){
            for(var i=0;i<res.data.data.list.length;i++){
              //有时候减一个又增一个，长度不变，需要更进一步判断
               if(isUnread[i].popupId !== res.data.data.list[i].popupId){
                isUnread[i]=this.data.list[i];  continue;
               }
                 //下面是判断标题内容是否发生更改
                if(isUnread[i].popupJumpTextContent !== res.data.data.list[i].popupJumpTextContent){
                  isUnread[i]=this.data.list[i]; continue;
                }
                  if(isUnread[i].popupJumpTextImage !== res.data.data.list[i].popupJumpTextImage){
                    isUnread[i]=this.data.list[i]; continue;
                  }
                    if(isUnread[i].popupJumpTextTitle !== res.data.data.list[i].popupJumpTextTitle){
                      isUnread[i]=this.data.list[i]; continue;
                    }
                      if(isUnread[i].popupSystemHeadline !== res.data.data.list[i].popupSystemHeadline){
                        isUnread[i]=this.data.list[i]; continue;
                      }
                        if(isUnread[i].popupSystemSubtitle !== res.data.data.list[i].popupSystemSubtitle){
                        isUnread[i]=this.data.list[i];
                        }
              }this.setData({list:isUnread});
            }else{
             for(var i=0;i<isUnread.length;i++){
               //有时候减一个又增一个，长度不变，需要更进一步判断
                if(isUnread[i].popupId !== res.data.data.list[i].popupId){
                   delete isUnread[i];continue;
                }
               }this.setData({list:isUnread});
           } 
           }else{this.setData({list:res.data.data.list})}
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
  if(this.data.list[e.currentTarget.dataset.row].popupJumpType !== 'noJump'){
   if(this.data.list[e.currentTarget.dataset.row].popupJumpUrl !== null){
    wx.setStorageSync('Url',this.data.list[e.currentTarget.dataset.row].popupJumpUrl);
    wx.navigateTo({
      url:'../web-view/webView'
    })
  }
  if(!this.data.list[e.currentTarget.dataset.row].popupJumpUrl){
    this.setData({
    row:e.currentTarget.dataset.row,
    isHidden:false,
    title:"标题",
  }) 
  }
  }else{
    this.setData({
    isHidden:true,
    title:"消息中心",
  }) 
}
  
  
  
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
      if(this.data.list[this.data.row].show == ''){
        this.setData({popupFabulous:this.data.list[this.data.row].popupFabulous + 1})
      } 
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
   this.setData({title:'消息中心'});
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