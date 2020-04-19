---
title: Vue 选项
date: 2020-04-19 16:26:59
tags:
	- vue
	- vue options
categories:
	- Vue
---

# 选项 数据

## data

​        实例接受 object
​        组件的定义只接受 function
​        可以通过 `vm.$data `访问原始数据对象
​        访问 `vm.a `等价于访问 `vm.$data.a`， 不能是_a或$开头的

```js
        var data = { a: 1 }
				// 直接创建一个实例
        var vm = new Vue({
            data: data
        })
        vm.a // => 1
        vm.$data === data // => true

        // Vue.extend() 中 data 必须是函数
        var Component = Vue.extend({
            data: function () {
                return { a: 1 }
            }
        })
```


## props属性
数组或对象，用于接收来自父组件的数据。
```js
            // 简单语法
            Vue.component('props-demo-simple', {
                props: ['size', 'myMessage']
            })
    
            // 对象语法，提供校验
            Vue.component('props-demo-advanced', {
                props: {
                    // 检测类型
                    height: Number,
                    // 检测类型 + 其他验证
                    age: {
                        type: Number,
                        default: 0,
                        required: true,
                        validator: function (value) {
                            return value >= 0
                        }
                    }
                }
            })
```

## propsData属性
- 创建实例时传递 props。主要作用是方便测试。
- 只用于 new 创建的实例中
```js
            var Comp = Vue.extend({
                props: ['msg'],
                template: '<div>{{ msg }}</div>'
            })
    
            var vm = new Comp({
                propsData: {
                    msg: 'hello'
                }
            })
```

## computed计算
计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。
```js
            var vm = new Vue({
                data: { a: 1 },
                computed: {
                    // 仅读取
                    aDouble: function () {
                        return this.a * 2
                    },
                    // 读取和设置
                    aPlus: {
                        get: function () {
                            return this.a + 1
                        },
                        set: function (v) {
                            this.a = v - 1
                        }
                    }
                }
            })
            vm.aPlus   // => 2
            vm.aPlus = 3
            vm.a       // => 2
            vm.aDouble // => 4
```

## methods方法
- 可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。
- 不应该使用箭头函数来定义 method 函数
```js
            var vm = new Vue({
                data: { a: 1 },
                methods: {
                    plus: function () {
                        this.a++
                    }
                }
            })
            vm.plus()
            vm.a // 2
```

## watch监听
- 一个对象，键是需要观察的表达式，值是对应回调函数。
- 值也可以是方法名，或者包含选项的对象。
- 不应该使用箭头函数来定义 watcher 函数
```js
            var vm = new Vue({
                data: {
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4,
                    e: {
                        f: {
                            g: 5
                        }
                    }
                },
                watch: {
                    a: function (val, oldVal) {
                        console.log('new: %s, old: %s', val, oldVal)
                    },
                    // 方法名
                    b: 'someMethod',
                    // 深度 watcher
                    c: {
                        handler: function (val, oldVal) { /* ... */ },
                        deep: true
                    },
                    // 该回调将会在侦听开始之后被立即调用
                    d: {
                        handler: function (val, oldVal) { /* ... */ },
                        immediate: true
                    },
                    e: [
                        function handle1 (val, oldVal) { /* ... */ },
                        function handle2 (val, oldVal) { /* ... */ }
                    ],
                    // watch vm.e.f's value: {g: 5}
                    'e.f': function (val, oldVal) { /* ... */ }
                }
            })
            vm.a = 2 // => new: 2, old: 1
```

# DOM元素

## el
提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。
只在由 new 创建的实例中遵守。
元素可以用 vm.$el 访问。

## template
一个字符串模板作为 Vue 实例的标识使用。模板将会 替换 挂载的元素。
    
