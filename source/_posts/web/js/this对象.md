---
title: es6语法
date: 2020-04-19 18:03:36
tags:
categories:
    - js
---

随着函数使用场合不同，this的值会发生变化
this指的是调用函数的那个对象


this的指向
this表示当前对象，this的指向是根据调用的上下文来决定的，默认指向window对象

## 1、全局作用域下，this指向window


```js
function func(){
    console.log(this) ;//this指向的还是window对象
}
func();
```


## 2、对象函数调用，哪个对象调用就指向哪个对象


```html
<input type="button"id="btnOK" value="OK">
<script>
varbtnOK=document.getElementById("btnOK");
btnOK.onclick=function(){
    console.log(this);//this指向的是btnOK对象
}
</script>
```


## 3、使用 new 实例化对象，在构造函数中的this指向实例化对象。

```js
var Show=function(){
    this.myName="Mr.Cao"; //这里的this指向的是obj对象
}
var obj=new Show();

```

## 4、使用call或apply改变this的指向


```js
var Go=function(){
    this.address="深圳";
}
var Show=function(){
    console.log(this.address);//输出 深圳
}
var go=new Go();
Show.call(go);//改变Show方法的this指向go对象
```
