import { loginApi } from '../../api/userAPI';
// pages/login/login.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgSvgUrl: "https://introduce.mcdd.top/schoolBuilt/pillar.svg",
    showLoginDialog: false,// 显示登录弹窗
    showPwd:false,
    zh: '',
    mm: '',
  },
  /**
   * 点击小眼睛，展示或关闭密码回显
   */
  switchShowPwd(){
    let showPwd = this.data.showPwd;
    this.setData({
      showPwd:!showPwd
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    
  },
  /**
   * 获取学号和密码
   */
  getXh(e: any) { this.setData({ zh: e.detail.value }) },
  getMm(e: any) { this.setData({ mm: e.detail.value }) },
  /**
   * 点击完成按钮
   */
  async login() { //模仿写出存入缓存
    var zh = this.data.zh;
    var mm = this.data.mm;
    let toast = this.selectComponent('#toast');
    if(zh!='' && mm != ''){
      let login = {
        zh:zh,
        mm:mm
      } as any
      toast.showToast("登陆中", "lodding");
      const res = await loginApi(login) as unknown as IResult<any>;
      if(res.code != 20000){
        toast.showToastAuto(res.msg, "error", 2);
      }else{
        wx.setStorageSync('login', login);
        wx.setStorageSync('userInfo', res.data);
        toast.showToastAuto("登录成功", "success", 2, wx.navigateBack);
      }
    }else{
      toast.showToastAuto('请输入完整', "error", 2);
    }
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