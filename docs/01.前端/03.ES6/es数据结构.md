---
title: es数据结构
date: 2020-04-19 18:01:11
tags: 
  - js
  - es6
categories: 
  - js
permalink: /pages/8af201/
---

ES数据结构 Map Set Symbol
# Map
// 基本用法
// 解决Object的键只能是字符串的限制
// 将一个DOM节点作为data对象的键
// element被自动转为字符串[object HTMLDivElement]
// Map的键实际上是跟内存地址绑定的
var data = {};
var element = document.getElementById('myDiv');
data[element] = 'metadata';
data['[object HTMLDivElement]'] // "metadata"

var m = new Map();
var o = {p: 'Hello World'};
m.set(o, 'content')
m.get(o) // "content"
m.has(o) // true
m.delete(o) // true
m.has(o) // false

// 可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组
var map = new Map([
['name', '张三'],
['title', 'Author']
]);
map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"

// 接受数组作为参数时，实际上执行的是下面的算法
var items = [
['name', '张三'],
['title', 'Author']
];
var map = new Map();
items.forEach(([key, value]) => map.set(key, value));
////
var m = new Map([
[true, 'foo'],
['true', 'bar']
]);
m.get(true) // 'foo'
m.get('true') // 'bar'

// 后面的值将覆盖前面的值
let map = new Map();
map
.set(1, 'aaa')
.set(1, 'bbb');
map.get(1) // "bbb"

// 未知的键，则返回undefined
new Map().get('asfddfsasadf') // undefined

// 表面是针对同一个键，但实际上这是两个值
var map = new Map();
map.set(['a'], 555);
map.get(['a']) // undefined

// 同样的值的两个实例，在Map结构中被视为两个键
var map = new Map();
var k1 = ['a'];
var k2 = ['a'];
map
.set(k1, 111)
.set(k2, 222);
map.get(k1) // 111
map.get(k2) // 222
// 简单类型的值（数字、字符串、布尔值）严格相等时其视为一个键
let map = new Map();
map.set(NaN, 123);
map.get(NaN) // 123
map.set(-0, 123);
map.get(+0) // 123
/**---------------------------------------------------------------------------------------------------- */
// 属性和方法
// 更多高级用法参考 ImmuTable.jsx
size // 相当于数组的length
set(key, value) // 返回整个Map结构，可以采用链式写法
let map = new Map()
.set(1, 'a')
.set(2, 'b')
.set(3, 'c');
get(key) // 找不到key，返回undefined
has(key) // 返回一个布尔值
delete(key) // 返回一个布尔值
clear() // 清除所有成员，没有返回值

/**---------------------------------------------------------------------------------------------------- */
// 遍历方法
// 可参考扩展方法里的对象方法
keys() // 返回键名的遍历器。
let map = new Map([
['F', 'no'],
['T', 'yes'],
]);
for (let key of map.keys()) {
console.log(key);
}
// "F"
// "T"

values() // 返回键值的遍历器。
for (let value of map.values()) {
console.log(value);
}
// "no"
// "yes"

