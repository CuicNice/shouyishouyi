/***
  * 日期格式化方法
  * 
  * @param format 格式化后的日期格式，标准格式：YYYY/MM/dd HH:mm:ss。
  * @param date 待格式化的日期，可以是string或Date类型
  * @return 结果示例：2022/12/08 
  */
 export const dateFormater = (format: string, date: string | Date) => {
  date = new Date(date);
  const dataRegIndexs = [0, 1, 2, 3, 4, 5];
  const dataRegKeys = ["Y+", "M+", "d+"];
  const dataItem = [
    date.getFullYear().toString(),
    // (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : 
    (date.getMonth() + 1).toString(),
    // date.getDate() < 10 ? '0' + date.getDate() : 
    date.getDate().toString(),
    date.getHours().toString(),
    date.getMinutes().toString(),
    date.getSeconds().toString(),
  ];
  let ret;
  for (const index in dataRegIndexs) {
    ret = new RegExp("(" + dataRegKeys[index] + ")").exec(format);
    if (ret) {
      format = format.replace(ret[1], (ret[1].length == 1) ? (dataItem[index]) : (dataItem[index]))
    }
  }
  return format
}
