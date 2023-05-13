var timeWu = [
  { time1: '08:30', time2: '09:15' },
  { time1: '09:20', time2: '10:05' },
  { time1: '10:25', time2: '11:10' },
  { time1: '11:15', time2: '12:00' },
  { time1: '14:00', time2: '14:45' },
  { time1: '14:50', time2: '15:35' },
  { time1: '15:50', time2: '16:35' },
  { time1: '16:40', time2: '17:25' },
  { time1: '18:30', time2: '19:15' },
  { time1: '19:20', time2: '20:05' },
  { time1: '20:15', time2: '21:00' },
  { time1: '21:05', time2: '21:50' }
]
/* 武昌校区时间 */
var timeJia = [
  { time1: '08:30', time2: '09:15' },
  { time1: '09:20', time2: '10:05' },
  { time1: '10:25', time2: '11:10' },
  { time1: '11:15', time2: '12:00' },
  { time1: '13:30', time2: '14:15' },
  { time1: '14:20', time2: '15:05' },
  { time1: '15:10', time2: '15:55' },
  { time1: '16:00', time2: '16:45' },
  { time1: '18:00', time2: '18:45' },
  { time1: '18:45', time2: '19:30' },
  { time1: '19:30', time2: '20:15' },
  { time1: '20:15', time2: '21:00' }
]
/* 嘉鱼校区时间 */

/**
  * 获取当前年、月、日或年/月/日
  * @param type 当type为'Y'时，返回年、'M'为月、'D'为日，其他值则返回 YYYY/MM/DD
  * 注意： 若月或年的位数为各位，则此函数自动去0
  */
function getScheduleNowDate(type: string | unknown) {
  //获取当前年月
  let timestamp = Date.parse(new Date() as unknown as string);
  let date = new Date(timestamp);
  let Y = date.getFullYear() as unknown as string;
  let dateM = date.getMonth();
  let M = (dateM + 1 < 10 ? (dateM + 1) : dateM + 1) as unknown as string;
  let dateD = date.getDate();
  let D = dateD < 10 ? (dateD) : dateD as unknown as string;
  if (type == 'Y') {
    return Y;
  } else if (type == 'M') {
    return M;
  } else if (type == 'D') {
    return D;
  }
  return Y + '/' + M + '/' + D;
}

/**
 * 自动获得当前手机信息(高度等、单位px)
 * return json格式数据，
 * capsuleBoxHeight：胶囊行的高度 
 * statusBarHeight：状态栏高度
 * screenHeight：屏幕高度
 * rate：比率（rpx*rate=实际px）
 */
function getTarHeighgt() {
  // 获取胶囊的信息
  const menuButton = wx.getMenuButtonBoundingClientRect()
  const menuButtonHeight = menuButton.height;
  const menuButtonTop = menuButton.top;
  // 获取设备的信息  
  let systemInfo = wx.getSystemInfoSync()
  // 获取信号区高度
  let statusBarHeight = systemInfo['statusBarHeight']
  // 设置胶囊行的高度
  const capsuleBoxHeight = menuButtonHeight + (menuButtonTop - statusBarHeight) * 2;
  // 获得屏幕高度
  let screenHeight = systemInfo['screenHeight'];
  /* 
  根据我的测验，实际的信号区高度在真机上表现与于实际的不服，所以我们这里还需要根据不同的设备进行调整
  开发工具 = 获取的高度
  安卓真机 = 获取的高度 + 1
  苹果真机 = 获取的高度 - 1
  我本人这里也只测试了iPhonex 华为和小米手机，
  如果有出入根据实际情况进行调整就行了
  */
  if (systemInfo.model === 'andorid') {
    statusBarHeight = statusBarHeight + 1
  } else if (systemInfo.platform === 'ios') {
    statusBarHeight = statusBarHeight - 2
  } else {
    statusBarHeight = statusBarHeight
  }
  let rate = systemInfo['windowWidth'] / 750;
  return {
    capsuleBoxHeight: capsuleBoxHeight,
    statusBarHeight: statusBarHeight,
    screenHeight: screenHeight,
    rate: rate
  }
}

