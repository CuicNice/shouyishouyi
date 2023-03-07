import { getBanner } from '../../api/bannerApi';
export interface BannerItem {
  "currentPage": number,
  "pageSize": number
}
Page({
  /**
   * 数据声明
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    homePics: [] as any,
    data: ''
  },

  /**
   * 网络请求
   */
  async request() {
    let value = { "currentPage": 1, "pageSize": 5 };
    var ifGo;
    const { data: res } = await getBanner(value) as unknown as IResult<any>;
    if (res) {
      var add = res.list;
      for (var i = 0; i < add.length; i++) {
        if (add[i].bannerType == 'image') {
          ifGo = false;
        };
        if (add[i].bannerType != 'image') {
          ifGo = true;
        };
        var src = 'http://' + add[i].bannerImage;
        add[i].src = src;
        add[i].ifGo = ifGo;
      };
      this.setData({
        homePics: add
      });
    };
  },

  /**
   * 点击图片跳转
   */
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    });
  },

  /**
   * 点击事件
   */
  tap(e: any) {
    this.setData({
      data: e.detail.bannerContent,
    });
    try {
      wx.setStorageSync('widget-banner', this.data.data);
    } catch (e) {
    };
    var arr = wx.getStorageSync('widget-banner');
    if (this.data.data != null && arr.charAt(0) != "/") {
      wx.navigateTo({
        url: '../indexText/indexText',
      });
    } else {
      var place = wx.getStorageSync('widget-banner');
      wx.navigateTo({
        url: place,
      });
    };
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onReady() {
    this.request();
  },

  onLoad() {

  },
})