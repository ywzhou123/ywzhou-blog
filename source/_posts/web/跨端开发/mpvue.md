---
title: mpvue框架
date: 2020-04-19 19:20:59
tags:
    - vue
    - mpvue
categories:
    - [web, 跨端开发]
---
基于vue开发微信小程序和h5
http://mpvue.com/change-log/
https://github.com/F-loat/mpvue-router-patch




## 编译H5

### 打包处理

通过vue init webpack my-project 生成h5项目
将build目录、config目录复制过来并在名称后加H5
将src下的main.js和App.vue复制过来并在名称后加H5
在indexH5.html中加移动端meta
修改buildH5、configH5中的相关目录路径
对比package.json，安装h5需要的包
修改.postcssrc.js，判断wx还是h5加载不同的css插件
在.babelrc中增加h5的相关插件

### 单位处理

UI稿一般使用750px宽设计，直接在样式中使用px单位
wx使用px2rpx-loader自动转为微信小程序单位rpx
h5使用px2rem-loader自动转为移动端自适应单位rem
修改build/utils.js中的px2rpxLoader的rpxUnit转换率为1
修改buildH5/utils.js增加px2remLoader

### 路由处理

统一使用方法
通过this.$router跳转
通过this.$route获取当前路由信息
统一路由地址
根据pages目录，如/pages/index/main
wx使用mpvue-router-patch
不需要配置统一配置路由
h5使用vue-router
需要配置router.js

### 存储处理

mpvue支持vuex，但wx使用时需要挂载到Vue原型上来使用

### 请求处理

不使用wx.request，统一使用flyio

### wx API处理

尽量不使用
根据是否有window对象判断是wx还是h5，分别处理

### wx 组件处理
tabbar h5使用自定义组件，wx在app.json中定义小程序的tabbar
swiper 使用第三方的，如swiper.js
video 尽量使用h5原生的一些属性值

对于微信的scroll-view需要配置
::-webkit-scrollbar{
width: 0;
height: 0;
color: transparent;
}

h5使用better-scroll，因为监听不到原生的scrollTop




小程序 API 自动补全和类型提示，可以通过引入 wechat-mp-types 这个 TS 声明库来实现。
自动补全，代码片段的话也有 mpvue-snippets 库。
组件封装，我正在带一个叫 mpvue-starter 的库。里面正在做 weui 组件 + vue + 小程序组件的封装。
加入 mpex 包， 为你的小程序开发助力