/**
 * 计算两个日期之间的相差的天数
 * return 天数 number
 */
function getCalculateTheNumberOfDays(startDate: string, endDate: string) {
  let start_date = new Date(startDate.replace(/-/g, "/"));
  let end_date = new Date(endDate.replace(/-/g, "/"));
  let days = end_date.getTime() - start_date.getTime();
  return (days / (1000 * 60 * 60 * 24)) as unknown as number;
}

/**
 * 根据年月日获得学期、学年、校区等课表请求参数
 * @param Y:年份 、 M：月份 、 zh：用户学号
 * @return {
 *  year:请求接口的年
 *  schoolTermNum: 请求接口的学期
 *  schoolPlace: 所在校区
 *  schedule: 上课时间
 *  startDate: 开始上课的时间
 *  schoolTerm: 所在学期
 * } 
 */
function getScheduleParamsByDate(Y: number, M: number, zh: string) {
  let schoolTermNum;//储存学期的变量
  let year = 0;//储存年份的变量
  let start;//开始上课的时间
  let schoolTerm;//学期名
  let times = {};//校区的上课时间
  let place;//校区
  let gradeYear = zh.slice(0, 4) as unknown as number;
  if (8 <= M && M <= 12) {
    year = year + Y + 1;
    schoolTermNum = 3;
  };
  if (1 <= M && M < 2) {
    year = year + Y;
    schoolTermNum = 3;
  };
  if (2 <= M && M < 8) {
    year = year + Y;
    schoolTermNum = 12;
  };

  if ((year - gradeYear == 4 && 8 <= M && M <= 12) ||
    (year - gradeYear == 4 && 1 <= M && M < 2)) {
    start = year + "/8/28";
    schoolTerm = '大四上';
    times = timeWu;
    place = "武昌";
  };
  if (year - gradeYear == 4 && 2 <= M && M < 8) {
    start = year + "/2/19";
    schoolTerm = '大四下';
    times = timeWu;
    place = "武昌";
  };
  if ((year - gradeYear == 3 && 8 <= M && M <= 12) ||
    (year - gradeYear == 3 && 1 <= M && M < 2)) {
    start = year + "/8/28";
    schoolTerm = '大三上';
    times = timeWu;
    place = "武昌";
  };
  if (year - gradeYear == 3 && 2 <= M && M < 8) {
    start = year + "/2/19";
    schoolTerm = '大三下';
    times = timeWu;
    place = "武昌";
  };
  if ((year - gradeYear == 2 && 8 <= M && M <= 12) ||
    (year - gradeYear == 2 && 1 <= M && M < 2)) {
    start = year + "/8/28";
    schoolTerm = '大二上';
    times = timeWu;
    place = "武昌";
  };
  if (year - gradeYear == 2 && 2 <= M && M < 8) {
    start = year + "/2/19";
    schoolTerm = '大二下';
    times = timeWu;
    place = "武昌";
  };
  if ((year - gradeYear == 1 && 8 <= M && M <= 12) ||
    (year - gradeYear == 1 && 1 <= M && M < 2)) {
    start = year + "/8/28";
    schoolTerm = '大一上';
    times = timeJia;
    place = "嘉鱼";
  };
  if (year - gradeYear == 1 && 2 <= M && M < 8) {
    start = year + "/2/19";
    schoolTerm = '大一下';
    times = timeJia;
    place = "嘉鱼";
  };
  return {
    year: (year - 1) as unknown as string,
    schoolTermNum: schoolTermNum,
    schoolPlace: place,
    schedule: times,
    startDate: start,
    schoolTerm: schoolTerm
  }
}

module.exports = {
  //变量名   ： 将方法赋值到变量上面去使用
  getScheduleNowDate: getScheduleNowDate,
  getTarHeighgt: getTarHeighgt,
  getCalculateTheNumberOfDays: getCalculateTheNumberOfDays,
  getScheduleParamsByDate: getScheduleParamsByDate
}