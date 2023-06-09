import { getClassSchedule } from '../../../../api/classScheduleApi';
export interface ClassScheduleItem {
  "zh": string,
  "mm": string,
  "year": number,
  "num": number
}
var utils = require('../../../../utils/addCache');
var classScheduleUtils = require('../../../../utils/classScheduleUtils');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dayTime: [] as any,
    currentTab: 0,  // 当前Tab位置
    weekSchedule: true,
    beginWeek: 0,
    weekNum: 19,//最大的周数
    nowWeek: 1,
    againWeek: 0,//对当前周进行第二次拷贝
    beginSemester: '',//对当前学期进行拷贝
    toView: '',//周的自动锁定
    selectedIdx: [0],//学期选择的默认是第几个
    nowtime: "",
    dialogTip: false,
    dark: true,
    buliding: 'zhonglou',
    semester: '大一上',
    showAll: true,
    nowDate: '',
    ifshow: false,
    schoolPlace: "武昌",
    startDate: "2023/2/19",
    suorec: '大一上学期',
    colorcardLight: ['#A9E6FF', '#FFDDDC', '#F5DFFA', '#D4EFFF', '#F9EABA', '#FFD698', '#F0FFC4', '#FEFCC9', '#DFFFD4', '#FFD8D2', '#FFFFF0', '#CCFFED', '#BFC1FF', '#FFC8E6', '#E9EDF1', '#EFDCC9'],//浅色系卡片
    colorcardDark: ['#6290E9', '#B791DC', '#ABA6E9', '#E39ACA', '#F091A2', '#FF9470', '#FDB165', '#F3D257', '#5DD39E', '#B2DB7C', '#68D8D6', '#A9B7BD', '#59ADDF', '#7895BC', '#75AEAE', '#EFDCC9'],//深色系卡片
    colorcardZi: ['#4794B6', '#D67979', '#BF74CE', '#559AC2', '#BD9825', '#B97B1E', '#689658', '#9C982F', '#60A049', '#C76D5F', '#8585A5', '#5EAA91', '#6568C9', '#C8619A', '#8585B1', '#B8906F'],//浅色系字体卡片
    Y: '',
    I: 3,
    time: [] as any,
    timeWu: [{ time1: '08:30', time2: '09:15' }, { time1: '09:20', time2: '10:05' }, { time1: '10:25', time2: '11:10' }, { time1: '11:15', time2: '12:00' }, { time1: '14:00', time2: '14:45' }, { time1: '14:50', time2: '15:35' }, { time1: '15:50', time2: '16:35' }, { time1: '16:40', time2: '17:25' }, { time1: '18:30', time2: '19:15' }, { time1: '19:20', time2: '20:05' }, { time1: '20:15', time2: '21:00' }, { time1: '21:05', time2: '21:50' }],/* 武昌校区时间 */
    timeJia: [{ time1: '08:30', time2: '09:15' }, { time1: '09:20', time2: '10:05' }, { time1: '10:25', time2: '11:10' }, { time1: '11:15', time2: '12:00' }, { time1: '13:30', time2: '14:15' }, { time1: '14:20', time2: '15:05' }, { time1: '15:10', time2: '15:55' }, { time1: '16:00', time2: '16:45' }, { time1: '18:00', time2: '18:45' }, { time1: '18:45', time2: '19:30' }, { time1: '19:30', time2: '20:15' }, { time1: '20:15', time2: '21:00' }],/* 嘉鱼校区时间 */
    weekTime: [] as any,
    Semesterswitchingdetail: false,
    semesterList: ['大一上学期', '大一下学期', '大二上学期', '大二下学期', '大三上学期', '大三下学期', '大四上学期', '大四下学期'],
    classSchedule: { all_keshes: [], week: [] } as any,
    nowWeekData: [] as any,
    allTimes: [] as any,
    classInfo: [] as any,
    dialogNoLoginTip: false
  },

  /**
   * 获得当前页面元素的一些高度参数
   */
  getSomeHeightInfo() {
    /**
    * capsuleBoxHeight：胶囊行的高度 
    * statusBarHeight：状态栏高度
    * screenHeight：屏幕高度
    * rate：比率（rpx*rate=实际px）
    */
    let heightInfo = classScheduleUtils.getTarHeighgt();
    let screenHeight = heightInfo.screenHeight;
    let statusBarHeight = heightInfo.statusBarHeight;
    let capsuleBoxHeight = heightInfo.capsuleBoxHeight;
    let rate = heightInfo.rate;
    // 滑动窗口高度 = 屏幕高度-状态栏-navigateBar-周次滑动-日期显示栏-tapbar
    var scrollHeight = screenHeight - statusBarHeight - capsuleBoxHeight -
      (114) * rate - (76) * rate - (160) * rate;
    this.setData({
      capsuleBoxHeight,
      statusBarHeight,
      scrollHeight
    })
  },

  /* 
  *取消学期绑定弹窗
  */
  cancelBindSchoolTermCharge() {
    this.setData({
      Semesterswitchingdetail: false
    });
  },

  /* 
  *关闭弹窗
  */
  closeDetails() {
    this.setData({ ifshow: false });
  },

  /* 
  *学期的选择滑动
  */
  SchoolTermChange(e: any) {
    console.log(this.data.semesterList[e.detail.value[0]])
    this.setData({
      suorec: this.data.semesterList[e.detail.value[0]]
    });
  },

  /* 
  *绑定学期的按钮
  */
  bindSchoolTermCharge() {
    /**
     * 获取当前年
     */
    var timestamp = Date.parse(new Date() as unknown as string);
    var date = new Date(timestamp);
    let num = date.getFullYear() as unknown as string;
    let year = 0;//选择学期的年份
    let start;//开始上课的时间
    let schoolTerm = 0;//学期
    let place;//校区
    let times = {};//校区的上课时间
    let beginWeek = -1//判断是否要本周和非本周的显示
    let login = wx.getStorageSync('login')
    let zh = login.zh;
    if (this.data.suorec.slice(0, 5) == '大一下学期' || this.data.suorec.slice(0, 5) == '大二下学期' || this.data.suorec.slice(0, 5) == '大三下学期' || this.data.suorec.slice(0, 5) == '大四下学期') {
      schoolTerm = schoolTerm + 12;
      start = num + '/2/19';
    };
    if (this.data.suorec.slice(0, 5) == '大一上学期' || this.data.suorec.slice(0, 5) == '大二上学期' || this.data.suorec.slice(0, 5) == '大三上学期' || this.data.suorec.slice(0, 5) == '大四上学期') {
      schoolTerm = schoolTerm + 3;
      start = num as unknown as number - 1 + '/8/28';
    };
    if (this.data.suorec.slice(1, 2) == "一") {
      year = year + parseInt(zh.slice(0, 4));
      place = '嘉鱼';
      times = this.data.timeJia;
    };
    if (this.data.suorec.slice(1, 2) == "二") {
      year = year + parseInt(zh.slice(0, 4)) + 1;
      place = '武昌';
      times = this.data.timeWu;
    };
    if (this.data.suorec.slice(1, 2) == "三") {
      year = year + parseInt(zh.slice(0, 4)) + 2;
      place = '武昌';
      times = this.data.timeWu;
    };
    if (this.data.suorec.slice(1, 2) == "四") {
      year = year + parseInt(zh.slice(0, 4)) + 3;
      place = '武昌';
      times = this.data.timeWu;
    };
    if (this.data.suorec.slice(0, 3) == this.data.beginSemester) {
      beginWeek = this.data.againWeek;
    }
    this.setData({
      semester: this.data.suorec.slice(0, 3),
      Semesterswitchingdetail: false,
      Y: year as unknown as string,
      schoolPlace: place,
      time: times,
      I: schoolTerm,
      startDate: start,
      dayTime: [],
      beginWeek: beginWeek,
    });
    console.log(this.data.currentTab)
    this.refresh();
  },

  /* 
  *跳转到课表设置界面
  */
  showSetting() {
    let login = wx.getStorageSync('login')
    if (login) {
      wx.navigateTo({ url: '/pages/widgets/classSchedule/classScheduleSeting/classScheduleSeting' });
    } else {
      this.selectComponent("#toast").showToastAuto("未绑定账号", "error", "2");
    }
  },
  /**
   * autoMoveSwiper
   * 页面顶部swiper根据当前周数进行移动
   * @param day 当前周数
   */
  autoMoveSwiper(weekNum: number) {
    var toView//对滑轮中被选中的周数进行显示
    if (weekNum > 3) {
      toView = "item" + (weekNum - 3);
    } else { toView = 'item0'; }
    this.setData({
      toView: toView
    })
  },

  /* 
  *重新刷新功能
  */
  refresh() {
    var login = wx.getStorageSync('login');
    if (login) {
      var day = 1;
      var time = this.data.startDate;
      if (this.data.semester == this.data.beginSemester) {
        day = this.nowWeek()
        time = new Date().toLocaleDateString();
      }
      this.autoMoveSwiper(day);
      utils.mySetStorage('widget-classSchedule', 'classSchedule', '');
      this.initScheduleData();//更新页面数据
      this.reGetDay(time, day);
      this.setData({ weekSchedule: true, nowWeek: day });
    } else {
      this.selectComponent("#toast").showToastAuto("未绑定账号", "error", "2");
    }
  },

  /**
   * 通过网络请求获得课表，并且缓存进本地
   * @param {年份} year 
   * @param {*} num 
   */
  async getTableDataFromApi(year: number, num: number) {
    var that = this;
    var login = wx.getStorageSync('login');
    if (login) {
      let vaule = {
        "zh": login.zh,
        "mm": login.mm,
        "year": year,
        "num": num
      };
      try {
        var result = await getClassSchedule(vaule) as unknown as IResult<any>;
        var res = result.data;
        if (result.code == 20000) {
          var all_tables = res.all_tables;
          var arr = this.objHeavy(all_tables);//筛选有多少门课程
          var myarr = this.randArr(arr); //把存放课程的数组打乱
          var leng = myarr.length;
          for (var i = 0; i < all_tables.length; i++) {
            for (var j = 0; j < leng; j++) {
              if (all_tables[i].name == myarr[j].name) {
                var colorDark = this.data.colorcardDark[j];
                var colorlight = this.data.colorcardLight[j];
                var colorzi = this.data.colorcardZi[j];
                all_tables[i].colorDark = colorDark;
                all_tables[i].colorlight = colorlight;
                all_tables[i].colorzi = colorzi;
              }
            }
          }
          var maxWeeks = 0;
          var week = [];
          // 切割每个tables的day_num
          for (var i = 0; i < all_tables.length; i++) {
            all_tables[i].old_day_num = all_tables[i].day_num;
            // 切割周数
            all_tables[i].day_num = that.getDayNum(all_tables[i]);
            // 切割节数
            all_tables[i].old_num = all_tables[i].num;
            all_tables[i].num = that.getNum(all_tables[i]);
            //切割地点的第一个字
            all_tables[i].alonePlace = all_tables[i].local.slice(0, 2)
            // 记录下最大的周数
            if (all_tables[i].day_num[all_tables[i].day_num.length - 1] > maxWeeks) {
              maxWeeks = all_tables[i].day_num[all_tables[i].day_num.length - 1];
            }
            for (var j = 0; j < all_tables[i].day_num.length; j++) {
              // 匹配周数
              var dayIndex = week.findIndex(function (v) {
                return v.name == all_tables[i].day_num[j];
              });
              if (dayIndex == -1) { //没有就新增
                week.push({
                  name: all_tables[i].day_num[j],
                  data: [{
                    day: "星期日",
                    item: []
                  }, {
                    day: "星期一",
                    item: []
                  }, {
                    day: "星期二",
                    item: []
                  },
                  {
                    day: "星期三",
                    item: []
                  }, {
                    day: "星期四",
                    item: []
                  }, {
                    day: "星期五",
                    item: []
                  },
                  {
                    day: "星期六",
                    item: []
                  }
                  ]
                })
                var itemIndex = week[week.length - 1].data.findIndex(function (v) {
                  return v.day == all_tables[i].day;
                })
                week[week.length - 1].data[itemIndex].item.push((all_tables[i]) as unknown as never);
              } else { // 有就push周
                // 查找星期
                var itemIndex = week[dayIndex].data.findIndex(function (v) {
                  return v.day == all_tables[i].day;
                })
                if (itemIndex == -1) console.log(all_tables[i].day)
                week[dayIndex].data[itemIndex].item.push((all_tables[i]) as unknown as never);
              }
            }
          }
          week.sort(function (a, b) {
            return parseInt(a.name) - parseInt(b.name);
          });
          try {
            week = this.check(week)//查看有课的周之间是否存在没课的周而且此周还没返回数据，需要自己加
          } catch {
            this.selectComponent("#toast").showToastAuto("刷新失败", "error", "0");
            this.setData({
              dialogTip: true
            })
          }
          var classSchedule = {
            week: week,
            all_keshes: res.all_keshes
          };
          var nowWeekData: { day: string; item: never[] }[] = [] as any
          if (that.data.showAll) {
            nowWeekData = that.getNowWeekData(classSchedule, that.data.nowWeek);
          }
          wx.hideLoading();
          that.setData({
            classSchedule: classSchedule,
            nowWeekData: nowWeekData,
            login: true,
            weekNum: classSchedule.week.length + 2
          })
          this.getDayTime(classSchedule);//获取每天的课程信息
          if (this.data.beginWeek > 0) {//保证缓存的是正确的值
            utils.mySetStorage('widget-classSchedule', 'classSchedule', classSchedule)
            utils.mySetStorage('widget-classSchedule', 'dailySchedule', this.data.classInfo)
            utils.mySetStorage('widget-classSchedule', 'time', this.data.time)
            //获取日课表的日期信息并存进缓存
            let nowDayDate = "第" + parseInt((this.data.currentTab / 7 + 1) as unknown as string) + "周 " +
              this.data.allTimes[this.data.currentTab].month + "月" +
              this.data.allTimes[this.data.currentTab].data + "日 " +
              this.data.allTimes[this.data.currentTab].week + " (日程表)"
            utils.mySetStorage('widget-classSchedule', 'nowDayData', nowDayDate)
          }
          that.selectComponent("#toast").showToastAuto("刷新成功", "success");
        } else {
          this.selectComponent("#toast").showToastAuto(result.msg, "error");
        }
      } catch (err) {
        console.log(err)
        this.selectComponent("#toast").showToastAuto("刷新失败", "error");
        this.setData({
          dialogTip: true,
          login: true
        })
      }
    } else {
      this.selectComponent("#toast").hiddenToast();
      this.setData({
        dialogNoLoginTip: true
      })
    }
  },

  /** 
  * 查看有课的周之间是否存在没课的周而且此周还没返回数据，需要自己加 
  */
  check(week: any) {
    var num = -1
    for (var i = week[0].name; i <= week.length; i++) {
      if (week[i - week[0].name].name != i) {
        num = num + 1
        week.push({
          name: i,
          data: [{
            day: "星期日",
            item: []
          }, {
            day: "星期一",
            item: []
          }, {
            day: "星期二",
            item: []
          },
          {
            day: "星期三",
            item: []
          }, {
            day: "星期四",
            item: []
          }, {
            day: "星期五",
            item: []
          },
          {
            day: "星期六",
            item: []
          }
          ]
        })
        break;
      }
    }
    if (num != -1) {
      let arr: any[] = []
      for (let k = week[0].name; k < i; k++)
        arr.push(week[k - week[0].name])
      arr.push(week[week.length - 1])
      for (let k = i; k < week[week.length - 2].name; k++)
        arr.push(week[k - week[0].name])
      week = this.check(arr)
    }
    return week
  },

  /* 
  *刷新本周的日期
  */
  reGetDay(time: string | number | Date, noWeek: number) {
    let index = this.data.nowWeek
    let nowWeekData = this.getNowWeekData(this.data.classSchedule, index);
    let nowDate = new Date(time); //获取指定日期当周的一周日期
    let date = new Date(nowDate.getTime() + 24 * 60 * 60 * 1000 * (index - this.data.nowWeek) * 7);
    this.getWeekTime(date);
    let value = 0 as unknown as number
    let weeknum = 0 as unknown as number
    for (let i = 0; i < 7; i++) {
      if (this.data.weekTime[i] == this.data.nowDate) {
        value = value + i
      }
    }
    weeknum = weeknum + (noWeek - 1) * 7 + value
    this.setData({
      nowWeekData: nowWeekData,
      currentTab: weeknum
    })
  },

  /* 
  *关闭弹窗
  */
  closeDialogTip() {
    this.setData({
      dialogTip: false,
      dialogNoLoginTip: false
    });
  },

  /**
   * 从本地缓存中读取课表，若成功返回true，失败为false
   */
  getTableDataFromLocal() {
    var that = this;
    try {
      var value = wx.getStorageSync('widget-classSchedule').classSchedule;
      if (value) {
        var nowWeekData: { day: string; item: never[] }[] = [];
        if (that.data.showAll) {
          nowWeekData = that.getNowWeekData(value, that.data.nowWeek);
        }
        that.setData({
          classSchedule: value,
          nowWeekData: nowWeekData
        });
        return true;
      } else {
        return false;
      }
    } catch { };
  },

  /**
   * 切割出周数  2-4周(双),5-8周 -> [ 2 4 5 6 7 8 ]
   *            2-4周(单),5-8周 -> [ 3 5 6 7 8 ]
   */
  getDayNum(all_table: { day_num: string }) {
    var day_num = all_table.day_num.split(",");
    var list = [];
    for (var j = 0; j < day_num.length; j++) {
      var double_index = day_num[j].search('双');
      var one_index = day_num[j].search('单');
      var day_num_item = day_num[j].match(/\d+(\.\d+)?/g)!;
      if (day_num_item.length == 2) {
        for (var k = parseInt(day_num_item[0]); k <= parseInt(day_num_item[1]); k++) {
          if (double_index != -1) {
            if (k % 2 == 0) list.push(k);
          } else if (one_index != -1) {
            if (k % 2 == 1) list.push(k);
          }
          else list.push(k);
        }
      } else {
        list.push(parseInt(day_num_item[0]));
      };
    }
    return list;
  },

  /* 
  *查重(对象深拷贝)
  */
  objHeavy: function (arr: any) { //筛选一共有几门课
    let arr1 = []; //存名字
    let newArr = []; //存新数组
    for (let i in arr) {
      let index = arr1.indexOf(arr[i].name);
      if (index == -1) {
        arr1.push(arr[i].name);
        newArr.push(JSON.parse(JSON.stringify(arr[i])));
      } else {
        if (newArr[index].old_day_num && newArr[index].day_num) {
          newArr[index].old_day_num += "," + arr[i].old_day_num;
          newArr[index].day_num = newArr[index].day_num.concat(arr[i].day_num);
        }
      }
    };
    return newArr;
  },

  /**
   * 洗牌算法
   */
  randArr: function (arr: any) { //课程数组乱序
    var length = arr.length;
    var r = length;
    var rand = 0;
    while (r) {
      rand = Math.floor(Math.random() * (r--));
      [arr[r], arr[rand]] = [arr[rand], arr[r]];
    };
    return arr;
  },

  /**
   * 切割出节数  9-12节 -> 9,10,11,12
   */
  getNum(all_table: { num: string }) {
    var num = all_table.num.split(",");
    var list = [];
    for (var j = 0; j < num.length; j++) {
      var day_num_item = num[j].match(/\d+(\.\d+)?/g)!;
      if (day_num_item.length == 2) {
        for (var k = parseInt(day_num_item[0]); k <= parseInt(day_num_item[1]); k++) {
          list.push(k);
        };
      };
    };
    return list;
  },

  /**
   * 初始化课表数据
   */
  async initClassData() {
    if (!this.getTableDataFromLocal()) {
      this.selectComponent("#toast").showToast("课表刷新中", "lodding");
      await this.getTableDataFromApi(parseInt(this.data.Y), this.data.I) as any;
    }
    var num = 0;
    if (this.data.classSchedule.week[0] && this.data.classSchedule.week[0].name != 1) {
      num = num + (this.data.classSchedule.week[0].name - 1) * 7;
    }
    this.setData({
      num: num
    })
  },

  /**
   * 渲染全部课表临时页面
   */
  getNowWeekData(classSchedule: { week: any; all_keshes?: any }, nowWeek: number) {
    var week = classSchedule.week;
    var nowWeekData = [{
      day: "星期日",
      item: []
    }, {
      day: "星期一",
      item: []
    }, {
      day: "星期二",
      item: []
    },
    {
      day: "星期三",
      item: []
    }, {
      day: "星期四",
      item: []
    }, {
      day: "星期五",
      item: []
    }, {
      day: "星期六",
      item: []
    }
    ] as any;
    try {
      for (var i = 0; i < week.length; i++) {
        // 优先显示本周的
        if (week[i].name == nowWeek) {
          for (var dataIdx = 0; dataIdx < week[i].data.length; dataIdx++) {
            var idx = nowWeekData.findIndex(function (v: { day: any; }) {
              return v.day == week[i].data[dataIdx].day;
            });
            for (var itemIdx = 0; itemIdx < week[i].data[dataIdx].item.length; itemIdx++) {
              week[i].data[dataIdx].item[itemIdx].zindex = 3;
              week[i].data[dataIdx].item[itemIdx].double = false;
              nowWeekData[idx].item.push((week[i].data[dataIdx].item[itemIdx]) as never);
            };
          };
        };
        // 其次显示大于本周的
        if (week[i].name > nowWeek) {
          for (var dataIdx = 0; dataIdx < week[i].data.length; dataIdx++) {
            var idx = nowWeekData.findIndex(function (v: { day: any; }) {
              return v.day == week[i].data[dataIdx].day;
            })
            for (var itemIdx = 0; itemIdx < week[i].data[dataIdx].item.length; itemIdx++) {
              // 根据起始判断是否重叠
              var numSIdx = nowWeekData[idx].item.findIndex((v: any) => {
                var itemNum = week[i].data[dataIdx].item[itemIdx].num;
                if (v.num[0] == itemNum[0] || v.num[v.num.length - 1] == itemNum[itemNum.length - 1]) {
                  return true;
                } else {
                  return false;
                };
              });
              if (numSIdx == -1) {
                week[i].data[dataIdx].item[itemIdx].zindex = 2;
                nowWeekData[idx].item.push((week[i].data[dataIdx].item[itemIdx]) as never);
              } else if (nowWeekData[idx].item[numSIdx].name != week[i].data[dataIdx].item[itemIdx].name) {
                nowWeekData[idx].item[numSIdx].double = true;
              };
              // 根据末尾判断是否重叠
              var numEIdx = nowWeekData[idx].item.findIndex((v: any) => {
                var itemNum = week[i].data[dataIdx].item[itemIdx].num;
                if (v.num[v.num.length - 1] == itemNum[itemNum.length - 1]) {
                  return true;
                } else {
                  return false;
                }
              });
              if (numEIdx == -1) {
              } else if (nowWeekData[idx].item[numEIdx].name != week[i].data[dataIdx].item[itemIdx].name) {
                nowWeekData[idx].item[numEIdx].double = true;
              }
            }
          }
        }
      }
    } catch { };//防止没有课表缓存报错
    return nowWeekData;
  },

  /**
   * 获取当前一周的日期
   */
  getWeekTime(date: Date) {
    var timesStamp = date.getTime();
    var currenDay = date.getDay();
    var dates = [];
    for (var i = 0; i < 7; i++) {
      var das = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7));
      das = (das.getFullYear() + "/" + (das.getMonth() + 1) + "/" + das.getDate()) as unknown as Date;
      var newDas = das.toString().replace(/[年月]/g, '.').replace(/[日上下午]/g, '').slice(5, das.toString().length);
      dates.push(newDas);
    };
    this.setData({
      weekTime: dates
    });
  },

  /**
   * 初始化日期数据
   */
  initDateData() {
    var date = new Date();
    var startDate = new Date(this.data.startDate);//获取指定日期当周的一周日期
    this.getWeekTime(startDate);
    var dateStr = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    var nowDate = dateStr.replace(/[年月]/g, '.').replace(/[日上下午]/g, '').slice(5, dateStr.length);
    this.setData({
      nowDate: nowDate
    });
  },

  /**
   * 初始化课表数据
   */
  initScheduleData() {
    this.initClassData();
    this.initDateData();
  },

  /**
   * 展示课表详情 
   */
  showClassDetail(e: { currentTarget: { dataset: { cls: any } } }) {
    var cls = e.currentTarget.dataset.cls;
    var week = this.data.classSchedule.week;
    var list = [];
    for (var iweek = 0; iweek < week.length; iweek++) {
      for (var idata = 0; idata < week[iweek].data.length; idata++) {
        for (var iitem = 0; iitem < week[iweek].data[idata].item.length; iitem++) {
          var item = week[iweek].data[idata].item[iitem];
          if ((cls.num[0] == item.num[0] || cls.num[cls.num.length - 1] == item.num[item.num.length - 1]) &&
            (cls.day == item.day) && (list.findIndex((v) => { return v.id == item.id }) == -1)
          ) {
            list.push(item);
          };
        };
      };
    };
    //将重复的课程周次合并
    let num = this.objHeavy(list);
    list = num;
    //给本周的赋值高的zindex
    for (let i = 0; i < list.length; i++) {
      var key = 0
      for (let j = 0; j < list[i].day_num.length; j++) {
        if (list[i].day_num[j] == this.data.nowWeek) {
          list[i].zindex = 3
          key = key + 1
          break;
        }
      }
      if (key == 0) {
        list[i].zindex = 2
      }
    }
    //将zindex高的放在第一个展示
    for (let i = 0; i < list.length; i++) {
      if (list[i].zindex == 3) {
        let abc = list[i]
        let bcd = list[0]
        list[0] = abc;
        list[i] = bcd;
        break;
      }
    }
    this.setData({
      ifshow: true,
      detailClass: list
    });
  },

  /* 
  *切换周与日课表
  */
  changeicon() {
    let login = wx.getStorageSync('login');
    if (login) {
      this.setData({
        weekSchedule: !this.data.weekSchedule
      });
    } else {
      this.selectComponent("#toast").showToastAuto("未绑定账号", "error", "2");
    }
  },

  /* 
  *展开学期选择弹窗
  */
  selectSchoolTime() {
    let login = wx.getStorageSync('login')
    if (login) {
      this.setData({
        Semesterswitchingdetail: true
      });
    } else {
      this.selectComponent("#toast").showToastAuto("未绑定账号", "error", "2");
    }
  },

  /**
   * 选择周
   * @param {被选择周次，从0开始}
   */
  selectWeek(e: { currentTarget: { dataset: { index: number } } }) {
    var that = this;
    var index = e.currentTarget.dataset.index + 1;
    var nowWeekData = that.getNowWeekData(this.data.classSchedule, index);
    var nowDate = new Date(this.data.startDate);//获取指定日期当周的一周日期
    var date = new Date(nowDate.getTime() + 24 * 60 * 60 * 1000 * (index - 1) * 7);
    this.getWeekTime(date);
    this.setData({
      nowWeek: index,
      nowWeekData: nowWeekData
    });
  },

  dateLater: function (dates?: any, later?: any) {
    let dateObj = { time: '', year: '', month: '', data: '', week: '' };
    let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
    let date = new Date(dates);
    date.setDate(date.getDate() + later);
    let day = date.getDay();
    let yearDate = date.getFullYear();
    let month = ((date.getMonth() + 1) < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
    let dayFormate = (date.getDate() < 10 ? date.getDate() : date.getDate());
    dateObj.time = yearDate + '-' + month + '-' + dayFormate;
    dateObj.year = yearDate as unknown as string;
    dateObj.month = month as unknown as string;
    dateObj.data = dayFormate as unknown as string;
    dateObj.week = show_day[day];
    return dateObj;
  },
  //todate默认参数是当前日期，可以传入对应时间 计算当前周数
  getDates(days: number, todate?: any) {
    var dateArry = [];
    for (var i = 0; i < days; i++) {
      var dateObj = this.dateLater(todate, i);
      dateArry.push(dateObj)
    }
    return dateArry;
  },

  handleSwiperChange(e: { detail: { current: any; source: any; }; }) {
    let current = e.detail.current
    let source = e.detail.source
    if (source == 'autoplay' || source == 'touch') {
      //根据官方 source 来进行判断swiper的change事件是通过什么来触发的，autoplay是自动轮播。touch是用户手动滑动。其他的就是未知问题。抖动问题主要由于未知问题引起的，所以做了限制，只有在自动轮播和用户主动触发才去改变current值，达到规避了抖动bug
      this.setData({
        currentTab: current,
      });
    }
  },

  /**
   * 获取每天的课程信息
   */
  getDayTime(classScheduleIn: any) {
    if (this.data.dayTime.length == 0) {
      var time = (new Date().toTimeString().substring(0, 8)).slice(0, 5);
      var dayTime = this.data.dayTime;
      var date = new Date(Date.parse(new Date() as unknown as string));
      var nowDate = this.getDates(1, date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate())[0].time;
      var classInfo = [];
      let classScheduleWeekLength = (classScheduleIn.week.length != 0) ? classScheduleIn.week.length : 19;
      var allTimes = this.getNewWeekTime();
      var num = 0;
      for (var i = 0; i < classScheduleWeekLength; i++) {
        var classSchedule = classScheduleIn.week[i];
        for (var j = 0; j < 7; j++) {
          var obj = {
            dateString: classSchedule.data[j].item
          }
          dayTime.push(obj);
          if (allTimes[num].time === nowDate) {
            classInfo = classSchedule.data[j].item;
          }
          num++;
        }
      }
      this.setData({
        dayTime: dayTime,
        classInfo: classInfo,
        nowtime: time
      })
    }
  },
  /**
   * 获取当前学期的所有日期
   */
  getNewWeekTime() {
    let classScheduleWeekLength = (this.data.classSchedule.week.length != 0) ? this.data.classSchedule.week.length + 2 : 19;
    let classScheduleAllTime = classScheduleWeekLength * 7;
    let allTimes = this.getDates(classScheduleAllTime, this.data.startDate);
    this.setData({
      allTimes: allTimes
    })
    return allTimes;
  },

  /**
     * 获取当前周数
     */
  nowWeek() {
    //获取当前周数的预处理定义变量进行储存数据
    var time = new Date().toLocaleDateString();
    var startDate = this.data.startDate;
    console.log(startDate)
    var start_date = new Date(this.data.startDate.replace(/-/g, "/"));
    var end_date = new Date(time.replace(/-/g, "/"));
    var days = end_date.getTime() - start_date.getTime();
    var day = (days / (1000 * 60 * 60 * 24)) as unknown as number;
    return parseInt((day / 7 + 1) as unknown as string)
  },
  /**
   * 初始化本地缓存信息
   * 若用户第一次使用，则初始化一些默认的值
   */
  initLocalStorage() {
    if (!wx.getStorageSync('widget-classSchedule')) {
      //给用户添加缓存
      let value = { classSchedule: '', ifshowAllclass: true, background: '', buliding: 'zhonglou', dark: true, picture: '', place: '' };
      wx.setStorageSync('widget-classSchedule', value);
    }
  },
  /**
   * 初始化本地页面的一些信息
   * 计算出当前的年月日信息和一些Page初始化需要用到的信息
   * @param startDate：学期的开始日期 
   * @param nowDate：当前日期
   */
  initPageData(startDate:string, nowDate: string) {
    // 获取当前年月
    let timeSplit = nowDate.split("/");
    let Y = timeSplit[0] as unknown as string;
    let M = parseInt(timeSplit[1]) as unknown as number;
    // 计算两个时间之间的天数
    let day = classScheduleUtils.getCalculateTheNumberOfDays(startDate, nowDate);
    //进行当前学期的判断
    let schoolTerm;//储存学期的变量
    let year = 0;//储存年份的变量
    let start;//开始上课的时间
    let schoolTime;//学期名
    let times = {};//校区的上课时间
    let place;//校区
    let login = wx.getStorageSync('login')
    let zh = login.zh;
    if (8 <= M && M <= 12) {
      year = year + parseInt(Y) + 1;
      schoolTerm = 3;
    };
    if (1 <= M && M < 2) {
      year = year + parseInt(Y);
      schoolTerm = 3;
    };
    if (2 <= M && M < 8) {
      year = year + parseInt(Y);
      schoolTerm = 12;
    };

    if ((year - zh.slice(0, 4) == 4 && 8 <= M && M <= 12) ||
      (year - zh.slice(0, 4) == 4 && 1 <= M && M < 2)) {
      start = year + "/8/28";
      schoolTime = '大四上';
      times = this.data.timeWu;
      place = "武昌";
    };
    if (year - zh.slice(0, 4) == 4 && 2 <= M && M < 8) {
      start = year + "/2/19";
      schoolTime = '大四下';
      times = this.data.timeWu;
      place = "武昌";
    };
    if ((year - zh.slice(0, 4) == 3 && 8 <= M && M <= 12) ||
      (year - zh.slice(0, 4) == 3 && 1 <= M && M < 2)) {
      start = year + "/8/28";
      schoolTime = '大三上';
      times = this.data.timeWu;
      place = "武昌";
    };
    if (year - zh.slice(0, 4) == 3 && 2 <= M && M < 8) {
      start = year + "/2/19";
      schoolTime = '大三下';
      times = this.data.timeWu;
      place = "武昌";
    };
    if ((year - zh.slice(0, 4) == 2 && 8 <= M && M <= 12) ||
      (year - zh.slice(0, 4) == 2 && 1 <= M && M < 2)) {
      start = year + "/8/28";
      schoolTime = '大二上';
      times = this.data.timeWu;
      place = "武昌";
    };
    if (year - zh.slice(0, 4) == 2 && 2 <= M && M < 8) {
      start = year + "/2/19";
      schoolTime = '大二下';
      times = this.data.timeWu;
      place = "武昌";
    };
    if ((year - zh.slice(0, 4) == 1 && 8 <= M && M <= 12) ||
      (year - zh.slice(0, 4) == 1 && 1 <= M && M < 2)) {
      start = year + "/8/28";
      schoolTime = '大一上';
      times = this.data.timeJia;
      place = "嘉鱼";
    };
    if (year - zh.slice(0, 4) == 1 && 2 <= M && M < 8) {
      start = year + "/2/19";
      schoolTime = '大一下';
      times = this.data.timeJia;
      place = "嘉鱼";
    };
    let toView//对滑轮中被选中的周数进行显示
    let nowWeek = parseInt((day / 7 + 1) as unknown as string);
    if (nowWeek > 3) {
      toView = "item" + (nowWeek - 3);
    } else { toView = 'item0'; }
    for (var i = 0; i < 8; i++) {//给本学年加上后缀名
      if (schoolTime == this.data.semesterList[i].slice(0, 3)) {
        this.data.semesterList[i] = this.data.semesterList[i] + "(本学年)";
        break;
      }
    }
    this.setData({
      Y: (year - 1) as unknown as string,
      I: schoolTerm,
      nowWeek: nowWeek,
      semester: schoolTime,
      schoolPlace: place,
      time: times,
      startDate: start,
      beginSemester: schoolTime,
      suorec: schoolTime + '学期(本学年)',
      toView: toView,
      selectedIdx: [i],
      semesterList: this.data.semesterList,
      beginWeek: nowWeek,
      againWeek: nowWeek
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 获得当前时间
    let time = classScheduleUtils.getScheduleNowDate('time');
    console.log(classScheduleUtils.getScheduleParamsByDate(2023, 11, "20221117029"))
    let startDate = this.data.startDate;
    // 计算出课表滑动栏的高度
    this.getSomeHeightInfo();
    // 初始化缓存
    this.initLocalStorage();
    // 初始化页面数据
    this.initPageData(startDate, time);
    this.initScheduleData();//初始化页面数据
    //通过定义的变量进行周的自动判断
    var classSchedule = wx.getStorageSync('widget-classSchedule').classSchedule;
    // 刷新本周的日期
    this.reGetDay(time, this.data.nowWeek);
    let currentTab = this.data.currentTab;
    if (classSchedule) {
      this.getDayTime(classSchedule);//获取每天的课程信息
      utils.mySetStorage('widget-classSchedule', 'dailySchedule', this.data.classInfo);
      utils.mySetStorage('widget-classSchedule', 'time', this.data.time);
      //获取日课表的日期信息并存进缓存
      let nowDayDate = "第" + parseInt((currentTab / 7 + 1) as unknown as string) +
        "周 " + this.data.allTimes[currentTab].month + "月" +
        this.data.allTimes[currentTab].data + "日 " +
        this.data.allTimes[currentTab].week + " (日程表)"
      utils.mySetStorage('widget-classSchedule', 'nowDayData', nowDayDate)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let schoolPlace;
    let time;
    let classSchedule = wx.getStorageSync('widget-classSchedule');
    let semesterSlice = this.data.semester.slice(1, 2);
    let againWeek = this.data.againWeek;
    if (classSchedule.place == '') {
      try {
        if (semesterSlice == "一") {
          schoolPlace = "嘉鱼";
          time = this.data.timeJia;
        };
        if (semesterSlice == "二") {
          schoolPlace = "武昌";
          time = this.data.timeWu;
        };
        if (semesterSlice == "三") {
          schoolPlace = "武昌";
          time = this.data.timeWu;
        };
        if (semesterSlice == "四") {
          schoolPlace = "武昌";
          time = this.data.timeWu;
        };
      } catch { }
    } else {
      if (classSchedule.place == "嘉鱼") {
        time = this.data.timeJia;
        schoolPlace = "嘉鱼";
      };
      if (classSchedule.place == "武昌") {
        time = this.data.timeWu;
        schoolPlace = "武昌";
      };
    };
    this.selectWeek({ currentTarget: { dataset: { index: againWeek - 1 } } });
    this.autoMoveSwiper(againWeek);
    this.setData({
      showAll: classSchedule.ifshowAllclass,
      dark: classSchedule.dark,
      buliding: classSchedule.buliding,
      bgc: classSchedule.background,
      picture: classSchedule.picture,
      schoolPlace: schoolPlace,
      time: time,
      weekSchedule: true
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})