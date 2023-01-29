// 一些信息配置
export const Consts = {

  DEBUG: false,

  FregrementIndex: {
    Index: 0,
    Category: 1,
    Mine: 2
  },

  // 网络请求相关
  HTTP_REQUEST_TIMEOUT: 10000,
  
  // 路由
  RoutePath: {
    Home: "/pages/index/index",
    Category: "/pages/category/category",
    Mine: "/pages/mine/mine",
    Common: {
      notFound: "/pages/common/notFound/index"
    },
    Content: {
      article: "/pages/content/articles/index",
    }
  },

  CopyUrl: {
    Website: 'https://www.gorit.cn',
    ShoppingChart: 'https://gorit.cn/projects/ShoppingChart/chart.html'
  }
}