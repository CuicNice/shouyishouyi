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
let list: any[] = [];
Page({
  data: {
    isHave: 0,
    page: 0,
    newsType: "school" as string,
    tapbarCtrl: true,
    list: [] as any, //当天的
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
  onSearchInputEvent: async function (event: any) {
    let mydate = util.formatDate(new Date()); // 调用函数时，传入new Date()参数，返回值是日期和时间
    let that = this;
    let keyword = event.detail.value;
    // 初始化请求
    
    let myKeywordsParams = {
      newsTitle: keyword,
    } as unknown as newsKeyWordsItem
    let s=JSON.stringify(myKeywordsParams)
    console.log("输出newskeyWord",myKeywordsParams);
    let { data: res } = await getNewsByKeyWords(s) as unknown as IResult<any>;
    // length存在否
    if (res) {
      if (res.length != 0) {
        let data = res;
        for (let i = 0; i < data.length; i++) {
          let newdate = data[i].outNewsDate;
        }
      } else[
        wx.showToast({
          title: '刷新失败',
          icon: 'error',
          duration: 1500
        }),
        wx.hideToast(),
        list = [],
      ]
      that.setData({
        list: list,
      })
      console.log("reseses", res)
      let items = res;
      if (items) {
        if (items.length == 0) {
          that.setData({
            isHave: 1
          })
        } else {
          for (let i = 0; i < items.length; i++) {
            // 初始化list
            // if (items[i].title.indexOf("工作计划表") >= 0 || items[i].title.indexOf("学校总值班表") >= 0) {
            //     items.splice(i, 1);
            // }
            that.setData({
              items: items,
              isHave: 2,
            })
          }
        }
      }else{
        console.log("shibai1")
      }
    }
    // onItemTapEvent: function(event: any) {
    //   let href = event.currentTarget.dataset.href;
    //   wx.navigateTo({
    //     url: '/pages/inDetail/inDetail?href=' + href, //跳转到详情页
    //   });
    // }
  }}
  )