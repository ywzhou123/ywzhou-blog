---
title: css3属性
date: 2020-04-19 19:41:24
tags: null
categories: null
permalink: /pages/3b3883/
---
# 一、框模型
## 1、	border-radius
圆角边框
IE9以下不支持
border-radius: 1-4 length|% / 1-4 length|%;
border-top-left-radius:2em;
border-top-right-radius:2em;
border-bottom-right-radius:2em;
border-bottom-left-radius:2em;
## 2、	box-shadow
阴影
IE9以下不支持
box-shadow: h-shadow v-shadow blur spread color inset;
水平位置 垂直位置 模糊距离 阴影的尺寸 阴影的颜色 内部阴影
## 3、	border-image
使用图片来绘制边框
IE不支持
Safari 5加前缀 -webkit-
Opera加前缀 -o-
border-image:url(border.png) 30 30 round;
border-image-source
图片的路径
border-image-slice
图片边框向内偏移
border-image-width
图片边框的宽度
border-image-outset
边框图像区域超出边框的量
border-image-repeat
是否应平铺
# 二、背景和边框
## 1、	background-size
IE9以下不支持
背景图像尺寸
background-origin
IE9以下不支持
规定背景图片的定位区域
background-origin: padding-box|border-box|content-box;
background-clip
规定背景的绘制区域
background-clip: border-box|padding-box|content-box;
## 2、文本效果
text-shadow
IE10以下不支持
向文本添加阴影
word-wrap
IE10以下不支持
允许对长单词进行拆分，并换行
hanging-punctuation
规定标点字符是否位于线框之外
punctuation-trim
规定是否对标点字符进行修剪
text-align-last
设置如何对齐最后一行
text-emphasis
向元素的文本应用重点标记
text-justify
当 text-align 设置为 "justify" 时所使用的对齐方法
text-outline
文本的轮廓
text-overflow
当文本溢出包含元素时
word-break
规定非中日韩文本的换行规则
## 3、@font-face 字体
IE9以下不支持
可以使用客户端未安装的字体，需要时自动从服务器下载
<style>
## 4、@font-face
```css
{
font-family: myFirstFont;
src: url('Sansation_Light.ttf'),
url('Sansation_Light.eot'); /* IE9+ */
}

div {
font-family:myFirstFont;
}
```
# 三、变形与动画
## 1、transform 2/3D转换
transform: none|transform-functions;
对元素进行旋转、缩放、移动或倾斜
matrix(n,n,n,n,n,n)
2D 拉伸、旋转、移动
matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)
3D 转换，使用 16 个值的 4x4 矩阵
translate(x,y)
2D 移动
translate3d(x,y,z)
3D 移动
translateX(x)
水平移动
translateY(y)
垂直移动
translateZ(z)
scale(x,y)
2D 缩放（以中心点）
scale3d(x,y,z)
3D 缩放
scaleX(x)
水平缩放
scaleY(y)
垂直缩放
scaleZ(z)
rotate(angle)
2D 旋转，传入角度angle: 0~360deg
rotate3d(x,y,z,angle)
3D 旋转
rotateX(angle)
沿着 X 轴的 3D 旋转。90deg就是条线了
rotateY(angle)
沿着 Y 轴的 3D 旋转。90deg就是条线了
rotateZ(angle)
沿着 Z 轴的 3D 旋转，和2D旋转效果一样
skew(x-angle,y-angle)
沿着 X 和 Y 轴的 2D 倾斜转换
skewX(angle)
沿着 X 轴的 2D 倾斜转换
skewY(angle)
perspective(n)
为 3D 转换元素定义透视视图。
transform-origin : x-axis y-axis z-axis;
设置旋转元素的基点位置
x-axis
left
center
right
length
%
y-axis
top
center
bottom
length
%
z-axis
length
必须与 transform 属性一同使用
默认以元素中心旋转 （50% 50% 0）
transform-style : flat|preserve-3d;
被嵌套元素如何在 3D 空间中显示。
perspective : number|none;
3D 元素的透视效果。
子元素会获得透视效果，而不是元素本身
number 元素距离视图的距离，以像素计。
perspective-origin : x-axis y-axis;
3D 元素的底部位置。
子元素会获得透视效果，而不是元素本身
backface-visibility: visible|hidden;
定义元素在不面对屏幕时是否可见。
兼容性
IE 9 需要前缀 -ms-
Chrome 和 Safari -webkit-
Opera -o-
Firefox -moz-
## 2、transition 过渡
transition : property duration timing-function delay;
简写属性
多项过渡用逗号分隔，可分别设置下面各属性
transition-property : none|all|property;
应用过渡的 CSS 属性的名称。
transition-duration : time;
定义过渡效果花费的时间。
transition-timing-function : cubic-bezier(n,n,n,n);
规定过渡效果的时间曲线。
linear
均度运动
等于 cubic-bezier(0,0,1,1)
ease
快慢快
cubic-bezier(0.25,0.1,0.25,1)
ease-in
慢速开始
cubic-bezier(0.42,0,1,1)
ease-out
慢速结束
cubic-bezier(0,0,0.58,1)
ease-in-out
慢速开始和结束
cubic-bezier(0.42,0,0.58,1)
cubic-bezier(n,n,n,n)
自定义各阶段的速度，值0-1
transition-delay
规定过渡效果何时开始。
兼容性
IE10 以下不支持
Chrome 25 以及更早的版本，需要前缀 -webkit-
示例
transition-duration: 1.2s
transition-delay: 3s;
transition-property: width;
transition-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
background: linear-gradient(to right, #00fcd5, #00c6ff);
背景渐变色
transition: opacity 1s cubic-bezier(0.215, 0.61, 0.355, 1) 0.2s;
透明度
transition: opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.4s, transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.4s;
## 3、animation 动画
@keyframes animationname {keyframes-selector {css-styles;}}
创建动画
animationname
动画的名称
keyframes-selector
动画时长的百分比
0-100%
from（与 0% 相同）
to（与 100% 相同）
animation : name duration timing-function delay iteration-count direction;
简写属性，将动画与 div 元素绑定
animation-name : keyframename|none;
规定 @keyframes 动画的名称。
animation-duration : time;
完成一个周期所花费的时间
animation-timing-function : value;
速度曲线
linear
匀速
ease
慢快慢
ease-in
慢速开始
ease-out
慢速结束
ease-in-out
慢速开始和结束
cubic-bezier(n,n,n,n)
自定义，0-1
animation-delay : time;
何时开始
animation-iteration-count : n|infinite;
被播放的次数
infinite 无限次播放
animation-direction : normal|alternate;
是否在下一周期逆向地播放
alternate 轮流反向播放
animation-play-state : paused|running;
是否正在运行或暂停
animation-fill-mode : none | forwards | backwards | both;
动画时间之外的状态
forwards
动画完成后，保持最后一个属性值
backwards
在动画显示之前，应用第一个关键帧中定义的属性值
兼容性
Chrome 和 Safari 需要前缀 -webkit-
@-webkit-keyframes
IE10 以下不支持
## 4、示例
```css
position: relative;
animation: mymove 5s infinite;
@keyframes mymove
{
from {top:0px;}
to {top:200px;}
}
// 从上到下移动
@keyframes mymove
{
0% {top:0px; left:0px; background:red;}
25% {top:0px; left:100px; background:blue;}
50% {top:100px; left:100px; background:yellow;}
75% {top:100px; left:0px; background:green;}
100% {top:0px; left:0px; background:red;}
}
```
# 四、多列布局
columns
设置 column-width 和 column-count 的简写属性
column-width
列的宽度
column-count
将元素下的内容分成几列
column-gap
规定列之间的间隔
column-rule
设置列之间的宽度、样式和颜色规则
column-rule-color
column-rule-style
column-rule-width
column-fill
如何填充列
column-span
元素应该横跨的列数
兼容性
Firefox 需要前缀 -moz-
Chrome 和 Safari 需要前缀 -webkit-
IE10 以下不支持
# 五、用户界面
resize
兼容性
IE Opera 不支持
规定是否可由用户调整元素尺寸
box-sizing
兼容性
Firefox 需要前缀 -moz-
设置使用哪种盒模型
outline
兼容性
IE 不支持
对轮廓进行偏移，并在超出边框边缘的位置绘制轮廓
轮廓不占用空间
轮廓可能是非矩形
outline-offset
偏移距离