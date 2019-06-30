# Front-End

## [文档链接](https://github.com/the-earn-money-system/Document/blob/master/SE-308document.md)

项目目录说明

```
|__Earn-Money-System
    |__miniprogram  //小程序文件目录
        |__images //图片
        |__style
        |__utils //模块化后的公共代码
        |__app.js   //小程序的主体逻辑以及初始化
        |__app.json //小程序的全局配置
        |__app.wxss //公共样式
        |__sitemap.json
        |__pages    //页面
            |__AccountBalance   //账户页面文件夹，包含页面自身的js、wxss、wxml、json，下同
                |__AccountBalance.js
                |__AccountBalance.json
                |__AccountBalance.wxml
                |__AccountBalance.wxss
            |__HeadPortraitModify   //个人信息修改
                |__...
            |__MissionDetail    //任务详情
                |__...
            |__MissionSubmit    //发布任务
                |__...
            |__MissonSubmitComplete //发布任务完成
                |__...
            |__ModifyInfo   //修改机构信息
                |__...
            |__QuestionDetail   //问卷细节
                |__...
            |__Signin   //用户登录
                |__...
            |__WeChatSignin //微信授权登陆
                |__...
            |__logs //日志
                |__...
            |__main //主页面
                |__...
    |__cloudfunctions   //云开发相关目录
        |__acceptMission    //云函数文件夹，包含index.js以及package.json，下同
            |__index.js     //云函数JavaScript部分
            |__package.json //云函数配置数据
        |__MissionOrQuestion
            |__...
        |__addAccount
            |__...
        |__addMission
            |__...
        |__addUser
            |__...
        |__bonus
            |__...
        |__getAcceptedMission
            |__...
        |__getInstitude
            |__...
        |__getMission
            |__...
        |__getPublishedMission
            |__...
        |__getUserInfo
            |__...
        |__login
            |__...
        |__openapi
            |__...
        |__searchMission
            |__...
        |__updataMission
            |__...
        |__updataMissionState
            |__...
        |__updataMyAccept
            |__...
        |__updataMyPublish
            |__...
        |__updataQuestion
            |__...
        |__updataState
            |__...
        |__updataUser
            |__...
```
