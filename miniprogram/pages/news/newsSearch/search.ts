import {
  // 模糊查询
  getNewsByKeyWords
} from "../../../api/newsApi"
let util = require('../../../utils/timeUtils.js');
interface newsKeyWordsItem {
  newsTitle: string,
  // 注意type，需要传值
}
// 定义前端list数组数据结构
interface newsListItem {
  newsId: string,
  newsTitle: string,
  newsType: string,
  newsTime: string,
  newsDate: string
}
export {
  newsKeyWordsItem
}

const getInf = (str: string, key: string) => str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%');
Page({
  data: {

    isHave: true as Boolean,//有无搜索出来的数据
    page: 0,
    newsType: "school" as string,
    tapbarCtrl: true,
    list: [] as any,
    // 新闻是不是当天
    isToday: false as Boolean,
    bgSvgUrl: "/static/svg/pillar.svg",
    // 最新（3天）
    isNew: false as Boolean,
    newsSearchTitle: "搜索",
    unfindSvg: "/static/svg/news/unfind.svg"
  },
  onLoad: function (options) {
    // 接收传参数据
    // false算做内网
  },
  checkDate: function (startTime: any, endTime: any) {
    /**
     *  使用阻塞
        日期格式化
     */
    let startTimeStr = startTime.replace("/-/g", "/")
    let endTimeStr = endTime.replace("/-/g", "/")
    let start_date = new Date(startTimeStr);
    let end_date = new Date(endTimeStr);
    //转成毫秒数，两个日期相减
    let ms = start_date.getTime() - end_date.getTime() as number;
    //转换成天数     start_date.getTime()
    let day = ms / (1000 * 60 * 60 * 24) as number;
    return day;
  },
  /**
   * 
   * 时间？today还是new
   */
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
  // 搜索
  onInputEvent: function (event: any) {
    var that=this
    //查找函数
    that.onSearchInputEvent(event)
    // this.triggerEvent("haveInput",detail,options);父子组件传值
  },
  onSearchInputEvent: async function (event: any) {
    // 当前的时间
    var mydate = util.formatDate(new Date()); // 调用函数时，传入new Date()参数，返回值是日期和时间
    var that = this;
    that.selectComponent("#toast").showToastAuto("加载中", "lodding", 0.5);
    let keyword = event.detail.value;
    // 初始化请求
    let myKeywordsParams = {
      newsTitle: keyword,
    } as unknown as newsKeyWordsItem
    let { data: res } = await getNewsByKeyWords(myKeywordsParams) as unknown as IResult<any>;
    // length存在否
    if (res) {
      var newsListItems = [] as any//初始化新闻列表
      if (res.length != 0) {
        for (let i = 0; i < res.length - 1; i++) {
          //日期的判断
          let newsItem = {
            "newsDate": res[i]["date"],
            "newsId": res[i]["id"],
            "newsTime": "",
            "newsTitle": res[i]["title"],
            "newsType": res[i]["type"]
          }//创建单个新闻Json对象
          newsListItems.push(newsItem)
          let newdate = res[i].date;
          if (res[i].title.indexOf("视频") >= 0) {
            delete res[i];
          } else if (res[i].type.indexOf("视频新闻") >= 0) {
            delete res[i];
          } else if (that.checkDate(mydate, newdate) < 1) {
            // 当天
            // 添加一条
            newsListItems[i].newsTime = "today"
          } else if (that.checkDate(mydate, newdate) < 3) {
            // 三天内的
            newsListItems[i].newsTime = "new"
          } else {
            //老新闻
            newsListItems[i].newsTime = "old"
          }
        }
        console.log("newsListItems", newsListItems);
        that.setData({
          list: newsListItems,
          isHave: true
        })
      } else {
        that.selectComponent("#toast").showToastAuto("刷新失败", "error", 0.5);
        that.setData({
          isHave: false,
          list: [],
        })
      }
    }

  },
}
)