function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
 
  return [year, month, day].map(formatNumber).join('-')
}
 
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
 
function myformatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
 
  return [year, month, day].map(myformatNumber).join('-')
}
 
function myformatNumber(n) {
  n = n.toString()
  return n[1] ? n : '' + n
}

function str_substr(str) {
var arr = str.split("-");
  return arr;
  }
  
  
 
module.exports = {
  formatDate: formatDate,
  myformatDate: myformatDate,
  str_substr: str_substr
}