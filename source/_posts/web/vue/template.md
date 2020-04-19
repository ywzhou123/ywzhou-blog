---
title: Vue Template 标签指令及属性
date: 2020-04-19 16:42:27
tags:
	- vue
categories:
	- Vue
---

## v-text
更新元素的 textContent。
```vue
    <span v-text="msg"></span>
    <span>{{msg}}</span>
```
## v-html

更新元素的 innerHTML 。
在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 XSS 攻击
```vue
<div v-html="html"></div>
```
## v-show

切换元素的 display CSS 属性
当条件变化时该指令触发过渡效果。

## v-if

根据表达式的值的真假条件渲染元素。
当条件变化时该指令触发过渡效果。
```vue
<div v-if="Math.random() > 0.5">
	Now you see me
</div>
<div v-else>
	Now you don't
</div>
```

## v-for

基于源数据多次渲染元素或模板块。
作用在`<template>`标签上时，key属性只能写在子标签上
```vue
<div v-for="(item, index) in items"  :key="item.id"></div>
<div v-for="(val, key) in object"></div>
<div v-for="(val, key, index) in object"></div>
```

## v-on

缩写：@
绑定事件监听器。
- .stop - 调用 event.stopPropagation()。
- .prevent - 调用 event.preventDefault()。
- .capture - 添加事件侦听器时使用 capture 模式。
- .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
- .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
- .native - 监听组件根元素的原生事件。
- .once - 只触发一次回调。
- .left - (2.2.0) 只当点击鼠标左键时触发。
- .right - (2.2.0) 只当点击鼠标右键时触发。
- .middle - (2.2.0) 只当点击鼠标中键时触发。
- .passive - (2.3.0) 以 { passive: true } 模式添加侦听器

在监听原生 DOM 事件时，方法以事件为唯一的参数。
```vue
    <!-- 方法处理器 -->
    <button v-on:click="doThis"></button>
    <!-- 内联语句 -->
    <button v-on:click="doThat('hello', $event)"></button>
    <!-- 缩写 -->
    <button @click="doThis"></button>
    <!-- 停止冒泡 -->
    <button @click.stop="doThis"></button>
    <!-- 阻止默认行为 -->
    <button @click.prevent="doThis"></button>
    <!-- 阻止默认行为，没有表达式 -->
    <form @submit.prevent></form>
    <!--  串联修饰符 -->
    <button @click.stop.prevent="doThis"></button>
    <!-- 键修饰符，键别名 -->
    <input @keyup.enter="onEnter">
    <!-- 键修饰符，键代码 -->
    <input @keyup.13="onEnter">
    <!-- 点击回调只会触发一次 -->
    <button v-on:click.once="doThis"></button>
    <!-- 对象语法 (2.4.0+) -->
    <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
在子组件上监听自定义事件
    <my-component @my-event="handleThis"></my-component>
    <!-- 内联语句 -->
    <my-component @my-event="handleThis(123, $event)"></my-component>
    <!-- 组件中的原生事件 -->
    <my-component @click.native="onClick"></my-component>
```

## v-bind
缩写：:
动态地绑定一个或多个特性
- .prop - 被用于绑定 DOM 属性 (property)。(差别在哪里？)
- .camel - (2.1.0+) 将 kebab-case 特性名转换为 camelCase. (从 2.1.0 开始支持)
- .sync (2.3.0+) 语法糖，会扩展成一个更新父组件绑定值的 v-on 侦听器。
```vue
        <!-- 绑定一个属性 -->
        <img v-bind:src="imageSrc">
    
        <!-- 内联字符串拼接 -->
        <img :src="'/path/to/images/' + fileName">
    
        <!-- class 绑定 -->
        <div :class="{ red: isRed }"></div>
        <div :class="[classA, classB]"></div>
        <div :class="[classA, { classB: isB, classC: isC }]">
    
        <!-- style 绑定 -->
        <div :style="{ fontSize: size + 'px' }"></div>
        <div :style="[styleObjectA, styleObjectB]"></div>
    
        <!-- 绑定一个有属性的对象 -->
        <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>
    
        <!-- 通过 prop 修饰符绑定 DOM 属性 -->
        <div v-bind:text-content.prop="text"></div>
    
        <!-- prop 绑定。“prop”必须在 my-component 中声明。-->
        <my-component :prop="someThing"></my-component>
    
        <!-- 通过 $props 将父组件的 props 一起传给子组件 -->
        <child-component v-bind="$props"></child-component>
    
        <!-- XLink -->
        <svg><a :xlink:special="foo"></a></svg>
        <svg :view-box.camel="viewBox"></svg>
```

## v-model
在表单控件或者组件上创建双向绑定。
限制` <input><select><textarea>`components
- .lazy - 取代 input 监听 change 事件, 即在输入框失焦时change值
- .number - 输入字符串转为有效的数字
- .trim - 输入首尾空格过滤

使用model自定义value和input，
```js
        const component = {
            model: {
                prop: 'value1',
                event:'change'
            },
            props:['value1']
            methods:{
                handleInput(e){
                    this.$emit('change', e.target.value)
                }
            }
        }
```
## v-pre

跳过这个元素和它的子元素的编译过程。
跳过大量没有指令的节点会加快编译。
```vue
<span v-pre>{{ this will not be compiled }}</span>
```
## v-cloak

这个指令保持在元素上直到关联实例结束编译。
基本用不到。

## v-once

只渲染元素和组件一次。
适用于静态组件，不会再去对比dom是否需要更新它。
```vue
    <!-- 单个元素 -->
    <span v-once>This will never change: {{msg}}</span>
    <!-- 有子元素 -->
    <div v-once>
        <h1>comment</h1>
        <p>{{msg}}</p>
    </div>
    <!-- 组件 -->
    <my-component v-once :comment="msg"></my-component>
    <!-- `v-for` 指令-->
    <ul>
        <li v-for="i in list" v-once>{{i}}</li>
    </ul>
```

## key

主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。
```vue
    <ul>
        <li v-for="item in items" :key="item.id">...</li>
    </ul>
```
可以用于强制替换元素/组件而不是重复使用它。
```vue
    <transition>
        <span :key="text">{{ text }}</span>
    </transition>
```
当 text 发生改变时，`<span>` 会随时被更新，因此会触发过渡。

## ref

给元素或子组件注册引用信息。
注册在父组件的 $refs 对象上。
```vue
    <!-- `vm.$refs.p` will be the DOM node -->
    <p ref="p">hello</p>

        <!-- `vm.$refs.child` will be the child component instance -->
        <child-component ref="child"></child-component>
```

## slot

用于标记往哪个具名插槽中插入子组件内容。

## slot-scope

用于将元素或组件表示为作用域插槽。
不支持动态绑定。

## is

用于动态组件且基于 DOM 内模板的限制来工作。
```vue
    <!-- 当 `currentView` 改变时，组件也跟着改变 -->
    <component v-bind:is="currentView"></component>

        <!-- 这样做是有必要的，因为 `<my-row>` 放在一个 -->
        <!-- `<table>` 内可能无效且被放置到外面 -->
        <table>
            <tr is="my-row"></tr>
        </table>
```