entries() // 返回所有成员的遍历器。
for (let item of map.entries()) {
console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"
// 或者
for (let [key, value] of map.entries()) {
console.log(key, value);
}
// 等同于使用map.entries()
for (let [key, value] of map) {
console.log(key, value);
}
// 默认遍历器接口（Symbol.iterator属性），就是entries方法
map[Symbol.iterator] === map.entries // true

forEach() // 遍历Map的所有成员。
map.forEach(function(value, key, map) {
console.log("Key: %s, Value: %s", key, value);
});
// forEach方法还可以接受第二个参数，用来绑定this
// forEach方法的回调函数的this，就指向reporter
var reporter = {
report: function(key, value) {
console.log("Key: %s, Value: %s", key, value);
}
};
map.forEach(function(value, key, map) {
this.report(key, value);
}, reporter);

/**---------------------------------------------------------------------------------------------------- */
// 实例
// 结合数组的map方法、filter方法，可以实现Map的遍历和过滤
let map0 = new Map()
.set(1, 'a')
.set(2, 'b')
.set(3, 'c');
let map1 = new Map(
[...map0].filter(([k, v]) => k < 3)
); // 产生Map结构 {1 => 'a', 2 => 'b'}
let map2 = new Map(
[...map0].map(([k, v]) => [k * 2, '_' + v])
); // 产生Map结构 {2 => '_a', 4 => '_b', 6 => '_c'}



/**---------------------------------------------------------------------------------------------------- */
// 结构转换
// Map转为数组
let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
[...myMap]; // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

let map = new Map([
[1, 'one'],
[2, 'two'],
[3, 'three'],
]);
[...map.keys()]; // [1, 2, 3]
[...map.values()]; // ['one', 'two', 'three']
[...map.entries()]; // [[1,'one'], [2, 'two'], [3, 'three']]
[...map]; // [[1,'one'], [2, 'two'], [3, 'three']]

// 数组转为Map
new Map([[true, 7], [{foo: 3}, ['abc']]])
// Map {true => 7, Object {foo: 3} => ['abc']}

// Map转为对象
// 所有Map的键都是字符串时
function strMapToObj(strMap) {
let obj = Object.create(null);
for (let [k,v] of strMap) {
obj[k] = v;
}
return obj;
}
let myMap = new Map().set('yes', true).set('no', false);
strMapToObj(myMap) // { yes: true, no: false }


// Map转为JSON
// Map的键名都是字符串，这时可以选择转为对象JSON。
function strMapToJson(strMap) {
return JSON.stringify(strMapToObj(strMap));
}
let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap) // '{"yes":true,"no":false}'

// Map的键名有非字符串，这时可以选择转为数组JSON
function mapToArrayJson(map) {
return JSON.stringify([...map]);
}
let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap) // '[[true,7],[{"foo":3},["abc"]]]'

// JSON转为Map
// 整个JSON就是一个数组，且每个数组成员本身，又是一个有两个成员的数组
function jsonToStrMap(jsonStr) {
return objToStrMap(JSON.parse(jsonStr));
}
jsonToStrMap('{"yes":true,"no":false}') // Map {'yes' => true, 'no' => false}

function jsonToMap(jsonStr) {
return new Map(JSON.parse(jsonStr));
}
jsonToMap('[[true,7],[{"foo":3},["abc"]]]') // Map {true => 7, Object {foo: 3} => ['abc']}









//////////////////////////////////////////////////////////////////////////////////////////////////






# Set
// 基本用法
// 类似于数组，但是成员的值都是唯一的
var s = new Set();
[2, 3, 5, 4, 5, 2, 2].map(x => s.add(x));
for (let i of s) {
console.log(i);
} // 2 3 5 4

// 可以接受一个数组（或类似数组的对象）作为参数，用来初始化
var set = new Set([1, 2, 3, 4, 4]);
[...set] // [1, 2, 3, 4]
var items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5
function divs () {
return [...document.querySelectorAll('div')];
}
var set = new Set(divs());
set.size; // 56
// 类似于
divs().forEach(div => set.add(div));
set.size; // 56

// 去除数组的重复成员
[...new Set(array)];

function dedupe(array) {
return Array.from(new Set(array));
}
dedupe([1, 1, 2, 3]) // [1, 2, 3]

// 在Set内部，两个NaN相等, 而精确相等运算符（===）认为NaN不等于自身
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}

// 两个空对象不相等
let set = new Set();
set.add({});
set.size // 1
set.add({});
set.size // 2


/**---------------------------------------------------------------------------------------------------- */
// 属性和方法
Set.prototype.constructor // 构造函数，默认就是Set函数
Set.prototype.size // 返回Set实例的成员总数
add(value) // 添加某个值，返回Set结构本身
delete(value) // 删除某个值，返回一个布尔值，表示删除是否成功
has(value) // 返回一个布尔值，表示该值是否为Set的成员
clear() // 清除所有成员，没有返回值

// 基本示例
s.add(1).add(2).add(2); // 注意2被加入了两次
s.size // 2
s.has(1) // true
s.has(2) // true
s.has(3) // false
s.delete(2);
s.has(2) // false

// 对象的写法
var properties = {
'width': 1,
'height': 1
};
if (properties[someName]) {
// do something
}
// Set的写法
var properties = new Set();
properties.add('width');
properties.add('height');
if (properties.has(someName)) {
// do something
}

