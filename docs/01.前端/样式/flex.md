---
title: flex布局
date: 2020-04-19 17:48:05
tags: 
  - flex
categories: 
  - Style
permalink: /pages/6dae88/
---

## 容器属性

###     display: flex;

###     flex-direction: row; 

​	//决定主轴的方向
​    // row默认 主轴为水平方向，起点在左端。
​    // row-reverse 主轴为水平方向，起点在右端
​    // column 主轴为垂直方向，起点在上沿
​    // column-reverse 主轴为垂直方向，起点在下沿

###     flex-wrap: wrap; 

​	// 如果一条轴线排不下，如何换行
​    // nowrap默认 不换行
​    // wrap 换行，第一行在上方
​    // wrap-reverse 换行，第一行在下方

###     flex-flow: column nowrap;

​	 // 是flex-direction属性和flex-wrap属性的简写形式
​    // row nowrap 默认

###     justify-content: flex-start;

​    // 具体对齐方式与轴的方向有关
​    // flex-start 默认,左对齐
​    // flex-end 右对齐
​    // center  居中
​    // space-between 两端对齐，项目之间的间隔都相等
​    // space-around 每个项目两侧的间隔相等;项目之间的间隔比项目与边框的间隔大一倍

###     align-items: stretch; 

​	// 定义项目在交叉轴上如何对齐
​    // stretch 默认,如果项目未设置高度或设为auto，将占满整个容器的高度
​    // flex-start 交叉轴的起点对齐
​    // flex-end 交叉轴的终点对齐
​    // center 交叉轴的中点对齐
​    // baseline 项目的第一行文字的基线对齐

###     align-content: flex-end;

​	 // 定义了多根轴线的对齐方式,如果项目只有一根轴线，该属性不起作用
​    // flex-start 与交叉轴的起点对齐
​    // flex-end 与交叉轴的终点对齐
​    // center 与交叉轴的中点对齐
​    // stretch默认 轴线占满整个交叉轴
​    // space-between 与交叉轴两端对齐，轴线之间的间隔平均分布
​    // space-around 每根轴线两侧的间隔都相等,轴线之间的间隔比轴线与边框的间隔大一倍

## 项目属性

###     order: 1;

​    // 定义项目的排列顺序
​    // 数值越小，排列越靠前，默认为0

###     flex-grow: 0;

​    // 定义项目的放大比例
​    // 默认为0，即如果存在剩余空间，也不放大

###     flex-shrink: 1;

​    // 定义了项目的缩小比例
​    // 默认为1，即如果空间不足，该项目将缩小
​    // 设为0表示空间不足时该项目不缩小

###     flex-basis: auto;

​    // 定义了在分配多余空间之前，项目占据的主轴空间
​    // <length> | auto

###     flex: 0 1 auto;

​    // flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto
​    // 快捷值：auto (1 1 auto) || none (0 0 auto)

###     align-self: flex-end;

​    // 允许单个项目有与其他项目不一样的对齐方式，覆盖align-items
​    // auto默认
​    // flex-start
​    // flex-end
​    // center
​    // baseline
​    // stretch



## 示例



```css
.box {
    display: flex;
}
```

行内元素 

```css
.box {
    display: inline-flex;
}
```

三点色子

```
.box {
    display: flex;
}
```

```
.item:nth-child(2) {
    align-self: center;
}
```

```
.item:nth-child(3) {
    align-self: flex-end;
}
```

