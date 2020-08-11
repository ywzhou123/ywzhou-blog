---
title: 内置update方法
date: 2020-08-11 19:42:39
permalink: /pages/d59325/
categories: 
  - react
  - react
tags: 
  - 
---
## 内置update方法

[update](https://facebook.github.io/react/docs/update.html)

- 更新对象的值，`$set  $splice`

```js
import update from 'react/lib/update';

nextState = update(this.state, {
    [action.id]: {
        props: {
            children: {
                $set: action.items.map(item => item.id) //将items对象的id列表传给当前ID的props.children
            }
        }
    }
});


for (let [key, value] of action.props.entries()) {
    nextState = update(state, {
        [action.id]: {
            props: {
                [key]: {
                    $set: value
                }
            }
        }
    });
}

this.setState(update(this.state, {
    selectCards: {
        $splice: [
            [index, 1],         // 指定索引位置删除一个
            [atIndex, 0, card]  // 指定索引位置增加card属性
        ]
    }
}))




// import update from 'react-addons-update';

// { $push: array } push() all the items in array on the target.
// {$unshift: array } unshift() all the items in array on the target.
// {$splice: array of arrays} for each item in arrays call splice() on the target with the parameters provided by the item.
// {$set: any } replace the target entirely.
// {$merge: object } merge the keys of object with the target.
// {$apply: function} passes in the current value to the function and updates it with the new returned value.

const newData = update(myData, {
    x: {
        y: {
            z: {
                $set: 7
            }
        }
    },
    a: {
        b: {
            $push: [9]
        }
    }
});


const initialArray = [1, 2, 3];
const newArray = update(initialArray, {
    $push: [4]
}); // => [1, 2, 3, 4]

const collection = [1, 2, { a: [12, 17, 15] }];
const newCollection = update(collection, {
    2: {
        a: {
            $splice: [[1, 1, 13, 14]]
        }
    }
});
// => [1, 2, {a: [12, 13, 14, 15]}]

const obj = { a: 5, b: 3 };
const newObj = update(obj, {
    b: {
        $apply: function (x) { return x * 2; }
    }
});
// => {a: 5, b: 6}

// This is equivalent, but gets verbose for deeply nested collections:
const newObj2 = update(obj, {
    b: {
        $set: obj.b * 2
    }
});// => {a: 5, b: 6, c: 7}

const obj = { a: 5, b: 3 };
const newObj = update(obj, {
    $merge: { b: 6, c: 7 }
}); // => {a: 5, b: 6, c: 7}


var x = {
    cards: [{
        name: "a",
        id: 1
    }, {
        name: "b",
        id: 2
    }, {
        name: "c",
        id: 3
    }, {
        name: "d",
        id: 4
    }]
}
var z = update(x, {
    cards: {
        //  数组中的第三个
        3: {
            id: {
                $apply: function (x) { return x * 2; }
            }
        }
    },
});
```