## render
字符串模板的代替方案
该渲染函数接收一个 createElement 方法作为第一个参数用来创建 VNode。
templateu将失效
```js
            template =  `
                <comp-one ref='comp'>
                    <span ref='span'>{{value}}</span>
                </comp-one>
            `
```
相当于
```js
            render(createElement){
                return createElement( //根节点
                    'comp-one',  
                    {
                        ref: 'comp',
                        // props: {
                        //     props1: this.value
                        // },
                        // on: {
                        //     click: this.handleClick
                        // }
                    }, 
                    [
                        //多个子节点
                        createElement('span',{
                            ref:'span'，
                            // slot: 'header',
                            // domProps:{
                            //     innerHTML: '<span>aaa</span>'
                            // },
                            // attrs:{
                            //     id:'test-id'
                            // }
                        }),
                        this.value
                    ]
                )
            }
```

## renderError
当 render 函数遭遇错误时，提供另外一种渲染输出。
```js
            new Vue({
                render (h) {
                    throw new Error('oops')
                },
                renderError (h, err) {
                    return h('pre', { style: { color: 'red' }}, err.stack)
                }
            }).$mount('#app')
```

# 生命周期
不能使用箭头函数来定义一个生命周期方法

## beforeCreate
在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。

## created
在实例创建完成后被立即调用。
完成了 数据观测，属性和方法的运算，watch/event 事件回调。
但未挂载到$el上
    
## beforeMount
在挂载开始之前被调用，render首次调用
该钩子在服务器端渲染期间不被调用。
    
## mounted
el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
该钩子在服务器端渲染期间不被调用。
你希望等到整个视图都渲染完毕, 可以用 vm.$nextTick
```js
            mounted: function () {
                this.$nextTick(function () {
                    // Code that will run only after the
                    // entire view has been rendered
                })
            }
````

## beforeUpdate
数据更新时调用
该钩子在服务器端渲染期间不被调用
    
## updated
由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
该钩子在服务器端渲染期间不被调用。
你希望等到整个视图都渲染完毕, 可以用 vm.$nextTick

```js
            updated: function () {
                this.$nextTick(function () {
                    // Code that will run only after the
                    // entire view has been re-rendered
                })
            }
```
## activated
keep-alive 组件激活时调用。
该钩子在服务器端渲染期间不被调用。
    
## deactivated
keep-alive 组件停用时调用。 
该钩子在服务器端渲染期间不被调用。


## beforeDestroy
实例销毁之前调用。在这一步，实例仍然完全可用。
该钩子在服务器端渲染期间不被调用。
    
## destroyed
Vue 实例销毁后调用。
该钩子在服务器端渲染期间不被调用。
    
## errorCaptured
(err: Error, vm: Component, info: string) => ?boolean
当捕获一个来自子孙组件的错误时被调用。
返回 false 以阻止该错误继续向上传播。




# 资源

## directives
自定义指令表

## filters
过滤器表

## components
可用组件表
    

# 组合
## parent
指定父实例，建立父子关系。
子实例可以用 this.$parent 访问父实例，
子实例被推入父实例的 $children 数组中。
更推荐用 props 和 events 实现父子组件通信
    
## mixins
混入对象的数组。
```js
            var mixin = {
                created: function () { console.log(1) }
            }
            var vm = new Vue({
                created: function () { console.log(2) },
                mixins: [mixin]
            })
            // => 1
            // => 2
```


## extends
扩展另一个组件
```js
            var CompA = { ... }
    
            // 在没有调用 `Vue.extend` 时候继承 CompA
            var CompB = {
                extends: CompA,
                ...
            }
```
## provide / inject
上下文关系，类似于context
不推荐直接用于应用程序代码中。

```js
            // 父级组件提供 'foo'
            var Provider = {
                provide: {
                    foo: 'bar'
                },
                // ...
            }
    
            // 子组件注入 'foo', 但不是响应式的
            var Child = {
                inject: ['foo'],
                created () {
                    console.log(this.foo) // => "bar"
                }
                // ...
            }
```
使用get()方法使用provide传递的值会响应到子孙后代
```js
            new Vue=({
                provide(){
                    const data = {}
                    Object.defineProperty(data, 'value', {
                        get:()=>this.value,
                        enumerable: true
                    })
                    return data
                }
            })
```