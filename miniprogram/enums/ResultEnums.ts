
enum ResultCodeEnum {
  ERROR = 50000,

  BAD_REQUEST = 40000,
  REQUEST_PARAMS_ERROR = 40001,
  NETWORK_ERROR = 40002,
  DENIED = 40003,
  PAGE_NOT_FOUND = 40004,
  METHOD_NOT_ALLOWED = 40005,
  REPEAT_REQUEST = 40029,

  QUERY_FAILED = 30001,
  DELETE_FAILED = 30002,
  UPDATE_FAILED = 30003, 
  CREATE_FAILED = 30004,
  SORT_FAILED = 30005,
  DEPRECATED = 30006,
  NOTIFY_FAILED = 30007,

  SUCCESS = 20000,
  CREATE_SUCCESS = 20001,
  UPDATE_SUCCESS = 20002,
  DELETE_SUCCESS = 20003,
  UPLOAD_SUCCESS = 20004,
  QUERY_SUCCESS = 20005,
  NOTIFY_SUCCESS = 20006,


  SORT_SUCCESS = 20010,
}

enum ResultMessageEnum {
  // 500 系列
  ERROR = "服务器出错了，请联系管理员",

  // 400 系列
  BAD_REQUEST = "请求非法!!!",
  REQUEST_PARAMS_ERROR = "请求参数有误",
  NETWORK_ERROR = "网络出错了，等会再试试",
  DENIED = "你没有权限操作",
  PAGE_NOT_FOUND = "糟糕，页面丢失了",
  METHOD_NOT_ALLOWED = "请求方法不支持",
  REPEAT_REQUEST = "该接口请求次数超限，请稍后再试试！",
  NOTIFY_FAILED = "通知失败",

  // 300 系列
  QUERY_FAILED = "查询出错啦",
  DELETE_FAILED = "删除出错啦",
  UPDATE_FAILED = "更新出错啦",
  CREATE_FAILED = "创建出错啦",
  SORT_FAILED = "排序出错啦",
  DEPRECATED = "该接口已经废弃",

  // 20 系列
  SUCCESS = "操作成功",
  CREATE_SUCCESS = "创建成功",
  UPLOAD_SUCCESS = "更新成功",
  QUERY_SUCCESS = "查询成功",
  UPDATE_SUCCESS = "更新成功",
  DELETE_SUCCESS = "删除成功",
  SORT_SUCCESS = "排序成功",
  NOTIFY_SUCCESS = "通知成功",
}

// 状态类型 只能是Code中所枚举的状态
// type codeType = keyof typeof ResultCodeEnum;
type msgType = keyof typeof ResultMessageEnum;

export {
  ResultCodeEnum,
  ResultMessageEnum,
  msgType
}