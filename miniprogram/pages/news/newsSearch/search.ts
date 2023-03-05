// 分割函数

import {
  // 模糊查询
  getNewsByKeyWords
} from "../../../api/newsApi"
import tool from "../../../utils/tool.js";
let util = require('../../../utils/timeUtils.js');
interface newsKeyWordsItem {
  newsTitle: string,
  // 注意type，需要传值
}
export {
  newsKeyWordsItem
}
const getInf = (str: string, key: string) => str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%');
Page({
  data: {
    
    isHave: false as Boolean,//有无搜索出来的数据
    page: 0,
    newsType: "school" as string,
    tapbarCtrl: true,
    list: [] as any,
    // 新闻是不是当天
    isToday: false as Boolean,
    bgSvgUrl: "/static/svg/pillar.svg",
    // 最新（3天）
    isNew: false as Boolean,
    newsSearchTitle:"搜索"
  },
  onLoad: function (options) {
    // 接收传参数据
    console.log("optios", options)
    // false算做内网
  },
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
  // 点击跳转
  // onItemTapEvent: function(event: any) {
  //   let href = event.currentTarget.dataset.href;
  //   wx.navigateTo({
  //     url: '/pages/inDetail/inDetail?href=' + href, //跳转到详情页
  //   });
  // },
  onSearchInputEvent: async function (event: any) {
    // 当前的时间
    let mydate = util.formatDate(new Date()); // 调用函数时，传入new Date()参数，返回值是日期和时间
    let that = this;
    let keyword = event.detail.value;
    // 初始化请求
    let myKeywordsParams = {
      newsTitle: keyword,
    } as unknown as newsKeyWordsItem
    let { data: res } = await getNewsByKeyWords(myKeywordsParams) as unknown as IResult<any>;
    // length存在否
    if (res) {
      if (res.length != 0) {

        for (let i = 0; i < res.length - 1; i++) {
          //日期的判断
          var newdate = res[i].date;
          if (res[i].title.indexOf("视频") >= 0) {
            delete res[i];
          } else if (res[i].type.indexOf("视频新闻") >= 0) {
            delete res[i];
          } else if (that.checkDate(mydate, newdate) < 1) {
            // 当天
            // 添加一条
            res[i]["isToday"] = true
            res[i]["isNew"] = true
          } else if (that.checkDate(mydate, newdate) < 3) {
            // 三天内的
            res[i]["isToday"] = false
            res[i]["isNew"] = true
          } else {
            // 老新闻
            res[i]["isNew"] = false
            res[i]["isToday"] = false
          }
        }
        console.log("myres",res)
        that.setData({
          list: res, //当天的
          isHave: true
        })
      } else {
        wx.showToast({
          title: '刷新失败',
          icon: 'error',
          duration: 1500
        }),
          wx.hideToast(),
          that.setData({
            isHave: false,
            list: [],
          })
      }
    }

  }
}
)