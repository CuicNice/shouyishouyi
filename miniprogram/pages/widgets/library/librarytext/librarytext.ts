// pages/widgets/library/libraryPage/libraryPage.ts
import { getlibrary } from '../../../../api/libraryApi';
export interface LibraryItem {
  "page": number,
  "word": string
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    word: '',
    shuju: [] as any,
    allbook: [] as any,
    a: 1,
    b: 0,
    num: 0,
    electricChargeTitle: '首义图书馆',
  },

  /**
   * 输入文本框中的文字
   */
  getInputValue: function (e: any) {
    this.setData({ word: e.detail.value });
  },

  /**
   * 添加缓存
   */
  cache(abc: string) {
    // 先获取缓存中的内容
    let array = wx.getStorageSync(abc) || [];
    // 向数组中追加
    var ifshow = false;
    if (this.data.word.length > 6) { ifshow = !ifshow };
    array.item.push({
      item: this.data.word,
      ifshow: ifshow
    });
    // 重新设置缓存
    wx.setStorageSync(abc, array);
  },

  /**
   * 搜索
   */
  search() {
    this.setData({ a: 1, b: 0, allbook: [] });
    var myarr = wx.getStorageSync('widget-library');
    myarr.book = [];
    wx.setStorageSync("widget-library", myarr);
    if (this.data.word != "") {
      this.webrequest(this.data.a);
      if (wx.getStorageSync('widget-library').item.length < 6) {
        this.cache('widget-library');
        var arr1 = { item: this.objHeavy(wx.getStorageSync('widget-library').item), book: [] };
        wx.setStorageSync("widget-library", arr1);
      }
      if (wx.getStorageSync('widget-library').length == 6) {
        this.cache('widget-library');
        var arr2 = { item: this.objHeavy(wx.getStorageSync('widget-library').item), book: [] };
        if (arr2.item.length == 6) {
          wx.setStorageSync("widget-library", arr2);
        }
        if (arr2.item.length == 7) {
          let array = wx.getStorageSync('widget-library');
          let arrays = { item: this.objHeavy(wx.getStorageSync('widget-library').item), book: [] };
          for (var i = 0; i < array.item.length; i++) {
            if (i != 0) {
              arrays.item.push(array.item[i]);
            };
          };
          wx.setStorageSync('widget-library', arrays);
        }
      }
    }
  },

  /**
   * 重新请求
   */
  async webrequest(a: any) {
    this.selectComponent("#toast").showToast("请求中....", "lodding");
    var value = { page: a, word: this.data.word };
    const { data: res } = await getlibrary(value) as unknown as IResult<any>;
    if (res) {
      var arr = res;
      try {
        if (arr.length != 0) {
          for (var j = 0; j < 10; j++) {
            var num = {};
            arr[j].num = num;
            var jianum = 0;
            var zongnum = 0;
            var zhongnum = 0;
            var nannum = 0;
            var jiaArr = {};
            arr[j].num.jiaArr = jiaArr;
            var myarr: never[] = [];
            arr[j].num.jiaArr.myarr = myarr;
            var zongArr = {};
            arr[j].num.zongArr = zongArr;
            var myarr: never[] = [];
            arr[j].num.zongArr.myarr = myarr;
            var nanArr = {};
            arr[j].num.nanArr = nanArr;
            var myarr: never[] = [];
            arr[j].num.nanArr.myarr = myarr;
            var zhongArr = {};
            arr[j].num.zhongArr = zhongArr;
            var myarr: never[] = [];
            arr[j].num.zhongArr.myarr = myarr;
            var add = 0;
            for (var i = 0; i < arr[j].books.length; i++) {
              if (arr[j].books[i].local.indexOf("嘉鱼") != -1) {
                let dataAll = arr[j].num.jiaArr.myarr;
                add = add + parseInt(arr[j].books[i].hldallnum);
                var item = { leixing: "外借图书", num: "A0427181", zhuangtai: "入藏" };
                item.leixing = arr[j].books[i].barcode;
                item.num = arr[j].books[i].localstatu;
                item.zhuangtai = arr[j].books[i].cirType;
                dataAll.push(item);
                jianum = jianum + 1;
                var showjia = true;
                var place = "嘉鱼";
                var image = "../../../../static/svg/schoolBuilt/jiayulibrary.svg";
                var hao = arr[j].books[i].callno;
                arr[j].showjia = showjia;
                arr[j].num.jiaArr.num = jianum;
                arr[j].num.jiaArr.hao = hao;
                arr[j].num.jiaArr.place = place;
                arr[j].num.jiaArr.image = image;
              }
              if (arr[j].books[i].local.indexOf("总馆") != -1) {
                let dataAll = arr[j].num.zongArr.myarr;
                add = add + parseInt(arr[j].books[i].hldallnum);
                var item = { leixing: "外借图书", num: "A0427181", zhuangtai: "入藏" };
                item.leixing = arr[j].books[i].barcode;
                item.num = arr[j].books[i].localstatu;
                item.zhuangtai = arr[j].books[i].cirType;
                dataAll.push(item);
                zongnum = zongnum + 1;
                var showzong = true;
                var place = "总馆";
                var image = "../../../../static/svg/schoolBuilt/genlibrary.svg";
                var hao = arr[j].books[i].callno;
                arr[j].showzong = showzong;
                arr[j].num.zongArr.num = zongnum;
                arr[j].num.zongArr.hao = hao;
                arr[j].num.zongArr.place = place;
                arr[j].num.zongArr.image = image;
              }
              if (arr[j].books[i].local.indexOf("南区") != -1) {
                let dataAll = arr[j].num.nanArr.myarr;
                add = add + parseInt(arr[j].books[i].hldallnum);
                var item = { leixing: "外借图书", num: "A0427181", zhuangtai: "入藏" };
                item.leixing = arr[j].books[i].barcode;
                item.num = arr[j].books[i].localstatu;
                item.zhuangtai = arr[j].books[i].cirType;
                dataAll.push(item);
                nannum = nannum + 1;
                var shownan = true;
                var place = "南区";
                var image = "../../../../static/svg/schoolBuilt/nanlibrary.svg";
                var hao = arr[j].books[i].callno;
                arr[j].shownan = shownan;
                arr[j].num.nanArr.num = nannum;
                arr[j].num.nanArr.hao = hao;
                arr[j].num.nanArr.place = place;
                arr[j].num.nanArr.image = image;
              }
              if (arr[j].books[i].local.indexOf("中区") != -1 || arr[j].books[i].local.indexOf("南湖") != -1) {
                let dataAll = arr[j].num.zhongArr.myarr;
                add = add + parseInt(arr[j].books[i].hldallnum);
                var item = { leixing: "外借图书", num: "A0427181", zhuangtai: "入藏" };
                item.leixing = arr[j].books[i].barcode;
                item.num = arr[j].books[i].localstatu;
                item.zhuangtai = arr[j].books[i].cirType;
                dataAll.push(item);
                zhongnum = zhongnum + 1;
                var showzhong = true;
                var place = "中区";
                var image = "../../../../static/svg/schoolBuilt/zhongqutushuguan.svg";
                var hao = arr[j].books[i].callno;
                arr[j].showzhong = showzhong;
                arr[j].num.zhongArr.num = zhongnum;
                arr[j].num.zhongArr.hao = hao;
                arr[j].num.zhongArr.place = place;
                arr[j].num.zhongArr.image = image;
              }
            }
            try {
              arr[j].add = add;
            } catch { };//此处是为了防止第一个数据中为空产生报错
          }
          this.setData({ allbook: arr });
          for (var i = 0; i < 10; i++) {
            if (this.data.allbook[i].num.jiaArr.myarr.length == 0) {
              delete this.data.allbook[i].num.jiaArr;
            }
            if (this.data.allbook[i].num.nanArr.myarr.length == 0) {
              delete this.data.allbook[i].num.nanArr;
            }
            if (this.data.allbook[i].num.zhongArr.myarr.length == 0) {
              delete this.data.allbook[i].num.zhongArr;
            }
            if (this.data.allbook[i].num.zongArr.myarr.length == 0) {
              delete this.data.allbook[i].num.zongArr;
            }
          }
          this.setData({ allbook: this.data.allbook });
          var array = wx.getStorageSync('widget-library') || [];
          array.book.push({
            item: this.data.allbook,
          })
          wx.setStorageSync('widget-library', array);
        }
      } catch { };
      this.selectComponent("#toast").showToastAuto("请求成功", "success");
    }
  },

  /**
   * 点击右箭头请求
   */
  againrequest() {
    try {
      if (this.data.a == this.data.b + 1 && wx.getStorageSync('widget-library').book[this.data.b].item.length != 0) {
        this.setData({ a: this.data.a + 1, b: this.data.b + 1 });
        this.webrequest(this.data.a);
      };
      if (this.data.a != this.data.b + 1) {
        this.setData({ b: this.data.b + 1 });
        this.setData({ allbook: wx.getStorageSync('widget-library').book[this.data.b].item });
      };
    } catch { };
  },

  /**
   * 跳转书本详情
   */
  showXQ(res: any) {
    this.setData({ num: res.currentTarget.dataset.index });
    var all = JSON.stringify(this.data.allbook);
    wx.navigateTo({ url: '/pages/widgets/library/libraryDetailed/libraryDetailed?all=' + all + '&num=' + this.data.num });
  },

  /**
   * 点击左箭头看上一页的数据
   */
  leftrequest() {
    if (this.data.b != 0) {
      this.setData({ b: this.data.b - 1 });
      this.setData({ allbook: wx.getStorageSync('widget-library').book[this.data.b].item });
    };
  },

  /**
   * 获取缓存的内容
   */
  get() {
    var myarr = wx.getStorageSync('widget-library').item;
    if (myarr.length != 0) {
      var arr = [];
      for (var i = myarr.length - 1; i >= 0; i--) {
        arr.push(myarr[i]);
      };
      this.setData({
        shuju: arr,
        ifshow: false
      });
    }
  },

  /**
   * 查重
   */
  objHeavy: function (arr: { [x: string]: any }) {
    let arr1 = [];
    let newArr = [];
    for (let i in arr) {
      if (arr1.indexOf(arr[i].item) == -1) {
        arr1.push(arr[i].item);
        newArr.push(arr[i]);
      }
    }
    return newArr;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    this.setData({ word: e.word });
    this.webrequest(this.data.a);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})