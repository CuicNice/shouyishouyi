function  mySetStorage(formObj: string, needObjName: string, value: any) {
  if (wx.getStorageSync(formObj) == null || wx.getStorageSync(formObj) == undefined||wx.getStorageSync(formObj)=="") {
    let obj={}
    obj[needObjName]=value
    wx.setStorageSync(formObj, obj);
  } else {
      let arr = wx.getStorageSync(formObj);
      arr[needObjName] = value;
      wx.setStorageSync(formObj, arr);
    }
  }
  module.exports = {
    //变量名   ： 将方法赋值到变量上面去使用
    mySetStorage: mySetStorage
  }