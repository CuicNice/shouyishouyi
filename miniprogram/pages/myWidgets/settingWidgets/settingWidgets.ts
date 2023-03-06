// pages/myWidgets/settingWidgets/settingWidgets.ts
// 接口请求部分
import {
  // 内网新闻
  getInnerNewsListitem,
  // 外网新闻
  getOutNewsListitem
} from "../../../api/newsApi"
// 请求数据定义
/**
 * 电费
 */
import uCharts from "../../../../utils/u-charts";
import { getElectric } from '../../../api/electricChargeApi';
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
/**
 * 电费
 */
export interface ElectriceItem {
  build: string,
  room: string
}
interface NodeSizeItem {
  width: number,
  height: number
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0 as number,//屏幕高度
    settingWidgetTitle: "设置小组件",
    hiddenRemindBox: false, // 隐藏remindBox
    scrollTop: 20,
    /**
     * remindBox滑动参数
     */
    moveRemindBoxData: {
      remindMovecheck: false,//remindbox是否滑动的判断
      remindState: 0,    //0:初始状态 1:remindBox弹出中状态 2:remindBox弹入状态中 3:remindBox弹出状态
      remindFirstTouchY: 0,  //首次触摸Y坐标值
      remindTouchCheckY: 60,  //触发滑动的触摸Y
      remindMoveY: 0,   // 滑动操作纵向的移动距离
      remindMaxMoveY: (200 - 60), //抽屉remindBox最大移动距离
      remindLastTranlateY: 0  //上次动画效果的平移距离，用于校准top值
    } as any,
/**
 * 新闻组件
 */
    // 内网：
    innerPageParams: {
      "currentPage": "1",
      "pageSize": "3"
    } as unknown as outnewsListItem,
    // 外网
    outPageParams: {
      "currentPage": "1",
      "pageSize": "3"
    } as unknown as outnewsListItem,
    tapbarCtrl:true as Boolean,
    // 列表数据
    widgetMiniNewsList: [] as any,
    //电费查询
    widgetsElectricChargeData:[]as any,
  },
  /**
   * 
   * 新闻组件
   */
  async getInnerSchoolNews() {
    let that = this
    wx.showLoading({
      title: '正在加载...',
    });
    // 获取内网新闻
    let innerPageParams = that.data.innerPageParams
    let { data: innerRes } = await getInnerNewsListitem(innerPageParams) as unknown as IResult<any>;
    console.log("innerRes",innerRes);
     if (innerRes != null) {
      wx.hideLoading();
      let widgetMiniNewsList = innerRes.widgetMiniNewsList;
      that.setData({
        widgetMiniNewsList: widgetMiniNewsList, //当天的
      })
    }
    /**
     * 电费组件
     */
    electricData:[] as any
  },
  /**
   * 电费请求
   */
  async webrequest(){
    /**
     * 获取组件内部要求的组件请求参数，进行网络请求
     */
    var value = wx.getStorageSync('widgets-electricCharge') as ElectriceItem;
    const { data: widgetsElectricChargeRes } = await getElectric(value) as unknown as IResult<any>;
    this.setData({
      widgetsElectricChargeData:widgetsElectricChargeRes
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
    let outPageParams = that.data.outPageParams
    let { data: outRes } = await getOutNewsListitem(outPageParams) as unknown as IResult<any>;
    if (outRes.pageSize != 0) {
      var widgetMiniNewsList = outRes.widgetMiniNewsList;
      console.log("listmm",widgetMiniNewsList)
    } else {
      wx.showToast({
        title: '刷新失败',
        icon: 'error',
        duration: 1500
      })
      wx.hideToast();
    }
    that.setData({
      widgetMiniNewsList: widgetMiniNewsList,
    })
  },
  // 初始化新闻页面的数据
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
   * 滑动remindBox消失
   */
  remindBartouchStart: function (e: any) {
    /**
     * 
     * 滑动触发函数
     */
    var that = this
    var data = that.data.moveRemindBoxData;
    console.log("e.touches[0]", e.touches[0]);
    var clientY = e.touches[0].clientY;
    //初识状态
    if (data.remindState === 0) {
      //remindBox弹出状态
      if (clientY <= data.remindTouchCheckY && clientY > 20) {
        console.log("remindBox弹出状态1");

        data.check = true;
        data.remindState = 1;
        data.remindFirstTouchY = clientY;
      }
    } else if (data.remindState === 3) {
      console.log("remindBox弹出状态2");

      if (clientY >= data.remindMaxMoveY) {
        data.check = true;
        data.remindState = 2;
        data.remindFirstTouchY = clientY;
      }
    } else {
      console.log("不知道是什么状态", data.remindState);
    }
  },
  /**
   * 
   * 滑动过程
   */
  remindTouchmove: function (e: any) {
    /**
     * 滑动过程控制
     */
    var that = this
    var data = that.data.moveRemindBoxData;
    if (data.check) {
      var mainPageTop = 0, drawerMenuLeft = 0;
      var remindMoveY = e.touches[0].clientX - data.remindFirstTouchY;
      if (data.remindState === 1) {
        //处理边界状态
        if (remindMoveY < 0) {
          remindMoveY = 0;
        }
        if (remindMoveY > data.remindMaxMoveY) {
          remindMoveY = data.remindMaxMoveY;
        }
        if (remindMoveY >= 0 && remindMoveY <= data.remindMaxMoveY) {
          data.remindMoveY = remindMoveY;
          remindMoveY = remindMoveY - data.remindLastTranlateY;
          mainPageTop = remindMoveY;
          drawerMenuLeft = -800 + remindMoveY;
        }
      }
      else if (data.remindState === 2) {
        //处理边界状态
        if (remindMoveY > 0) {
          remindMoveY = 0;
        }
        if (remindMoveY < -data.remindMaxMoveY) {
          remindMoveY = -data.remindMaxMoveY;
        }
        if (remindMoveY <= 0 && remindMoveY >= -data.remindMaxMoveY) {
          data.remindMoveY = remindMoveY;
          remindMoveY = remindMoveY - data.remindLastTranlateY;
          //px转为rpx
          var remindMaxMoveY = data.remindMaxMoveY;
          mainPageTop = remindMaxMoveY + remindMoveY;
          drawerMenuLeft = remindMaxMoveY - 800 + remindMoveY;
        }
      }

      this.setData({
        mainPageTop: mainPageTop,
        drawerMenuLeft: drawerMenuLeft
      });

    }

  },

  /**
   * 
   * 滑动结束控制
   */
  remindBartouchEnd: function (e: any) {
    var that = this
    var data = that.data.moveRemindBoxData;
    if (!data.check) {
      return;
    }
    data.check = false;
    data.remindFirstTouchY = 0;
    var remindMoveY = data.remindMoveY;
    data.remindMoveY = 0;
    var animation = wx.createAnimation({ duration: 100 });
    var translateY = 0;
    var mainPageTop = 0;
    var windowWidth = that.data.windowHeight; //获取屏幕的高度
    if (data.remindState === 1) {
      if (remindMoveY === 0 || remindMoveY === data.maxremindMoveY) {
        data.remindState = (remindMoveY === 0) ? 0 : 3;
        return;
      }
      mainPageTop = remindMoveY;
      //滑动距离是否超过窗口宽度一半
      if (mainPageTop > (that.data.windowHeight / 2)) {
        translateY = data.maxremindMoveY - remindMoveY;
        data.remindState = 3;
      }
      else {
        translateY = -remindMoveY;
        data.remindState = 0;
      }
    }
    else if (data.remindState === 2) {
      if (remindMoveY === 0 || remindMoveY === -data.maxremindMoveY) {
        data.remindState = (remindMoveY === 0) ? 3 : 0;
        return;
      }
      //滑动距离是否超过窗口宽度一半
      mainPageTop = data.maxremindMoveY + remindMoveY
      if (mainPageTop > (that.data.windowHeight / 2)) {
        translateY = -remindMoveY;
        data.remindState = 3;
      }
      else {
        translateY = -mainPageTop;
        data.remindState = 0;
      }
    }
    translateY += data.lastTranlateX;
    data.lastTranlateX = translateY;
    animation.translateY(translateY).step();// step * 表示一组动画完成。可以在一组动画中调用任意多个动画方法，一组动画中的所有动画会同时开始，一组动画完成后才会进行下一组动画。 */
    this.setData({
      animationData: animation.export()
    });
  },
  onPageScroll(ev) {
    var that = this
    console.log("ev", ev)
    if (ev.scrollTop <= 0) {
      // 使用CSS选择器
      ev.scrollTop = 0;
    } else if (ev.scrollTop > that.data.windowHeight) {
      ev.scrollTop = wx.getSystemInfoSync().windowHeight;
    }
    if (ev.scrollTop > this.data.scrollTop || ev.scrollTop == wx.getSystemInfoSync().windowHeight) {
      this.setData({
        hiddenRemindBox: true
      })
    } else {
      this.setData({
        hiddenRemindBox: false
      })
    }
    setTimeout(() => {
      this.setData({
        scrollTop: ev.scrollTop
      })
    }, 0)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    
    // 获取屏幕高度
    // TODO: 迁移到app.js中因为已经多处调用
    var windowHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      windowHeight: windowHeight
    })
    var that=this
    that.initNewsInfo()//初始化新闻
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
    var that=this
    that.webrequest();//电费
    
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