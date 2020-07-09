---
title: Svg 基础语法
date: 2020-04-19 17:35:10
tags:
	- svg
categories:
	- Style
---



# 一、SVG基础

## 1、基本图形

### `<rect>`   矩形

x,y,width,height,rx,ry 起点位置和宽高，以及圆角半径

### `<circle>` 圆形

cx, cy, r 圆心的坐标和半径

### `<ellipse>` 椭圆

cx, cy, rx ry

### `<line>` 直线

x1,y1,x2,y2

### `<polyline>` 折线

points="x1 y1 x2 y2 x3 y3"

### `<polygon>`多边形

points="x1 y1 x2 y2 x3 y3"


## 2、基本属性

### 填充
fill="#FFB3AE"
### 描边
stroke="#971817"
### 描边宽度
stroke-width="10"
### 变形
transform="rotate(30)"

## 3、svg使用方式

img标签
svg标签
css背景

## 4、基本操作API

### 创建图形

documentcreateElementNS(ns, tagName)

### 添加图形

element.appendChild(childElement)

### 操作属性

element.setAttribute(name, value)
element.getAttribute(name)


# 二、坐标

## 1、世界、视野、视窗

世界是无穷大的
视野：观察图形的大小
viewbox＝"0 0 400 300"
preserveAspectRatio="xMidYMid meet"
对齐方式和包含方式
视窗：svg的大小，浏览器中的大小
width="800"
height="600"

## 2、图形分组

`<g>`创建分组
可以设置属性进行继承
可以嵌套使用

## 2、坐标系统

坐标：x轴从左到右，y轴从上到下，角度顺时针方向，
原点(0,0)在左上角
坐标系：
用户坐标系
自身坐标系
前驱坐标系
参考坐标系

## 3、tansform属性

rotate(deg) 旋转
translate(x, y) 移动
scale(sx, sy) 放大缩小
matrix(a,b,c,d,e,f)

# 三、颜色

## 颜色

RGB(red[0-255], green[0-255], bule[0-255])

HSL(h[0,359], s%, l%)
三个分量分别表示颜色、饱和度和亮度
http://paletton.com

## 透明度

rgba
hsla
opacity

```html
<rect fill="rgba(255,0,0)" opacity="0.5"/>
<rect stroke="hsla(0, 50%, 60%)" />
````

# 四、 渐变

## 线性渐变

使用linearGradient和stop标签，定义方向和关键点位置及颜色
gradientUnits属性设置盒子类型，默认objectBoundingBox，userSpaceOnUse表示世界坐标系
默认从左上角(0%)到右下角(100%)


```html
<svg xmlns="http://www.w3.org/200/svg">
  <defs>
    <linearGradient
      id="grad1" 
      gradientUnits="objectBoundingBox"
      x1="0"
      y1="0"
      x2="1"
      y2="1"
    </>
      <stop offset="0" stop-color="#1497FC" />
      <stop offset="0" stop-color="#1497FC" />
      <stop offset="0" stop-color="#1497FC" />
    </linearGradient>
  </defs>
  <rect x="100" y="100" fill="url(#grad1)" width="200" height="150" />
</svg>
```

画一个宽200高150的矩形
linearGradient定义渐变色，xy的值0表示最左和最上，1表示最右和最下，使用userSpaceOnUse可以使用具体数值表示
stop定义关键点位置，offset=[0-1] 0 表示最左上角，0.5表示中间位置，1表示最右下角位置

## 径向渐变

```html
<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="grad3" cx="0.5" cy="0.5" r="0.7" fx="0.5" fy="0.5">
      <stop offset="0" stop-color="rgb(20,151,252)" />
      <stop offset="0.5" stop-color="rgb(164,105,190)" />
      <stop offset="1" stop-color="rgb(255,140,0)" />
    </radialGradient>
  </defs>
  <rect x="100" y="100" fill="url(#grad3)" width="200" height="200" />
  <circle cx="500" cy="200" r="100" fill="url(#grad3)" />
</svg>
```
## 笔刷
```
<pattern>
  <circle>
  <polygon>
