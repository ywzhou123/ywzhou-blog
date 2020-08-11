---
title: Immutable
date: 2020-04-19 19:56:21
tags: tool
categories: tool
permalink: /pages/1d9a6f/
---

## 一、介绍

- [Immutable](https://facebook.github.io/immutable-js/) 是一个可实现持久数据结构的 JavaScript 库。

- 它性能很好，并且命名符合 JavaScript API 的语言习惯

- Map 和 List 对应原生 Object 和 Array

  

## 二、安装

`npm install immutable -S`



## 三、使用

`import { Map, List, Seq, fromJS, is } from 'immutable';`



### 设置和取值

```js
var map1 = Map({ a: 1, b: 2, c: 3 });
var map2 = map1.set('b', 50);
map1.get('b'); // 2
map2.get('b'); // 50
foo = fromJS({ a: { b: 1 } });
bar = foo.setIn(['a', 'b'], 2); // 使用 setIn 赋值
console.log(foo.getIn(['a', 'b'])); // 使用 getIn 取值，打印 1
console.log(foo === bar); //  打印 false

let a = Map({
    select: 'users',
    filter: Map({ name: 'Cam' })
})
let b = a.set('select', 'people');
a === b; // false
a.get('filter') === b.get('filter'); // true
```



### key value 处理

```js
var alpha = Map({ a: 1, b: 2, c: 3, d: 4 });
alpha.map((v, k) => k.toUpperCase()).join();
// 'A,B,C,D'
```



### 合并


```js
var map1 = Map({ a: 1, b: 2, c: 3, d: 4 });
var map2 = Map({ c: 10, a: 20, t: 30 });
var obj = { d: 100, o: 200, g: 300 };
var map3 = map1.merge(map2, obj);
// Map { a: 20, b: 2, c: 10, d: 100, t: 30, o: 200, g: 300 }
var myObject = { a: 1, b: 2, c: 3 };
Seq(myObject).map(x => x * x).toObject();
// { a: 1, b: 4, c: 9 }
```



### 和对象获取K值的区别，key会将num转为str

   

```js
var obj = { 1: "one" };
Object.keys(obj); // [ "1" ]
obj["1"]; // "one"
obj[1]; // "one"
var map = fromJS(obj); //对象转MAP
map.get("1"); // "one"
map.get(1); // undefined
```



### 转换 

```js
var deep = Map({ a: 1, b: 2, c: List.of(3, 4, 5) });
deep.toObject() // { a: 1, b: 2, c: List [ 3, 4, 5 ] }
deep.toArray() // [ 1, 2, List [ 3, 4, 5 ] ]
deep.toJS() // { a: 1, b: 2, c: [ 3, 4, 5 ] }
JSON.stringify(deep) // '{"a":1,"b":2,"c":[3,4,5]}'
```



### 嵌套结构

```js
// mergeDeep, getIn, setIn, and updateIn
var nested = fromJS({ a: { b: { c: [3, 4, 5] } } });
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ] } } }
var nested2 = nested.mergeDeep({ a: { b: { d: 6 } } });
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 6 } } }
nested2.getIn(['a', 'b', 'd']); // 6
var nested3 = nested2.updateIn(['a', 'b', 'd'], value => value + 1);
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 7 } } }
var nested4 = nested3.updateIn(['a', 'b', 'c'], list => list.push(6));
// Map { a: Map { b: Map { c: List [ 3, 4, 5, 6 ], d: 7 } } }
```



### 比较对象的值

```js
var map1 = Map({ a: 1, b: 1, c: 1 });
var map2 = Map({ a: 1, b: 1, c: 1 });
assert(map1 !== map2); // two different instances
assert(is(map1, map2)); // have equivalent values
assert(map1.equals(map2)); // alternatively use the equals method
```



### 判断数据是否变化



```js
import { is } from 'immutable';
shouldComponentUpdate(nextProps = {}, nextState = {}) {
    const thisProps = this.props || {},
        thisState = this.state || {};

    if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
        Object.keys(thisState).length !== Object.keys(nextState).length) {
        return true;
    }

    for (const key in nextProps) {
        if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
            return true;
        }
    }

    for (const key in nextState) {
        if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
            return true;
        }
    }
    return false;
};
```



### 列表对象

​    

```js
var list1 = List.of(1, 2); //list1.get(0)取得1
var list2 = list1.push(3, 4, 5);
var list3 = list2.unshift(0);
var list4 = list1.concat(list2, list3);

var list1 = List.of(1, 2, 3);
var list2 = list1.withMutations(function(list) {
    list.push(4).push(5).push(6);
});
assert(list1.size === 3);
assert(list2.size === 6);
```



### Cursor游标，访问深层对象

   

```js
import Cursor from 'immutable/contrib/cursor';
let data = fromJS({ a: { b: { c: 1 } } });
// 让 cursor 指向 { c: 1 }
let cursor = Cursor.from(data, ['a', 'b'], newData => {
    // 当 cursor 或其子 cursor 执行 update 时调用
    console.log(newData);
});

cursor.get('c'); // 1
cursor = cursor.update('c', x => x + 1);
cursor.get('c'); // 2
```



### fromJS转成MAP，toJS转成对象

```js
const Apple = (state = initstate, action) => {
  switch (action.type) {
    case "EAT_APPLE":
      //这里只对state中的apples数组对象中单个成员action.id的isEaten属性修改成true
      return fromJS(state).setIn(['apples', action.id, 'isEaten'], true).toJS();
  }
}
```



### Map对象方法 updateIn()    set()   setIn()

​    

```js
nextState = state.updateIn([action.from.id, 'props', 'children'], c => c.splice(action.from.index, 1));

nextState = nextState.updateIn([action.to.id, 'props', 'children'], c => c.splice(action.to.index, 0, action.item));

nextState = state.setIn([action.id, 'props', key], value);

nextState = state.set(action.item.id, action.item).updateIn([action.id, 'props', 'children'], c => c.splice(action.index, 0, action.item.id));

nextState = state.updateIn([action.parentId, 'props', 'children'], c => c.splice(action.index, 1));
```



### 深度删除



```js
const deepRemove = (state: any, id: string): any => {
    const children = state.getIn([id, 'props', 'children']);
    if (children) {
        children.forEach(c => {
            state = deepRemove(state, c);
        });
    }
    return state.delete(id);
};
```



### state的用法

```js
getInitialState() {
  return {
    data: Map({ times: 0 })
  }
},
handleAdd() {
  this.setState(({ data }) => ({
      data: data.update('times', v => v + 1)
    })
	});
}
```



​    



### 实现一个类似带有添加和撤销功能的 Store



```js
import { Map, OrderedMap } from 'immutable';

let todos = OrderedMap();
let history = []; // 普通数组，存放每次操作后产生的数据

let TodoStore = createStore({
    getAll() { return todos; }
});

Dispatcher.register(action => {
    if (action.actionType === 'create') {
        let id = createGUID();
        history.push(todos); // 记录当前操作前的数据，便于撤销
        todos = todos.set(id, Map({
            id: id,
            complete: false,
            text: action.text.trim()
        }));
        TodoStore.emitChange();
    } else if (action.actionType === 'undo') {
        // 这里是撤销功能实现，
        // 只需从 history 数组中取前一次 todos 即可
        if (history.length > 0) {
            todos = history.pop();
        }
        TodoStore.emitChange();
    }
});
```



### 与 Redux 搭配使用

- 由于 Redux 中内置的 `combineReducers` 和 reducer 中的 `initialState` 都为原生的 Object 对象，所以不能和 Immutable 原生搭配使用。
- 幸运的是，Redux 并不排斥使用 Immutable，可以自己重写 `combineReducers` 或使用 `redux-immutablejs` 来提供支持。





### 优化写法

- 使用Record对象，可以省去fromJS()和toJS()进行数据转换，直接使用setIn updateIn等方法

