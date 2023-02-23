
// pages/widgets/message/messagePage/messagePage.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isHidden:true,
    colors : [' #4BDCAB','#3EBAD0','#FBDE71'],
    list:[],
    row:'',
    title:"消息中心",
    pageSize:5,
  },
  getList(){
    wx.request({
      url:'http://www.fmin-courses.com:9527/api/v1/ad/ad/mini/appletPopupList',
      method:'POST',
      data:{
        currentPage:1,
        pageSize:this.data.pageSize,
      },
      fail:(()=>{this.getList()}),
      success:((res)=>{
        this.setData({list:res.data.data.list})
        this.putColors();
        //渲染颜色 
        for(var i=0,j=0;i<this.data.list.length;i++,j++){
             if(j>=3){j=0;this.putColors();}
             if(i>=3&&i%3==0&&this.data.list[i-1].color ==this.data.colors[0]){this.putColors();i=i-1;continue;}//防止连续两个颜色一样
              var number = i;
              var color = this.data.colors[j]; 
              if(wx.getStorageSync('unread').length>0){
                  var isUnread = wx.getStorageSync('unread');
                for(var a=0; a<this.data.list.length;a++){
                  if(isUnread[i].popupId == this.data.list[a].popupId){
                     if(isUnread[i].show == 'active'){
                    this.data.list[i].show = isUnread[i].show;
                  }
                  }
                }
              }else{
                this.data.list[i].show ='green'; 
              }  
              if(this.data.list[i].popupId == wx.getStorageSync('unreadOne').popupId){
                this.data.list[i] = wx.getStorageSync('unreadOne');
              }
              this.data.list[i].color = color;
              this.data.list[i].number = number;  
              this.data.list[i].popupPublishTime =  this.data.list[i].popupPublishTime.slice(0,11)
          }
         //判断数据是否已读;
         var isUnread;
         isUnread = wx.getStorageSync('unread');
         if(isUnread.length>0){
          if(isUnread.length == this.data.list.length){
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
            }else if(isUnread.length <= res.data.data.list.length){
             for(var i=0;i<res.data.data.list.length;i++){
               for(var a=0;a<res.data.data.list.length;a++){
                   if(isUnread[i].popupId !== res.data.data.list[a].popupId){
                   isUnread[i] = res.data.data.list[a];
                   continue;
                }
               }    
               }this.setData({list:isUnread});
           }else if(isUnread.length >= res.data.data.list.length){
             var k = res.data.data.list;
            for(var i=0;i<res.data.data.list.length;i++){
              for(var a=0;a<res.data.data.list.length;a++){
                  if(isUnread[a].popupId == res.data.data.list[i].popupId){
                    k[i] = isUnread[a]
                    continue;
              }
              }
            }
              this.setData({list:k});
           }
           }else{this.setData({list:res.data.data.list})};
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
getMessage(e:any){
  wx.removeStorageSync('isNoread');
  this.setData({row:e.currentTarget.dataset.row})
   if(this.data.list[e.currentTarget.dataset.row].popupJumpType =='link' ){
    wx.setStorageSync('Url',this.data.list[e.currentTarget.dataset.row].popupJumpUrl);
    wx.navigateTo({
      url:'../web-view/webView'
    })
  }else if(this.data.list[e.currentTarget.dataset.row].popupJumpType =='article'){
    wx.navigateTo({
      url:'../messageInfo/messageInfo?row='+e.currentTarget.dataset.row
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){
   this.getList();
   this.setData({title:'消息中心'});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady(){
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getList();
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
    this.setData({pageSize:this.data.pageSize+5})
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})