import { loginApi } from '../../api/userAPI';
// pages/login/login.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgSvgUrl: "https://introduce.mcdd.top/schoolBuilt/pillar.svg", // 背景柱子
    showLoginDialog: false,// 显示登录弹窗
    showPwd:false, // 显示密码
    zh: '',
    mm: '',
    errorTimes:0, //记录用户错误次数，每3次弹窗一次
    copyUrlDialog:false, // 复制教务系统网址的弹窗
    hasAgreement:false, // 用户是否同意隐私协议
    questionList:[
      {name:"这个账号密码是哪个平台的账号密码？",icon:"https://introduce.mcdd.top/questionItem/questionItem1.svg"},
      {name:"我的账号密码输入一直错误",icon:"https://introduce.mcdd.top/questionItem/questionItem2.svg"},
      {name:"我忘记密码了,怎么办？",icon:"https://introduce.mcdd.top/questionItem/questionItem3.svg"},
      {name:"还有问题，联系南南！",icon:"https://introduce.mcdd.top/questionItem/questionItem4.svg"},
    ]
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
   * 选中用户协议checkbox
   */
  checkAgreement(){
    let hasAgreement = this.data.hasAgreement;
    this.setData({
      hasAgreement:!hasAgreement
    })
  },
  /**
   * 点击完成按钮
   */
  async login() { //模仿写出存入缓存
    var zh = this.data.zh;
    var mm = this.data.mm;
    var hasAgreement = this.data.hasAgreement;
    let that = this;
    let toast = this.selectComponent('#toast');
    if(!hasAgreement){
      toast.showToastAuto('请同意协议', "error", 1);
      return;
    }
    if(zh!='' && mm != ''){
      let login = {
        zh:zh,
        mm:mm
      } as any
      toast.showToast("登陆中", "lodding");
      const res = await loginApi(login) as unknown as IResult<any>;
      if(res.code != 20000){
        var errorTimes = that.data.errorTimes + 1;
        if (errorTimes >= 3){
          errorTimes = 0;
          toast.hiddenToast();
          that.setData({
            errorTimes:errorTimes,
            copyUrlDialog:true
          })
        }else{
          toast.showToastAuto(res.msg, "error", 1);
          that.setData({
            errorTimes:errorTimes
          })
        }
      }else{
        wx.setStorageSync('login', login);
        wx.setStorageSync('userInfo', res.data);
        toast.showToastAuto("登录成功", "success", 2, wx.navigateBack);
      }
    }else{
      toast.showToastAuto('请输入完整', "error", 1);
    }
  },
  /**
   * 复制教务系统网址
   */
  copyUrl(){
    wx.setClipboardData({
      data: "http://syjw.wsyu.edu.cn/xtgl/login_slogin.html"
    });
  },
  /**
   * 复制教务系统网址点击确定
   */
  ok(){
    this.setData({
      copyUrlDialog:false
    })
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