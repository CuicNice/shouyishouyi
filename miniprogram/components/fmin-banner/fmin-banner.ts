// components/fmin-banner/fmin-banner.ts
Component({
  /**
   * 组件的属性列表
   * 若要监听banner被点击图片的信息，需要给组件绑定imageTapEvent事件。
   * 如:<banner imageList="{{homePics}}" bind:imageTapEvent="tap"></banner>
   */
  properties: {
    /**
     * 传入被轮播的图片src地址,其被点击后可以返回给父组件item的值
     * 传入参数的值必须为List，且List中的每一个item里，src为图片地址。
     * 传入格式为[{src:"",xxx,...},{src:"",xxx,...}....]
     */
    imageList:{
      type:Array,
      value:[]
    },
    autoplay:{ // 是否自动播放
      type:Boolean,
      value:true
    },
    interval:{ // 自动轮播速度，单位ms
      type:Number,
      value:4000
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    index: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    chuangEvent: function (e: { currentTarget: { id: number; }; }) {
      this.setData({
        index: e.currentTarget.id
      })
    },
  
    swiperChange:function(e: { detail: { current: any; }; }){
      this.setData({
        index: e.detail.current   //获取当前轮播图片的下标
      })
    },
    tapImage:function(e:any){ // 监听被点击的图片，并且传递给父组件
      var index = e.currentTarget.dataset.index;
      var beTapedImage = this.data.imageList[index]
      this.triggerEvent("imageTapEvent", beTapedImage,{})
    }
  }
})
