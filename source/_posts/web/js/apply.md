---
title: apply 和 call
date: 2020-04-19 20:03:27
tags:
categories:
---
#call()



```
function add(a,b) {
alert(a+b);
}

function sub(a,b) {
alert(a-b);
}

add.call(sub,3,1);
//4
```

用 add 来替换 sub，add.call(sub,3,1) == add(3,1)


```
var numbers = [5, 458 , 120 , -215 ];
var maxInNumbers = Math.max.apply(this, numbers);
console.log(maxInNumbers); // 458
var maxInNumbers = Math.max.call(this,5, 458 , 120 , -215); 
console.log(maxInNumbers); // 458
```