</polygon>
```


# 五、Path

http://www.w3.org/TR/SVG11/paths.html

```html
<path d="M0,0 L10,20 C30 -10,40,20,100,100" stoke="red"/>
```

命令 含义
- M/m (x,y)+  移动到当前位置
- L/l (x,y)+  画线段到指定位置
- Hh (x)+ 画水平线到指定的x坐标
- V/v(x)+ 画垂直线到指定的y坐标
- Z/Z 闭合当前路径（结尾）
- C/c (x1,y1,x2,y2,x,y)+  画三次贝赛尔曲线到指定位置
- S/s (x2,y2,x,y)+光滑地画三次贝赛尔曲线到指定位置
- Q/q (x1,y1,x,y)+画二次贝赛尔曲线到指定位置
- T/t(x,y)+   光滑地画二次贝赛尔曲线到指定位置
- A/a (rx,ry,xr,laf,sf,x,y)   画弧线到指定位置

> 注意：
大写表示绝对位置，小写为相对位置
上一命令结束位置就是下一命令开始的位置
命令可以重复参数表示重复执行同一命令

### 弧线 A/a (rx,ry,xr,laf,sf,x,y)

rx 弧线所在椭圆的x半轴长
ry 弧线所在椭圆的y半轴长
xr 长轴角度
laf 是否选择弧长较长的那一段弧
sf  是否选择逆时针方向的那一段弧
x,y 终点位置

# 六、鼠标事件


## 1、SMIL方式

单击后触发一个动画效果，此例中被改变的是“fill”属性，由红变蓝，中间没有渐变的过程，一次到位。

```html
<svg>
  <rect x="15" y="15" width="40" height="40" fill="red">
  	<set attributeName="fill" to="blue" begin="click"/>
  </rect>
</svg>
```

## 2、Attributes方式

事件属性在u处，“onclick”事件调用的是“changeColor”函数，参数是“evt”

```html
<svg xmlns="http://www.w3.org/2000/svg"
xmlns:xlink=http://www.w3.org/1999/xlink
xmlns:a3="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
a3:scriptImplementation="Adobe">
  <script type="text/ecmascript" a3:scriptImplementation="Adobe">
    <![CDATA[
    function changeColor(evt) {
      var rect = evt.target;
        rect.setAttributeNS(null, "fill", "blue")
      }
  ]]>
  </script>
  <rect x="5" y="5" width="40" height="40" fill="red"
  οnclick= "changeColor(evt)"/> u
</svg>
```

```html
<svg>

  <use xlink:href="#Longmendiao" transform="translate(30,60)  scale(0.5)" onclick="btnClickA()"></use>

  <script>
  function btnClickA() {
  	alert("Hello");
  }
  </script>

</svg>
```
## 3、JavaScript+SMIL方式
```html
<svg οnlοad="makeShape(evt)">
<script><![CDATA[
  var svgns = "http://www.w3.org/2000/svg";u
  function makeShape(evt) {
    svgDoc = evt.target.ownerDocument;
    var rect = svgDoc.createElementNS(svgns, "rect");
    rect.setAttributeNS(null, "x", "5");
    rect.setAttributeNS(null, "y", "5");
    rect.setAttributeNS(null, "width", "40");
    rect.setAttributeNS(null, "height", "40");
    rect.setAttributeNS(null, "fill", "red");
    var set = svgDoc.createElementNS(svgns, "set");
    set.setAttributeNS(null, "attributeName", "fill");
    set.setAttributeNS(null, "to", "blue");
    set.setAttributeNS(null, "begin", "click");
    rect.appendChild(set);
    svgDoc.rootElement.appendChild(rect);
  }
]]></script>
</svg>
```

## 4、EventListener方式

```html
<svg οnlοad="makeShape(evt)">
<script><![CDATA[
  var svgns = "http://www.w3.org/2000/svg";
  function makeShape(evt) {
    if ( window.svgDocument == null )
    svgDoc = evt.target.ownerDocument;
    var rect = svgDoc.createElementNS(svgns, "rect");
    rect.setAttributeNS(null, "x", 15);
    rect.setAttributeNS(null, "y", 15);
    rect.setAttributeNS(null, "width", 40);
    rect.setAttributeNS(null, "height", 40);
    rect.setAttributeNS(null, "fill", "red");
    rect.addEventListener("click", changeColor, false); u
    svgDoc.documentElement.appendChild(rect);
  }
  function changeColor(evt) {
  	var target = evt.target;
  	target.setAttributeNS(null, "fill", "blue");
  }
]]></script>
</svg>
```


# 七、动态添加元素和事件
https://www.cnblogs.com/lovellll/p/10208207.html

```js
var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", "800");
svg.setAttribute("height", "500");
svg.addEventListener("load", function() {
	alert("loaded");
});
document.body.appendChild(svg);

var r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
r.setAttribute("fill", "#120045");
r.setAttribute("x", "1");
r.setAttribute("y", "1");
r.setAttribute("width", "50%");
r.setAttribute("height", "50%");
r.addEventListener("click", function() {
	alert("clicked");
});
svg.appendChild(r);
```