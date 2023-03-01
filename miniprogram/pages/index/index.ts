import { getBanner } from '../../api/bannerApi';
export interface BannerItem {
  "currentPage": number,
  "pageSize": number
}
Page({
  /* 
  *数据声明
  */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    homePics:[] as any,
    iftaiozhuan:false,
    shuju:''
  },
  // 事件处理函数
  /* 
  *点击图片跳转
  */
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },

  /* 
  *网络请求
  */
  async onReady() {
    let value={"currentPage": 1,"pageSize": 5}
    var iftiaozhuan
    const{data: res} = await getBanner(value) as unknown as IResult<any>;
    if(res){
        var add=res.list
        for(var i=0;i<add.length;i++){
          if(add[i].bannerType == 'image'){
              iftiaozhuan=false
          }
          if(add[i].bannerType != 'image'){
              iftiaozhuan=true
          }
          var src='http://' + add[i].bannerImage
          add[i].src=src
          add[i].iftiaozhuan=iftiaozhuan
        }
        this.setData({
          homePics:add
        })}
  },

  tap(e:any){
      this.setData({
      shuju:e.detail.bannerContent,
      iftaiozhuan: true
    })
    try{
      wx.setStorageSync('key', this.data.shuju)
    }catch (e) {
    }
    var arr=wx.getStorageSync('key')
    if(this.data.shuju != null && arr.charAt(0) != "/"){
    wx.navigateTo({
      url: '../indexText/indexText',
    })
  }else{
    var place=wx.getStorageSync('key')
    wx.navigateTo({
      url: place,
    })
  }
  },

  onLoad() {
    // this.initPageData();
  },
})