// pages/widgets/library/libraryPage/libraryPage.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    allbook: [] as any,
    num: 0,
    electricChargeTitle: '图书详情'
  },
  /**
   * 生命周期函数--监听页面加载,
   * 接收从上一个页面传递过来的数据
   */
  onLoad(e) {
    this.setData({ num: (e.num) as unknown as number, allbook: JSON.parse((e.all) as unknown as string) });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
     * 点击detail卡片进行复制
     */
  tapdetailCopy() {
    var ab = this.data.allbook;//allbook的一个缩写
    var nm = this.data.num;//num的一个缩写/allbook有十个，这里的num是找到对应的书
    // if(ab[nm].num !== {}){} ,本来用这个判空，但是发现不行
    if (ab[nm].showzong == true || ab[nm].showjia == true || ab[nm].shownan == true || ab[nm].showzhong == true) {
      wx.setClipboardData({
        data: '【南李路二十二号小程序提醒你】“' + ab[nm].title + '”, ' + (ab[nm].showzong == true ? '在总馆还有' + ab[nm].num.zongArr.num + '本,' : '') + (ab[nm].showjia == true ? '在嘉鱼分馆还有' + ab[nm].num.jiaArr.num + '本,' : '') + (ab[nm].shownan == true ? '在南区分馆还有' + ab[nm].num.nanArr.num + '本,' : '') + (ab[nm].showzhong == true ? '在中区分馆还有' + ab[nm].num.zhongArr.num + '本,' : '') + '索书号为：' + ab[nm].books[0].callno + ',如果还有任何问题,可联系我们南南微信：nanlilu22',
      })
    }
  },
  /**
   * 点击下面的本地信息卡片，复制
   */
  localCopy(e: any) {
    var ab = this.data.allbook;//allbook的一个缩写
    var nm = this.data.num;//num的一个缩写/allbook有十个，这里的num是找到对应的书
    var local = e.currentTarget.dataset.index;
    wx.setClipboardData({
      data: '【南李路二十二号小程序提醒你】“' + ab[nm].title + '”,' + '在' + (local == 'zongArr' ? '总馆还有' + ab[nm].num.zongArr.num + '本,' : ((local == 'jiaArr' ? '嘉鱼分馆还有' + ab[nm].num.jiaArr.num + '本,' : (local == 'nanArr' ? '南区分馆还有' + ab[nm].num.nanArr.num + '本,' : (local == 'zhongArr' ? '中区分馆还有' + ab[nm].num.zhongArr.num + '本,' : ''))))) + '索书号为：' + ab[nm].books[0].callno + ',如果还有任何问题,可联系我们南南微信：nanlilu22',
    })
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