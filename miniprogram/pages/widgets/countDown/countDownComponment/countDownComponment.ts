import { Utils } from "../../../../utils"; 
 
Page({ 
 
  /** 
   * 页面的初始数据 
   */ 
  data: { 
    date:undefined, 
    dialogtitle:"设置失败，请重新设置", 
    schoolBuilt:"/static/svg/zhongqutushuguan.svg", 
    bname:'联系南南', 
    b1name:'确定' 
  }, 
   
 
  /** 
   * 生命周期函数--监听页面加载 
   */ 
  async onLoad(options) { 
//  let data= wx.getStorageSync('countdown1') 
let date =this.getNowFormatDate() 
  this.setData({ 
   date:date, 
  }) 
  }, 
 
  async getcount(e){ 
  console.log(e.detail); 
  this.setData({ 
    input1:e.detail 
  }) 
  }, 
  bindDateChange(e){ 
    this.setData({ 
      date:e.detail.value 
    }) 
  }, 
 
//获取当天的时间差 
  getNowFormatDate() {  
    let date = new Date(); 
    let seperator1 = "-"; 
    let year = date.getFullYear(); 
    let month:string = String(date.getMonth() + 1); 
    let strDate:string = String(date.getDate()); 
    if (Number(month) >= 1 && Number(month) <= 9) { 
    month = "0" + month; 
    } 
    if (Number(strDate) >= 0 && Number(strDate) <= 9) { 
    strDate = "0" + strDate; 
    } 
    let currentdate = year + seperator1 + month + seperator1 + strDate; 
    return currentdate; 
    }, 
   
  // 存储数据内容 
   async setall(){ 
    let lis = []; 
    let name = this.data.input1; 
    let time = this.data.date; 
    if(wx.getStorageSync('cdlist')){ 
      lis=wx.getStorageSync('cdlist') 
    } 
    if(name && Utils.retDate(time)>=0){ 
      lis.push({ 
        countDownName: name, 
        countDownEndDate:time 
      }) 
      wx.setStorageSync('cdlist', lis) 
      this.showToast(true,"	complete","设置成功") 
      setTimeout(()=>{ 
        this.onLoad() 
      },1500) 
    }else{ 
      // this.showToast(true,"error","设置失败") 
      this.setData({ 
        showDialog:true 
      }) 
    } 
  //   this.showToast() 
  //   setTimeout( 
  //     ()=>{ 
  //       wx.navigateBack({ 
  //         delta: 1,   
  //       }) 
  //     } 
  //  ,1500 ) 
  }, 
  showToast(showToast, toastIcon, toastTitle) { 
    this.setData({ 
      showToast: showToast, 
      toastIcon: toastIcon, 
      toastTitle: toastTitle 
    }) 
  }, 
 
  // showDialog() 
 
})