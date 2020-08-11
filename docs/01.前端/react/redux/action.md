---
title: action
date: 2020-08-11 19:42:39
permalink: /pages/2b00c0/
categories: 
  - react
  - redux
tags: 
  - 
---
## Redux Action 动作

- 是把数据从应用传到 store 的有效载荷
- 是 store 数据的唯一来源
- 通过 store.dispatch(action) 将 action 传到 store



### 类型 

定义action type 表示将要执行的动作

```js
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
```

其它的常量

```jsx
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
	SHOW_ACTIVE: 'SHOW_ACTIVE'
}
```





### 创建函数

```jsx
export function addTodo(text) {
  return { type: ADD_TODO, text }
}

export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
```





### 广义action



- 在中间件的支持下，dispatch 可调用普通action外，还有 thunk, promise 等。

 \* 广义action：在中间件的支持下，dispatch 可调用普通action外，还有 thunk, promise 等。

- thunk写法为：`(dispatch,getState) => {}`，可以dispatch这个thunk



```jsx
import fetch from 'isomorphic-fetch'
let actions = {
    //注意这里需要 () => ... , 不然 fetchGetMemInfo 不是一个actionCreator, 而是一个thunk 
    fetchGetMemInfo: () => (dispatch, getState) => {
        /**  getState()可以获取整个store中存储的state树
         * MemberOrganizRedu表示合并reducer中定义的分支部分
         */
        let { MemberOrganizRedu } = getState();
        dispatch(actions.beginLoad(true));
        fetch(`http://172.16.1.70:9092/Employees/V1.0/employees/getDetail`)
            .then(response => response.json())
            .then(json => dispatch(actions.getMemInfo(json)))
            .catch(e => console.log(e))
    },

    //action 创建函数 新写法
    getMemInfo: json => ({
        type: AT.GETMEMINFO,
        payload: json,
        isLoading: false,
    }),
    beginLoad: (load) => ({
        type: AT.BEGINLOAD,
        isLoading: load,
    }),

    //可以将action直接写在dispatch参数中
    fetchHandOver: (param) => (dispatch, getState) => {
        dispatch({
            type: AT.ADMIN_HAND_LOADING,
        });
        return ReqApi.post({
            url: MemberUrls.HAND_OVER,
            pm: param //可以传参数给后端
        }).then((json) => {
            if (json.successed)
                dispatch({ type: AT.ADMIN_HAND_COMPLETE })
            return json; //可以将结果return，其他地方继续处理
        });

    },

    //可以将对象解构
    visibleDialog: (visible, param = {}) => {
        return {
            type: AT.ADMIN_HEND_VISIBLE,
            visible,
            ...param
        }
    },
}
```



