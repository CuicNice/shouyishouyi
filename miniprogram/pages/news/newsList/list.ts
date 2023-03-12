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
var innerList = [] as AnyArray;
var outerList = [] as AnyArray;
Page({
  data: {
    isShowDialog: false as Boolean,
    dialogTitle: "南南提醒你：",
    dialogContent: "学校官网在0-6点间，部分资源无法加载显示，属于正常现象，可在白天再次尝试~",
    lineHeight: 32,
    hidden: false,
    myscrollTop: 200,
    autoplay: true, //轮播图配置
    interval: 3000,
    duration: 1200,
    isChecked: true, //头像彩蛋
    tapbarCtrl: true,//点击哪一个tab栏
    schoolBuiltSrc: "/static/svg/schoolBuilt/zhonglou.svg",
    bgSvgUrl: "/static/svg/pillar.svg",
    type: 0,
    pages: 0,
    mypages: 0,
    newsListTitle: "快讯闻",
    // 内网：
    innerPageParams: {
      "currentPage": "1",
      "pageSize": "10"
    } as unknown as outnewsListItem,
    // 外网
    outPageParams: {
      "currentPage": "1",
      "pageSize": "10"
    } as unknown as outnewsListItem,
    // 新闻list
    flag: 0, //底部加载显示。0显示
    clock: 1,
    // 关于新闻数据
    list: [] as any
  },
  searchEvent: function () { //搜索页面跳转
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  /**
   * 初始化内网新闻
    时间计算*/
  checkDate: function (startTime: string, endTime: string) {
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
    return day;
    //do something
  },
  checkWorkDate: function (date: any) {
    let startTime = new Date(date); // 开始时间
    let endTime = new Date(); // 现在时间
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
  async getInnerSchoolNews() {
    var innerTempList = [] as AnyArray
    let that = this
    var mydate = new Date
    var myDate = mydate.toString()
    that.selectComponent("#toast").showToastAuto("加载中", "lodding", 0.5);
    // 获取内网新闻
    let innerPageParams = that.data.innerPageParams
    let { data: innerRes } = await getInnerNewsListitem(innerPageParams) as unknown as IResult<any>;
    if (innerRes != null) {
      // 解析
      if (innerRes.list.length != 0) {
        for (let i = 0; i < innerRes.list.length - 1; i++) {
          //日期的判断
          let newsItem = {
            "newsDate": innerRes.list[i]["newsDate"],
            "newsId": innerRes.list[i]["newsId"],
            "newsTime": "",
            "newsTitle": innerRes.list[i]["newsTitle"],
            "newsType": innerRes.list[i]["newsType"]
          }//创建单个新闻Json对象
          innerTempList.push(newsItem)
          let newdate = innerRes.list[i].newsDate;
          if (that.checkDate(myDate, newdate) < 1) {
            // 当天
            innerTempList[i].newsTime = "today"
          } else if (that.checkDate(myDate, newdate) < 3) {
            // 三天内的
            innerTempList[i].newsTime = "new"
          } else {
            //老新闻
            innerTempList[i].newsTime = "old"
          }
        }
        that.setData({
          isHave: true
        })
      } else {
        innerTempList = []
        that.setData({
          isHave: false,
        })
      }
      wx.hideLoading();
      // 解析添加数据
    } else {
      innerTempList = []
    }
    innerList = innerList.concat(innerTempList);
    that.setData({
      list: innerList, //当天的
    })
  },
  // 外网首义
  async getOutSouyiNews() {
    // 发起网络请求
    /**
 * 发送请求，渲染数据
 * @param from 楼栋数据
 */
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    let that = this
    var mydate = new Date
    var myDate = mydate.toString()
    var outTempList = [] as AnyArray;
    that.selectComponent("#toast").showToastAuto("加载中", "lodding", 0.5);
    let outPageParams = that.data.outPageParams
    let { data: outRes } = await getOutNewsListitem(outPageParams) as unknown as IResult<any>;
    if (outRes != null) {
      // 解析
      if (outRes.list.length != 0) {
        for (let i = 0; i < outRes.list.length - 1; i++) {
          //日期的判断
          let newsItem = {
            "newsDate": outRes.list[i]["newsDate"],
            "newsId": outRes.list[i]["newsId"],
            "newsTime": "",
            "newsTitle": outRes.list[i]["newsTitle"],
            "newsType": outRes.list[i]["newsType"]
          }//创建单个新闻Json对象
          outTempList.push(newsItem)
          let newdate = outRes.list[i].newsDate;
          if (that.checkDate(myDate, newdate) < 1) {
            // 当天
            // 添加一条
            outTempList[i].newsTime = "today"
          } else if (that.checkDate(myDate, newdate) < 3) {
            // 三天内的
            outTempList[i].newsTime = "new"
          } else {
            //老新闻
            outTempList[i].newsTime = "old"
          }
        }
        that.setData({
          isHave: true
        })
      } else {
        outTempList = []
        that.setData({
          isHave: false,
        })
      }
      wx.hideLoading();
      // 解析添加数据
    } else {
      // 网络问题,toast弹出
      that.selectComponent("#toast").showToastAuto("加载错误", "error", 1);
      outTempList = []
      that.setData({
        isHave: false,
      })
    }
    outerList = outerList.concat(outTempList);
    that.setData({
      list: outerList, //当天的
    })
  },
  // 触底函数 scrollToMoreList
  async scrollToMoreList() {
    // 滚动加载更多的数据，滚动一次多加载10条
    // 初始化数据
    let that = this
    let innerPageParamsCurrentPages = JSON.stringify(JSON.parse(that.data.innerPageParams.currentPage) + 1)
    let outPageParamsCurrentPages = JSON.stringify(JSON.parse(that.data.outPageParams.currentPage) + 1)
    // 设置setdata，关于页面请求数据
    // 区分是内网还是外网请求
    // 内网请求
    if (that.data.tapbarCtrl) {
      that.setData({
        innerPageParams: {
          // 设置setdata，关于页面返回数据
          "currentPage": innerPageParamsCurrentPages,
          "pageSize": "10"
        }
      })
      await that.getInnerSchoolNews() //内网
      // 添加list数据
    } else {
      // 外网请求
      that.setData({
        // 设置setdata，关于页面返回数据
        outPageParams: {
          "currentPage": outPageParamsCurrentPages,
          "pageSize": "10"
        }
      })
      await that.getOutSouyiNews()
    }
  },

  SoretArr: function (arr: any) {
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
  /**
   * 初始化新闻列表*/

  async initNewsInfo() {
    // 根据tapBar初始值
    var that = this
    if (that.data.tapbarCtrl) {
      await that.getInnerSchoolNews()
    } else {
      // 外网请求
      await that.getOutSouyiNews()
    }
  },
  /**
 * 
 * dialog组件确定按钮点击事件
 */
  dialogCertain() {
    var that = this
    that.setData({
      isShowDialog: false//关闭弹窗
    })
  },
  onLoad() {
    // 获取当前时间并且做判断
    var that = this;
    var myDate = new Date
    var hours = myDate.getHours();
    // 如果时间超过了那么就弹出弹窗
    if (hours == 12 || hours < 6) {
      that.setData({
        isShowDialog: true,
      })
    }
    // 初始化新闻列表
  },
  /**
   *  点击新闻搜索跳转新的页面
   *  */
  toSearchNews() {
    // 点击跳转
    let that = this
    setTimeout(() => {
      wx.navigateTo({
        url: '../newsSearch/search',
        fail: function (res) {
          that.selectComponent("#toast").showToastAuto("跳转中断", "error", 1);
        }
      })
    }, 500);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    let wxRes = myStorage.get('vxUserinfo');
    that.initNewsInfo()
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
    this.setData({
      lineHeight: res.height,
      statusBarTop: res.top,
    })
  },
  scroll: function (e: any) {
    var roll = e.detail.deltaY;
    var that = this;
    if (roll < 0) {
      that.setData({
        hidden: true
      })
    } else if (roll > 0) {
      that.setData({
        hidden: false
      })
    }
  },
  // 校园新闻,选中样式
  chooseShcoolNews: function () {
    // 校园新闻选中后字体样式
    let that = this
    that.setData({
      tapbarCtrl: true,
    })
    // 并且切换请求数据
    this.initNewsInfo()
  },
  // 首义快讯
  chooseInNews: function () {
    this.setData({
      tapbarCtrl: false,
    })
    // 并且切换请求数据
    this.initNewsInfo()
  },
  chooseTable: function () {
    wx.reLaunch({
      url: '/pages/timeTable/timeTable',
    })
  },
  chooseMypage: function () {
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