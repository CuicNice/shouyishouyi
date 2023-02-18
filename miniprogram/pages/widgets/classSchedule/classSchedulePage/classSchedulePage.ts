Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekSchedule: true,
    nowWeek: 1,
    semester: '大一上',
    showAll: true,
    nowDate: '',
    startDate:"2023/2/13",
    showClass:false,
    suorec: '',
    colorcardLight: ['#A9E6FF', '#FFDDDC', '#F5DFFA', '#D4EFFF', '#F9EABA', '#FFD698', '#F0FFC4', '#FEFCC9', '#DFFFD4', '#FFD8D2', '#FFFFF0', '#CCFFED', '#BFC1FF', '#FFC8E6', '#E9EDF1', '#EFDCC9'],
    colorcardDark: ['#6290E9', '#B791DC', '#ABA6E9', '#E39ACA', '#F091A2', '#FF9470', '#FDB165', '#F3D257', '#5DD39E', '#B2DB7C', '#68D8D6', '#A9B7BD', '#59ADDF', '#7895BC', '#75AEAE', '#EFDCC9'],
    colorcardZi: ['#4794B6', '#D67979', '#BF74CE', '#559AC2', '#BD9825', '#B97B1E', '#689658', '#9C982F', '#60A049', '#C76D5F', '#8585A5', '#5EAA91', '#6568C9', '#C8619A', '#8585B1', '#B8906F'],
    M:'',
    Y:'',
    D:'',
    I:3,
    Semesterswitchingdetail:false,
    weeksStatic: [{
        title: "周日",
        item: "星期日"
      }, {
        title: "周一",
        item: "星期一"
      }, {
        title: "周二",
        item: "星期二"
      },
      {
        title: "周三",
        item: "星期三"
      }, {
        title: "周四",
        item: "星期四"
      }, {
        title: "周五",
        item: "星期五"
      }, {
        title: "周六",
        item: "星期六"
      }
    ],
    semesterList: ['大一上学期', '大一下学期', '大二上学期', '大二下学期', '大三上学期', '大三下学期', '大四上学期', '大四下学期'],
    classSchedule:[] as any
  },

  cancelBindEletricCharge() {
    this.setData({
      Semesterswitchingdetail: false
    })
  },

  xqchange(e: any) {
    this.setData({
      suorec: this.data.semesterList[e.detail.value[0]]
    })
  },

  bindEletricCharge(){
    if (this.data.suorec == '大一下学期' || this.data.suorec == '大二下学期' || this.data.suorec == '大三下学期' || this.data.suorec == '大四下学期') {
      this.setData({
        I: 12,
       week: [{ index: 1, type: true, day1: '2/19', day2: '2/20', day3: '2/21', day4: '2/22', day5: '2/23', day6: '2/24', day7: '2/25' }, { index: 2, type: true, day1: '2/26', day2: '2/27', day3: '2/28', day4: '3/1', day5: '3/2', day6: '3/3', day7: '3/4' }, { index: 3, type: true, day1: '3/5', day2: '3/6', day3: '3/7', day4: '3/8', day5: '3/9', day6: '3/10', day7: '3/11' }, { index: 4, type: true, day1: '3/12', day2: '3/13', day3: '3/14', day4: '3/15', day5: '3/16', day6: '3/17', day7: '3/18' }, { index: 5, type: true, day1: '3/19', day2: '3/20', day3: '3/21', day4: '3/22', day5: '3/23', day6: '3/24', day7: '3/25' }, { index: 6, type: true, day1: '3/26', day2: '3/27', day3: '3/28', day4: '3/29', day5: '3/30', day6: '3/31', day7: '4/1' }, { index: 7, type: true, day1: '4/2', day2: '4/3', day3: '4/4', day4: '4/5', day5: '4/6', day6: '4/7', day7: '4/8' }, { index: 8, type: true, day1: '4/9', day2: '4/10', day3: '4/11', day4: '4/12', day5: '4/13', day6: '4/14', day7: '4/15' }, { index: 9, type: true, day1: '4/16', day2: '4/17', day3: '4/18', day4: '4/19', day5: '4/20', day6: '4/21', day7: '4/22' }, { index: 10, type: true, day1: '4/23', day2: '4/24', day3: '4/25', day4: '4/26', day5: '4/27', day6: '4/28', day7: '4/29' }, { index: 11, type: true, day1: '4/30', day2: '5/1', day3: '5/2', day4: '5/3', day5: '5/4', day6: '5/5', day7: '5/6' }, { index: 12, type: true, day1: '5/7', day2: '5/8', day3: '5/9', day4: '5/10', day5: '5/11', day6: '5/12', day7: '5/13' }, { index: 13, type: true, day1: '5/14', day2: '5/15', day3: '5/16', day4: '5/17', day5: '5/18', day6: '5/19', day7: '5/20' }, { index: 14, type: true, day1: '5/21', day2: '5/22', day3: '5/23', day4: '5/24', day5: '5/25', day6: '5/26', day7: '5/27' }, { index: 15, type: true, day1: '5/28', day2: '5/29', day3: '5/30', day4: '5/31', day5: '6/1', day6: '6/2', day7: '6/3' }, { index: 16, type: true, day1: '6/4', day2: '6/5', day3: '6/6', day4: '6/7', day5: '6/8', day6: '6/9', day7: '6/10' }, { index: 17, type: true, day1: '6/11', day2: '6/12', day3: '6/13', day4: '6/14', day5: '6/15', day6: '6/16', day7: '6/17' }, { index: 18, type: true, day1: '6/18', day2: '6/19', day3: '6/20', day4: '6/21', day5: '6/22', day6: '6/23', day7: '6/24' }, { index: 19, type: true, day1: '6/25', day2: '6/26', day3: '6/27', day4: '6/28', day5: '6/29', day6: '6/30', day7: '7/1' }]
      })
    }
    if (this.data.suorec == '大一上学期' || this.data.suorec == '大二上学期' || this.data.suorec == '大三上学期' || this.data.suorec == '大四上学期') {
      this.setData({
        I: 3,
        week: [{ index: 1, type: true, day1: '8/28', day2: '8/29', day3: '8/30', day4: '8/31', day5: '9/1', day6: '9/2', day7: '9/3' }, { index: 2, type: true, day1: '9/4', day2: '9/5', day3: '9/6', day4: '9/7', day5: '9/8', day6: '9/9', day7: '9/10' }, { index: 3, type: true, day1: '9/11', day2: '9/12', day3: '9/13', day4: '9/14', day5: '9/15', day6: '9/16', day7: '9/17' }, { index: 4, type: true, day1: '9/18', day2: '9/19', day3: '9/20', day4: '9/21', day5: '9/22', day6: '9/23', day7: '9/24' }, { index: 5, type: true, day1: '9/25', day2: '9/26', day3: '9/27', day4: '9/28', day5: '9/29', day6: '9/30', day7: '10/1' }, { index: 6, type: true, day1: '10/2', day2: '10/3', day3: '10/4', day4: '10/5', day5: '10/6', day6: '10/7', day7: '10/8' }, { index: 7, type: true, day1: '10/9', day2: '10/10', day3: '10/11', day4: '10/12', day5: '10/13', day6: '10/14', day7: '10/15' }, { index: 8, type: true, day1: '10/16', day2: '10/17', day3: '10/18', day4: '10/19', day5: '10/20', day6: '10/21', day7: '10/22' }, { index: 9, type: true, day1: '10/23', day2: '10/24', day3: '10/25', day4: '10/26', day5: '10/27', day6: '10/28', day7: '10/29' }, { index: 10, type: true, day1: '10/30', day2: '10/31', day3: '11/1', day4: '11/2', day5: '11/3', day6: '11/4', day7: '11/5' }, { index: 11, type: true, day1: '11/6', day2: '11/7', day3: '11/8', day4: '11/9', day5: '11/10', day6: '11/11', day7: '11/12' }, { index: 12, type: true, day1: '11/13', day2: '11/14', day3: '11/15', day4: '11/16', day5: '11/17', day6: '11/18', day7: '11/19' }, { index: 13, type: true, day1: '11/20', day2: '11/21', day3: '11/22', day4: '11/23', day5: '11/24', day6: '11/25', day7: '11/26' }, { index: 14, type: true, day1: '11/27', day2: '11/28', day3: '11/29', day4: '11/30', day5: '12/1', day6: '12/2', day7: '12/3' }, { index: 15, type: true, day1: '12/4', day2: '12/5', day3: '12/6', day4: '12/7', day5: '12/8', day6: '12/9', day7: '12/10' }, { index: 16, type: true, day1: '12/11', day2: '12/12', day3: '12/13', day4: '12/14', day5: '12/15', day6: '12/16', day7: '12/17' }, { index: 17, type: true, day1: '12/18', day2: '12/19', day3: '12/20', day4: '12/21', day5: '12/22', day6: '12/23', day7: '12/24' }, { index: 18, type: true, day1: '12/25', day2: '12/26', day3: '12/27', day4: '12/28', day5: '12/29', day6: '12/30', day7: '12/31' }, { index: 19, type: true, day1: '1/1', day2: '1/2', day3: '1/3', day4: '1/4', day5: '1/5', day6: '1/6', day7: '1/7' }]
      })
    }
    if (this.data.suorec.slice(1, 2) == "一") { this.setData({ Y: parseInt(wx.getStorageSync('key1').slice(0, 4)) as unknown as string }) }
    if (this.data.suorec.slice(1, 2) == "二") { this.setData({ Y: parseInt(wx.getStorageSync('key1').slice(0, 4)) + 1 as unknown as string }) }
    if (this.data.suorec.slice(1, 2) == "三") { this.setData({ Y: parseInt(wx.getStorageSync('key1').slice(0, 4)) + 2 as unknown as string }) }
    if (this.data.suorec.slice(1, 2) == "四") { this.setData({ Y: parseInt(wx.getStorageSync('key1').slice(0, 4)) + 3 as unknown as string }) }
    this.setData({semester:this.data.suorec.slice(0, 3)})
    this.setData({Semesterswitchingdetail:false})
    wx.removeStorageSync('classSchedule')
    this.initClassData()
  },

  /**
   * 通过网络请求获得课表，并且缓存进本地
   * @param {年份} year 
   * @param {*} num 
   */
  getTableDataFromApi(year, num) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'http://www.fmin-courses.com:9527/api/v1/craw/user/classTable',
        method: 'POST',
        data: {
          "zh": wx.getStorageSync('key1'),
          "mm": wx.getStorageSync('key2'),
          "year": year,
          "num": num
        },
        success: (res) => {
          resolve(res);
        },
        fail: (e) => {
          console.log(res.data.msg);
          reject(e);
        }
      })
    })
  },

  /**
   * 从本地缓存中读取课表，若成功返回true，失败为false
   */
  getTableDataFromLocal() {
    var that = this;
    try {
      var value = wx.getStorageSync('classSchedule')
      if (value) {
        // Do something with return value
        var nowWeekData: { day: string; item: never[] }[] = []
        if(that.data.showAll){
          nowWeekData = that.getNowWeekData(value,that.data.nowWeek);
        }
        that.setData({
          classSchedule: value,
          nowWeekData: nowWeekData
        });
        return true;
      } else {
        return false;
      }
    } catch (e) {
      // Do something when catch error
      console.log(e)
    }
  },
  /**
   * 切割出周数  2-4周(双),5-8周 -> [ 2 4 5 6 7 8 ]
   */
  getDayNum(all_table: { day_num: string }) {
    var day_num = all_table.day_num.split(",");
    var list = [];
    for (var j = 0; j < day_num.length; j++) {
      var double_index = day_num[j].search('双');
      var day_num_item = day_num[j].match(/\d+(\.\d+)?/g);
      if (day_num_item.length == 2) {
        for (var k = parseInt(day_num_item[0]); k <= parseInt(day_num_item[1]); k++) {
          if (double_index != -1) {
            if (k % 2 == 0) list.push(k);
          } else list.push(k);
        }
      } else {
        list.push(parseInt(day_num_item[0]));
      }
    }
    return list;
  },
  objHeavy: function (arr: any) { //筛选一共有几门课
    let arr1 = []; //存名字
    let newArr = []; //存新数组
    for (let i in arr) {
      if (arr1.indexOf(arr[i].name) == -1) {
        arr1.push(arr[i].name);
        newArr.push(arr[i]);
      }
    }
    return newArr;
  },
    //洗牌算法
    randArr: function (arr: any) { //课程数组乱序
      var length = arr.length;
      var r = length;
      var rand = 0;
      while (r) {
        rand = Math.floor(Math.random() * (r--));
        [arr[r], arr[rand]] = [arr[rand], arr[r]];
      }
      return arr;
    },
  /**
   * 切割出节数  9-12节 -> 9,10,11,12
   */
  getNum(all_table: { num: string }) {
    var num = all_table.num.split(",");
    var list = [];
    for (var j = 0; j < num.length; j++) {
      var day_num_item = num[j].match(/\d+(\.\d+)?/g);
      if (day_num_item.length == 2) {
        for (var k = parseInt(day_num_item[0]); k <= parseInt(day_num_item[1]); k++) {
          list.push(k);
        }
      }
    }
    return list;
  },
  /**
   * 初始化课表数据
   */
  async initClassData() {
    var that = this;
    if (!this.getTableDataFromLocal()) {
      wx.showLoading({
        title: '加载中。。。',
      })
      var res = await this.getTableDataFromApi(parseInt(this.data.Y), this.data.I) as any;
      //console.log(res)
      if (res.data.code == 20000) {
        var all_tables = res.data.data.all_tables;
        var maxWeeks = 0;
        var week = [];
        // var classTableXYZ = [];
        // 切割每个tables的day_num
        for (var i = 0; i < all_tables.length; i++) {
          // 切割周数
          all_tables[i].day_num = that.getDayNum(all_tables[i]);
          // 切割节数
          all_tables[i].num = that.getNum(all_tables[i]);
          // 记录下最大的周数
          if (all_tables[i].day_num[all_tables[i].day_num.length - 1] > maxWeeks) {
            maxWeeks = all_tables[i].day_num[all_tables[i].day_num.length - 1];
          }
          for (var j = 0; j < all_tables[i].day_num.length; j++) {
            // 匹配周数
            var dayIndex = week.findIndex(function (v, index, arr) {
              return v.name == all_tables[i].day_num[j]
            });
            // console.log(dayIndex)
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
                return v.day == all_tables[i].day
              })
              week[week.length - 1].data[itemIndex].item.push(all_tables[i]);
            } else { // 有就push周
              // 查找星期
              var itemIndex = week[dayIndex].data.findIndex(function (v) {
                return v.day == all_tables[i].day
              })
              if (itemIndex == -1) console.log(all_tables[i].day)
              week[dayIndex].data[itemIndex].item.push(all_tables[i]);
            }
          }
        }
        week.sort(function (a, b) {
          return parseInt(a.name) - parseInt(b.name)
        });
        var classSchedule = {
          week: week,
          all_keshes: res.data.data.all_keshes
        };
        var nowWeekData: { day: string; item: never[] }[] = []
        if(that.data.showAll){
          nowWeekData = that.getNowWeekData(classSchedule,that.data.nowWeek);
        }
        wx.hideLoading();
        that.setData({
          classSchedule: classSchedule,
          nowWeekData:nowWeekData
        }, function () {
          wx.setStorageSync('classSchedule', classSchedule);
        })
      } else {
        console.log(res.data.msg)
      }
    }
  },
  /**
   * 渲染全部课表临时页面
   */
  getNowWeekData(classSchedule: { week: any; all_keshes?: any },nowWeek: number) {
    // console.log("getNowWeekData")
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
    ]
    for (var i = 0; i < week.length; i++) {
      // 优先显示本周的
      if (week[i].name == nowWeek) {
        for (var dataIdx = 0; dataIdx < week[i].data.length; dataIdx++) {
          var idx = nowWeekData.findIndex(function (v) {
            return v.day == week[i].data[dataIdx].day
          })
          for (var itemIdx = 0; itemIdx < week[i].data[dataIdx].item.length; itemIdx++) {
            week[i].data[dataIdx].item[itemIdx].zindex = 3;
            week[i].data[dataIdx].item[itemIdx].double = false;
            nowWeekData[idx].item.push(week[i].data[dataIdx].item[itemIdx]);
          }
        }
      }
      // 其次显示大于本周的
      if (week[i].name > nowWeek) {
        for (var dataIdx = 0; dataIdx < week[i].data.length; dataIdx++) {
          var idx = nowWeekData.findIndex(function (v) {
            return v.day == week[i].data[dataIdx].day
          })
          for (var itemIdx = 0; itemIdx < week[i].data[dataIdx].item.length; itemIdx++) {
            // 根据起始判断是否重叠
            var numSIdx = nowWeekData[idx].item.findIndex((v) => {
              var itemNum = week[i].data[dataIdx].item[itemIdx].num;
              if (v.num[0] == itemNum[0] || v.num[v.num.length - 1] == itemNum[itemNum.length - 1]) {
                return true;
              } else {
                return false;
              }
            });
            if (numSIdx == -1) {
              week[i].data[dataIdx].item[itemIdx].zindex = 2;
              nowWeekData[idx].item.push(week[i].data[dataIdx].item[itemIdx]);
            } else if(nowWeekData[idx].item[numSIdx].name !=week[i].data[dataIdx].item[itemIdx].name) {
              nowWeekData[idx].item[numSIdx].double = true;
            }
            // 根据末尾判断是否重叠
            var numEIdx = nowWeekData[idx].item.findIndex((v) => {
              var itemNum = week[i].data[dataIdx].item[itemIdx].num;
              if (v.num[v.num.length - 1] == itemNum[itemNum.length - 1]) {
                return true;
              } else {
                return false;
              }
            });
            if (numEIdx == -1) {
              // week[i].data[dataIdx].item[itemIdx].zindex = 2;
              // nowWeekData[idx].item.push(week[i].data[dataIdx].item[itemIdx]);
            } else if(nowWeekData[idx].item[numEIdx].name !=week[i].data[dataIdx].item[itemIdx].name) {
              nowWeekData[idx].item[numEIdx].double = true;
            }


          }
        }
      }
    }
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
      das =  (das.getFullYear() + "/" + (das.getMonth() + 1) + "/" + das.getDate())as unknown as Date;
      das = das.replace(/[年月]/g, '.').replace(/[日上下午]/g, '').slice(5, das.length);
      dates.push(das);
    }
    this.setData({
      weekTime: dates
    })
  },
  /**
   * 初始化日期数据
   */
  initDateData() {
    var date = new Date()
    var startDate = new Date(this.data.startDate) //获取指定日期当周的一周日期
    this.getWeekTime(startDate);
    // var dateStr = date.toLocaleDateString();
    var dateStr = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    // console.log(dateStr)
    var nowDate = dateStr.replace(/[年月]/g, '.').replace(/[日上下午]/g, '').slice(5, dateStr.length);
    this.setData({
      nowDate: nowDate
    })
  },
  /**
   * 初始化页面数据
   */
  initPageData() {
    this.initClassData();
    this.initDateData();
  },
  /**
   * 展示课表详情 
   */
  showClassDetail(e: { currentTarget: { dataset: { cls: any } } }){
    var cls = e.currentTarget.dataset.cls;
    console.log(cls);
    var week = this.data.classSchedule.week;
    var list = [];
    for(var iweek=0;iweek<week.length;iweek++){
      for(var idata = 0;idata<week[iweek].data.length;idata++){
        for(var iitem = 0;iitem<week[iweek].data[idata].item.length;iitem++){
          var item = week[iweek].data[idata].item[iitem];
          if((cls.num[0] == item.num[0] || cls.num[cls.num.length-1] == item.num[item.num.length-1]) &&
          (cls.day == item.day) && (list.findIndex((v)=>{return v.name == item.name}) == -1)
          ){
            list.push(item);
          }
        }
      }
    }
    console.log(list)
    this.setData({
      detailClass:list,
      showClass:true
    })
  },
  changeicon() {
    this.setData({
      weekSchedule: !this.data.weekSchedule
    })
  },
  selectSchoolTime() {
    this.setData({
      Semesterswitchingdetail: true
    })
  },
  /**
   * 选择周
   * @param {被选择周次，从0开始} e 
   */
  selectWeek(e: { currentTarget: { dataset: { index: number } } }) {
   var that = this;
    var index = e.currentTarget.dataset.index + 1;
    var nowWeekData = that.getNowWeekData(this.data.classSchedule,index);
    var nowDate = new Date(this.data.startDate) //获取指定日期当周的一周日期
    var date = new Date(nowDate.getTime() + 24 * 60 * 60 * 1000 * (index - 1)* 7);
    this.getWeekTime(date);
    this.setData({
      nowWeek: index,
      nowWeekData:nowWeekData
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.removeStorageSync('classSchedule')
     /**
     * 获取当前年月
     */
    var timestamp = Date.parse(new Date() as unknown as string);
    var date = new Date(timestamp);
    this.setData({
      //获取年份
      Y: date.getFullYear()  as unknown as string,
      //获取月份
      M:(date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1)  as unknown as string,
      //获取当日日期
      D:  date.getDate() < 10 ?(date.getDate())as unknown as string : date.getDate()  as unknown as string
    })
    if (8 <= parseInt(this.data.M) && parseInt(this.data.M) <= 12) {
      console.log(this.data.M)
      this.setData({ Y: this.data.Y + 1 , I: 3 ,week: [{ index: 1, type: true, day1: '8/28', day2: '8/29', day3: '8/30', day4: '8/31', day5: '9/1', day6: '9/2', day7: '9/3' }, { index: 2, type: true, day1: '9/4', day2: '9/5', day3: '9/6', day4: '9/7', day5: '9/8', day6: '9/9', day7: '9/10' }, { index: 3, type: true, day1: '9/11', day2: '9/12', day3: '9/13', day4: '9/14', day5: '9/15', day6: '9/16', day7: '9/17' }, { index: 4, type: true, day1: '9/18', day2: '9/19', day3: '9/20', day4: '9/21', day5: '9/22', day6: '9/23', day7: '9/24' }, { index: 5, type: true, day1: '9/25', day2: '9/26', day3: '9/27', day4: '9/28', day5: '9/29', day6: '9/30', day7: '10/1' }, { index: 6, type: true, day1: '10/2', day2: '10/3', day3: '10/4', day4: '10/5', day5: '10/6', day6: '10/7', day7: '10/8' }, { index: 7, type: true, day1: '10/9', day2: '10/10', day3: '10/11', day4: '10/12', day5: '10/13', day6: '10/14', day7: '10/15' }, { index: 8, type: true, day1: '10/16', day2: '10/17', day3: '10/18', day4: '10/19', day5: '10/20', day6: '10/21', day7: '10/22' }, { index: 9, type: true, day1: '10/23', day2: '10/24', day3: '10/25', day4: '10/26', day5: '10/27', day6: '10/28', day7: '10/29' }, { index: 10, type: true, day1: '10/30', day2: '10/31', day3: '11/1', day4: '11/2', day5: '11/3', day6: '11/4', day7: '11/5' }, { index: 11, type: true, day1: '11/6', day2: '11/7', day3: '11/8', day4: '11/9', day5: '11/10', day6: '11/11', day7: '11/12' }, { index: 12, type: true, day1: '11/13', day2: '11/14', day3: '11/15', day4: '11/16', day5: '11/17', day6: '11/18', day7: '11/19' }, { index: 13, type: true, day1: '11/20', day2: '11/21', day3: '11/22', day4: '11/23', day5: '11/24', day6: '11/25', day7: '11/26' }, { index: 14, type: true, day1: '11/27', day2: '11/28', day3: '11/29', day4: '11/30', day5: '12/1', day6: '12/2', day7: '12/3' }, { index: 15, type: true, day1: '12/4', day2: '12/5', day3: '12/6', day4: '12/7', day5: '12/8', day6: '12/9', day7: '12/10' }, { index: 16, type: true, day1: '12/11', day2: '12/12', day3: '12/13', day4: '12/14', day5: '12/15', day6: '12/16', day7: '12/17' }, { index: 17, type: true, day1: '12/18', day2: '12/19', day3: '12/20', day4: '12/21', day5: '12/22', day6: '12/23', day7: '12/24' }, { index: 18, type: true, day1: '12/25', day2: '12/26', day3: '12/27', day4: '12/28', day5: '12/29', day6: '12/30', day7: '12/31' }, { index: 19, type: true, day1: '1/1', day2: '1/2', day3: '1/3', day4: '1/4', day5: '1/5', day6: '1/6', day7: '1/7' }]})
    }
    if (1 <= parseInt(this.data.M) && parseInt(this.data.M) < 2) {
      console.log(this.data.M)
      this.setData({ I: 3 ,week: [{ index: 1, type: true, day1: '8/28', day2: '8/29', day3: '8/30', day4: '8/31', day5: '9/1', day6: '9/2', day7: '9/3' }, { index: 2, type: true, day1: '9/4', day2: '9/5', day3: '9/6', day4: '9/7', day5: '9/8', day6: '9/9', day7: '9/10' }, { index: 3, type: true, day1: '9/11', day2: '9/12', day3: '9/13', day4: '9/14', day5: '9/15', day6: '9/16', day7: '9/17' }, { index: 4, type: true, day1: '9/18', day2: '9/19', day3: '9/20', day4: '9/21', day5: '9/22', day6: '9/23', day7: '9/24' }, { index: 5, type: true, day1: '9/25', day2: '9/26', day3: '9/27', day4: '9/28', day5: '9/29', day6: '9/30', day7: '10/1' }, { index: 6, type: true, day1: '10/2', day2: '10/3', day3: '10/4', day4: '10/5', day5: '10/6', day6: '10/7', day7: '10/8' }, { index: 7, type: true, day1: '10/9', day2: '10/10', day3: '10/11', day4: '10/12', day5: '10/13', day6: '10/14', day7: '10/15' }, { index: 8, type: true, day1: '10/16', day2: '10/17', day3: '10/18', day4: '10/19', day5: '10/20', day6: '10/21', day7: '10/22' }, { index: 9, type: true, day1: '10/23', day2: '10/24', day3: '10/25', day4: '10/26', day5: '10/27', day6: '10/28', day7: '10/29' }, { index: 10, type: true, day1: '10/30', day2: '10/31', day3: '11/1', day4: '11/2', day5: '11/3', day6: '11/4', day7: '11/5' }, { index: 11, type: true, day1: '11/6', day2: '11/7', day3: '11/8', day4: '11/9', day5: '11/10', day6: '11/11', day7: '11/12' }, { index: 12, type: true, day1: '11/13', day2: '11/14', day3: '11/15', day4: '11/16', day5: '11/17', day6: '11/18', day7: '11/19' }, { index: 13, type: true, day1: '11/20', day2: '11/21', day3: '11/22', day4: '11/23', day5: '11/24', day6: '11/25', day7: '11/26' }, { index: 14, type: true, day1: '11/27', day2: '11/28', day3: '11/29', day4: '11/30', day5: '12/1', day6: '12/2', day7: '12/3' }, { index: 15, type: true, day1: '12/4', day2: '12/5', day3: '12/6', day4: '12/7', day5: '12/8', day6: '12/9', day7: '12/10' }, { index: 16, type: true, day1: '12/11', day2: '12/12', day3: '12/13', day4: '12/14', day5: '12/15', day6: '12/16', day7: '12/17' }, { index: 17, type: true, day1: '12/18', day2: '12/19', day3: '12/20', day4: '12/21', day5: '12/22', day6: '12/23', day7: '12/24' }, { index: 18, type: true, day1: '12/25', day2: '12/26', day3: '12/27', day4: '12/28', day5: '12/29', day6: '12/30', day7: '12/31' }, { index: 19, type: true, day1: '1/1', day2: '1/2', day3: '1/3', day4: '1/4', day5: '1/5', day6: '1/6', day7: '1/7' }]})
    }
    if (2 <= parseInt(this.data.M) && parseInt(this.data.M) < 8) {
      console.log(this.data.M)
      this.setData({ I: 12 ,week: [{ index: 1, type: true, day1: '2/19', day2: '2/20', day3: '2/21', day4: '2/22', day5: '2/23', day6: '2/24', day7: '2/25' }, { index: 2, type: true, day1: '2/26', day2: '2/27', day3: '2/28', day4: '3/1', day5: '3/2', day6: '3/3', day7: '3/4' }, { index: 3, type: true, day1: '3/5', day2: '3/6', day3: '3/7', day4: '3/8', day5: '3/9', day6: '3/10', day7: '3/11' }, { index: 4, type: true, day1: '3/12', day2: '3/13', day3: '3/14', day4: '3/15', day5: '3/16', day6: '3/17', day7: '3/18' }, { index: 5, type: true, day1: '3/19', day2: '3/20', day3: '3/21', day4: '3/22', day5: '3/23', day6: '3/24', day7: '3/25' }, { index: 6, type: true, day1: '3/26', day2: '3/27', day3: '3/28', day4: '3/29', day5: '3/30', day6: '3/31', day7: '4/1' }, { index: 7, type: true, day1: '4/2', day2: '4/3', day3: '4/4', day4: '4/5', day5: '4/6', day6: '4/7', day7: '4/8' }, { index: 8, type: true, day1: '4/9', day2: '4/10', day3: '4/11', day4: '4/12', day5: '4/13', day6: '4/14', day7: '4/15' }, { index: 9, type: true, day1: '4/16', day2: '4/17', day3: '4/18', day4: '4/19', day5: '4/20', day6: '4/21', day7: '4/22' }, { index: 10, type: true, day1: '4/23', day2: '4/24', day3: '4/25', day4: '4/26', day5: '4/27', day6: '4/28', day7: '4/29' }, { index: 11, type: true, day1: '4/30', day2: '5/1', day3: '5/2', day4: '5/3', day5: '5/4', day6: '5/5', day7: '5/6' }, { index: 12, type: true, day1: '5/7', day2: '5/8', day3: '5/9', day4: '5/10', day5: '5/11', day6: '5/12', day7: '5/13' }, { index: 13, type: true, day1: '5/14', day2: '5/15', day3: '5/16', day4: '5/17', day5: '5/18', day6: '5/19', day7: '5/20' }, { index: 14, type: true, day1: '5/21', day2: '5/22', day3: '5/23', day4: '5/24', day5: '5/25', day6: '5/26', day7: '5/27' }, { index: 15, type: true, day1: '5/28', day2: '5/29', day3: '5/30', day4: '5/31', day5: '6/1', day6: '6/2', day7: '6/3' }, { index: 16, type: true, day1: '6/4', day2: '6/5', day3: '6/6', day4: '6/7', day5: '6/8', day6: '6/9', day7: '6/10' }, { index: 17, type: true, day1: '6/11', day2: '6/12', day3: '6/13', day4: '6/14', day5: '6/15', day6: '6/16', day7: '6/17' }, { index: 18, type: true, day1: '6/18', day2: '6/19', day3: '6/20', day4: '6/21', day5: '6/22', day6: '6/23', day7: '6/24' }, { index: 19, type: true, day1: '6/25', day2: '6/26', day3: '6/27', day4: '6/28', day5: '6/29', day6: '6/30', day7: '7/1' }]})
    }
    console.log(this.data.M + '/' + this.data.D)
    if (this.data.Y as unknown as number - wx.getStorageSync('key1').slice(0, 4) == 4 && 8 <= parseInt(this.data.M) && parseInt(this.data.M) <= 12) { this.setData({ semester: "大四上" }) }
      if (this.data.Y as unknown as number - wx.getStorageSync('key1').slice(0, 4) == 4 && 1 <= parseInt(this.data.M) && parseInt(this.data.M) < 2) { this.setData({ semester: "大四上" }) }
      if (this.data.Y as unknown as number - wx.getStorageSync('key1').slice(0, 4) == 4 && 2 <= parseInt(this.data.M) && parseInt(this.data.M) < 8) { this.setData({ semester: "大四下" }) }
      if (this.data.Y as unknown as number - wx.getStorageSync('key1').slice(0, 4) == 3 && 8 <= parseInt(this.data.M) && parseInt(this.data.M) <= 12) { this.setData({ semester: "大三上" }) }
      if (this.data.Y as unknown as number - wx.getStorageSync('key1').slice(0, 4) == 3 && 1 <= parseInt(this.data.M) && parseInt(this.data.M) < 2) { this.setData({ semester: "大三上" }) }
      if (this.data.Y as unknown as number - wx.getStorageSync('key1').slice(0, 4) == 3 && 2 <= parseInt(this.data.M) && parseInt(this.data.M) < 8) { this.setData({ semester: "大三下" }) }
      if (this.data.Y as unknown as number - wx.getStorageSync('key1').slice(0, 4) == 2 && 8 <= parseInt(this.data.M) && parseInt(this.data.M) <= 12) { this.setData({ semester: "大二上" }) }
      if (this.data.Y as unknown as number - wx.getStorageSync('key1').slice(0, 4) == 2 && 1 <= parseInt(this.data.M) && parseInt(this.data.M) < 2) { this.setData({ semester: "大二上" }) }
      if (this.data.Y as unknown as number - wx.getStorageSync('key1').slice(0, 4) == 2 && 2 <= parseInt(this.data.M) && parseInt(this.data.M) < 8) { this.setData({ semester: "大二下" }) }
      if (this.data.Y as unknown as number - wx.getStorageSync('key1').slice(0, 4) == 1 && 8 <= parseInt(this.data.M) && parseInt(this.data.M) <= 12) { this.setData({ semester: "大一上" }) }
      if (this.data.Y as unknown as number - wx.getStorageSync('key1').slice(0, 4) == 1 && 1 <= parseInt(this.data.M) && parseInt(this.data.M) < 2) { this.setData({ semester: "大一上" }) }
      if (this.data.Y as unknown as number - wx.getStorageSync('key1').slice(0, 4) == 1 && 2 <= parseInt(this.data.M) && parseInt(this.data.M) < 8) { this.setData({ semester: "大一下" }) }
      this.setData({Y:(parseInt(this.data.Y)-1)as unknown as string})
    this.initPageData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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