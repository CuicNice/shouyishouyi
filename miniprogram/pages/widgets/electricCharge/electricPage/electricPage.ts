// pages/widgets/electricCharge/electricPage/electricPage.ts
import uCharts from "../../../../utils/u-charts";
import { getElectric } from '../../../../api/electricChargeApi';
export interface ElectriceItem {
  build: string,
  room: string
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveBind: false, // 是否绑定寝室
    showBindDialog: false, // 是否绑定弹窗
    showImg: false, // 展示渲染的表格
    dialogTip: false, // 绑定失败弹窗
    electricChargeTitle: "电费查询",
    cWidth: 750,
    cHeight: 500,
    electricChargedetail: false,
    multiArray: ['', '西区2栋', '西区3栋', '西区4栋', '西区6栋', '西区7栋', '西区8栋', '西区9栋', '中区14栋', '中区15栋', '中区16栋', '中区17栋'], //数组，长度是多少是几列
    multiIndex: 0,
    build: "",
    room: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    /**
     * 获取当前年月
     */
    var timestamp = Date.parse(new Date() as unknown as string);
    var date = new Date(timestamp);
    //获取年份  
    this.setData({
      Y: date.getFullYear(),
      //获取月份  
      M: (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
      //获取当日日期 
      D: date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.initPageData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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

  },
  /**
   * 初始化页面渲染函数
   */
  async initPageData() {
    var that = this;
    /**
     * 获取本地缓存，判断是否绑定数据
     */
    try {
      var value = wx.getStorageSync('widgets-electricCharge') as ElectriceItem;
      console.log(value)
      if (value) {
        that.setData({
          haveBind: true
        })
        this.getElectricData(value);
      } else {
        that.setData({
          showBindDialog: true
        })
        console.log("用户未绑定数据");
      }
    } catch (e) {
      console.log(e)
      console.log("用户未绑定数据");
    }
  },

  /**
   * 发送请求，渲染数据
   * @param from 楼栋数据
   */
  async getElectricData(from: ElectriceItem) {
    var that = this;
    console.log(from)
    that.selectComponent("#toast").showToast("请求中....", "lodding");
    const { data: res } = await getElectric(from) as unknown as IResult<any>;
    if (!res) {
      that.selectComponent("#toast").showToastAuto("请求失败", "error");
      console.log("请求失败，请重新绑定")
      that.setData({
        showImg: false,
        data: null
      })
    } else {
      that.setData({
        showImg: true
      })
      that.selectComponent("#toast").showToastAuto("请求成功", "success");
    }
    /**
     * 处理数据
     */
    res.remainMoney = (res.remainMoney + "").slice(0, 5)
    res.remain = (res.remain + "").slice(0, 5)
    if (res.remainMoney[4] == '.') {
      res.remainMoney = (res.remainMoney).slice(0, -1)
    }
    if (res.remain[4] == '.') {
      res.remain = (res.remain).slice(0, -1)
    }
    console.log(res);
    //获取绘图的数据
    var columnData = {
      "categories": [res.allDayValue[14].curDayTime.substring(8, 10),
        '',
      res.allDayValue[12].curDayTime.substring(8, 10),
        '',
      res.allDayValue[10].curDayTime.substring(8, 10),
        '',
      res.allDayValue[8].curDayTime.substring(8, 10),
        '',
      res.allDayValue[6].curDayTime.substring(8, 10),
        '',
      res.allDayValue[4].curDayTime.substring(8, 10),
        '',
      res.allDayValue[2].curDayTime.substring(8, 10),
        '',
      res.allDayValue[0].curDayTime.substring(8, 10)],
      "series": [
        {
          name: "当日电费（元）",
          data: [res.allDayValue[14].dayUseMeony,
          res.allDayValue[13].dayUseMeony,
          res.allDayValue[12].dayUseMeony,
          res.allDayValue[11].dayUseMeony,
          res.allDayValue[10].dayUseMeony,
          res.allDayValue[9].dayUseMeony,
          res.allDayValue[8].dayUseMeony,
          res.allDayValue[7].dayUseMeony,
          res.allDayValue[6].dayUseMeony,
          res.allDayValue[5].dayUseMeony,
          res.allDayValue[4].dayUseMeony,
          res.allDayValue[3].dayUseMeony,
          res.allDayValue[2].dayUseMeony,
          res.allDayValue[1].dayUseMeony,
          res.allDayValue[0].dayUseMeony]
        }
      ]
    }
    var lineData = {
      categories: [res.allMonthValue[5].The_Month.substring(4, 6),
      res.allMonthValue[4].The_Month.substring(4, 6),
      res.allMonthValue[3].The_Month.substring(4, 6),
      res.allMonthValue[2].The_Month.substring(4, 6),
      res.allMonthValue[1].The_Month.substring(4, 6),
      res.allMonthValue[0].The_Month.substring(4, 6)],//obj.categories
      series: [
        {
          name: "当日电费（元）",
          data: [res.allMonthValue[5].ZGross,
          res.allMonthValue[4].ZGross,
          res.allMonthValue[3].ZGross,
          res.allMonthValue[2].ZGross,
          res.allMonthValue[1].ZGross,
          res.allMonthValue[0].ZGross]
        }
      ],
    }
    /**
     * 渲染
     */
    this.drawCharts("column", "#myColumn", columnData);
    this.drawCharts("line", "#myLine", lineData);
    this.setData({
      data: res
    })
  },
  /**
   * 绘制柱形图
   */
  drawColumn(ctx: any, obj: any) {
    new uCharts({
      type: "column",
      context: ctx,
      //   canvas2d: true,
      width: "315",
      height: "198",
      dataLabel: false,
      dataPointShape: true,
      categories: obj.categories,//obj.categories
      series: obj.series,
      animation: true,
      background: "#FFFFFF",
      padding: [15, 15, 50, 5],
      enableScroll: false,
      legend: {},
      xAxis: {
        disableGrid: true,
        title: "剩余电量"
      },
      yAxis: {
        data: [{ min: 0 }],
        gridType: "dash",
        dashLength: 2,
      },
      extra: {
        column: {
          type: "group",
          width: 13,
          xAxisLabel: true,
          activeBgColor: "#000000",
          activeBgOpacity: 0.08,
          linearType: "custom",
          seriesGap: 5,
          barBorderRadius: [20, 20, 20, 20],
          legendShape: 'circle',
          customColor: [
            "#78DAB9",
            "#3EBAD0"
          ]
        }
      },
    })
  },
  /**
   *  绘制折线图
   */
  drawLine(ctx: any, obj: any) {
    // console.log(obj)
    new uCharts({
      type: "line",
      context: ctx,
      //   canvas2d: true,
      width: "300",
      height: "198",
      dataLabel: true,
      dataPointShape: true,
      color: ["#3EBAD0"],
      categories: obj.categories,//obj.categories
      series: obj.series,
      animation: true,
      background: "#FFFFFF",
      padding: [15, 15, 50, 5],
      enableScroll: false,
      legend: {},
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        data: [{ min: 0 }],
        gridType: "dash",
        dashLength: 2,
        axisLine: true,
      },
      extra: {
        line: {
          type: "straight",
          width: 2,
          activeType: "hollow",
        }
      },
    })
  },
  /**
   * 绘制图形
   */
  drawCharts(type: string, id: string, obj: any) {
    const query = wx.createSelectorQuery()
    query.select(id)
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        var ctx = canvas.getContext('2d');
        switch (type) {
          case "column":
            this.drawColumn(ctx, obj);
            break;
          case "line":
            this.drawLine(ctx, obj);
            break;
          default:
            console.log("请选择绘制的图形")
        }
      })
  },
  /**
   * 用户不绑定，关闭
   */
  closeBindDialog() {
    this.setData({
      showBindDialog: false
    })
  },
  /**
   * 用户统一绑定，展示绑定弹窗
   */
  showBindItem() {
    var that = this;
    that.setData({
      showBindDialog: false
    }, function () {
      that.setData({
        electricChargedetail: true
      })
    })
  },
  /**
   * 取消绑定
   */
  cancelBindEletricCharge() {
    this.setData({
      electricChargedetail: false,
      room: "",
      build: "",
      multiIndex: 0
    })
  },
  /**
   * 用户选择楼栋监听
   */
  bindBuildChange(e: any) {
    var that = this;
    this.setData({
      multiIndex: e.detail.value,
      build: that.data.multiArray[e.detail.value]
    })
  },
  /**
   * 用户选择寝室监听
   */
  bindRoomChange(e: any) {
    this.setData({
      room: e.detail.value
    })
  },
  /**
   * 用户绑定楼栋数据
   */
  bindEletricCharge() {
    var that = this;
    if (this.data.build == "" || this.data.room == "") {
      that.selectComponent("#toast").showToastAuto("请完善绑定条件");
      console.log("楼栋或者寝室号不可为空")
      return;
    }
    that.setData({
      electricChargedetail: false
    })
    var bindData = {
      build: this.data.build,
      room: this.data.room
    } as ElectriceItem;
    getElectric(bindData).then(res => {
      res = res as IResult<any>;
      console.log(res.code == 20000);
      if (res.code == 20000) {
        wx.setStorage({
          key: "widgets-electricCharge",
          data: bindData,
          success() {
            that.initPageData();
            that.selectComponent("#toast").showToastAuto("绑定成功", "success");
          }
        })
      } else {
        that.setData({
          dialogTip: true
        })
      }
    });

  },
  /**
   * 重新绑定
   */
  reBind() {
    this.setData({
      showBindDialog: true
    })
  },
  /**
   * 清除绑定
   */
  cleanBind() {
    var that = this;
    that.setData({
      showBindDialog: false,
      haveBind: false,
      data: null,
      showImg: false
    })
    wx.setStorage({
      key: "widgets-electricCharge",
      data: "",
      success() {
        that.initPageData();
      }
    })
  },
  /**
   * 关闭dialogTip
   */
  closeDialogTip() {
    this.setData({
      dialogTip: false,
      electricChargedetail: true
    })
  }
})