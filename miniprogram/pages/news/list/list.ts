// import {
//   Network
// } from "../../../model/network.js";
import tool from "../../../utils/tool.js";
// 接口请求部分
import{
  // 内网新闻
  getInnerNewsListitem,
  // 外网新闻
  getOutNewsListitem
}from "../../../api/newsApi"
//网络请求
import {
  myStorage
} from "../../../utils/newStorage.js";
import {
  admin
} from '../../../utils/checkAdmin.js';
// 定义请求数据结构
// {
//   "currentPage": "1",
//   "pageSize": "5"
// }
interface innernewsListItem {
  "currentPage": string,
  "pageSize": string
}
interface outnewsListItem {
  "currentPage": string,
  "pageSize": string
}

export{
  innernewsListItem,
  outnewsListItem
}
let util = require('../../../utils/timeUtils.js');
const app = getApp();
let list_1:any[] = [];
let list_2: any[] = [];
let list_3:any[] = [];
let list_a:any[] = [];
let list_b:any[] = [];
let list_c:any[] = [];

Page({
  data: {
    lineHeight: 32,
    hidden: false,
    myscrollTop: 200,
    autoplay: true, //轮播图配置
    interval: 3000,
    duration: 1200,
    isChecked: true, //头像彩蛋
    type: 0,
    pages: 0,
    mypages: 0,
    flag: 0, //底部加载显示。0显示
    clock: 1,
  },
  changeClass: function () { //头像旋转
    let that = this
    let type = that.data.type;
    type++
    if (type > 1) {
      type = 0;
    }
    if (type == 0) {
      that.setData({
        isChecked: true,
        type: type
      })
    }
    if (type == 1) {
      that.setData({
        isChecked: false,
        type: type
      })
    }
  },
  searchEvent: function () { //搜索页面跳转
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  // 初始化新闻列表
initNewsInfo(){
  console.log("新闻显示")

},
  onLoad () {
    let that = this;
    console.log("开始运行了",that.initNewsInfo);
//     let flag = 1;
//     let fuck = 1
//     list_1.length = 0;
//     list_2.length = 0;
//     list_3.length = 0;
//     list_a.length = 0;
//     list_b.length = 0;
//     list_c.length = 0;
//     let mydate = util.formatDate(new Date()); // 调用函数时，传入new Date()参数，返回值是日期和时间
//     wx.showLoading({
//       title: '正在加载...',
//     });
//     let pages = that.data.pages;
//     console.log("内网新闻");
    
// // 获取内网新闻
// let innerPageParams ={
//   "currentPage": "1",
//   "pageSize": "5"
// } as unknown as innernewsListItem
// let { data: res2} = await getOutNewsListitem(innerPageParams) as unknown as IResult<any>;
//     if (res2 != null) {
//       wx.hideLoading();
//       let data = res2.data;
//       if (data.length != 0) {
//         for (let i = 0; i < data.length; i++) {
//           let newdate = data[i].date;
//           if (data[i].title.indexOf("工作计划表") >= 0 || data[i].title.indexOf("学校总值班表") >= 0) {
//             data.splice(i, 1);
//           } else if (app.checkDate(mydate, newdate) < 1) {
//             list_1.push(data[i])
//           } else if (app.checkDate(mydate, data[i].date) < 3) {
//             list_2.push(data[i])
//           } else {
//             list_3.push(data[i])
//           }
//         }
//       } else {
//         wx.showToast({
//           title: '刷新失败',
//           icon: 'error',
//           duration: 1500
//         })
//         wx.hideToast();
//         list_1 = list_2 = list_3 = [];
//       }
//       that.setData({
//         list_1: list_1, //当天的
//         list_2: list_2, //近三天的
//         list_3: list_3,
//         flag: flag,
//         fuck: fuck
//       })
//     }

// //   {
// //     "currentPage": "1",
// //     "pageSize": "5"
// // }
//     // 发起网络请求
//       /**
//    * 发送请求，渲染数据
//    * @param from 楼栋数据
//    */
//     let pageParams ={
//       "currentPage": "1",
//       "pageSize": "5"
//     } as unknown as outnewsListItem
//     let { data: res1} = await getOutNewsListitem(pageParams) as unknown as IResult<any>;
//     console.log("res1",res1);
//     if (res1 != null) {
//       let data = res1.data;
//       if (data.length != 0) {
//         for (let i = 0; i < data.length; i++) {
//           let newdate = data[i].date;
//           if (data[i].title.indexOf("视频") >= 0) {
//             data.splice(i, 1);
//           } else if (data[i].type.indexOf("视频新闻") >= 0) {
//             data.splice(i, 1);
//           } else if (app.checkDate(mydate, newdate) < 1) {
//             list_a.push(data[i])
//           } else if (app.checkDate(mydate, data[i].date) < 3) {
//             list_b.push(data[i])
//           } else {
//             list_c.push(data[i])
//           }
//         }
//       } else {
//         wx.showToast({
//           title: '刷新失败',
//           icon: 'error',
//           duration: 1500
//         })
//         wx.hideToast();
//         list_a = list_b = list_c = [];
//       }
//       that.setData({
//         list_a: list_a, //当天的
//         list_b: list_b, //近三天的
//         list_c: list_c
//       })
//     }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
   console.log("slslslslslls1")
      let wxRes = myStorage.get('vxUserinfo');
    if (wxRes != null) {
      let avatarUrl = wxRes.avatarUrl;
      that.setData({
        avatarUrl: avatarUrl
      })
    } else {
      that.setData({
        avatarUrl: '../../images/mrtx.png',
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let res = wx.getMenuButtonBoundingClientRect();
    //////   console.log(res)
    this.setData({
      lineHeight: res.height,
      statusBarTop: res.top,
    })
  },
  // 校园新闻
  ChooseShcoolNews: function () {
    this.setData({
      tapbarCtrl: false,
    })
  },
  // 首义快讯
  ChooseInNews: function () {
    this.setData({
      tapbarCtrl: true,
    })
  },

  chooseTable: function () {
    wx.reLaunch({
      url: '/pages/timeTable/timeTable',
    })
  },

  chooseMypage: function () {
    // let lsp = getCurrentPages();
    // //   console.log(lsp)
    wx.navigateTo({
      url: '/pages/myPage/myPage',
    })
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },


})