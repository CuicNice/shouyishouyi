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
  
    swiperChange: function (e: { detail: { current: any; source: any; }; }) {
      let current = e.detail.current
      let source = e.detail.source
      if (source == 'autoplay' || source == 'touch') {
        //根据官方 source 来进行判断swiper的change事件是通过什么来触发的，autoplay是自动轮播。touch是用户手动滑动。其他的就是未知问题。抖动问题主要由于未知问题引起的，所以做了限制，只有在自动轮播和用户主动触发才去改变current值，达到规避了抖动bug
        this.setData({
          index: current
        })
      }
    },
    tapImage:function(e:any){ // 监听被点击的图片，并且传递给父组件
      var index = e.currentTarget.dataset.index;
      var beTapedImage = this.data.imageList[index]
      this.triggerEvent("imageTapEvent", beTapedImage,{})
    }
  }
})
