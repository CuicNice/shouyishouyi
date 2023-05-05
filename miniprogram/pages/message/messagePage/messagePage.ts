import { listMessage } from '../../../api/popupApi'
export interface messageItem {
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isHidden: true,
    colors: [' #4BDCAB', '#3EBAD0', '#FBDE71'],
    row: '',
    title: "消息中心",
    pageSize: 5,
    currentPage: 1,
    messageList: [],
    newMessage: [],//用来拼接数组的新数组
  },
  /**
   * 初始化页面渲染函数
   */
  async initPageData() {
    /**
     * 获取本地缓存，判断是否绑定数据
     */
    var bindData = {
    } as messageItem;
    this.getPopupData(bindData);
  },
  /**
  * 发送请求，渲染数据
  * @param from message信息中心
  */
  async getPopupData(from: messageItem) {
    const { data: list } = await listMessage(from) as unknown as IResult<any>;
    var messageList = list;
    var pop = wx.getStorageSync('popup');
    var isUnread = pop.popupList;
    var unreadOne = pop.unreadOne;
    this.putColors();
      //渲染颜色 
      for (var i = 0, j = 0; i < messageList.length; i++, j++) {
        if (j >= 3) { j = 0; this.putColors(); }
        if (i >= 3 && i % 3 == 0 && messageList[i - 1].color == this.data.colors[0]) {
          this.putColors();
          i = i - 1;
          continue;
        }//防止连续两个颜色一样
        var number = i;
        var color = this.data.colors[j];
        /**
         * 当二次进入时
         */
        if (isUnread.length > 0) {
          for (var a = 0; a < messageList.length; a++) {
            if (isUnread[i].popupId == messageList[a].popupId) {
              if (isUnread[i].show == 'active') {
                messageList[i].show = isUnread[i].show;
              }
            }
          }
        } else if (isUnread.length == 0) {
          messageList[i].show = 'green';
        }
        if (messageList[i].popupId == unreadOne.popupId) {
          messageList[i] = unreadOne;
        }
        if (messageList[i].color == undefined) {
          messageList[i].color = color;
        }
        messageList[i].number = number;
        messageList[i].popupPublishTime = messageList[i].popupPublishTime.slice(0, 11)
      }
      //判断数据是否已读;
      if (isUnread.length > 0) {
        if (isUnread.length == messageList.length) {
          for (var i = 0; i < messageList.length; i++) {
            //有时候减一个又增一个，长度不变，需要更进一步判断
            if (isUnread[i].popupId !== messageList[i].popupId) {
              isUnread[i] = messageList[i]; continue;
            }
            messageList = isUnread;
          }
        } else if (isUnread.length < messageList.length) {
          for (var i = 0; i < isUnread.length; i++) {
            for (var a = 0; a < messageList.length; a++) {
              if (isUnread[i].popupId !== messageList[a].popupId) {
                isUnread[i] = messageList[a];
                break;
              }
            }
          }
        } else if (isUnread.length > messageList.length) {
          var k = messageList;
          for (var i = 0; i < isUnread.length; i++) {
            for (var a = 0; a < messageList.length; a++) {
              if (isUnread[a].popupId == k[i].popupId) {
                k[i] = isUnread[a];
              }
            }
          }
          messageList = k;
        }
      } else  { messageList = messageList };
      this.setData({
        messageList: messageList,
      })
      pop.popupList = messageList;
      for(var a=0;a<pop.popupList;a++){
        if(pop.popupId==pop.popupList[a].popupId){
          pop.popupList[a].isShow = true;
        }
      }
      wx.setStorageSync('popup', pop)
  },
  

  //打乱颜色
  putColors() {
    //打乱颜色数组
    for (let k = 1; k < this.data.colors.length; k++) {
      const random = Math.floor(Math.random() * (k + 1));
      [this.data.colors[k],
      this.data.colors[random]] = [this.data.colors[random],
      this.data.colors[k]];
    }
  },
  //点击进入信息详情
  getMessage(e: any) {
    var pop = wx.getStorageSync('popup');
    var list = this.data.messageList as any;
    if (list[e.currentTarget.dataset.row].popupJumpType == 'link') {
      pop.Url = list[e.currentTarget.dataset.row].popupJumpUrl;
      wx.navigateTo({
        url: '../web-view/webView'
      })
    } else if (list[e.currentTarget.dataset.row].popupJumpType == 'article') {
      wx.navigateTo({
        url: '../messageInfo/messageInfo?popupId=' + list[e.currentTarget.dataset.row].popupId
      })
    }
    //已读和未读的处理
    var Array = list;
    var index = 0;
    for (let item of Array) {
      if (item.number == e.currentTarget.dataset.row) {
        if (Array[index].isShow == '' || Array[index].isShow == undefined) {
          Array[index].isShow = true
        }
      } index++
    }
    this.setData({
      messageList: Array,
      row: e.currentTarget.dataset.row,
    })
    pop.popupList = this.data.messageList
    wx.setStorageSync('popup', pop);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({ title: '消息中心' });
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
    this.initPageData();
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