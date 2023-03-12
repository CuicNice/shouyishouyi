
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classTitle:'',//标题部分的班级
    index: 0,
    gradeId: 0,
    gradeArray: [],
    grade: '',
    academy: '',
    academyArray: [],
    academyId: 0,
    Class: '',
    ClassArray: [],
    ClassId: 0,
    semesters: '',
    semesterArray: [],
    semesterId: 0,
    electricChargedetail: false,
    all: [],//存入的选择过的班级专业的缓存,
    allOne: '',//存入的单个缓存的数据
    weekSchedule: true,
    weekNum: 19,
    nowWeek: 1,
    dialogTip: false,
    dark: true,
    buliding: 'zhonglou',
    semester: '大一上',
    showAll: true,
    nowDate: '',
    ifshow: false,
    schoolPlace: "武昌",
    startDate: "2023/2/19",
    suorec: '',
    colorcardLight: ['#A9E6FF', '#FFDDDC', '#F5DFFA', '#D4EFFF', '#F9EABA', '#FFD698', '#F0FFC4', '#FEFCC9', '#DFFFD4', '#FFD8D2', '#FFFFF0', '#CCFFED', '#BFC1FF', '#FFC8E6', '#E9EDF1', '#EFDCC9'],
    colorcardDark: ['#6290E9', '#B791DC', '#ABA6E9', '#E39ACA', '#F091A2', '#FF9470', '#FDB165', '#F3D257', '#5DD39E', '#B2DB7C', '#68D8D6', '#A9B7BD', '#59ADDF', '#7895BC', '#75AEAE', '#EFDCC9'],
    colorcardZi: ['#4794B6', '#D67979', '#BF74CE', '#559AC2', '#BD9825', '#B97B1E', '#689658', '#9C982F', '#60A049', '#C76D5F', '#8585A5', '#5EAA91', '#6568C9', '#C8619A', '#8585B1', '#B8906F'],
    M: '',
    Y: '',
    D: '',
    I: 3,
    bgc: '',
    time: [] as any,
    timeWu: [{ time1: '8:30', time2: '9:15' }, { time1: '9:20', time2: '10:05' }, { time1: '10:25', time2: '11:10' }, { time1: '11:15', time2: '12:00' }, { time1: '14:00', time2: '14:45' }, { time1: '14:50', time2: '15:35' }, { time1: '15:50', time2: '16:35' }, { time1: '16:40', time2: '17:25' }, { time1: '18:30', time2: '19:15' }, { time1: '19:20', time2: '20:05' }, { time1: '20:15', time2: '21:00' }, { time1: '21:05', time2: '21:50' }],/* 武昌校区时间 */
    timeJia: [{ time1: '8:30', time2: '9:15' }, { time1: '9:20', time2: '10:05' }, { time1: '10:25', time2: '11:10' }, { time1: '11:15', time2: '12:00' }, { time1: '13:30', time2: '14:15' }, { time1: '14:20', time2: '15:05' }, { time1: '15:10', time2: '15:55' }, { time1: '16:00', time2: '16:45' }, { time1: '18:00', time2: '18:45' }, { time1: '18:45', time2: '19:30' }, { time1: '19:30', time2: '20:15' }, { time1: '20:15', time2: '21:00' }],/* 嘉鱼校区时间 */
    Semesterswitchingdetail: false,
    semesterList: ['大一上学期', '大一下学期', '大二上学期', '大二下学期', '大三上学期', '大三下学期', '大四上学期', '大四下学期'],
    classSchedule: { all_keshes: [], week: [] } as any,
    nowWeekData: [] as any
  },
  /**
   * 根据数据，查询课表,暂时没有接口，先用着
   */
  getAllSchdul(){  
    wx.request({
      url: 'https://syj.kkya.xyz/shouyijia/api/v2/user/getAllTable',
      method: 'POST',
      data: {
        zh: wx.getStorageSync('login').zh,
        mm: wx.getStorageSync('login').mm,
        xy_id: '0' + xy_id,
        nj: '2017',
      },
      success: ((res) => {

      })
  })
},
  /**
    * 根据学院id获取全部班级,暂时用这个，因为没有缓存
    */
  getClassInfo() {
    var xy_id = this.data.academyId - 0 + 1;
    console.log(xy_id);
    wx.request({
      url: 'https://syj.kkya.xyz/shouyijia/api/v2/user/getClassList',
      method: 'POST',
      data: {
        zh: wx.getStorageSync('login').zh,
        mm: wx.getStorageSync('login').mm,
        xy_id: '0' + xy_id,
        nj: '2017',
      },
      success: ((res) => {
        var ClassArray = this.data.ClassArray as any;
        for (var i = 0; i <= res.data.data.length; i++) {
          ClassArray[i] = res.data.data[i]['bj'];
          this.setData({
            ClassArray: ClassArray
          })
        }
      })
    })
  },
  /**
   * 选择年级
   */
  bindGrade(e: any) {
    /**
     * 如果二次填入的东西与之前的不同，则清除下面的数据
     */
    var academy = this.data.academy;
    var Class = this.data.Class;
    var semesters = this.data.semesters;
    if (this.data.grade !== this.data.gradeArray[e.detail.value]) {
      academy = '';
      Class = '';
      semesters = '';
    }
    this.setData({
      academy: academy,
      Class: Class,
      semesters: semesters,
      gradeId: e.detail.value,
      grade: this.data.gradeArray[e.detail.value]
    })
  },
  /**
    * 选择学院
    */
  bindAcademy(e: any) {
    /**
     * 如果二次填入的东西与之前的不同，则清除下面的数据
     */
    var Class = this.data.Class;
    var semesters = this.data.semesters;
    if (this.data.academy !== this.data.academyArray[e.detail.value]) {
      Class = '';
      semesters = '';
    }
    var that = this;
    if (this.data.gradeId !== 0) {
      this.setData({
        Class: Class,
        semesters: semesters,
        academyId: e.detail.value,
        academy: that.data.academyArray[e.detail.value],
      })
      this.getClassInfo();
    }
    else {
      that.selectComponent("#toast").showToastAuto("请先选择年级", "", 0.5);
    }
  },
  /**
   * 选择班级
   */
  bindClass(e: any) {
    /**
     * 如果二次填入的东西与之前的不同，则清除下面的数据
     */
    var semesters = this.data.semesters;
    if (this.data.Class !== this.data.ClassArray[e.detail.value]) {
      semesters = '';
    }
    var semesterArray = this.data.semesterList as any;
    var that = this;
    var Class = this.data.Class;
    var ClassId = this.data.ClassId;
    if (this.data.gradeId !== 0 && this.data.academyId !== 0) {
      var that = this;
      ClassId = e.detail.value;
      Class = that.data.ClassArray[e.detail.value];
    }
    else {
      if (this.data.gradeId == 0) {
        that.selectComponent("#toast").showToastAuto("请先选择年级", "", 0.5);
      }
      if (this.data.gradeId !== 0 && this.data.academyId == 0)
        that.selectComponent("#toast").showToastAuto("请先选择学院", "", 0.5);
    }
    /**
     * 进行本科，专升本，专科的判断
     */
    for (var i = 0; i < Class.length; i++) {
      if (Class[i] == 'z' && Class[i + 1] == 's' && Class[i + 2] == 'b') {
        semesterArray = ['大三上','大三下','大四上','大四下'];
        console.log(1)
        break;
      }
      else if (Class[i] == '专') {
        semesterArray = ['大一上', '大一下', '大二下', '大二下', '大三上', '大三下'];
        console.log(2)
        break;
      }
    }
    this.setData({
      Class: Class,
      ClassId: ClassId,
      semesterArray: semesterArray,
      semesters: semesters,
    })
  },
  /**
   * 选择学期
   */
  bindSemester(e: any) {
    var that = this;
    if (this.data.gradeId !== 0 && this.data.academyId !== 0 && this.data.ClassId !== 0) {
      console.log(e)
      var that = this;
      this.setData({
        semesterId: e.detail.value,
        semesters: that.data.semesterArray[e.detail.value]
      })
    }
    else {
      if (this.data.gradeId == 0) {
        that.selectComponent("#toast").showToastAuto("请先选择年级", "", 0.5);
      }
      if (this.data.gradeId !== 0 && this.data.academyId == 0)
        that.selectComponent("#toast").showToastAuto("请先选择学院", "", 0.5);
      if (this.data.gradeId !== 0 && this.data.academyId !== 0 && this.data.ClassId == 0) {
        that.selectComponent("#toast").showToastAuto("请先选择班级", "", 0.5);
      }
    }
  },
  /**
   * 对年级学院班级学期的数据处理
   */
  changeInfo() {
    var gradeArray = this.data.gradeArray as any;
    var Y = this.data.Y as any;
    gradeArray = ['', Y - 3, Y - 4, Y - 5, Y - 2, Y - 1, Y, Y + 1, Y + 2, Y + 3, Y + 4, Y + 5];
    var academyArray = this.data.academyArray as any;
    academyArray = [
      '信息科学与工程学院',
      '机电与自动化学院',
      '城市建设学院',
      '外国语学院',
      '经济管理学院',
      '新闻与文法学院',
      '艺术设计学院'
    ]
    this.setData({
      gradeArray: gradeArray,
      academyArray: academyArray,
    })
  },
  /**
   * 点击底部的缓存的专业班级，查询课表
   */
  getCache(e: any) {
    console.log(e)
    var index = e.currentTarget.dataset.index;
    this.setData({
      allOne: wx.getStorageSync('widgets-allSchedul')[index],
      electricChargedetail:false,
      index: index,
    })
  },
  /**
   * 点击‘获取课表’弹出选择弹窗
   */
  getClassDule() {
    this.setData({
      electricChargedetail: true,
      Class:'',
      academy:'',
      semesters:'',
      grade:'',
    })
  },
  /**
   * 取消绑定
   */
  cancelBind() {
    this.setData({
      electricChargedetail: false,
    })
  },
  /**
   * 点击确认,并存入缓存
   */
  bind() {
    var electricChargedetail = this.data.electricChargedetail;
    var grade = this.data.grade;
    var Class = this.data.Class;
    var academy = this.data.academy;
    var semesters = this.data.semesters;
    if (wx.getStorageSync('widgets-allSchedul')) {
      var all = wx.getStorageSync('widgets-allSchedul') as any;
    } else if(this.data.gradeId !== 0 && this.data.academyId !== 0 && this.data.ClassId !== 0 && this.data.semesterId !== 0) {
      var all = ['', '', ''] as any;
    }
    var allSchedul = {
      grade: grade,
      Class: Class,
      academy: academy,
      semesters: semesters,
    }
    for (var i = 0; i < 3; i++) {
      /**
       * 当第一次输入信息的时候，长度为三，因为最长也只能为3个
       */
      if (all[0] == '') {
        all[0] = allSchedul
        break;
      }
      if (all[1] == '' && all[0] !== ''&&all[0].Class!==all[1].Class) {
        all[1] = all[0];
        all[0] = allSchedul;
        break;
      }
      if (all[2] == '' && all[0] !== '' && all[1] !== ''&&all[1].Class!==all[2].Class!==all[0].Class) {
        all[2] = all[1];
        all[1] = all[0];
        all[0] = allSchedul;
        break;
      }
      /**
       * 满了之后再次输入，将依次替换
       */
      if (all[0] !== '' && all[1] !== '' && all[2] !== '') {
        all[2] = all[1];
        all[1] = all[0];
        if (Class !== all[i].Class && i !== 0) {
          all[0] = allSchedul;
          break;
        }
      }
    }
    if (this.data.gradeId !== 0 && this.data.academyId !== 0 && this.data.ClassId !== 0 && this.data.semesterId !== 0) {
      wx.setStorageSync('widgets-allSchedul', all)
      electricChargedetail = false;
      all = all;
    }
    else {
      this.selectComponent("#toast").showToastAuto("请完善绑定条件", "", 0.5);
    }
    this.setData({
      classTitle:wx.getStorageSync('widgets-allSchedul')[0].Class,
      electricChargedetail: electricChargedetail,
      all: all,
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.changeInfo();
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
  /* 
  *取消学期绑定
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
    if (this.data.suorec == '大一下学期' || this.data.suorec == '大二下学期' || this.data.suorec == '大三下学期' || this.data.suorec == '大四下学期') {
      schoolTerm = schoolTerm + 12;
      start = num + '/2/19';
    };
    if (this.data.suorec == '大一上学期' || this.data.suorec == '大二上学期' || this.data.suorec == '大三上学期' || this.data.suorec == '大四上学期') {
      schoolTerm = schoolTerm + 3;
      start = num + '/8/28';
    };
    if (this.data.suorec.slice(1, 2) == "一") {
      year = year + parseInt(wx.getStorageSync('login').zh.slice(0, 4));
      place = '嘉鱼';
      times = this.data.timeJia;
    };
    if (this.data.suorec.slice(1, 2) == "二") {
      year = year + parseInt(wx.getStorageSync('login').zh.slice(0, 4)) + 1;
      place = '武昌';
      times = this.data.timeWu;
    };
    if (this.data.suorec.slice(1, 2) == "三") {
      year = year + parseInt(wx.getStorageSync('login').zh.slice(0, 4)) + 2;
      place = '武昌';
      times = this.data.timeWu;
    };
    if (this.data.suorec.slice(1, 2) == "四") {
      year = year + parseInt(wx.getStorageSync('login').zh.slice(0, 4)) + 3;
      place = '武昌';
      times = this.data.timeWu;
    };
    this.setData({
      semester: this.data.suorec.slice(0, 3),
      Semesterswitchingdetail: false,
      Y: year as unknown as string,
      schoolPlace: place,
      time: times,
      I: schoolTerm,
      startDate: start
    });
    let myarr = wx.getStorageSync('widget-classSchedule');
    delete myarr.classSchedule
    wx.setStorageSync("widget-classSchedule", myarr);
    this.initClassData();
    setTimeout(function () {
      var value = wx.getStorageSync('widget-classSchedule');
      delete value.classSchedule
      wx.setStorageSync("widget-classSchedule", value);
    }, 4000);
  },

  /* 
  *跳转到课表设置界面
  */
  showSetting() {
    wx.navigateTo({ url: '/pages/widgets/classSchedule/classScheduleSeting/classScheduleSeting' });
  },

  /* 
  *重新刷新功能
  */
  refresh() {
    var value = wx.getStorageSync('widget-classSchedule');
    delete value.classSchedule
    wx.setStorageSync("widget-classSchedule", value);
    this.setData({ weekSchedule: true, nowWeek: 1 });
    try {
      this.initPageData();
      setTimeout(() => {
        let nowWeekData = this.getNowWeekData(this.data.classSchedule, 1);
        this.setData({ nowWeekData: nowWeekData });
        let myarr = wx.getStorageSync('widget-classSchedule');
        delete myarr.classSchedule;
        wx.setStorageSync('widget-classSchedule', myarr);
      }, 4000);
    }
    catch (error) {
      this.setData({ dialogTip: true });
    };
  },

  /**
   * 通过网络请求获得课表，并且缓存进本地
   * @param {年份} year 
   * @param {*} num 
   */
  async getTableDataFromApi(year: number, num: number) {
    var that = this;
    let vaule = {
      "zh": wx.getStorageSync('login').zh,
      "mm": wx.getStorageSync('login').mm,
      "year": year,
      "num": num
    };
    const { data: res } = await getClassSchedule(vaule) as unknown as IResult<any>;
    if (res) {
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
        nowWeekData: nowWeekData
      }, function () {
        utils.mySetStorage('widget-classSchedule', 'classSchedule', classSchedule)
      })
    }
  },
  /* 
  *刷新本周的日期
  */
  reGetDay(time: string | number | Date) {
    let index = this.data.nowWeek
    let nowWeekData = this.getNowWeekData(this.data.classSchedule, index);
    let nowDate = new Date(time); //获取指定日期当周的一周日期
    let date = new Date(nowDate.getTime() + 24 * 60 * 60 * 1000 * (index - this.data.nowWeek) * 7);
    this.getWeekTime(date);
    this.setData({
      nowWeekData: nowWeekData
    })
  },
  /* 
  *关闭弹窗
  */
  closeDialogTip() {
    this.setData({
      dialogTip: false
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
   */
  getDayNum(all_table: { day_num: string }) {
    var day_num = all_table.day_num.split(",");
    var list = [];
    for (var j = 0; j < day_num.length; j++) {
      var double_index = day_num[j].search('双');
      var day_num_item = day_num[j].match(/\d+(\.\d+)?/g)!;
      if (day_num_item.length == 2) {
        for (var k = parseInt(day_num_item[0]); k <= parseInt(day_num_item[1]); k++) {
          if (double_index != -1) {
            if (k % 2 == 0) list.push(k);
          } else list.push(k);
        }
      } else {
        list.push(parseInt(day_num_item[0]));
      };
    }
    return list;
  },

  /* 
  *查重
  */
  objHeavy: function (arr: any) { //筛选一共有几门课
    let arr1 = []; //存名字
    let newArr = []; //存新数组
    for (let i in arr) {
      if (arr1.indexOf(arr[i].name) == -1) {
        arr1.push(arr[i].name);
        newArr.push(arr[i]);
      };
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
    var that = this;
    if (!this.getTableDataFromLocal()) {
      that.selectComponent("#toast").showToast("课表刷新中", "lodding");
      await this.getTableDataFromApi(parseInt(this.data.Y), this.data.I) as any;
    }
    that.selectComponent("#toast").showToastAuto("刷新成功", "success");
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
      var das = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)) as any;
      das = (das.getFullYear() + "/" + (das.getMonth() + 1) + "/" + das.getDate()) as unknown as Date;
      das = das.replace(/[年月]/g, '.').replace(/[日上下午]/g, '').slice(5, das.length);
      dates.push(das);
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
   * 初始化页面数据
   */
  initPageData() {
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
            (cls.day == item.day) && (list.findIndex((v) => { return v.name == item.name }) == -1)
          ) {
            list.push(item);
          };
        };
      };
    };
    this.setData({
      ifshow: true,
      detailClass: list
    });
  },

  /* 
  *切换周与日课表
  */
  changeicon() {
    this.setData({
      weekSchedule: !this.data.weekSchedule
    });
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (!wx.getStorageSync('widget-classSchedule')) {
      //给用户添加缓存
      let value = { classSchedule: '', ifshowAllclass: true, background: '', buliding: 'zhonglou', dark: true, picture: '', place: '' };
      wx.setStorageSync('widget-classSchedule', value);
    }
    /* utils.mySetStorage('widget-classSchedule','background','#333333') */
    //获取当前年月
    var timestamp = Date.parse(new Date() as unknown as string);
    var date = new Date(timestamp);
    this.setData({
      //获取年份
      Y: date.getFullYear() as unknown as string,
      //获取月份
      M: (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1) as unknown as string,
      //获取当日日期
      D: date.getDate() < 10 ? (date.getDate()) as unknown as string : date.getDate() as unknown as string,
    });
    //获取当前周数的预处理定义变量进行储存数据
    var time = this.data.Y + '/' + this.data.M + '/' + this.data.D;
    var start_date = new Date(this.data.startDate.replace(/-/g, "/"));
    var end_date = new Date(time.replace(/-/g, "/"));
    var days = end_date.getTime() - start_date.getTime();
    var day = (days / (1000 * 60 * 60 * 24)) as unknown as number;
    //进行当前学期的判断
    var schoolTerm;//储存学期的变量
    var year = 0;//储存年份的变量
    var start;//开始上课的时间
    var schoolTime;//学期名
    var times = {};//校区的上课时间
    var place;//校区
    if (8 <= parseInt(this.data.M) && parseInt(this.data.M) <= 12) {
      year = year + parseInt(this.data.Y) + 1;
      schoolTerm = 3;
    };
    if (1 <= parseInt(this.data.M) && parseInt(this.data.M) < 2) {
      year = year + parseInt(this.data.Y);
      schoolTerm = 3;
    };
    if (2 <= parseInt(this.data.M) && parseInt(this.data.M) < 8) {
      year = year + parseInt(this.data.Y);
      schoolTerm = 12;
    };
    this.setData({ I: schoolTerm, Y: year as unknown as string })
    try {
      if ((this.data.Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 4 && 8 <= parseInt(this.data.M) && parseInt(this.data.M) <= 12) || (this.data.Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 4 && 1 <= parseInt(this.data.M) && parseInt(this.data.M) < 2)) {
        start = this.data.Y + "/8/28";
        schoolTime = '大四上';
        times = this.data.timeWu;
        place = "武昌";
      };
      if (this.data.Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 4 && 2 <= parseInt(this.data.M) && parseInt(this.data.M) < 8) {
        start = this.data.Y + "/2/19";
        schoolTime = '大四下';
        times = this.data.timeWu;
        place = "武昌";
      };
      if ((this.data.Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 3 && 8 <= parseInt(this.data.M) && parseInt(this.data.M) <= 12) || (this.data.Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 3 && 1 <= parseInt(this.data.M) && parseInt(this.data.M) < 2)) {
        start = this.data.Y + "/8/28";
        schoolTime = '大三上';
        times = this.data.timeWu;
        place = "武昌";
      };
      if (this.data.Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 3 && 2 <= parseInt(this.data.M) && parseInt(this.data.M) < 8) {
        start = this.data.Y + "/2/19";
        schoolTime = '大三下';
        times = this.data.timeWu;
        place = "武昌";
      };
      if ((this.data.Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 2 && 8 <= parseInt(this.data.M) && parseInt(this.data.M) <= 12) || (this.data.Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 2 && 1 <= parseInt(this.data.M) && parseInt(this.data.M) < 2)) {
        start = this.data.Y + "/8/28";
        schoolTime = '大二上';
        times = this.data.timeWu;
        place = "武昌";
      };
      if (this.data.Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 2 && 2 <= parseInt(this.data.M) && parseInt(this.data.M) < 8) {
        start = this.data.Y + "/2/19";
        schoolTime = '大二下';
        times = this.data.timeWu;
        place = "武昌";
      };
      if ((this.data.Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 1 && 8 <= parseInt(this.data.M) && parseInt(this.data.M) <= 12) || (this.data.Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 1 && 1 <= parseInt(this.data.M) && parseInt(this.data.M) < 2)) {
        start = this.data.Y + "/8/28";
        schoolTime = '大一上';
        times = this.data.timeJia;
        place = "嘉鱼";
      };
      if (this.data.Y as unknown as number - wx.getStorageSync('login').zh.slice(0, 4) == 1 && 2 <= parseInt(this.data.M) && parseInt(this.data.M) < 8) {
        start = this.data.Y + "/2/19";
        schoolTime = '大一下';
        times = this.data.timeJia;
        place = "嘉鱼";
      };
      this.setData({ Y: (parseInt(this.data.Y) - 1) as unknown as string, nowWeek: parseInt((day / 7 + 1) as unknown as string), semester: schoolTime, schoolPlace: place, time: times, startDate: start });
    } catch { };
    this.initPageData();//初始化页面数据
    //通过定义的变量进行周的自动判断
    if (wx.getStorageSync('widget-classSchedule').classSchedule) {
      this.reGetDay(time)
    } else {
      setTimeout(() => {
        this.reGetDay(time)
      }, 4000);
    };//倒计时避免没有课表缓存造成当周课表无法显示
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var all = wx.getStorageSync('widgets-allSchedul');
    let schoolPlace;
    let time;
    if (wx.getStorageSync('widget-classSchedule').place == '') {
      try {
        if (this.data.semester.slice(1, 2) == "一") {
          schoolPlace = "嘉鱼";
          time = this.data.timeJia;
        };
        if (this.data.semester.slice(1, 2) == "二") {
          schoolPlace = "武昌";
          time = this.data.timeWu;
        };
        if (this.data.semester.slice(1, 2) == "三") {
          schoolPlace = "武昌";
          time = this.data.timeWu;
        };
        if (this.data.semester.slice(1, 2) == "四") {
          schoolPlace = "武昌";
          time = this.data.timeWu;
        };
      } catch { }
    } else {
      if (wx.getStorageSync('widget-classSchedule').place == "嘉鱼") {
        time = this.data.timeJia;
        schoolPlace = "嘉鱼";
      };
      if (wx.getStorageSync('widget-classSchedule').place == "武昌") {
        time = this.data.timeWu;
        schoolPlace = "武昌";
      };
    };
    this.setData({
      schoolPlace: schoolPlace,
      time: time,
      all: all,
      Class: all[0].Class,
      classTitle:wx.getStorageSync('widgets-allSchedul')[0].Class
    });
  },
})