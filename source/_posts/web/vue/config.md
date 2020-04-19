---
title: VueConfig全局配置
date: 2020-04-19 16:00:22
tags:
---

## silent

​        boolean 
​        日志与警告

<!-- more -->

## optionMergeStrategies

​        { [key: string]: Function }
​        自定义合并策略的选项

## devtools

​        boolean
​        是否允许 vue-devtools 检查代码

## errorHandler

​        Function (err, vm, info) 
​        指定组件的渲染和观察期间未捕获错误的处理函数

```js
import Vue from 'vue'

Vue.config.errorHandler = function(err, vm, info) {
  Vue.nextTick(() => {
    if (process.env.NODE_ENV === 'development') {
      console.group('>>>>>> 错误信息 >>>>>>')
      console.log(info)
      console.groupEnd()
      console.group('>>>>>> Vue 实例 >>>>>>')
      console.log(vm)
      console.groupEnd()
      console.group('>>>>>> Error >>>>>>')
      console.log(err)
      console.groupEnd()
    }
  })
}
```



## warnHandler

​        Function (msg, vm, trace)
​        为 Vue 的运行时警告赋予一个自定义处理函数

## ignoredElements

​        Array<string | RegExp>
​        须使 Vue 忽略在 Vue 之外的自定义元素

## keyCodes

​        { [key: string]: number | Array<number> }
​        给 v-on 自定义键位别名

## performance

​        boolean
​        启用对组件初始化、编译、渲染和打补丁的性能追踪

## productionTip   

​        阻止 vue 在启动时生成生产提示