// 将Set结构转为数组
var items = new Set([1, 2, 3, 4, 5]);
var array = Array.from(items);

/**---------------------------------------------------------------------------------------------------- */
// 遍历操作
// 遍历顺序就是插入顺序
// 前三个方法返回的都是遍历器对象，键名和键值是同一个值
keys() // 返回键名的遍历器
let set = new Set(['red', 'green', 'blue']);
for (let item of set.keys()) {
console.log(item);
}
// red
// green
// blue

values() // 返回键值的遍历器
for (let item of set.values()) {
console.log(item);
}
// red
// green
// blue

// 可以省略values方法
for (let x of set) {
console.log(x);
}
// red
// green
// blue

entries() // 返回键值对的遍历器
for (let item of set.entries()) {
console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

forEach() // 使用回调函数遍历每个成员，没有返回值；参数依次为键值、键名、集合本身
let set = new Set([1, 2, 3]);
set.forEach((value, key) => console.log(value * 2) )
// 2
// 4
// 6

// 默认遍历器生成函数就是它的values方法
Set.prototype[Symbol.iterator] === Set.prototype.values // true

// 扩展运算符
let set = new Set(['red', 'green', 'blue']);
let arr = [...set]; // ['red', 'green', 'blue']

// 去除数组的重复成员
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)]; // [3, 5, 2]

// 数组的map和filter方法也可以用于Set
let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2)); // {2, 4, 6}
let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0)); // {2, 4}

// 实现并集（Union）、交集（Intersect）和差集（Difference）
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
// 并集
let union = new Set([...a, ...b]); // Set {1, 2, 3, 4}
// 交集
let intersect = new Set([...a].filter(x => b.has(x))); // set {2, 3}
// 差集
let difference = new Set([...a].filter(x => !b.has(x))); // Set {1}

// 改变原来的Set结构
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2)); // 2, 4, 6
set = new Set(Array.from(set, val => val * 2)); // 2, 4, 6





//////////////////////////////////////////////////////////////////////////////////////////////////






# Symbol
## 概述
// 引用他人对象时，防止属性名冲突
// ES6引入了一种新的原始数据类型Symbol，表示独一无二的值
// Symbol值通过Symbol函数生成
// 对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的Symbol类型
// Symbol函数前不能使用new命令
let s = Symbol();
typeof s // "symbol"

// 可以接受一个字符串作为参数，表示对Symbol实例的描述
var s1 = Symbol('foo');
var s2 = Symbol('bar');
s1 // Symbol(foo)
s2 // Symbol(bar)
s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"

// 相同参数的Symbol函数的返回值是不相等的
// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();
s1 === s2 // false
// 有参数的情况
var s1 = Symbol("foo");
var s2 = Symbol("foo");
s1 === s2 // false

// Symbol值不能与其他类型的值进行运算
var sym = Symbol('My symbol');
"your symbol is " + sym // TypeError: can't convert symbol to string
`your symbol is ${sym}` // TypeError: can't convert symbol to string

// Symbol值可以显式转为字符串
var sym = Symbol('My symbol');
String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'

// 可以转为布尔值，但是不能转为数值
var sym = Symbol();
Boolean(sym) // true
!sym // false
if (sym) {
// ...
}
Number(sym) // TypeError
sym + 2 // TypeError

/**---------------------------------------------------------------------------------------------------- */
## 作为属性名
// 保证不会出现同名的属性，能防止某一个键被不小心改写或覆盖
// 在对象的内部，Symbol值必须放在方括号之中
var mySymbol = Symbol();
// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';
// 第二种写法
var a = {
[mySymbol]: 'Hello!'
};
// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

a[mySymbol] // "Hello!"

// 不能用点运算符，因为点运算符后面总是字符串
var mySymbol = Symbol();
var a = {};
a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"

// 任何值都不可能有相同的值了，因此可以保证switch语句会按设计的方式工作
const COLOR_RED = Symbol();
const COLOR_GREEN = Symbol();
function getComplement(color) {
switch (color) {
case COLOR_RED:
return COLOR_GREEN;
case COLOR_GREEN:
return COLOR_RED;
default:
throw new Error('Undefined color');
}
}

