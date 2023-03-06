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
import uCharts from "../../../utils/u-charts";
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
    /**
     * 选择小组件页面
     */
    isChooseSeetingwidget:false as Boolean,
    windowHeight: 0 as number,//屏幕高度
    settingWidgetTitle: "设置小组件",
    hiddenRemindBox: false, // 隐藏remindBox
    scrollTop: 20,

    /**
     * 底部滑动动画
     */
    WedgetsLongPressMoveData: {
      tabList: [{
          name: '十步杀一人',
          width: 30,
          wedgetSvgUrl:'/static/svg/myWidget/weekSchedule.png'
        },
        {
          name: '十步杀一人',
          width: 30,
          wedgetSvgUrl:'/static/svg/myWidget/weekSchedule.png'
        },
        {
          name: '十步杀一人',
          width: 30,
          wedgetSvgUrl:'/static/svg/myWidget/weekSchedule.png'
        },
        {
          name: '十步杀一人',
          width: 30,
          wedgetSvgUrl:'/static/svg/myWidget/weekSchedule.png'
        },
        {
          name: '十步杀一人',
          width: 30,
          wedgetSvgUrl:'/static/svg/myWidget/weekSchedule.png'
        },
        {
          name: '十步杀一人',
          width: 30,
          wedgetSvgUrl:'/static/svg/myWidget/weekSchedule.png'
        },
        {
          name: '十步杀一人',
          width: 30,
          wedgetSvgUrl:'/static/svg/myWidget/weekSchedule.png'
        }
      ],
      //移动的是哪个元素块
      moveId: null,
      lastY: null,
      enable:false
    },
  },
/**
 * 组件选中
 */
initSortData(tabList:any) {
  var height = 0;
  var ls = [];
  for(var i=0;i<tabList.length;i++){
    var obj = tabList[i];
    obj.y = height;
    ls.push(obj);
    height = height + obj.width + 20;
  }
  // console.log(ls)
  this.setData({
    tabList: ls,
    viewHeight: height
  })
},
//计算位置
moveStatus(e:any) {
  
  if (e.type == 'touchmove' && this.data.WedgetsLongPressMoveData.enable) {
    //最终坐标
    // console.log(e)
    var y = e.changedTouches[0].pageY;
    var clientY = e.changedTouches[0].clientY;
    var nowItem = null;
    var tabList = this.data.WedgetsLongPressMoveData.tabList;
    tabList.forEach(function (obj, i) {
      if (y > obj.y && y < (obj.y + obj.width)) {
        nowItem = i;
      }
    })
    this._pageScroll(clientY);
    this.setData({
      nowItem: nowItem
    })
  }
},
moveEnd(e:any) {
  var moveId = this.data.WedgetsLongPressMoveData.moveId;
  var nowItem = this.data.WedgetsLongPressMoveData.nowItem;
  var tabList = this.data.WedgetsLongPressMoveData.tabList;
  if (nowItem != null) {
    var tmp = tabList[moveId];
    // tabList[moveId] = tabList[nowItem]
    // tabList[nowItem] = tmp;

    tabList.splice(moveId, 1);
    tabList.splice(nowItem, 0, tmp);
  }
  this.setData({
    moveId: null,
    nowItem: null,
    enable:false
  })
  this.initSortData(tabList);
},
/** 页面滑动 */
_pageScroll(clientY:any) {
  if (clientY + this.data.windowHeight*0.2 >= this.data.windowHeight) {
    // 下滑接近屏幕底部
    // console.log("down",clientY + (this.data.windowHeight - clientY)*20)
    wx.pageScrollTo({
      scrollTop: clientY + (this.data.windowHeight - clientY)*20,
      duration: 5
    });
  } else if (clientY - this.data.windowHeight*0.2 <= 0) {
    // 上滑接近屏幕顶部
    // console.log("up",clientY + (clientY - this.data.windowHeight*0.2)*20)
    wx.pageScrollTo({
      scrollTop: clientY + (clientY - this.data.windowHeight*0.2)*20,
      duration: 5
    })
  }
},
onLongPress(e:any){
  console.log(e)
  var moveId = e.currentTarget.dataset.moveid;
  this.setData({
    enable:true,
    moveId:moveId
  })
},
/**
 * 组件选中
 */

/*
 * 选择主页组件还是我组件页面设置
 */
chooseSeetingWidget(){
  /**
   * 选择组件页面设置
   */
  var that=this
  that.setData({
    isChooseSeetingwidget:true
  })
},
/**
 * 选择主页小组件
 */
chooseIndexWidget(){
  /**
   * 选择组件页面设置
   */
  var that=this
  that.setData({
    isChooseSeetingwidget:false//选择主页组件设置
  })
  that.getNodeInfo("oldRemindBar")
},
  /**
   * 生命周期函数--监听页面加载
   */
  /**
   * 吸顶
   */
    // 获取页面节点信息的方法(nodeName 节点id名称)
    getNodeInfo(nodeName:String) {
      const query = this.createSelectorQuery();
      query.select(`#${nodeName}`).boundingClientRect();
      query.selectViewport().scrollOffset();
      query.exec(res => {
        this.setData({ scrollTop: res[0].height });
      });
    },
  onLoad() {
    
    // 获取屏幕高度
    // TODO: 迁移到app.js中因为已经多处调用
    var windowHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      windowHeight: windowHeight
    })
    var that=this
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    var tabList = this.data.WedgetsLongPressMoveData.tabList;
    this.initSortData(tabList);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that=this
    
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
   * saveSetting保存设置
   */

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