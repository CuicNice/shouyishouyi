// import {
//   Network
// } from "../../../model/network.js";
// 接口请求部分
import {
  // 内网新闻
  getInnerNewsListitem,
  // 外网新闻
  getOutNewsListitem
} from "../../../api/newsApi"
//网络请求
import {
  myStorage
} from "../../../utils/newStorage.js";
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

export {
  innernewsListItem,
  outnewsListItem

}
Page({
  data: {
    lineHeight: 32,
    hidden: false,
    myscrollTop: 200,
    autoplay: true, //轮播图配置
    interval: 3000,
    duration: 1200,
    isChecked: true, //头像彩蛋
    tapbarCtrl: true,//点击哪一个tab栏
    bgSvgUrl:"/static/svg/pillar.svg",
    type: 0,
    pages: 0,
    mypages: 0,
    newsListTitle:"快讯闻",
    // 内网：
    innerPageParams : {
        "currentPage": "1",
        "pageSize": "10"
    } as unknown as outnewsListItem,
    // 外网
    outPageParams : {
      "currentPage": "1",
      "pageSize": "10"
  }as unknown as outnewsListItem,
    flag: 0, //底部加载显示。0显示
    clock: 1,
    // 关于新闻数据
    list: [] as any,
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
  // 初始化内网新闻
  // 时间计算
  checkDate: function (startTime: any, endTime: any) {
    // 使用阻塞
    //日期格式化
    let startTimeStr = startTime.replace("/-/g", "/")
    let endTimeStr = endTime.replace("/-/g", "/")
    let start_date = new Date(startTimeStr);
    let end_date = new Date(endTimeStr);
    //转成毫秒数，两个日期相减
    let ms = start_date.getTime() - end_date.getTime() as number;
    //转换成天数     start_date.getTime()
    let day = ms / (1000 * 60 * 60 * 24) as number;
    //console.log("day = ", day);
    return day;
    //do something
  },

  checkWorkDate: function (date: any) {
    console.log("开始时间", date);
    let startTime = new Date(date); // 开始时间
    let endTime = new Date(); // 现在时间
    console.log("starttime", startTime, typeof (startTime))
    let usedTime = startTime.getTime() - endTime.getTime(); // 相差的毫秒数
    let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
    let leavel = usedTime % (24 * 3600 * 1000); // 计算天数后剩余的时间
    let hours = Math.floor(leavel / (3600 * 1000)); // 计算剩余的小时数
    let leavel2 = leavel % (3600 * 1000); // 计算剩余小时后剩余的毫秒数
    let minutes = Math.floor(leavel2 / (60 * 1000)); // 计算剩余的分钟数
    return days + '天' + hours + '时' + minutes + '分';
  },

  //传入一个需要排序的数组
  MsgSort: function (obj: any) {
    obj.sort((a: string, b: string) => {
      let t1 = new Date(Date.parse(a.replace(/-/g, "/")))
      let t2 = new Date(Date.parse(b.replace(/-/g, "/")))
      return t1.getTime() - t2.getTime()
    })
    return obj
  },
  // 校园快讯，inner请求
 async getInnerSchoolNews(){
    let that=this
    wx.showLoading({
      title: '正在加载...',
    });
    // 获取内网新闻
    let innerPageParams=that.data.innerPageParams
    let { data: innerRes } = await getInnerNewsListitem(innerPageParams) as unknown as IResult<any>;
    console.log("ssuosuoss",innerRes)

    if (innerRes != null) {
      wx.hideLoading();
      let list = innerRes.list;
      that.setData({
        list: list, //当天的
      })
    }
  },
  // 外网首义
async getOutSouyiNews(){
       // 发起网络请求
    /**
 * 发送请求，渲染数据
 * @param from 楼栋数据
 */
// let mydate = util.formatDate(new Date());
 // 调用函数时，传入new Date()参数，返回值是日期和时间
let that=this
let outPageParams = that.data.outPageParams
let { data: outRes } = await getOutNewsListitem(outPageParams) as unknown as IResult<any>;
if (outRes.pageSize != 0) {
  var list = outRes.list;
} else {
  wx.showToast({
    title: '刷新失败',
    icon: 'error',
    duration: 1500
  })
  wx.hideToast();
}
that.setData({
  list: list, 
})
  },
async scrollToMoreList(){
// 滚动加载更多的数据，滚动一次多加载10条
// 初始化数据
let that =this
let innerPageParamsCurrentPages=JSON.stringify(JSON.parse(that.data.innerPageParams.currentPage)+1)
let outPageParamsCurrentPages=JSON.stringify(JSON.parse(that.data.outPageParams.currentPage)+1)
// 设置setdata，关于页面请求数据
// 区分是内网还是外网请求
// 内网请求
if(that.data.tapbarCtrl){
  that.setData({
    innerPageParams:{
// 设置setdata，关于页面返回数据
      "currentPage":innerPageParamsCurrentPages,
      "pageSize": "10"}
  })
  await that.getInnerSchoolNews()
}else{
  // 外网请求
  that.setData({
// 设置setdata，关于页面返回数据
    outPageParams:{
      "currentPage":outPageParamsCurrentPages,
      "pageSize": "10"}
  })
  await that.getOutSouyiNews()
}
  },

  SoretArr: function (arr: any) {
    console.log(arr)
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j].message_id < arr[j + 1].message_id) {
          //把大的数字放到前面
          let str = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = str;
        }
      }
    }
  },

  getLength: function (newArr: any) {
    if (typeof (newArr) == 'object') {
      for (let i = newArr.length - 1; i >= 0; i--) {
        let targetNode = newArr[i].name;
        for (let j = 0; j < i; j++) {
          if (targetNode == newArr[j].name) {
            newArr.splice(i, 1);
            break;
          }
        }
      }
      for (let i = 0; i < newArr.length; i++) {
        if (newArr[i].name.indexOf('体能训练') >= 0) {
          newArr.splice(i, 1);
        }
      }
      return newArr.length;
    }
  },

  sumFloat: function (num: any) {
    let arr = num.split('.')
    num = arr[0] + "." + arr[1].substr(0, 1)
    return num;
  },
  // 初始化新闻列表
  initNewsInfo() {
    console.log("新闻显示")
  },
  async onLoad() {
    let that = this;
    // 初始化新闻列表
that.getInnerSchoolNews()
that.getOutSouyiNews()
//  外网请求调用
  },
// 点击新闻搜索跳转新的页面
  tosSarchNews(){
    console.log("tianzhaunanananan")
// 点击跳转
let that=this
setTimeout(() => {
  console.log("jaajajajaj")
  wx.navigateTo({
    url: '/pages/news/search/search?newsType='+that.data.tapbarCtrl,
  })
}, 500);

  },
  /**
   * 
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
  // 校园新闻,选中样式
  ChooseShcoolNews: function () {
    // 校园新闻选中后字体样式
    let that = this
    console.log("tapbar", that.data.tapbarCtrl);
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