/**---------------------------------------------------------------------------------------------------- */
## 属性名的遍历
// Symbol作为属性名，该属性不会出现在for...in、for...of循环中， 也不会被Object.keys()、Object.getOwnPropertyNames()返回
// Object.getOwnPropertySymbols可以当前对象的所有用作属性名的Symbol值
var obj = {};
var a = Symbol('a');
var b = Symbol('b');
obj[a] = 'Hello';
obj[b] = 'World';
var objectSymbols = Object.getOwnPropertySymbols(obj);
objectSymbols // [Symbol(a), Symbol(b)]

// Reflect.ownKeys方法可以返回所有类型的键名
let obj = {
[Symbol('my_key')]: 1,
enum: 2,
nonEnum: 3
};
Reflect.ownKeys(obj) // [Symbol(my_key), 'enum', 'nonEnum']

/**---------------------------------------------------------------------------------------------------- */
## for()和keyFor()
// 接受一个字符串作为参数
// 有以该参数作为名称的Symbol值，就返回这个Symbol值
var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');
s1 === s2 // true

// 返回一个已登记的Symbol类型值的key
var s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"
var s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined

/**---------------------------------------------------------------------------------------------------- */
## 内置的Symbol值
Symbol.hasInstance
// 当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法
class MyClass {
[Symbol.hasInstance](foo) {
return foo instanceof Array;
}
}
[1, 2, 3] instanceof new MyClass() // true
class Even {
static [Symbol.hasInstance](obj) {
return Number(obj) % 2 === 0;
}
}
1 instanceof Even // false
2 instanceof Even // true
12345 instanceof Even // false

Symbol.isConcatSpreadable
// 一个布尔值，表示该对象使用Array.prototype.concat()时，是否可以展开
// 数组的默认行为是可以展开,true或undefined，都有这个效果
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']

// 类似数组的对象也可以展开（带length属性的对象）,必须手动打开
let obj = {length: 2, 0: 'c', 1: 'd'};
['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']
obj[Symbol.isConcatSpreadable] = true;
['a', 'b'].concat(obj, 'e') // ['a', 'b', 'c', 'd', 'e']

// 类A1是可展开的，类A2是不可展开的
class A1 extends Array {
constructor(args) {
super(args);
this[Symbol.isConcatSpreadable] = true;
}
}
class A2 extends Array {
constructor(args) {
super(args);
this[Symbol.isConcatSpreadable] = false;
}
}

let a1 = new A1();
a1[0] = 3;
a1[1] = 4;
let a2 = new A2();
a2[0] = 5;
a2[1] = 6;
[1, 2].concat(a1).concat(a2) // [1, 2, 3, 4, [5, 6]]
Symbol.species
// Symbol.species属性默认的读取器
// 如果this.constructor[Symbol.species]存在，就会使用这个属性作为构造函数，来创造新的实例对象
static [Symbol.species]() {
return this;
}
Symbol.match
String.prototype.match(regexp)
// 等同于
regexp[Symbol.match](this)
class MyMatcher {
[Symbol.match](string) {
return 'hello world'.indexOf(string);
}
}
'e'.match(new MyMatcher()) // 1
Symbol.replace
String.prototype.replace(searchValue, replaceValue)
// 等同于
searchValue[Symbol.replace](this, replaceValue)
Symbol.search
String.prototype.search(regexp)
// 等同于
regexp[Symbol.search](this)
class MySearch {
constructor(value) {
this.value = value;
}
[Symbol.search](string) {
return string.indexOf(this.value);
}
}
'foobar'.search(new MySearch('foo')) // 0
Symbol.split
String.prototype.split(separator, limit)
// 等同于
separator[Symbol.split](this, limit)
Symbol.iterator
// 指向该对象的默认遍历器方法
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
yield 1;
yield 2;
yield 3;
};
[...myIterable] // [1, 2, 3]
class Collection {
*[Symbol.iterator]() {
let i = 0;
while(this[i] !== undefined) {
yield this[i];
++i;
}
}
}
let myCollection = new Collection();
myCollection[0] = 1;
myCollection[1] = 2;
for(let value of myCollection) {
console.log(value);
}
// 1
// 2
Symbol.toPrimitive
// 接受一个字符串参数，表示当前运算的模式
// Number：该场合需要转成数值
// String：该场合需要转成字符串
// Default：该场合可以转成数值，也可以转成字符串
let obj = { [Symbol.toPrimitive](hint) {
switch (hint) {
case 'number':
return 123;
case 'string':
return 'str';
case 'default':
return 'default';
default:
throw new Error();
}
}
};
2 * obj // 246
3 + obj // '3default'
obj == 'default' // true
String(obj) // 'str'

