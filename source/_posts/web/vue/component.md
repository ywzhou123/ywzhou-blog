---
title: Vue组件
date: 2020-04-19 15:48:29
tags:
    - vue
    - component
categories:
    - Vue
---

## 内置的组件
### `<component></component>`
渲染一个“元组件”为动态组件。
依 is 的值，来决定哪个组件被渲染。

<!-- more -->

```vue
<!-- 动态组件由 vm 实例的属性值 `componentId` 控制 -->
<component :is="componentId"></component>

<!-- 也能够渲染注册过的组件或 prop 传入的组件 -->
<component :is="$options.components.child"></component>
```

### `<transition></transition>`
作为单个元素/组件的过渡效果。

#### Props：
- name - string，用于自动生成 CSS 过渡类名。例如：name: 'fade' 将自动拓展为.fade-enter，.fade-enter-active等。默认类名为 "v"
- appear - boolean，是否在初始渲染时使用过渡。默认为 false。
- css - boolean，是否使用 CSS 过渡类。默认为 true。如果设置为 false，将只通过组件事件触发注册的 JavaScript 钩子。
- type - string，指定过渡事件类型，侦听过渡何时结束。有效值为 "transition" 和 "animation"。默认 Vue.js 将自动检测出持续时间长的为过渡事件类型。
- mode - string，控制离开/进入的过渡时间序列。有效的模式有 "out-in" 和 "in-out"；默认同时生效。
- enter-class - string
- leave-class - string
- appear-class - string
- enter-to-class - string
- leave-to-class - string
- appear-to-class - string
- enter-active-class - string
- leave-active-class - string
- appear-active-class - string
- 
#### 事件：
- before-enter
- before-leave
- before-appear
- enter
- leave
- appear
- after-enter
- after-leave
- after-appear
- enter-cancelled
- leave-cancelled (v-show only)
- appear-cancelled

```vue
        <!-- 简单元素 -->
        <transition>
            <div v-if="ok">toggled content</div>
        </transition>
    
        <!-- 动态组件 -->
        <transition name="fade" mode="out-in" appear>
            <component :is="view"></component>
        </transition>
    
        <!-- 事件钩子 -->
        <div id="transition-demo">
            <transition @after-enter="transitionComplete">
                <div v-show="ok">toggled content</div>
            </transition>
        </div>
        new Vue({
            ...
            methods: {
                transitionComplete: function (el) {
                    // 传入 'el' 这个 DOM 元素作为参数。
                }
            }
            ...
        }).$mount('#transition-demo')
```

### `<transition-group></transition-group>`
作为多个元素/组件的过渡效果。
是一个抽象组件

#### Props：
- tag - string，默认为 span
- move-class - 覆盖移动过渡期间应用的 CSS 类。
- 除了 mode，其他特性和 <transition> 相同。

### `<keep-alive></keep-alive>`
包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
主要用于保留组件状态或避免重新渲染。
是一个抽象组件
在其中有 v-for 则不会工作。 

```vue
<!-- 基本 -->
<keep-alive>
	<component :is="view"></component>
</keep-alive>

<!-- 多个条件判断的子组件 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>

<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive>
  	<component :is="view"></component>
  </keep-alive>
</transition>   
```
#### Props：
- include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
- exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
- max - 数字。最多可以缓存多少组件实例。
```vue
<!-- 逗号分隔字符串 -->
<keep-alive include="a,b">
	<component :is="view"></component>
</keep-alive>

<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
	<component :is="view"></component>
</keep-alive>

<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
	<component :is="view"></component>
</keep-alive>  

<keep-alive :max="10">
	<component :is="view"></component>
</keep-alive>
```

### `<slot></slot>`
- 作为组件模板之中的内容分发插槽。
- `<slot>` 元素自身将被替换。
```vue
	// <base-layout>组件
        <div class="container">
            <header>
                <slot name="header"></slot>
            </header>
            <main>
                <slot></slot>
            </main>
            <footer>
                <slot name="footer"></slot>
            </footer>
        </div>
```
```vue
        //引用base-layout组件进行插入
        <base-layout>
            <template slot="header">
                <h1>Here might be a page title</h1>
            </template>
    
            <p>A paragraph for the main content.</p>
            <p>And another one.</p>
    
            <template slot="footer">
                <p>Here's some contact info</p>
            </template>
        </base-layout>
```

- slot-scope作用域插槽, 调取引用组件内部的数据
```vue
        //todo-list组件
        <ul>
            <li
                v-for="todo in todos"
                v-bind:key="todo.id"
            >
                <!-- 我们为每个 todo 准备了一个插槽，-->
                <!-- 将 `todo` 对象作为一个插槽的 prop 传入。-->
                <slot v-bind:todo="todo">
                <!-- 回退的内容 -->
                {{ todo.text }}
                </slot>
            </li>
        </ul>
```

```vue
        //引用todo-list
        <todo-list v-bind:todos="todos">
            <!-- 将 `slotProps` 定义为插槽作用域的名字 -->
            <template slot-scope="slotProps">
                <!-- 也可以用解构方法 <template slot-scope="{ todo }"> -->
                <!-- 为待办项自定义一个模板，-->
                <!-- 通过 `slotProps` 定制每个待办项。-->
                <span v-if="slotProps.todo.isComplete">✓</span>
                {{ slotProps.todo.text }}
            </template>
        </todo-list>
```

```vue
        const component = {
            template:`
                <div>
                    <slot value='123' abc='456'></slot>
                </div>
            `,
            
        }
        new Vue({
            el: '#root',
            components:{
                CompOne: component
            },
            data:{
                value: '000'
            },
            template:  `
                <div>
                    <comp-one>
                        <span slot-scope="props">{{props.value}} {{props.abc}} {{value}}</span>
                    </comp-one>
                </div>
            `
        })
```