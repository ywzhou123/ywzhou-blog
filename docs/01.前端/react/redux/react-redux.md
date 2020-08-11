---
title: react-redux
date: 2020-08-11 19:42:39
permalink: /pages/273603/
categories: 
  - react
  - redux
tags: 
  - 
---
## react-redux 插件

- 简化 React 和 Redux 之间的绑定





## `<Provider>`组件

- 作为一个容器组件，用来接受 Store，并且让 Store 对子组件可用
- 利用Context 用来传递一些父容器的属性对所有子孙组件可见
- 避免了用 props 传递多层组件的繁琐

```jsx
// 这时候 `<Provider>` 里面的子组件` <App />` 才可以使用 connect 方法关联 store
import { render } from 'react-dom'; 
import { Provider } from 'react-redux'; 
import App from './app';  

render(   
	<Provider store={store}>     
		<App />   
	</Provider>,   
	document.getElementById('root') 
);
```



​    

### 结合redux-router使用

```jsx
ReactDOM.render(   
  <Provider store={store}>        
    <Router history={history}>       
      <Route path="/" component={App}>         
        <Route path="foo" component={Foo}/>         
        <Route path="bar" component={Bar}/>       
      </Route>     
    </Router>   
  </Provider>,   
  document.getElementById('root') 
)
```



### 结合redux使用

- 可以在没有使用connect()的组件中调用dispatch方法

```jsx
import thunk from 'redux-thunk' 
import {createStore,applyMiddleware} from 'Redux' 
import RootRedu from '../reducers/RootRedu'  
const store = createStore(RootRedu,applyMiddleware(thunk)); 

let {dispatch} = store;
```



​       





## `connect()`连接器

- 连接 React 组件与 Redux store
- 连接操作不会改变原来的组件类

```js
connect([mapStateToProps], mapDispatchToProps], [mergeProps], [options])
```

- 返回另一个函数，接受一个组件类作为参数

​        // 返回另一个函数，接受一个组件类作为参数

- 最后才返回一个和 Redux store 关联起来的新组件
- 可以在 App组件里面通过 props 拿到 Store 的 dispatch 方法
- 指定 mapStateToProps 参数可以监听 Store 的状态更改

```js
export default connect()(App);
```





### `mapStateToProps(state, [ownProps])`

- 监听 Redux Store 的更新
- ownProps是传递给组件的 props
- 组件获取到新的 props 时，ownProps 都会拿到这个值并且执行 mapStateToProps 这个函数
- 参数可以为空，或者(...args)

```jsx
const mapStateToProps = (state, ownProps) => ({   
  active: ownProps.filter === state.visibilityFilter 
})

const getVisibleTodos = (todos, filter) => {   
  switch (filter) {     
    case 'SHOW_ALL':       
      return todos     
    case 'SHOW_COMPLETED':       
      return todos.filter(t => t.completed)     
    case 'SHOW_ACTIVE':       
      return todos.filter(t => !t.completed)     
    default:       
      throw new Error('Unknown filter: ' + filter)   
  } 
}  
const mapStateToProps = (state) => ({   
  todos: getVisibleTodos(state.todos, state.visibilityFilter) 
})

```



#### state.todos是reducer合并中的分支todos

```jsx
const mapStateToProps = (state) => {  
	return state.todos;  
}
```



​                

### `mapDispatchToProps(dispatch, [ownProps])`

- 指定如何传递 dispatch 给组件
- 关联组件可以直接通过 props 调用到 action
- 不使用该参数时，默认直接把 dispatch 作为 props 传入

```jsx
const mapDispatchToProps = (dispatch, ownProps) => ({   
  onClick: () => {     
    dispatch(setVisibilityFilter(ownProps.filter))   
  }, 
  dispatch
  //当你指定方法时， dispatch 将不会自动注入。如果你还想让其作为 prop，需要明确指出。
})

const mapDispatchToProps =  ({   
  onTodoClick: toggleTodo 
})

```





### `mergeProps(stateProps, dispatchProps, ownProps)`

- mapStateToProps() 与 mapDispatchToProps() 的执行结果和组件自身的 props 将传入到这个回调函数中



### options

- 定制 connector 的行为
  - connector 将执行 shouldComponentUpdate 并且浅对比 mergeProps的结果，避免不必要的更新
  
- 前提是当前组件是一个“纯”组件，它不依赖于任何的输入或 state 而只依赖于 props 和 Redux store 的 state
  
     ```js
       pure = true
       ```
  
  - withRef如果为 true，connector 会保存一个对被包装组件实例的引用，该引用通过 getWrappedInstance() 方法获得
  
       ```js
       withRef = false
       ```





## 示例

### 展示组件

- 展示一个数字，以及一个按钮，点击后增加数字

```jsx
class Counter extends Component {
    render() {
        const { value, onIncreaseClick } = this.props
        return ( 
            <div>
                <span > { value } </span> 
                <button onClick = { onIncreaseClick } > Increase </button> 
            </div>
        )
    }
}

Counter.propTypes = {
    value: PropTypes.number.isRequired,
    onIncreaseClick: PropTypes.func.isRequired
}
```



### 存储

- Redux三件宝 **action** 、**reducer**、 **store**

```jsx
// Action
const increaseAction = { type: 'increase' }

// Reducer
function counter(state = { count: 0 }, action) {
    const count = state.count
    switch (action.type) {
        case 'increase':
            return { count: count + 1 }
        default:
            return state
    }
}

// Store
const store = createStore(counter)
```



### 容器组件

- react-redux 两个方法 `<Provider>`方法、`connect()()`方法，将react和redux连接在一起

```jsx
// Map Redux state to component props
const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed)
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed)
        default:
            throw new Error('Unknown filter: ' + filter)
    }
}

const mapStateToProps = (state) => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

// Map Redux actions to component props
const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
})

//把dispatch(action)方法赋给props中的方法onTodoClick()
const mapDispatchToProps = ({
        onTodoClick: toggleTodo
    })
    /* 相当于
    mapDispatchToProps = (dispatch) =>{
      return {
        onTodoClick = () => dispatch(toggleTodo)
      }
    }
    */

// Connected Component，传给connect()绑定的组件TodoList
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

// 渲染组件
ReactDOM.render( 
    <Provider store = { store } >
        <App />
    </Provider>,
    document.getElementById('root')
)
```

