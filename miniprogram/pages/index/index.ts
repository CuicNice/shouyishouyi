// index.ts
// 获取应用实例
import {getElectric} from '../../api/test';

export interface ElectriceItem {
  build: string,
  room: string
}

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    // index: 0,
    homePics:[],
    iftaiozhuan:false,
    shuju:''
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },

  onReady() {
    wx.request({
      url: 'http://www.fmin-courses.com:9527/api/v1/ad/ad/banner/appletBannerList',
      method:'POST',
      data: {
        "currentPage": "1",
        "pageSize": "5"
      },
      success:(res)=> {
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
        })
      }
    })
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
    if(this.data.shuju != null){
    wx.navigateTo({
      url: '../indexText/indexText',
    })
  }
  },

  onLoad() {
    // this.initPageData();
  },
  async initPageData(){
    var from = {
      build:"西区2栋",
      room:"507"
    }as ElectriceItem;
    const { data } = await getElectric(from) as unknown as IResult<ElectriceItem>;
    console.log(data);
  }
})