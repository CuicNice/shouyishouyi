
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ""
    },
    stitle: {
      type: String,
      value: ""
    },
    schoolBuiltSrc:  {
      type:String,
      value:""
    },
    showDialog: {
      type: Boolean,
      value: false
    },
    type:{
      type:String,
      value:"normal"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationName:"fadeIn",
    showOut:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
  },
  observers:{
    'showDialog':function(showDialog){
      var that = this;
      console.log("jianting",that.data)
      if(showDialog){
        that.setData({
          showOut:true,
          animationName:"fadeIn"
        })
      }else if(!showDialog && this.data.showOut){
        that.setData({
          animationName:"fadeOut"
        },function(){
          setTimeout(() => {
            that.setData({
              showOut:false,
            })
          },0.1 * 1000)
        })
      }else{
        that.setData({
          showOut:false,
          animationName:"fadeIn"
        })
      }
    }
  },
  lifetimes: {
    // 生命周期函数
    ready: function() {

    },
  },
})
