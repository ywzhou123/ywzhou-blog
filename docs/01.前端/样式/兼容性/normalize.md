---
title: Normalize
date: 2020-04-19 19:46:50
tags: null
categories: null
permalink: /pages/fe83e0/
---
# 一、什么是Normalize.css
Normalize.css是一种CSS reset的替代方案。它在默认的HTML元素样式上提供了跨浏览器的高度一致性。相比于传统的CSS reset，Normalize.css是一种现代的、为HTML5准备的优质替代方案

[Normalize Github](https://necolas.github.io/normalize.css/)
[Normalize 官网](http://nicolasgallagher.com/about-normalize-css/)
[本文出处](https://jerryzou.com/posts/aboutNormalizeCss/)

# 二、Normalize 优点
## 1. Normalize.css 保护了有价值的默认值
Reset通过为几乎所有的元素施加默认样式，强行使得元素有相同的视觉效果。相比之下，Normalize.css保持了许多默认的浏览器样式。这就意味着你不用再为所有公共的排版元素重新设置样式。当一个元素在不同的浏览器中有不同的默认值时，Normalize.css会力求让这些样式保持一致并尽可能与现代标准相符合。

## 2. Normalize.css 修复了浏览器的bug       
它修复了常见的桌面端和移动端浏览器的bug。这往往超出了Reset所能做到的范畴。关于这一点，Normalize.css修复的问题包含了HTML5元素的显示设置、预格式化文字的font-size问题、在IE9中SVG的溢出、许多出现在各浏览器和操作系统中的与表单相关的bug。 

##3、Normalize.css 不会让你的调试工具变的杂乱       
使用Reset最让人困扰的地方莫过于在浏览器调试工具中大段大段的继承链。在Normalize.css中就不会有这样的问题，因为在我们的准则中对多选择器的使用时非常谨慎的，我们仅会有目的地对目标元素设置样式。 

## 4、Normalize.css 是模块化的       
这个项目已经被拆分为多个相关却又独立的部分，这使得你能够很容易也很清楚地知道哪些元素被设置了特定的值。因此这能让你自己选择性地移除掉某些永远不会用到部分（比如表单的一般化）。

## 5. Normalize.css 拥有详细的文档       
Normalize.css的代码基于详细而全面的跨浏览器研究与测试。这个文件中拥有详细的代码说明并在[Github Wiki](https://github.com/necolas/normalize.css/wiki)中有进一步的说明。这意味着你可以找到每一行代码具体完成了什么工作、为什么要写这句代码、浏览器之间的差异，并且你可以更容易地进行自己的测试。

# 三、如何使用Normalize

安装或从Github下载[Normalize.css](http://necolas.github.io/normalize.css/)。
## 使用方法一
将normalize.css作为你自己项目的基础CSS，自定义样式值以满足设计师的需求。

## 使用方法二
引入normalize.css源码并在此基础上构建，在必要的时候用你自己写的CSS覆盖默认值。


# 四、使用Normalize的参考实例
[amaze ui](http://amazeui.org/css/)