---
title: new操作符做了啥？
date: 2020-04-19 18:03:28
tags:
    - new
categories:
    - Js
---

### 第一步
```js
var obj = {};
```
创建一个空对象
this 变量引用该对象

### 第二步
```js
obj.__proto__ = Base.prototype;
```
属性和方法被加入到 this 引用的对象中

### 第三步
```js
Base.call(obj);
```

新创建的对象由 this 所引用
最后隐式的返回 this