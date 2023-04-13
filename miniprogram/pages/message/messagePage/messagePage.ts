import { listMessage } from '../../../api/popupApi'
export interface messageItem {
  currentPage: number,
  pageSize: number,
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
  },
  /**
   * 初始化页面渲染函数
   */
  async initPageData() {
    /**
     * 获取本地缓存，判断是否绑定数据
     */
    var currentPage = this.data.currentPage;
    var pageSize = this.data.pageSize;
    var bindData = {
      currentPage: currentPage,
      pageSize: pageSize,
    } as messageItem;
    this.getPopupData(bindData);
  },
  /**
  * 发送请求，渲染数据
  * @param from message信息中心
  */
  async getPopupData(from: messageItem) {
    const { data: list } = await listMessage(from) as unknown as IResult<any>;
    var messageList = list.list;
    var bindCache = wx.getStorageSync('bindCache');
    var isUnread = bindCache.isUnread;
    var unreadOne = bindCache.unreadOne;
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
       * 当
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
          //   //下面是判断标题内容是否发生更改
          //  if(isUnread[i].popupJumpTextContent !==messageList[i].popupJumpTextContent){
          //   isUnread[i]=messageList[i]; continue;
          //  }
          //    if(isUnread[i].popupJumpTextImage !== messageList[i].popupJumpTextImage){
          //      isUnread[i]=messageList[i]; continue;
          //    }
          //      if(isUnread[i].popupJumpTextTitle !== messageList[i].popupJumpTextTitle){
          //       isUnread[i]=messageList[i]; continue;
          //      }
          //        if(isUnread[i].popupSystemHeadline !== messageList[i].popupSystemHeadline){
          //          isUnread[i]=messageList[i]; continue;
          //       }
          //        if(isUnread[i].popupSystemSubtitle !== messageList[i].popupSystemSubtitle){
          //          isUnread[i]=messageList[i];
          //          }        
        }
      } else if (isUnread.length <= messageList.length) {
        for (var i = 0; i < messageList.length; i++) {
          for (var a = 0; a < messageList.length; a++) {
            if (isUnread[i].popupId !== messageList[a].popupId) {
              isUnread[i] = messageList[a];
              break;
            }
          }
        }
      } else if (isUnread.length >= messageList.length) {
        var k = messageList;
        for (var i = 0; i < messageList.length; i++) {
          for (var a = 0; a < messageList.length; a++) {
            if (isUnread[a].popupId == k[i].popupId) {
              k[i] = isUnread[a]
              continue;
            }
          }
        }
        messageList=k;
      }
    } else { messageList=messageList };
    this.setData({messageList:messageList})
    bindCache.isUnread = messageList;
    console.log(messageList)
    wx.setStorageSync('bindCache', bindCache)
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
    var bindCache = wx.getStorageSync('bindCache');
    bindCache.isNoread = '';
    var list = this.data.messageList as any;
    if (list[e.currentTarget.dataset.row].popupJumpType == 'link') {
      bindCache.Url = list[e.currentTarget.dataset.row].url;
      wx.navigateTo({
        url: '../web-view/webView'
      })
    } else if (list[e.currentTarget.dataset.row].popupJumpType == 'article') {
      wx.navigateTo({
        url: '../messageInfo/messageInfo?row=' + e.currentTarget.dataset.row
      })
    }
    //已读和未读的处理
    var Array = list;
    var index = 0;
    for (let item of Array) {
      if (item.number == e.currentTarget.dataset.row) {
        if (Array[index].isShow == '' || Array[index].isShow == undefined) {
          Array[index].isShow = true,
            console.log(Array[index])
        }
      } index++
    }
    this.setData({
      messageList:Array,
      row: e.currentTarget.dataset.row,
    })
    bindCache.isUnread = this.data.messageList
    wx.setStorageSync('bindCache', bindCache);
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
    var pageSize = this.data.pageSize + 5;
    this.setData({
      pageSize: pageSize
    })
    this.initPageData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})