---
title: Vue Api
date: 2020-04-19 14:51:23
tags:
    - vue
    - vue api
categories:
    - Vue
---

## 全局API

###  Vue.extend( options )

继承，使用基础 Vue 构造器，创建一个“子类”。

<!-- more -->

```vue
  // 创建构造器
  var Profile = Vue.extend({
    template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
    data: function () {
      return {
        firstName: 'Walter',
        lastName: 'White',
        alias: 'Heisenberg'
      }
    }
  })
  // 创建 Profile 实例，并挂载到一个元素上。
  new Profile().$mount('#mount-point')
```
- 可以传入vue选项，传props用propsData，选项会合并，
- 但生命周期方法都会被调用

### Vue.nextTick( [callback, context] )

- 在下次 DOM 更新循环结束之后执行延迟回调。
- 在修改数据之后立即使用这个方法，获取更新后的 DOM。

```vue
  // 修改数据
  vm.msg = 'Hello'
  // DOM 还没有更新
  Vue.nextTick(function () {
  	// DOM 更新了
  })

  // 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
  Vue.nextTick()
  .then(function () {
  	// DOM 更新了
  })
```

### Vue.set( target, key, value )

> 向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。


### Vue.delete( target, key )

> 删除对象的属性。

### Vue.directive( id, [definition] )

> 注册或获取全局指令。

```vue
  // 注册
  Vue.directive('my-directive', {
    bind: function () {},
    inserted: function () {},
    update: function () {},
    componentUpdated: function () {},
    unbind: function () {}
  })

  // 注册 (指令函数)
  Vue.directive('my-directive', function () {
  	// 这里将会被 `bind` 和 `update` 调用
  })

  // getter，返回已注册的指令
  var myDirective = Vue.directive('my-directive')
```

### Vue.filter( id, [definition] )

> 注册或获取全局过滤器。

```vue
  // 注册
  Vue.filter('my-filter', function (value) {
  	// 返回处理后的值
  })

  // getter，返回已注册的过滤器
  var myFilter = Vue.filter('my-filter')
```

### Vue.component( id, [definition] )
> 注册或获取全局组件。

```vue
  // 注册组件，传入一个扩展过的构造器
  Vue.component('my-component', Vue.extend({ /* ... */ }))

  // 注册组件，传入一个选项对象 (自动调用 Vue.extend)
  Vue.component('my-component', { /* ... */ })

  // 获取注册的组件 (始终返回构造器)
  var MyComponent = Vue.component('my-component')
```

### Vue.use( plugin )

> 安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。
> 需要在调用 new Vue() 之前被调用。


### Vue.mixin( mixin )

> 全局注册一个混入，影响注册之后所有创建的每个 Vue 实例。
> 不推荐在应用代码中使用。


### Vue.compile( template )

> 在 render 函数中编译模板字符串。只在独立构建时有效

```vue
  var res = Vue.compile('<div><span>{{ msg }}</span></div>')

  new Vue({
  	data: {
      msg: 'hello'
    },
    render: res.render,
    staticRenderFns: res.staticRenderFns
  })
```



## 实例属性

在组件内部，this指向vm实例

### vm.$data
观察的数据对象

### vm.$props
接收到的 props 对象

### vm.$el
使用的根 DOM 元素

### vm.$options
初始化选项

### vm.$parent
父实例，有的话

### vm.$root
根 Vue 实例，通常是`<APP/>`

### vm.$children
直接子组件
不保证顺序，也不是响应式的

### vm.$slots
用来访问被插槽分发的内容。
每个具名插槽 有其相应的属性
default 属性包括了所有没有被包含在具名插槽中的节点。

### vm.$scopedSlots
用来访问作用域插槽。

### vm.$refs
一个对象，持有注册过 ref 特性 的所有 DOM 元素和组件实例
子组件引用

### vm.$isServer
是否运行于服务器
服务端渲染

### vm.$attrs
包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。
可以通过 v-bind="$attrs" 传入内部组件

### vm.$listeners
包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。
可以通过 v-on="$listeners" 传入内部组件


## 实例方法 / 数据
### vm.$watch
> 观察 Vue 实例变化的一个表达式或计算属性函数。
> 
```
// 键路径
var unwatch = vm.$watch('a.b.c', function (newVal, oldVal) {
	// 做点什么
	},{
    deep: true,
    immediate: true
	}
)

// 函数
var unwatch = vm.$watch(
  function () {
  	return this.a + this.b
  },
  function (newVal, oldVal) {
  	// 做点什么
  }
}
```
- unwatch() 	返回一个取消观察函数，用来停止触发回调
- deep    		 为了发现对象内部值的变化
- immediate     将立即以表达式的当前值触发回调
- 
### vm.$set
    全局 Vue.set 的别名
```vue
    vm.$set(vm.obj,'a','123')
```
### vm.$delete
    全局 Vue.delete 的别名


## 实例方法 / 事件
### vm.$on
监听当前实例上的自定义事件。
可以由vm.$emit触发。
```vue
vm.$on('test', function (msg) {
	console.log(msg)
})
vm.$emit('test', 'hi')
// => "hi"
```

### vm.$once
监听一个自定义事件，但是只触发一次
触发之后移除

### vm.$off
移除自定义事件监听器。
如果没有提供参数，则移除所有的事件监听器

### vm.$emit
触发当前实例上的事件
```vue
  <button v-on:click="$emit('welcome')">
  vm.$emit('welcome', 'hello')
```

## 实例方法 / 生命周期
### vm.$mount
实例未挂载时可以手动地挂载一个未挂载的实例

```vue
var MyComponent = Vue.extend({
	template: '<div>Hello!</div>'
})

// 创建并挂载到 #app (会替换 #app)
new MyComponent().$mount('#app')
```

### vm.$forceUpdate

强制更新
仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

### vm.$nextTick
将回调延迟到下次 DOM 更新循环之后执行。
```vue
new Vue({
  // ...
  methods: {
    // ...
    example: function () {
      // 修改数据
      this.message = 'changed'
      // DOM 还没有更新
      this.$nextTick(function () {
        // DOM 现在更新了
        // `this` 绑定到当前实例
        this.doSomethingElse()
      })
    }
  }
})
```

### vm.$destroy
完全销毁一个实例。
触发 beforeDestroy 和 destroyed 的钩子。