---
title: nuxt框架
date: 2020-04-19 19:26:03
tags:
    - vue
    - nuxt
    - ssr
categories:
    - [web, vue]
---
# 一、nuxt.js
vue ssr框架
支持vue2 vue-router vuex vue-meta
[官网](https://zh.nuxtjs.org)
[示例](https://github.com/nuxt-community/koa-template)

## 1、安装

```
npm i -g npx
npx create-nuxt-app project
```

## 2、使用
mounted方式不在ssr中渲染，改用asyncData()
fetch()用于提交vuex数据

