import { getBanner } from '../../../miniprogram/api/bannerApi';
export interface BannerItem {
  "currentPage": number,
  "pageSize": number
}
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    homePics:[] as any,
    iftaiozhuan:false,
    shuju:''
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },

  async onReady() {
    let value={"currentPage": 1,"pageSize": 5}
    const { data: res } = await getBanner(value) as unknown as IResult<any>;
    if(res){
        console.log(res.data)
        this.setData({
          homePics:res.data.data.list
        })
        for(var i=0;i<this.data.homePics.length;i++){
          if(this.data.homePics[i].bannerType == 'image'){
            this.setData({
              iftaiozhuan:false
            })
          }
          if(this.data.homePics[i].bannerType != 'image'){
            this.setData({
              iftaiozhuan:true
            })
          }
          var src='http://' + this.data.homePics[i].bannerImage
          var iftiaozhuan=this.data.iftaiozhuan
          this.data.homePics[i].src=src
          this.data.homePics[i].iftiaozhuan=iftiaozhuan
        }
        this.setData({
          homePics:this.data.homePics
        })}
  },

  tap(e:any){
    console.log(e.detail)
      this.setData({
      shuju:e.detail.bannerContent,
      iftaiozhuan: true
    })
    console.log(this.data.shuju)
    try{
      wx.setStorageSync('key', this.data.shuju)
      console.log('写入value成功')
    }catch (e) {
      console.log('写入value发生错误')
    }
    var arr=wx.getStorageSync('key')
    if(this.data.shuju != null && arr.charAt(0) != "/"){
    wx.navigateTo({
      url: '../indexText/indexText',
    })
  }else{
    var place=wx.getStorageSync('key')
    console.log(place)
    wx.navigateTo({
      url: place,
    })
  }
  },

  onLoad() {
    // this.initPageData();
  },
})