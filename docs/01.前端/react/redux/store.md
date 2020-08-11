---
title: store
date: 2020-08-11 19:42:39
permalink: /pages/ab703c/
categories: 
  - react
  - redux
tags: 
  - 
---
### Redux Store 存储

- action 描述“发生了什么”

  action 描述“发生了什么”

- reducers 根据 action 更新 state

- Store 就是把它们联系到一起的对象

- Store 三大方法： getState()  dispatch(action)  subscribe(listener) 





### 创建store

```js
import { createStore } from 'redux'
import todoApp from './reducers'
let store = createStore(todoApp)
```







### 测试store

```js
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from './actions'
// 打印初始状态
console.log(store.getState())
```







### 更新打印日志

注意 `subscribe() `返回一个函数用来注销监听器

```js
let unsubscribe = store.subscribe(() =>
	console.log(store.getState())
)
```







### 发起一系列 action

```js
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))
```



### 停止监听 state 更新

```js
unsubscribe();
```



### 数据流

1、调用 `store.dispatch(action)`

2、调用 `createStore` 时传入的 reducer 函数

​    Store 会把两个参数传入 reducer： 当前的 state 树和 action

3、根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树

4、store 保存了根 reducer 返回的完整 state 树

5、所有订阅 `store.subscribe(listener)` 的监听器都将被调用，调用 `store.getState() `获得当前 state

6、如果使用 React-Redux 绑定库，这时应该调用 `component.setState(newState)` 来更新