Symbol.toStringTag
// 用来定制[object Object]或[object Array]中object后面的那个字符串
({[Symbol.toStringTag]: 'Foo'}.toString()) // "[object Foo]"
class Collection {
get [Symbol.toStringTag]() {
return 'xxx';
}
}
var x = new Collection();
Object.prototype.toString.call(x) // "[object xxx]"
// JSON[Symbol.toStringTag]：'JSON'
// Math[Symbol.toStringTag]：'Math'
// M[Symbol.toStringTag]：'Module' // Module对象
// ArrayBuffer.prototype[Symbol.toStringTag]：'ArrayBuffer'
// DataView.prototype[Symbol.toStringTag]：'DataView'
// Map.prototype[Symbol.toStringTag]：'Map'
// Promise.prototype[Symbol.toStringTag]：'Promise'
// Set.prototype[Symbol.toStringTag]：'Set'
// %TypedArray%.prototype[Symbol.toStringTag]：'Uint8Array'
// WeakMap.prototype[Symbol.toStringTag]：'WeakMap'
// WeakSet.prototype[Symbol.toStringTag]：'WeakSet'
// %MapIteratorPrototype%[Symbol.toStringTag]：'Map Iterator'
// %SetIteratorPrototype%[Symbol.toStringTag]：'Set Iterator'
// %StringIteratorPrototype%[Symbol.toStringTag]：'String Iterator'
// Symbol.prototype[Symbol.toStringTag]：'Symbol'
// Generator.prototype[Symbol.toStringTag]：'Generator'
// GeneratorFunction.prototype[Symbol.toStringTag]：'GeneratorFunction'

Symbol.unscopables
// 指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除
// 数组有6个属性，会被with命令排除
Array.prototype[Symbol.unscopables]
// {
// copyWithin: true,
// entries: true,
// fill: true,
// find: true,
// findIndex: true,
// keys: true
// }
Object.keys(Array.prototype[Symbol.unscopables])
// ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'keys']

// 没有unscopables时
class MyClass {
foo() { return 1; }
}
var foo = function () { return 2; };
with (MyClass.prototype) {
foo(); // 1
}

// 有unscopables时
class MyClass {
foo() { return 1; }
get [Symbol.unscopables]() {
return { foo: true };
}
}
var foo = function () { return 2; };
with (MyClass.prototype) {
foo(); // 2
}
/**---------------------------------------------------------------------------------------------------- */
// 实例
// 消除魔术字符串
function getArea(shape, options) {
var area = 0;
switch (shape) {
case 'Triangle': // 魔术字符串
area = .5 * options.width * options.height;
break;
/* ... more code ... */
}
return area;
}
getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串

// 常用的消除魔术字符串的方法，就是把它写成一个变量。
var shapeType = {
triangle: 'Triangle' // 改成变量解决 triangle: Symbol()
};
function getArea(shape, options) {
var area = 0;
switch (shape) {
case shapeType.triangle:
area = .5 * options.width * options.height;
break;
}
return area;
}
getArea(shapeType.triangle, { width: 100, height: 100 });


// 模块的 Singleton 模式：指的是调用一个类，任何时候返回的都是同一个实例
// mod.js
function A() {
this.foo = 'hello';
}
if (!global._foo) {
global._foo = new A();
}
module.exports = global._foo;

// 变量a任何时候加载的都是A的同一个实例
// 但全局变量global._foo是可写的，会使其失真
var a = require('./mod.js');
console.log(a.foo);

// mod.js
const FOO_KEY = Symbol.for('foo');
function A() {
this.foo = 'hello';
}
if (!global[FOO_KEY]) {
global[FOO_KEY] = new A();
}
module.exports = global[FOO_KEY];

// 可以保证global[FOO_KEY]不会被无意间覆盖，但还是可以被改写
// 如果使用Symbol方法，外部将无法引用这个值，当然也就无法改写
var a = require('./mod.js'); ·