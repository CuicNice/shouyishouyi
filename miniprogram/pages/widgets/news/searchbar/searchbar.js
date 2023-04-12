// component/searchbar/searchbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInputEvent:function(event){
      //console.log(event)
      var value = event.detail.value;
      var detail = {"value":value};
      var options = {};
      console.log("detail",detail);
      this.triggerEvent("haveInput",detail,options);父子组件传值
 
     }
  }
})