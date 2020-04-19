---
title: Vue SSR
date: 2020-04-19 19:26:42
tags:
    - vue
    - ssr
categories:
    - [web, vue]
---
# 一、vue ssr 服务端渲染

只能在 Node.js 中使用

[官网](https://ssr.vuejs.org/zh/guide/)


## 1、安装
```
npm install vue vue-server-renderer --save
```

## 2、示例

```javascript
const Vue = require('vue')
const app = new Vue({
template: `<div>Hello World</div>`
})

const renderer = require('vue-server-renderer').createRenderer()

renderer.renderToString(app, (err, html) => {
if (err) throw err
console.log(html)
// => <div data-server-rendered="true">Hello World</div>
})

renderer.renderToString(app).then(html => {
console.log(html)
}).catch(err => {
console.error(err)
})
```

## 3、服务端
```
npm install express --save
```