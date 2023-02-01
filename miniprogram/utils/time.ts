const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

class TimeUtils {
  private static instance: TimeUtils;

    static instance;
  constructor() {}

  getInstance() {
    if (!this.instance) {
      this.instance = new TimeUtils();
    }
    return this.instance;
  }

  releaseInstance() {
    if (this.instance) {
      this.instance = null;
    }
  }

  static retDate(time){
    console.log(">>>>>",time);
    let dateBegin = new Date(time);//将-转化为/，使用new Date
    let dateEnd = new Date();//获取当前时间
    let dateDiff =dateBegin.getTime() - dateEnd.getTime() ;//时间差的毫秒数
    let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)+1);//计算出相差天数
    console.log(">>>>>",dayDiff);
    return dayDiff>=10?dayDiff:dayDiff
  }
}

module.exports = {
  formatTime,
  Utils
}
