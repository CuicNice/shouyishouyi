
import { getAllClasses, getAllSchedule } from '../../../../api/allSchedule';
export interface AllScheduleItem {
  zh: string,
  mm: string,
  xy_id: string,
  nj: string,
}
export interface AllScheduleItem {
  zh: string,
  mm: string,
  xnm: string,
  xqm: string,
  njdm_id: string,
  jg_id: string,
  bh_id: string,
  bh_name: string,
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShowToast:true,//控制查询的弹窗能够在跳出暂无课表的时候隐藏
    schoolTime: '',//点击学期选项时的默认变量
    xnm: 0,//学年
    xqm: 0,//学期
    njdm_id: '',//年级
    jg_id: '',//学院id
    bh_id: '',//班级id
    allClass: [],//储存着通过学院id和年级请求到的数据
    classTitle: '',//标题部分的班级
    gradeTitle: '',//显示出来的年级
    semesterTitle: '',//显示出来的学期
    academyTitle: '',//显示出来的学院
    classTitle_2: '',//显示出来的班级
    shownj: false,
    showxy: false,
    showbj: false,
    showxq: false,
    //年级的数组
    gradeId: [5],
    gradeArray: [],
    grade: '',
    //学院的数组
    academy: '',
    academyArray: [],
    academyId: 0,
    //班级的数组
    Class: '',
    ClassArray: [],
    ClassId: 0,
    //学期的数组
    semesters: '',
    semesterId: [0],
    semesterArray:  ['大一上学期', '大一下学期', '大二上学期', '大二下学期', '大三上学期', '大三下学期', '大四上学期', '大四下学期'],
    Chargedetail: false,
    all: [],//存入的选择过的班级专业的缓存,
    allOne: '',//存入的单个缓存的数据
    dayTime: [] as any,
    currentTab: 0,  // 当前Tab位置
    weekSchedule: true,
    beginWeek:0,
    weekNum: 19,//最大的周数
    nowWeek: 1,
    againWeek: 0,//对当前周进行第二次拷贝
    beginSemester: '',//对当前学期进行拷贝
    toView: '',//周的自动锁定
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
    M: '',
    Y: '',
    D: '',
    I: 3,
    bgc: '',
    time: [] as any,
    timeWu: [{ time1: '08:30', time2: '09:15' }, { time1: '09:20', time2: '10:05' }, { time1: '10:25', time2: '11:10' }, { time1: '11:15', time2: '12:00' }, { time1: '14:00', time2: '14:45' }, { time1: '14:50', time2: '15:35' }, { time1: '15:50', time2: '16:35' }, { time1: '16:40', time2: '17:25' }, { time1: '18:30', time2: '19:15' }, { time1: '19:20', time2: '20:05' }, { time1: '20:15', time2: '21:00' }, { time1: '21:05', time2: '21:50' }],/* 武昌校区时间 */
    timeJia: [{ time1: '08:30', time2: '09:15' }, { time1: '09:20', time2: '10:05' }, { time1: '10:25', time2: '11:10' }, { time1: '11:15', time2: '12:00' }, { time1: '13:30', time2: '14:15' }, { time1: '14:20', time2: '15:05' }, { time1: '15:10', time2: '15:55' }, { time1: '16:00', time2: '16:45' }, { time1: '18:00', time2: '18:45' }, { time1: '18:45', time2: '19:30' }, { time1: '19:30', time2: '20:15' }, { time1: '20:15', time2: '21:00' }],/* 嘉鱼校区时间 */
    weekTime: [] as any,
    Semesterswitchingdetail: false,
    semesterList: ['大一上学期', '大一下学期', '大二上学期', '大二下学期', '大三上学期', '大三下学期', '大四上学期', '大四下学期'],
    classSchedule: { all_keshes: [], week: [] } as any,
    nowWeekData: [] as any,
    allTimes: [] as any,
    classInfo: [] as any
  },
  /**
   * 绑定数据，获取全校课表
   */
  async getbindSchdul() {
    this.selectComponent("#toast_1").showToastAuto("查询中", "lodding",'5');
    var allClass = this.data.allClass as any;
    var Class = this.data.Class;
    /**
     * 判断用户选择了哪个班级，然后得到其他数据
     */
    for (var i = 0; i < allClass.length; i++) {
      if (Class == allClass[i].bj) {
        var bh_id = allClass[i].bh_id;
        var jg_id = allClass[i].jg_id;
      }
    }
    /**
     * 获取当前选择的学年学期，得到需要的number类型的学年学期数据
     */
    var grade = this.data.grade as any;
    var semesters = this.data.semesters;
    var time = this.data.timeJia;
    var schoolPlace = this.data.schoolPlace;
    var xnm = 0 as any;
    var xqm = 0;
    if (semesters == '大一上') {
      schoolPlace = '嘉鱼';
      time = this.data.timeJia;
      xnm = grade;
      xqm = 1;
    }
    if (semesters == '大一下') {
      schoolPlace = '嘉鱼';
      time = this.data.timeJia;
      xnm = grade;
      xqm = 2;
    }
    if (semesters == '大二上') {
      schoolPlace = '武昌';
      time = this.data.timeWu;
      xnm = grade - 0 + 1;
      xqm = 1;
    }
    if (semesters == '大二下') {
      schoolPlace = '武昌';
      time = this.data.timeWu;
      xnm = grade - 0 + 1;
      xqm = 2;
    }
    if (semesters == '大三上') {
      schoolPlace = '武昌';
      time = this.data.timeWu;
      xnm = grade - 0 + 2;
      xqm = 1;
    }
    if (semesters == '大三下') {
      schoolPlace = '武昌';
      time = this.data.timeWu;
      xnm = grade - 0 + 2;
      xqm = 2;
    }
    if (semesters == '大四上') {
      schoolPlace = '武昌';
      time = this.data.timeWu;
      xnm = grade - 0 + 3;
      xqm = 1;
    }
    if (semesters == '大四下') {
      schoolPlace = '武昌';
      time = this.data.timeWu;
      xnm = grade - 0 + 3;
      xqm = 2;
    }
    var bindSchdul = {
      zh: wx.getStorageSync('login').zh,
      mm: wx.getStorageSync('login').mm,
      xnm: String(xnm),
      xqm: String(xqm) == '1' ? '3' : '12',
      njdm_id: String(grade),
      jg_id: String(jg_id),
      bh_id: String(bh_id),
    } as AllScheduleItem
    this.getAllSchedule(bindSchdul);
    this.setData({
      schoolPlace: schoolPlace,
      time: time,
      xnm: xnm,
      xqm: xqm,
      njdm_id: grade,
      jg_id: jg_id,
      bh_id: bh_id,
    })
  },
  async getAllSchedule(from: AllScheduleItem) {
    const { data: res } = await getAllSchedule(from) as unknown as IResult<any>;
    var myArr = wx.getStorageSync('widget-allSchedule'); //myArr一个过渡变量
    var that = this;
    if (res.all_keshes.length !== 0 || res.all_tables.length !== 0) {
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
      week = this.check(week)//查看有课的周之间是否存在没课的周而且此周还没返回数据，需要自己加 
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
      })
      /**
       * 将课表存入缓存，方便下次重新进入时，还是上次课表
       */
      myArr.classSchedule = classSchedule;
      myArr.time = this.data.time;
      myArr.place = this.data.schoolPlace;
      this.selectComponent("#toast_1").showToastAuto("查询成功", "success",'1');
    }
    else {
      myArr.classSchedule = '';
      this.setData({
        classTitle: '',
        dialogTip: true,
      })
    }
     wx.setStorageSync('widget-allSchedule', myArr);
    // this.noInfo();//判断是否能请求到课表,代替了上面if的else
  },
  /**
   * 绑定账号，密码，学院id，年级，对其全部班级进行查询
   */
  async getbindInfo() {
    var xy_id = 1;//学院id默认为0
    /**
     * 点击确定时，id清空了，所以需要判断
     */
    for (var i = 0; i < this.data.academyArray.length; i++) {
      if (this.data.academy == this.data.academyArray[i]) {
        xy_id = i + 1;
        break;
      };
    }
    var grade = this.data.grade;
    var bind = {
      zh: wx.getStorageSync('login').zh,
      mm: wx.getStorageSync('login').mm,
      xy_id: '0' + xy_id,
      nj: String(grade),
    } as AllScheduleItem;
    this.getAllClasses(bind);
  },
  /**
   * 请求网络，获取当前条件下的全部班级
   * @param from 
   */
  async getAllClasses(from: AllScheduleItem) {
    const { data: info } = await getAllClasses(from) as unknown as IResult<any>;
    var ClassArray = this.data.ClassArray as unknown as any;
    if (info) {
      for (var i = 0; i < info.length; i++) {
        ClassArray[i] = info[i].bj;
      }
    } else {
      ClassArray = ['暂无信息']
      this.selectComponent("#toast_3").showToastAuto("网络错误", "error");
    }
    this.setData({
      ClassArray: ClassArray,
      allClass: info,
    });
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

  /**
   * 点击进入年级弹窗
   */
  shownj() {
    this.setData({
      shownj: true,
    })
  },
  /**
   * 点击进入学院弹窗
   */
  showxy() {
    if (this.data.grade == '') {
      this.selectComponent("#toast_2").showToastAuto("请先选择年级", "");
    }
    else {
      this.setData({
        showxy: true,
      })
    }
  },
  /**
   * 点击进入班级弹窗
   */
  showbj() {
    if (this.data.grade == '') {
      this.selectComponent("#toast_2").showToastAuto("请先选择年级", "",);
    }
    if (this.data.grade !== '' && this.data.academy == '') {
      this.selectComponent("#toast_2").showToastAuto("请先选择学院", "",);
    }
    else if (this.data.grade !== '' && this.data.academy !== '') {
      this.setData({
        showbj: true,
      })
    }
  },
  /**
   * 点击进入学期弹窗
   */
  showxq() {
    if (this.data.grade == '') {
      this.selectComponent("#toast_2").showToastAuto("请先选择年级", "",);
    }
    if (this.data.grade !== '' && this.data.academy == '')
      this.selectComponent("#toast_2").showToastAuto("请先选择学院", "",);
    if (this.data.grade !== '' && this.data.academy !== '' && this.data.Class == '') {
      this.selectComponent("#toast_2").showToastAuto("请先选择班级", "",);
    }
    else if (this.data.grade !== '' && this.data.academy !== '' && this.data.Class !== '') {
      this.setData({
        showxq: true,
      })
    }

  },

  /**
   * 点击返回上一页
   */
  getBack() {
    wx.navigateBack();
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
    var ClassArray = this.data.ClassArray;
    if (this.data.academy !== this.data.academyArray[e.detail.value]) {
      Class = '';
      semesters = '';
      ClassArray = [];
    }
    if (this.data.grade !== '') {
      this.setData({
        Class: Class,
        semesters: semesters,
        academyId: e.detail.value,
        ClassArray: ClassArray,
      })
    }
  },
  /**
   * 选择班级
   */
  bindClass(e: any) {
    var ClassId = e.detail.value;
    this.setData({
      ClassId: ClassId,
    })
  },
  /**
   * 选择学期
   */
  bindSemester(e: any) {
    var semesterId = [0] as any;
    if (this.data.grade !== '' && this.data.academy !== '' && this.data.Class !== '') {
      semesterId = e.detail.value;
    }
    this.setData({
      semesterId: semesterId,
    });
  },
  /**
   * 对年级学院的数据处理
   */
  changeInfo() {
    var gradeArray = this.data.gradeArray as any;
    var Y = this.data.Y as any;
    gradeArray = [Y - 5, Y - 4, Y - 3, Y - 2, Y - 1, Y,];
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
    var cache = wx.getStorageSync('widget-allSchedule').all //提取缓存信息
    var index = e.currentTarget.dataset.index;
    var semesterArray = cache[index].semesterArray;
    var schoolTime = cache[index].schoolTime;
    var ClassArray = [];
     /**
     * 默认学期判断
     */
    for (var a = 0 ; a < semesterArray.length; a++) {
      //专科
      if(semesterArray.length == 6){
        if(schoolTime.slice(0,2) !== '大四'){
          if (schoolTime == semesterArray[a].slice(0,3)) {
          break;
      }
        }else{
          break;
        }
      }
      //专升本
      if(semesterArray.length == 4){
        if(schoolTime.slice(0,2) !== '大一'||schoolTime.slice(0,2) !== '大二'){
          if (schoolTime == semesterArray[a].slice(0,3)) {
          break;
      }
        }else{
          break;
        }
      }
      //本
      if(semesterArray.length == 8){
          if (schoolTime == semesterArray[a].slice(0,3)) {
          break;
      }
      }
    }
    for(var i=0;i< cache[index].allClass.length;i++){
      ClassArray.push(cache[index].allClass[i].bj);
    }
    if (this.getTableDataFromLocal()) {
      this.setData({
        schoolTime:schoolTime,
        semesterId:[a],
        allClass:cache[index].allClass,
        semesterArray: cache[index].semesterArray,
        ClassArray: ClassArray as any,
        grade: cache[index].grade,
        gradeTitle: cache[index].grade,
        academy: cache[index].academy,
        academyTitle: cache[index].academy,
        Class: cache[index].Class,
        classTitle_2: cache[index].Class,
      })
    }
   var myarr =  wx.getStorageSync('widget-allSchedule');
   var t;
   t = myarr.all[0];
   myarr.all[0]=myarr.all[index];
   myarr.all[index] =t;
   wx.setStorageSync('widget-allSchedule',myarr);

  },
  /**
   * 点击‘选择课表’弹出选择弹窗
   */
  getClassDule() {
    /**
     * 如果用户未登录
     */
    if (wx.getStorageSync('login')) {
      this.setData({
        isShowToast:true,
        Chargedetail: true,
        Class: '',
        academy: '',
        semesters: '',
        grade: '',
      })
    } else {
      this.selectComponent("#toast_1").showToastAuto("用户未登录", "error");
    }

  },
  /**
   * 取消绑定
   */
  cancelBind() {
    /**
     * 如果用户选择完了，但是点取消
     */
    this.setData({
      classTitle: wx.getStorageSync('widget-allSchedule').classSchedule.length == 0 ? '' : wx.getStorageSync('widget-allSchedule').all[0].Class,
      Chargedetail: false,
      Class: '',
      academy: '',
      semesters: '',
      grade: '',
    })
  },
  /**
   * 点击确认,并存入缓存
   */
  bind_all() {
    var grade = this.data.grade;
    var Class = this.data.Class;
    var academy = this.data.academy;
    var semesters = this.data.semesters;
    var gradeTitle = grade;
    var semesterTitle = Class;
    var academyTitle = academy;
    var classTitle_2 = Class;
    var Chargedetail = this.data.Chargedetail;

    /**
     * 是否存在查询记录缓存
     */
    if (wx.getStorageSync('widget-allSchedule').all.length !== 0) {
      var all = wx.getStorageSync('widget-allSchedule').all as any;
    } else if (Class && semesters && academy && grade && wx.getStorageSync('widget-allSchedule').all.length == 0) {
      var all = ['', '', ''] as any;
    }
    if (Class && semesters && academy && grade) {
      Chargedetail = false;
      /**
       * 存入请求课表需要的数据 学年；学院；班级；
       */
      var allSchedul = {
        semesterArray:this.data.semesterArray,//学期的数组
        allClass: this.data.allClass,//全部班级的数组
        grade: grade,
        academy: academy,
        Class: Class,
        schoolTime:this.data.schoolTime,
      }
      console.log(this.data.schoolTime)
      /**
       * 由于最多三个，简单去重，和替换
       */
      first: for (var i = 0; i < 3; i++) {
        /**
         * 个数少，简单去重
         */
        for (var a = 0; a < 3; a++) {
          if (all[a].Class == allSchedul.Class) {
            break first;
          }
        };
        /**
         * 当第一次输入信息的时候，长度为三，因为最长也只能为3个
         */
        if (all.length == 0) {
          all[0] = allSchedul
          break first;
        }
        /**
         * 如果输入的数据相同，则不二次存储
         */
        if (all.length == 1) {
          all[1] = all[0];
          all[0] = allSchedul;
          break first;
        }
        if (all.length == 2) {
          all[2] = all[1];
          all[1] = all[0];
          all[0] = allSchedul;
          break first;
        }
        /**
         * 满了之后再次输入，将依次替换
         */
        if (all.length >= 3) {
          console.log(all[2].Class, all[1].Class, all[0].Class)
          all[2] = all[1];
          all[1] = all[0];
          all[0] = allSchedul;
          console.log(all[2].Class, all[1].Class, all[0].Class)
          break first;
        }
      }
      this.getbindSchdul();
      var myarr = wx.getStorageSync('widget-allSchedule');
      myarr.all = all;
      wx.setStorageSync('widget-allSchedule', myarr);
      all = all;
      gradeTitle = '';
      semesterTitle = '';
      academyTitle = '';
      classTitle_2 = '';
    }
    else {
      this.selectComponent("#toast_2").showToastAuto("请完善绑定条件", "",);
    }
    this.setData({
      Chargedetail: Chargedetail,
      classTitle: Class ? Class : all[0].Class,
      gradeTitle: gradeTitle,
      semesterTitle: semesterTitle,
      academyTitle: academyTitle,
      classTitle_2:classTitle_2,
      all: all,
    })
  },
  /**
   * 年级的picker弹窗的确认
   */
  bind_grade() {
    var grade = this.data.gradeArray[this.data.gradeId as any] as unknown as number;
    var gradeTitle = grade;
    /** 
     * 进行当前学期的判断 
     */ 
    var schoolTime;//学期名   
    if ((this.data.Y as unknown as number - grade == 3 && 8 <= parseInt(this.data.M) && parseInt(this.data.M) <= 12) || (this.data.Y as unknown as number - grade == 3 && 1 <= parseInt(this.data.M) && parseInt(this.data.M) < 2)) { 
      console.log(1)
      schoolTime = '大四上'; 
    }; 
    if (this.data.Y as unknown as number - grade == 3 && 2 <= parseInt(this.data.M) && parseInt(this.data.M) < 8) { 
      schoolTime = '大四下'; 
    }; 
    if ((this.data.Y as unknown as number - grade == 2 && 8 <= parseInt(this.data.M) && parseInt(this.data.M) <= 12) || (this.data.Y as unknown as number - grade == 2 && 1 <= parseInt(this.data.M) && parseInt(this.data.M) < 2)) { 
      schoolTime = '大三上'; 
    }; 
    if (this.data.Y as unknown as number - grade == 2 && 2 <= parseInt(this.data.M) && parseInt(this.data.M) < 8) { 
      schoolTime = '大三下'; 
    }; 
    if ((this.data.Y as unknown as number - grade == 1 && 8 <= parseInt(this.data.M) && parseInt(this.data.M) <= 12) || (this.data.Y as unknown as number - grade == 2 && 1 <= parseInt(this.data.M) && parseInt(this.data.M) < 2)) { 
      schoolTime = '大二上'; 
    }; 
    if (this.data.Y as unknown as number - grade == 1 && 2 <= parseInt(this.data.M) && parseInt(this.data.M) < 8) { 
      schoolTime = '大二下'; 
    }; 
    if ((this.data.Y as unknown as number - grade == 0 && 8 <= parseInt(this.data.M) && parseInt(this.data.M) <= 12) || (this.data.Y as unknown as number - grade == 1 && 1 <= parseInt(this.data.M) && parseInt(this.data.M) < 2)) { 
      schoolTime = '大一上'; 
    }; 
    if (this.data.Y as unknown as number - grade == 0 && 2 <= parseInt(this.data.M) && parseInt(this.data.M) < 8) { 
      schoolTime = '大一下'; 
    }; 
  /** 
   * 当所选年级已经不是在校生的时候 
   */ 
    if(this.data.Y as unknown as number - grade > 3){ 
      schoolTime='大一上'; 
    }; 
    console.log(schoolTime)
    /**
     * 重新选择时，清空下面选项行内容的显示
     */
    var academyTitle = this.data.academyTitle;
    var classTitle_2 = this.data.classTitle_2;
    var semesterTitle = this.data.semesterTitle;
    if (this.data.grade !== this.data.gradeArray[this.data.gradeId as any]) {
      academyTitle = '';
      classTitle_2 = '';
      semesterTitle = '';
    }
    /**
    * 当点击确认时，跳出来所显示的内容
    */
    var gradeTitle = grade;
    this.setData({
      schoolTime:schoolTime,
      academyTitle: academyTitle,
      classTitle_2: classTitle_2,
      semesterTitle: semesterTitle,
      grade: String(grade),
      shownj: false,
      Chargedetail: true,
      gradeTitle: String(gradeTitle),
      beginSemester: schoolTime
    })
  },
  /**
   * 学院的picker弹窗的确认
   */
  bind_academy() {
    var academy = this.data.academyArray[this.data.academyId];
    /**
     * 重新选择时，清空下面选项行内容的显示
     */
    var classTitle_2 = this.data.classTitle_2;
    var semesterTitle = this.data.semesterTitle;
    if (this.data.academy !== this.data.academyArray[this.data.academyId]) {
      classTitle_2 = '';
      semesterTitle = '';
    }
    /**
   * 当点击确认时，跳出来所显示的内容
   */
    var academyTitle = academy;
    this.setData({
      classTitle_2: classTitle_2,
      semesterTitle: semesterTitle,
      academyId: 0,//点击确定后，重置当前项
      showxy: false,
      Chargedetail: true,
      academy: academy,
      academyTitle: academyTitle,
    });
    this.getbindInfo();
    this.selectComponent("#toast_3").showToastAuto("查询中", "lodding",'3');
  },
  /**
   * 班级的picker弹窗的确认
   */
  bind_class() {
    var Class = this.data.ClassArray[this.data.ClassId] as any;
    var semesterArray = this.data.semesterArray as any;
    /**
     * 重新选择时，清空下面选项行内容的显示
     */
    var semesterTitle = this.data.semesterTitle;
    if (this.data.Class !== this.data.ClassArray[this.data.ClassId]) {
      semesterTitle = '';
    }
    /**
     * 进行本科，专升本，专科的判断
     */
    for (var i = 0; i < Class.length; i++) {
      if (Class[i] == 'z' && Class[i + 1] == 's' && Class[i + 2] == 'b') {
        semesterArray = ['大三上学期', '大三下学期', '大四上学期', '大四下学期'];
        break;
      }
      else if (Class[i] == '专') {
        semesterArray = ['大一上学期', '大一下学期', '大二上学期', '大二下学期', '大三上学期', '大三下学期'];
        break;
      }
      else {
        semesterArray = ['大一上学期', '大一下学期', '大二上学期', '大二下学期', '大三上学期', '大三下学期', '大四上学期', '大四下学期'];
        continue;
      }
    }
    if(this.data.Y as unknown as number-Number(this.data.grade)<=4){
        for (let i = 0; i <semesterArray.length ; i++) {//给本学年加上后缀名
      if (this.data.schoolTime == semesterArray[i].slice(0, 3)) {
          semesterArray[i] = semesterArray[i] + "(本学年)";
          break;
      }
    }
    }
    /**
     * 默认学期判断
     */
    for (var a = 0 ; a < semesterArray.length; a++) {
      //专科
      if(semesterArray.length == 6){
        if(this.data.schoolTime.slice(0,2) !== '大四'){
          if (this.data.schoolTime == semesterArray[a].slice(0, 3)) {
          break;
      }
        }else{
          a = 0;
          break;
        }
      }
      //专升本
      if(semesterArray.length == 4){
   //假设专升本是大一大二
   var arr = ['大一上学期', '大一下学期', '大二上学期', '大二下学期',];
          if (this.data.schoolTime == arr[a].slice(0, 3)) {
          break;
        }
      }
      //本
      if(semesterArray.length == 8){
          if (this.data.schoolTime == semesterArray[a].slice(0, 3)) {
          break;
      }
      }
    }
    var classTitle_2 = Class;
    this.setData({
      semesterId:[a] as any,
      semesterArray: semesterArray,
      semesterTitle: semesterTitle,
      ClassId: 0,//点击确定后，重置当前项
      showbj: false,
      Class: Class,
      classTitle_2: classTitle_2,
      Chargedetail: true,
    });
  },
  /**
   * 学期的picker弹窗的确认
   */
  bind_semester() { 
    console.log(this.data.schoolTime)
    var semesters = this.data.semesterArray[this.data.semesterId as unknown as number] as any;
    semesters=semesters.slice(0, 3);
    var semesterTitle = semesters;
    /**
     * 获取当前年
     */
    var timestamp = Date.parse(new Date() as unknown as string);
    var date = new Date(timestamp);
    let num = date.getFullYear() as unknown as string;
    let start;//开始上课的时间
    let schoolTerm = 0;//学期
    let place;//校区
    let times = {};//校区的上课时间
    let beginWeek = -1//判断是否要本周和非本周的显示
    if (semesters == '大一下' || semesters == '大二下' || semesters == '大三下' || semesters == '大四下') {
      schoolTerm = schoolTerm + 12;
      start = num + '/2/19';
    };
    if (semesters == '大一上' || semesters == '大二上' || semesters == '大三上' || semesters == '大四上') {
      schoolTerm = schoolTerm + 3;
      start = num + '/8/28';
    };
    if (semesters.slice(1, 2) == "一") {
      place = '嘉鱼';
      times = this.data.timeJia;
    };
    if (semesters.slice(1, 2) == "二") {
      place = '武昌';
      times = this.data.timeWu;
    };
    if (semesters.slice(1, 2) == "三") {
      place = '武昌';
      times = this.data.timeWu;
    };
    if (semesters.slice(1, 2) == "四") {
      place = '武昌';
      times = this.data.timeWu;
    };
    if (semesters.slice(0, 3) == this.data.beginSemester) {
      beginWeek = this.data.againWeek;
    }
    this.setData({
      semester: this.data.suorec.slice(0, 3),
      Semesterswitchingdetail: false,
      schoolPlace: place,
      time: times,
      I: schoolTerm,
      startDate: start,
      dayTime: [],
      beginWeek: beginWeek,
      semesters: semesters,
      start: start,
      times: times,
      place: place,
      semesterTitle: semesterTitle,
      showxq: false,
      Chargedetail: true,
    });
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
  /**
   * 课程详情点击蒙版关闭
   */
  closeDetails_class() {
    this.setData({
      ifshow: false,
    })
  },
  /* 
  *关闭选择学期学年学院班级弹窗
  */
  closeDetails() {
    this.setData({
      academyId: [0] as any,//点击确定后，重置当前项
      ClassId: [0] as any,//点击确定后，重置当前项
      shownj: false,
      showbj: false,
      showxq: false,
      showxy: false,
      Chargedetail: true,
    });
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
      isShowToast:false,
      classSchedule: '',
      dialogTip: false
    });
  },

  /**
   * 从本地缓存中读取课表，若成功返回true，失败为false
   */
  getTableDataFromLocal() {
    var that = this;
    var value = wx.getStorageSync('widget-allSchedule').classSchedule;
    if (value.week !== []) {
      var nowWeekData: { day: string; item: never[] }[] = [];
      that.setData({
        classSchedule: value,
        nowWeekData: nowWeekData
      });
      return true;
    } else {
      return false;
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
    if (this.getTableDataFromLocal()) {
      that.selectComponent("#toast_1").showToastAuto("课表刷新中", "lodding",'3');
      that.selectComponent("#toast_1").showToastAuto("刷新成功", "success",'1');
    }

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
            (cls.day == item.day) && (list.findIndex((v) => { return v.id == item.id }) == -1)
          ) {
            list.push(item);
          };
        };
      };
    };
    //将重复的课程周次合并
    let num = this.objHeavy(list)
    if (num.length != list.length) {
      if (num[0].old_day_num.indexOf("和") < 0) {
        for (let i = 0; i < num.length; i++) {
          var arr = {} as any
          var mynum = 0
          for (let j = 0; j < list.length; j++) {
            if (num[i].name == list[j].name) {
              if (arr.day_num == undefined) {
                arr = list[j]
              } else if (arr.local == list[j].local) {
                arr.day_num = arr.day_num.concat(list[j].day_num)
                arr.old_day_num = arr.old_day_num + "和" + (list[j].old_day_num)
              } else { mynum = mynum + 1; break; }
            }
          }
          if (mynum == 1) { break; }
          num[i] = arr
        }
      }
    }
    list = num
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
    var bind = {
      'zh': '20222108012',
      'mm': 'Luosukai1',
    }
    wx.setStorageSync('login', bind)
    if (!wx.getStorageSync('widget-allSchedule')) {
      //给用户添加缓存
      let value = { classSchedule: '', place: '', all: [], time: [] };
      wx.setStorageSync('widget-allSchedule', value);
    }
    //获取当前年月
    var timestamp = Date.parse(new Date() as unknown as string);
    var date = new Date(timestamp);
    this.setData({
      //获取年份
      Y: date.getFullYear()  as unknown as string,
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
    var times = wx.getStorageSync('widget-allSchedule').time.length == 0 ? this.data.timeJia : wx.getStorageSync('widget-allSchedule').time;//校区的上课时间
    var place = wx.getStorageSync('widget-allSchedule').place.length == 0 ? this.data.schoolPlace : wx.getStorageSync('widget-allSchedule').place;//校区

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
      if ((this.data.Y as unknown as number - wx.getStorageSync('widget-allSchedule').all[0].grade == 4 && 8 <= parseInt(this.data.M) && parseInt(this.data.M) <= 12) || (this.data.Y as unknown as number - wx.getStorageSync('widget-allSchedule').all[0].grade == 4 && 1 <= parseInt(this.data.M) && parseInt(this.data.M) < 2)) {
        start = this.data.Y + "/8/28";

      };
      if (this.data.Y as unknown as number - wx.getStorageSync('widget-allSchedule').all[0].grade == 4 && 2 <= parseInt(this.data.M) && parseInt(this.data.M) < 8) {
        start = this.data.Y + "/2/19";

      };
      if ((this.data.Y as unknown as number - wx.getStorageSync('widget-allSchedule').all[0].grade == 3 && 8 <= parseInt(this.data.M) && parseInt(this.data.M) <= 12) || (this.data.Y as unknown as number - wx.getStorageSync('widget-allSchedule').all[0].grade == 3 && 1 <= parseInt(this.data.M) && parseInt(this.data.M) < 2)) {
        start = this.data.Y + "/8/28";

      };
      if (this.data.Y as unknown as number - wx.getStorageSync('widget-allSchedule').all[0].grade ==3 && 2 <= parseInt(this.data.M) && parseInt(this.data.M) < 8) {
        start = this.data.Y + "/2/19";

      };
      if ((this.data.Y as unknown as number - wx.getStorageSync('widget-allSchedule').all[0].grade ==2 && 8 <= parseInt(this.data.M) && parseInt(this.data.M) <= 12) || (this.data.Y as unknown as number - wx.getStorageSync('widget-allSchedule').all[0].grade ==2 && 1 <= parseInt(this.data.M) && parseInt(this.data.M) < 2)) {
        start = this.data.Y + "/8/28";

      };
      if (this.data.Y as unknown as number - wx.getStorageSync('widget-allSchedule').all[0].grade ==2 && 2 <= parseInt(this.data.M) && parseInt(this.data.M) < 8) {
        start = this.data.Y + "/2/19";

      };
      if ((this.data.Y as unknown as number - wx.getStorageSync('widget-allSchedule').all[0].grade == 1 && 8 <= parseInt(this.data.M) && parseInt(this.data.M) <= 12) || (this.data.Y as unknown as number - wx.getStorageSync('widget-allSchedule').all[0].grade == 1&& 1 <= parseInt(this.data.M) && parseInt(this.data.M) < 2)) {
        start = this.data.Y + "/8/28";
 
      };
      if (this.data.Y as unknown as number - wx.getStorageSync('widget-allSchedule').all[0].grade == 1 && 2 <= parseInt(this.data.M) && parseInt(this.data.M) < 8) {
        start = this.data.Y + "/2/19";

      };
      var toView//对滑轮中被选中的周数进行显示
      if (parseInt((day / 7 + 1) as unknown as string) > 3) {
        toView = "item" + (parseInt((day / 7 + 1) as unknown as string) - 3);
      } else { toView = 'item0'; }

      this.setData({ Y: (Number(this.data.Y) - 1) as unknown as string, nowWeek: parseInt((day / 7 + 1) as unknown as string), schoolPlace: place, time: times, startDate: start , toView: toView,beginWeek: parseInt((day / 7 + 1) as unknown as string), againWeek: parseInt((day / 7 + 1) as unknown as string)});
    } catch { };
    this.initPageData();//初始化页面数据
    //通过定义的变量进行周的自动判断
    if (wx.getStorageSync('widget-allSchedule').classSchedule) {
      this.reGetDay(time)
    } else {
      setTimeout(() => {
        this.reGetDay(time)
      }, 4000);
    };//倒计时避免没有课表缓存造成当周课表无法显示
    this.initPageData();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var all = wx.getStorageSync('widget-allSchedule').all as any;
    if (wx.getStorageSync('widget-allSchedule').classSchedule!=='') {
      var allOne = all[0].Class;
    }
    let schoolPlace;
    let time;
    if (wx.getStorageSync('widget-allSchedule').place == '') {
      try {
        if (this.data.semesters.slice(1, 2) == "一") {
          schoolPlace = "嘉鱼";
          time = this.data.timeJia;
        };
        if (this.data.semesters.slice(1, 2) == "二") {
          schoolPlace = "武昌";
          time = this.data.timeWu;
        };
        if (this.data.semesters.slice(1, 2) == "三") {
          schoolPlace = "武昌";
          time = this.data.timeWu;
        };
        if (this.data.semesters.slice(1, 2) == "四") {
          schoolPlace = "武昌";
          time = this.data.timeWu;
        };
      } catch { }
    } else {
      if (wx.getStorageSync('widget-allSchedule').place == "嘉鱼") {
        time = this.data.timeJia;
        schoolPlace = "嘉鱼";
      };
      if (wx.getStorageSync('widget-allSchedule').place == "武昌") {
        time = this.data.timeWu;
        schoolPlace = "武昌";
      };
    };
    this.setData({
      schoolPlace: schoolPlace,
      time: time?time:this.data.timeJia,
      all: all,
      classTitle: allOne
    });
  },
})