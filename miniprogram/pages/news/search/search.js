import {
  Network
} from "../../../model/network.js";
// 分割函数
const getInf = (str, key) => str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%');
Page({
  data: {
    isHave: 0,
    page: 0
  },

  onLoad: function (options) {

  },

  onSearchInputEvent: async function (event) {
    //   console.log(event)
    var that = this;
    var page = that.data.page;
    var keyword = event.detail.value;
    var res = await Network.searchNew(page, keyword);
    var items = res.data;
    if (items != 0) {
      if (items.length == 0) {
        that.setData({
          isHave: 1
        })
      } else {
        for (var i = 0; i < items.length; i++) {
          if (items[i].title.indexOf("工作计划表") >= 0 || items[i].title.indexOf("学校总值班表") >= 0) {
            items.splice(i, 1);
          }
          that.setData({
            items: items,
            isHave: 2,
          })
        }
      }
    }
  },



  onItemTapEvent: function (event) {
    var href = event.currentTarget.dataset.href;
    wx.navigateTo({
      url: '/pages/inDetail/inDetail?href=' + href, //跳转到详情页
    });
  }





})