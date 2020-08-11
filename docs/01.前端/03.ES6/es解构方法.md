---
title: es解构方法
date: 2020-04-19 18:02:13
tags: null
categories: null
permalink: /pages/696e65/
---
// 解构

///////////////////////////////////////////////////////////////////////////////////////////////////////

// 数组
var [a, b, c] = [1, 2, 3];

let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined 解构不成功，变量的值就等于undefined
z // []

//不完全解构
let [x, y] = [1, 2, 3];
x // 1
y // 2
let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
let [x, y, z] = new Set(["a", "b", "c"]);
x // "a"

function* fibs() {
var a = 0;
var b = 1;
while (true) {
yield a;
[a, b] = [b, a + b];
}
}
var [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5

//允许指定默认值
var [foo = true] = [];
foo // true

[x, y = 'b'] = ['a']; // x='a', y='b'
[x, y = 'b'] = ['a', undefined]; // x='a', y='b'
var [x = 1] = [undefined];
x // 1
var [x = 1] = [null]; //数组成员不严格等于undefined，默认值是不会生效
x // null
function f() {
console.log('aaa');
}
let [x = f()] = [1];// 默认值是一个表达式，那么这个表达式是惰性求值的
// x能取到值，所以函数f根本不会执行

let [x = 1, y = x] = []; // x=1; y=1
let [x = 1, y = x] = [2]; // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = []; // ReferenceError
// 可以引用解构赋值的其他变量
// 变量必须已经声明

///////////////////////////////////////////////////////////////////////////////////////////////////////

// 对象
//对象的属性没有次序，变量必须与属性同名
var { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"
var { foo: baz } = { foo: 'aaa', bar: 'bbb' }; //变量名与属性名不一致时的写法, foo是匹配的模式，真正被赋值的是变量baz
baz // "aaa"
foo // error: foo is not defined

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'

//对于let和const来说，变量不能重新声明
let foo;
let {foo} = {foo: 1}; // SyntaxError: Duplicate declaration "foo"
let baz;
let {bar: baz} = {bar: 1}; // SyntaxError: Duplicate declaration "baz"
let foo;
({foo} = {foo: 1}); // 成功
let baz;
({bar: baz} = {bar: 1}); // 成功

var obj = {
p: [
'Hello',
{ y: 'World' }
]
};
var { p: [x, { y }] } = obj;
x // "Hello"
y // "World"

var node = {
loc: {
start: {
line: 1,
column: 5
}
}
};
var { loc: { start: { line }} } = node; //loc和start都是模式，不会被赋值
line // 1
loc // error: loc is undefined
start // error: start is undefined
let obj = {};
let arr = [];
({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
obj // {prop:123}
arr // [true]

//指定默认值
var {x = 3} = {};
x // 3
var {x, y = 5} = {x: 1};
x // 1
y // 5
var {x:y = 3} = {};
y // 3
var {x:y = 3} = {x: 5};
y // 5
var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"
// 默认值生效的条件是，对象的属性值严格等于undefined
var {x = 3} = {x: undefined};
x // 3
var {x = 3} = {x: null};
x // null

// 解构失败，变量的值等于undefined
var {foo} = {bar: 'baz'};
foo // undefined

// 对数组进行对象属性的解构
let { log, sin, cos } = Math;//将Math对象的对数、正弦、余弦三个方法，赋值到对应的变量上
var arr = [1, 2, 3];
var {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3


///////////////////////////////////////////////////////////////////////////////////////////////////////
// 字符串
// 字符串被转换成了一个类似数组的对象
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
let {length : len} = 'hello';
len // 5


///////////////////////////////////////////////////////////////////////////////////////////////////////
// 数值布尔
// 会先转为对象
let {toString: s} = 123;
s === Number.prototype.toString // true
let {toString: s} = true;
s === Boolean.prototype.toString // true
// undefined和null无法转为对象，所以对它们进行解构赋值，都会报错
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError

///////////////////////////////////////////////////////////////////////////////////////////////////////


// 函数参数
function add([x, y]){
return x + y;
}
add([1, 2]); // 3
[[1, 2], [3, 4]].map(([a, b]) => a + b); // [ 3, 7 ]

// 为函数参数设置默认值
function move({x = 0, y = 0} = {}) {
return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

// 不是为变量x和y指定默认值
function move({x, y} = { x: 0, y: 0 }) {
return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
// undefined就会触发函数参数的默认值
[1, undefined, 3].map((x = 'yes') => x); // [ 1, 'yes', 3 ]

///////////////////////////////////////////////////////////////////////////////////////////////////////
// 圆括号
// 不能使用
// 变量声明
// 全部报错,因为它们都是变量声明
var [(a)] = [1];
var {x: (c)} = {};
var ({x: c}) = {};
var {(x: c)} = {};
var {(x): c} = {};
var { o: ({ p: p }) } = { o: { p: 2 } };
// 函数参数
// 报错
function f([(z)]) { return z; }
// 赋值语句
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];
[({ p: a }), { x: c }] = [{}, {}];
// 可以使用
// 赋值语句的非模式部分
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确

///////////////////////////////////////////////////////////////////////////////////////////////////////

// 用途
// 交换变量的值
[x, y] = [y, x];
// 从函数返回多个值
function example() { return [1, 2, 3]; } var [a, b, c] = example();
function example() { return { foo: 1, bar: 2 }; } var { foo, bar } = example();
// 函数参数的定义
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);
// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
// 提取JSON数据
var jsonData = {
id: 42,
status: "OK",
data: [867, 5309]
};
let { id, status, data: number } = jsonData;
console.log(id, status, number); // 42, "OK", [867, 5309]
// 函数参数的默认值
jQuery.ajax = function (url, {
async = true,
beforeSend = function () {},
cache = true,
complete = function () {},
crossDomain = false,
global = true, // ... more config
}) {
// ... do stuff
};
// 遍历Map结构
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for (let [key, value] of map) {
console.log(key + " is " + value);
}
// first is hello
// second is world
// 获取键名
for (let [key] of map) {
// ...
}
// 获取键值
for (let [,value] of map) {
// ...
}
// 输入模块的指定方法
const { SourceMapConsumer, SourceNode } = require("source-map");