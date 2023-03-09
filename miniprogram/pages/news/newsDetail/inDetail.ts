var WxParse = require('../../../wxParse/wxParse.js');
import {
  // 新闻详情
  getNewsDetailByID,
} from "../../../api/newsApi"
import {
  myStorage
} from "../../../utils/newStorage.js";
var newsID = '';
interface newsIDitem {
  "newsId": string
}

export {
  newsIDitem,
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dialogTitle: "下载失败，无法查看",
    dialogContent: "学校官网服务器于半夜1:30后关闭，现无法下载，请白天再试试噢~",
    isShowDialog: false,//组件弹窗(问题单)
    newsID: '',
    type: 0,
    bgc: "#FFF",
    light: "",
    t_bg: "",
    newsDetailTitle: "快讯闻",
    schoolBuiltSrc: "/static/svg/schoolBuilt/zhonglou.svg",
    // 南南的微信二维码
    nannanCode: "/static/svg/news/nanan_weixinCode.png",
    // 南南题目头
    contentTitle: "/static/svg/news/contentTitle.svg",
    topTitleSvgUrl: "/static/svg/news/topTitle.svg",
    bgSvgUrl: "/static/svg/pillar.svg",
    bg_url: " url(http://tiku.mcdd.top/image/bg.png);",
    bg_size: "background-size: 418rpx 1052rpx;",
    // 新闻ID
    newsIDitem: {
      "newsId": "",
    } as unknown as newsIDitem,
  },
  onShareAppMessage() { //分享
    var newsID = JSON.stringify(this.data.newsID);
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          //title: '自定义转发标题'
        })
      }, 2000)
    })
    return {
      //title: '自定义转发标题',
      path: '/pages/inDetail/inDetail?newsID=' + newsID,
      promise
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 初始化新闻页面
  async initNewsDetail(options: any) {
    var that = this;
    var str2 = '<div class="pic"><img src="" title="" /><s class="prev" title="上一张"></s><s class="next" title="下一张"></s><span class="tips">最后一张了</span></div>';
    var str3 = '<li class="last">最后一张</li>';
    newsID = options.newsID;
    // 设置newsId
    // newsIDitem 
    that.setData({ 'newsIDitem.newsId': newsID, })
    // 获取新闻的详情
    // 通过ID获取新闻的详情
    // 获取内网新闻
    that.selectComponent("#toast").showToastAuto("加载中", "lodding", 0.5);

    let { data: res } = await getNewsDetailByID(that.data.newsIDitem) as unknown as IResult<any>;
    if (res != null) {
      wx.hideLoading();
      var html = res.content;
      var str1 = '<p style="text-indent:2em;">                                                                                                                                </p>'

      //html = html.replace("style=\"text-indent:2em\"","")
      html = html.replace("align=\"center\"", "")
      html = html.replace(/padding:(.*?)px (.*?)px;/g, "")
      html = html.replace(/font-size:(.*?)px;/g, "")
      html = html.replace(/font-size:(.*?)pt;/g, "")
      html = html.replace(/background:(.*?);/g, "")
      html = html.replace(/text-indent:(.*?)pt;/g, "text-indent:2em;")
      html = html.replace(/margin-left:(.*?);/g, '')
      html = html.replace(/align="right"/g, 'style="text-align:right;"')
      html = html.replace(/background-color:(.*?);/g, "")
      html = html.replace(/color:(.*?);/g, "")
      //html = html.replace(/style=(.*?);/g, "")
      html = html.replace(/font-family:(.*?);/g, "")
      html = html.replace(/<td valign="middle" width="(.*?)"><p style="text-indent:2em;" align="center">/g, '<td valign="" width="50"><p style=";" align="center">')
      html = html.replace(/<tr style="height:14.25pt;" height="19">/g, '<tr style="height:20pt;" height="25">')
      html = html.replace(/<p style="text-indent:2em;" align="center">/g, '<p style="" align="center">')
      html = html.replace(/<td valign="" width="50"><p style=";" align="center">一等奖推荐人数（1%）/g, '<td valign="" width="50"><p style=";" align="center">单位</p> </td><td valign="" width="50">毕业生总数<p style=";" align="center"></p> </td><td valign="" ><p style=";" align="center">一等奖推荐人数（1%）')
      html = html.replace(/>单  位</g, '><')
      html = html.replace(/（网址：<a href="(.*?)">/, '（网址：')
      html = html.replace(/style="line-height:200%;"/g, '')
      html = html.replace(/<p style="text-align:right;" style="text-indent:2em;">/g, '<p style="text-align:right;text-indent:2em;">')
      html = html.replace(str1, "")
      html = html.replace(/align:right;">(.*?)武昌首义学院/, 'align:right;">武昌首义学院')
      html = html.replace(/<li><a href="javascript:"(.*?) title="(.*?)">/g, "")
      // 去掉Script部分
      html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      WxParse.wxParse("article", "html", html, that, 5)
      html = html.replace(str2, "")
      html = html.replace(str3, "")

      // 洗页脚
      that.setData({
        item: res
      });

    }
  },
  onLoad: function (options) {
    // Do some initialize when page load.
    var that = this
    that.initNewsDetail(options)
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
  wxParseTagDown: function (e: any) {
    var that = this
    that.selectComponent("#toast").showToastAuto("正在打开文件", "lodding", 1);
    var src = e.currentTarget.dataset.src;
    src = src.replace('http://e.wsyu.edu.cn/wcm.files/', 'https://ambition.mcdd.top/wcm.files/')
    wx.downloadFile({
      url: src,
      success(res) {
        const filePath = res.tempFilePath;
        wx.hideLoading();
        if (res.statusCode == 200) {
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
            },
            fail: function (e) {
            },
          })
        } else {
          that.setData({
            isShowDialog: true
          })
        }
      },
    })
  },
  switchColoe: function (res: any) {
    var that = this
    var type = that.data.type
    type++;
    if (type > 2) {
      type = 0;
    }
    if (type == 0) {
      wx.setNavigationBarColor({ //设置导航栏颜色
        frontColor: '#000000', //注意frontColor的值只能为000000或者111111
        backgroundColor: "#FFF"
      });
      that.setData({
        bgc: "#FFF",
        light: "",
        type: type,
        t_bg: "",
        bg_url: " url(http://tiku.mcdd.top/image/bg.png);",
        bg_size: "background-size: 418rpx 1052rpx;"
      })
    }
    if (type == 1) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: "#982812"
      });
      that.setData({
        bgc: "#982812",
        light: "brightness(10);",
        type: type,
        t_bg: "rgba(62, 54, 54, 0.46);",
        bg_url: " url(http://tiku.mcdd.top/image/wbg.png);",
        bg_size: "background-size: 418rpx 1052rpx;"
      })
    }
    if (type == 2) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: "#0E3580"
      });
      that.setData({
        bgc: "#0E3580",
        light: "brightness(10);",
        type: type,
        t_bg: "rgba(42, 44, 48, 0.46);",
        bg_url: " url(http://tiku.mcdd.top/image/bbg.png);",
        bg_size: "background-size: 304rpx 615rpx;background-position-y: 80%;"
      })
    }
  },
})