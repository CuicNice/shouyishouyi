## 项目结构
```js
miniprogram
---components
------fmin-toast // 提示框（无确认按钮的）。
------animations // 动画。
------fmin-dialog // 弹窗（有插槽的）。
------fmin-topbar // 顶部栏
---enums // 常用枚举类型
---pages // 页面
------index // 主页面。
------login // 登录页面
------widgets // 小组件
---------xxxx //组件名称
------------xxxx //小组件样式（组件形式）
------------xxxx //组件页面（page形式）
---utils // 工具目录
------request.ts // 网络请求封装
---Consts.ts // 项目常量配置
typings
---index.d.ts //InterFace声明
```
## master版本 2023.1.29
1. 当前版本0.0.1。已完成：弹窗、提示框、顶部栏等组件的封装。
2. 完成电费查询小组件页面部分。
