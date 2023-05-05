## 项目结构
```js
miniprogram
---components
------fmin-toast // 提示框（无确认按钮的）。
------animations // 动画。
------fmin-dialog // 弹窗（有插槽的）。
------fmin-topbar // 顶部栏.
---enums // 常用枚举类型。
---pages // 页面。
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
### 分配任务 2023.1.29
1、countDown ->小芳
2、library -> 小王
3、library（collection）-> 张义昂
4、score inquiry -> 小凯
5、class schedule ->  小崔

1、不必封装组件（若某项功能已有实现的组件，就用我们的，如果我们的组件有些不兼容，则和继超提交）。
2、每个人全权负责自己的一块内容，直至提测。
3、尽量只动自己的目录。
4、合并代码。（前几次继超会带，后面需要自己发送pullrequest）
5、绝对绝对不能直接提交master。开发新功能只能新建分支，开发完成后合并。


### UAT 2023/2/5 countdown
1、countdown组件一个
2、页面一个
3、测试页面：testCountDownComponentPage供大家做引入参考
4、备注，自己写的topBar可以单独拿出来封装，目前测试兼容性还可以，在countDownPage页面。

### 2023/3/2 score inquiry
 1.修改了代码规范。

### 2023/3/7（xiaowang）electric charge inquiry component
1.完成小组件功能。
2.修改代码规范。


图书馆的规范修改完成和合并了复制功能

### 2023/3/2 （xiaokai） score inquiry
 1.修改了代码规范。
### 2023/3/7（xiaokai） scoreCompont 
 1.渲染完成绩查询的小组件
 2.引入textCompont，用来测试
 2.修改规范

## 2023/4/13 (xiaokai) allSchedule
1.写完了全校课表，并通过了uat
## 2023/4/28(xiaokai) popup
1.删除了大部分代码，用更简洁的逻辑去实现。
2.只保留了少部分代码，只有保留了，你才能知道那是代码，而且比之前更简单
