---
title: css属性
date: 2020-04-19 19:42:27
tags:
categories:
---
// 选择器	示例	示例说明	CSS
.class .intro //选择所有class="intro"的元素	1
#id #firstname //选择所有id="firstname"的元素	1
* * //选择所有元素	2
element p //选择所有<p>元素	1
element,
element div,
p //选择所有<div>元素和<p>元素	1
element element div p //选择<div>元素内的所有<p>元素	1
element>element div>p //选择所有父级是 <div> 元素的 <p> 元素	2
element+element div+p //选择所有紧接着<div>元素之后的<p>元素	2
[attribute] [target] //选择所有带有target属性元素	2
[attribute=value] [target=-blank] //选择所有使用target="-blank"的元素	2
[attribute~=value] [title~=flower] //选择标题属性包含单词"flower"的所有元素	2
[attribute|=language] [lang|=en] //选择一个lang属性的起始值="EN"的所有元素	2
:link a:link //选择所有未访问链接	1
:visited a:visited //选择所有访问过的链接	1
:active a:active //选择活动链接	1
:hover a:hover //选择鼠标在链接上面时	1
:focus input:focus //选择具有焦点的输入元素	2
:first-letter p:first-letter //选择每一个<P>元素的第一个字母	1
:first-line p:first-line //选择每一个<P>元素的第一行	1
:first-child p:first-child //指定只有当<p>元素是其父级的第一个子级的样式。	2
:before p:before //在每个<p>元素之前插入内容	2
:after p:after //在每个<p>元素之后插入内容	2
:lang(language) p:lang(it) //选择一个lang属性的起始值="it"的所有<p>元素	2
element1~element2 p~ul //选择p元素之后的每一个ul元素	3
[attribute^=value] a[src^="https"] //选择每一个src属性的值以"https"开头的元素	3
[attribute$=value] a[src$=".pdf"] //选择每一个src属性的值以".pdf"结尾的元素	3
[attribute*=value] a[src*="runoob"] //选择每一个src属性的值包含子字符串"runoob"的元素	3
:first-of-type p:first-of-type //选择每个p元素是其父级的第一个p元素	3
:last-of-type p:last-of-type //选择每个p元素是其父级的最后一个p元素	3
:only-of-type p:only-of-type //选择每个p元素是其父级的唯一p元素	3
:only-child p:only-child //选择每个p元素是其父级的唯一子元素	3
:nth-child(n) p:nth-child(2) //选择每个p元素是其父级的第二个子元素	3
:nth-last-child(n) p:nth-last-child(2) //选择每个p元素的是其父级的第二个子元素，从最后一个子项计数	3
:nth-of-type(n) p:nth-of-type(2) //选择每个p元素是其父级的第二个p元素	3
:nth-last-of-type(n) p:nth-last-of-type(2) //选择每个p元素的是其父级的第二个p元素，从最后一个子项计数	3
:last-child p:last-child //选择每个p元素是其父级的最后一个子级。	3
:root:root //选择文档的根元素	3
:empty p:empty //选择每个没有任何子级的p元素（包括文本节点）	3
:target #news:target //选择当前活动的#news元素（包含该锚名称的点击的URL）	3
:enabled input:enabled //选择每一个已启用的输入元素	3
:disabled input:disabled //选择每一个禁用的输入元素	3
:checked input:checked //选择每个选中的输入元素	3
:not(selector):not(p) //选择每个并非p元素的元素	3
::selection::selection //匹配元素中被用户选中或处于高亮状态的部分	3
:out-of-range:out-of-range //匹配值在指定区间之外的input元素	3
:in-range:in-range //匹配值在指定区间之内的input元素	3
:read-write:read-write //用于匹配可读及可写的元素	3
:read-only:read-only //用于匹配设置 "readonly"（只读） 属性的元素	3
:optional:optional //用于匹配可选的输入元素	3
:required:required //用于匹配设置了 "required" 属性的元素	3
:valid:valid //用于匹配输入值为合法的元素	3
:invalid:invalid //用于匹配输入值为非法的元素	3

/*动画属性*/

// @keyframes	定义一个动画,@keyframes定义的动画名称用来被animation-name所使用。	3
// animation	复合属性。检索或设置对象所应用的动画特效。	3
// animation-name	检索或设置对象所应用的动画名称 ,必须与规则@keyframes配合使用，因为动画名称由@keyframes定义	3
// animation-duration	检索或设置对象动画的持续时间	3
// animation-timing-function	检索或设置对象动画的过渡类型	3
// animation-delay	检索或设置对象动画的延迟时间	3
// animation-iteration-count	检索或设置对象动画的循环次数	3
// animation-direction	检索或设置对象动画在循环中是否反向运动	3
// animation-play-state	检索或设置对象动画的状态	3

/*背景属性*/

background //复合属性。设置对象的背景特性。	1
{
background: #00ff00 url('smiley.gif') no-repeat fixed center;
}

background-attachment //设置或检索背景图像是随对象内容滚动还是固定的。必须先指定background-image属性。	1

/*	scroll	背景图片随页面的其余部分滚动。这是默认
fixed	背景图像是固定的*/

{
background-image: url('smiley.gif');
background-repeat: no-repeat;
background-attachment: fixed;
}

background-color //设置或检索对象的背景颜色。	1
{
background-color: yellow;
background-color: #00ff00;
background-color: rgb(255, 0, 255);
}

background-image //设置或检索对象的背景图像。	1

/*	url('URL')	图像的URL
none	无图像背景会显示。这是默认*/

background-position //设置或检索对象的背景图像位置。必须先指定background-image属性。	1

/*	left top 如果仅指定一个关键字，其他值将会是"center"
left center
left bottom
right top
right center
right bottom
center top
center center
center bottom
x% y%	第一个值是水平位置，第二个值是垂直。左上角是0％0％。右下角是100％100％。如果仅指定了一个值，其他值将是50％。 。默认值为：0％0％
xpos ypos	第一个值是水平位置，第二个值是垂直。左上角是0。单位可以是像素（0px0px）或任何其他CSS单位。如果仅指定了一个值，其他值将是50％。你可以混合使用％和positions*/

background-repeat //设置或检索对象的背景图像如何铺排填充。必须先指定background-image属性。	1

/*	repeat	背景图像将向垂直和水平方向重复。这是默认
repeat-x	只有水平位置会重复背景图像
repeat-y	只有垂直位置会重复背景图像
no-repeat	background-image不会重复*/

{
background-image: url('smiley.gif');
background-repeat: no-repeat;
background-attachment: fixed;
background-position: center;
background-size: 80px 60px;
}

background-clip //指定对象的背景图像向外裁剪的区域。	3

/*	border-box	默认值。背景绘制在边框方框内（剪切成边框方框）。
padding-box	背景绘制在衬距方框内（剪切成衬距方框）。
content-box	背景绘制在内容方框内（剪切成内容方框）。*/

{
background-color: yellow;
background-clip: content-box;
}

background-origin //设置或检索对象的背景图像计算background-position时的参考原点(位置)。	3
background-size //检索或设置对象的背景图像的尺寸大小。	3

/*	length	设置背景图片高度和宽度。第一个值设置宽度，第二个值设置的高度。如果只给出一个值，第二个是设置为"atuo(自动)"
percentage	将计算相对于背景定位区域的百分比。第一个值设置宽度，第二个值设置的高度。如果只给出一个值，第二个是设置为"auto(自动)"
cover	此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。
contain	此时会保持图像的纵横比并将图像缩放成将适合背景定位区域的最大大小。*/


/*边框(Border) 和 轮廓(Outline) 属性*/

border //复合属性。设置对象边框的特性。	1
{
border: 5px solid red;
}

border-color //置或检索对象的边框颜色。	1
{
border-style: solid;
border-color: #ff0000 #0000ff;
}

border-style //设置或检索对象的边框样式。	1

/*	none	定义无边框。
hidden	与 "none" 相同。不过应用于表时除外，对于表，hidden 用于解决边框冲突。
dotted	定义点状边框。在大多数浏览器中呈现为实线。
dashed	定义虚线。在大多数浏览器中呈现为实线。
solid	定义实线。
double	定义双线。双线的宽度等于 border-width 的值。
groove	定义 3D 凹槽边框。其效果取决于 border-color 的值。
ridge	定义 3D 垄状边框。其效果取决于 border-color 的值。
inset	定义 3D inset 边框。其效果取决于 border-color 的值。
outset	定义 3D outset 边框。其效果取决于 border-color 的值。*/

{
border-style: solid;
border-style: dotted solid double dashed;
/*	上边框是点状
右边框是实线
下边框是双线
左边框是虚线*/
border-style: dotted solid double;
/*	上边框是点状
右边框和左边框是实线
下边框是双线*/
border-style: dotted solid;
/*	上边框和下边框是点状
右边框和左边框是实线*/
border-style: dotted;
/*	所有4个边框都是点状*/
}

border-width //设置或检索对象的边框宽度。	1

/*	thin	定义细的边框。
medium	默认。定义中等的边框。
thick	定义粗的边框。
length	允许您自定义边框的宽度。*/

{
border-width: thin medium thick 10px;
/*	上边框是细边框
右边框是中等边框
下边框是粗边框
左边框是 10px 宽的边框*/
border-width: thin medium thick;
/*	上边框是细边框
右边框和左边框是中等边框
下边框是粗边框*/
border-width: thin medium;
/*	上边框和下边框是细边框
右边框和左边框是中等边框*/
border-width: thin;
/*	所有4个边框都是细边框*/
}

border-top //复合属性。设置对象顶部边框的特性。	1
border-top-color //设置或检索对象的顶部边框颜色	1
border-top-style //设置或检索对象的顶部边框样式。	1
border-top-width //设置或检索对象的顶部边框宽度。	1
border-left //复合属性。设置对象左边边框的特性。	1
border-left-color //设置或检索对象的左边边框颜色。	1
border-left-style //设置或检索对象的左边边框样式。	1
border-left-width //设置或检索对象的左边边框宽度。	1
border-right //复合属性。设置对象右边边框的特性。	1
border-right-color //设置或检索对象的右边边框颜色。	1
border-right-style //设置或检索对象的右边边框样式。	1
border-right-width //设置或检索对象的右边边框宽度。	1
border-bottom //复合属性。设置对象底部边框的特性。	1
border-bottom-color //设置或检索对象的底部边框颜色。	1
border-bottom-style //设置或检索对象的底部边框样式。	1
border-bottom-width //设置或检索对象的底部边框宽度。	1
outline //复合属性。设置或检索对象外的线条轮廓。	2
{
outline: #00FF00 dotted thick;
}

outline-color //设置或检索对象外的线条轮廓的颜色。	2
outline-style //设置或检索对象外的线条轮廓的样式。	2

/*	none	默认。定义无轮廓。
dotted	定义点状的轮廓。
dashed	定义虚线轮廓。
solid	定义实线轮廓。
double	定义双线轮廓。双线的宽度等同于 outline-width 的值。
groove	定义 3D 凹槽轮廓。此效果取决于 outline-color 值。
ridge	定义 3D 凸槽轮廓。此效果取决于 outline-color 值。
inset	定义 3D 凹边轮廓。此效果取决于 outline-color 值。
outset	定义 3D 凸边轮廓。此效果取决于 outline-color 值。*/

outline-width //设置或检索对象外的线条轮廓的宽度。	2

/*	thin	规定细轮廓。
medium	默认。规定中等的轮廓。
thick	规定粗的轮廓。
length	允许您规定轮廓粗细的值。*/

{
outline-style: dotted;
outline-width: 5px;
outline-color: #00ff00;
}

border-image //设置或检索对象的边框样式使用图像来填充。	3
{
border-image: url(border.png) 30 30 round;
/*border-image: source slice width outset repeat;*/
}

border-image-outset //规定边框图像超过边框的量。	3
border-image-repeat //规定图像边框是否应该被重复（repeated）、拉伸（stretched）或铺满（rounded）。

/*	stretch	默认值。拉伸图像来填充区域
repeat	平铺（repeated）图像来填充区域。
round	类似 repeat 值。如果无法完整平铺所有图像，则对图像进行缩放以适应区域。
space	类似 repeat 值。如果无法完整平铺所有图像，扩展空间会分布在图像周围	*/

border-image-slice //规定图像边框的向内偏移。	3

/*	number	数字表示图像的像素（位图图像）或向量的坐标（如果图像是矢量图像）
%	百分比图像的大小是相对的：水平偏移图像的宽度，垂直偏移图像的高度
fill	保留图像的中间部分*/

{
border-image-source: url(border.png);
border-image-slice: 50% 50%;
border-image-slice: 0% 0% 100% 0%;
}

border-image-source //规定要使用的图像，代替 border-style 属性中设置的边框样式。	3
border-image-width //规定图像边框的宽度。

/*	number	表示相应的border-width 的倍数
%	边界图像区域的大小：横向偏移的宽度的面积，垂直偏移的高度的面积
auto	如果指定了，宽度是相应的image slice的内在宽度或高度*/

{
border-image-source: url(border.png);
border-image-width: 30 30;
}

border-radius //设置或检索对象使用圆角边框。	3

/*	length	定义弯道的形状。
%	使用%定义角落的形状。*/

{
border: 2px solid;
border-radius: 25px;
}

border-bottom-left-radius //设置或检索对象的左下角圆角边框。提供2个参数，2个参数以空格分隔，每个参数允许设置1个参数值，第1个参数表示水平半径，第2个参数表示垂直半径，如第2个参数省略，则默认等于第1个参数	3
border-bottom-right-radius //设置或检索对象的右下角圆角边框。	3
border-top-left-radius //定义左上角边框的形状。	3
border-top-right-radius //定义右下角边框的形状。	3
box-decoration-break //规定行内元素被折行	3
box-shadow //向方框添加一个或多个阴影。	3

/*	h-shadow	必需的。水平阴影的位置。允许负值
v-shadow	必需的。垂直阴影的位置。允许负值
blur	可选。模糊距离
spread	可选。阴影的大小
color	可选。阴影的颜色。在CSS颜色值寻找颜色值的完整列表*/

{
box-shadow: 10px 10px 5px #888888;
}


/*盒子(Box) 属性*/

overflow-x //如果内容溢出了元素内容区域，是否对内容的左/右边缘进行裁剪。	3

/*	visible	不裁剪内容，可能会显示在内容框之外。
hidden	裁剪内容 - 不提供滚动机制。
scroll	裁剪内容 - 提供滚动机制。
auto	如果溢出框，则应该提供滚动机制。
no-display	如果内容不适合内容框，则删除整个框。
no-content	如果内容不适合内容框，则隐藏整个内容。*/

{
overflow-x: hidden;
}

overflow-y //如果内容溢出了元素内容区域，是否对内容的上/下边缘进行裁剪。	3

/*	visible	不裁剪内容，可能会显示在内容框之外。
hidden	裁剪内容 - 不提供滚动机制。
scroll	裁剪内容 - 提供滚动机制。
auto	如果溢出框，则应该提供滚动机制。
no-display	如果内容不适合内容框，则删除整个框。
no-content	如果内容不适合内容框，则隐藏整个内容。*/

{
overflow-y: hidden;
}

overflow-style //规定溢出元素的首选滚动方法。	3

/*颜色(Color) 属性*/

color-profile //允许使用源的颜色配置文件的默认以外的规范	3
opacity //设置一个元素的透明度级别	3

/*	value	指定不透明度。从0.0（完全透明）到1.0（完全不透明）*/

{
opacity: 0.5;
}

rendering-intent //允许超过默认颜色配置文件渲染意向的其他规范	3

/*内边距(Padding) 属性*/

padding //在一个声明中设置所有填充属性	1

/*	负值是不允许的。
length	规定以具体单位计的填充值，比如像素、厘米等。默认值是 0px
%	规定基于父元素的宽度的百分比的填充*/

{
padding: 10px 5px 15px 20px;
/*	上填充是 10px
右填充是 5px
下填充是 15px
左填充是 20px*/
padding: 10px 5px 15px;
/*	上填充是 10px
右填充和左填充是 5px
下填充是 15px*/
padding: 10px 5px;
/*	上填充和下填充是 10px
右填充和左填充是 5px*/
padding: 10px;
/*	所有四个填充都是 10px*/
}

padding-bottom //设置元素的底填充	1
padding-left //设置元素的左填充	1
padding-right //设置元素的右填充	1
padding-top //设置元素的顶部填充	1

/*媒体页面内容属性*/

bookmark-label //指定书签的标签	3
bookmark-level //指定了书签级别	3
bookmark-target //指定了书签链接的目标	3
float-offset //在相反的方向推动浮动元素，他们一直具有浮动	3
hyphenate-after //指定一个断字的单词断字字符后的最少字符数	3
hyphenate-before //指定一个断字的单词断字字符前的最少字符数	3
hyphenate-character //指定了当一个断字发生时，要显示的字符串	3
hyphenate-lines //表示连续断字的行在元素的最大数目	3
hyphenate-resource //外部资源指定一个逗号分隔的列表，可以帮助确定浏览器的断字点	3
hyphens //设置如何分割单词以改善该段的布局	3
image-resolution //指定了正确的图像分辨率	3
marks //将crop and/or cross标志添加到文档	3
string-set //3

/*尺寸(Dimension) 属性*/

height //设置元素的高度	1

/*	auto	默认。浏览器会计算出实际的高度。
length	使用 px、cm 等单位定义高度。
%	基于包含它的块级对象的百分比高度。*/

width //设置元素的宽度	1
{
height: 100px;
width: 100px;
}

max-height //设置元素的最大高度	2

/*	max-height属性不包括填充，边框，或页边距！*/

max-width //设置元素的最大宽度	2
min-height //设置元素的最小高度	2
min-width //设置元素的最小宽度	2

/*弹性盒子模型（Flexible Box） 属性(新)*/

flex //复合属性。设置或检索弹性盒模型对象的子元素如何分配空间。	3
flex-grow //设置或检索弹性盒的扩展比率。	3
flex-shrink //设置或检索弹性盒的收缩比率。	3
flex-basis //设置或检索弹性盒伸缩基准值。	3
flex-flow //复合属性。设置或检索弹性盒模型对象的子元素排列方式。	3
flex-direction //该属性通过定义flex容器的主轴方向来决定felx子项在flex容器中的位置。	3
flex-wrap //该属性控制flex容器是单行或者多行，同时横轴的方向决定了新行堆叠的方向。	3
align-content //在弹性容器内的各项没有占用交叉轴上所有可用的空间时对齐容器内的各项（垂直）。	3
align-items //定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式。	3
align-self //定义flex子项单独在侧轴（纵轴）方向上的对齐方式。	3
justify-content //设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。	3
order //设置或检索弹性盒模型对象的子元素出现的順序。	3

/*弹性盒子模型（Flexible Box） 属性(旧)*/

box-align //指定如何对齐一个框的子元素	3
box-direction //指定在哪个方向，显示一个框的子元素	3
box-flex //指定一个框的子元素是否是灵活的或固定的大小	3
box-flex-group //指派灵活的元素到Flex组	3
box-lines //每当它在父框的空间运行时，是否指定将再上一个新的行列	3
box-ordinal-group //指定一个框的子元素的显示顺序	3
box-orient //指定一个框的子元素是否在水平或垂直方向应铺设	3
box-pack //指定横向盒在垂直框的水平位置和垂直位置	3

/*字体（Font） 属性*/

font //在一个声明中设置所有字体属性	1

/*	font-style	规定字体样式。参阅：font-style 中可能的值。
font-variant	规定字体异体。参阅：font-variant 中可能的值。
font-weight	规定字体粗细。参阅：font-weight 中可能的值。
font-size/line-height	规定字体尺寸和行高。参阅：font-size 和 line-height 中可能的值。
font-family	规定字体系列。参阅：font-family 中可能的值。
caption	定义被标题控件（比如按钮、下拉列表等）使用的字体。
icon	定义被图标标记使用的字体。
menu	定义被下拉列表使用的字体。
message-box	定义被对话框使用的字体。
small-caption	caption 字体的小型版本。
status-bar	定义被窗口状态栏使用的字体。*/

{
font: 15px arial, sans-serif;
font: italic bold 12px/30px Georgia, serif;
}

font-family //规定文本的字体系列	1
{
font-family: "Times New Roman", Georgia, Serif;
}

font-size //规定文本的字体尺寸	1

/*	medium 默认值：
smaller	把 font-size 设置为比父元素更小的尺寸。
larger	把 font-size 设置为比父元素更大的尺寸。
length	把 font-size 设置为一个固定的值。
%	把 font-size 设置为基于父元素的一个百分比值。*/

{
font-size: 250%
}

font-style //规定文本的字体样式	1

/*	normal	默认值。浏览器显示一个标准的字体样式。
italic	浏览器会显示一个斜体的字体样式。
oblique	浏览器会显示一个倾斜的字体样式。*/

{
font-style: normal
}

font-variant //规定文本的字体样式	1

/*	normal	默认值。浏览器会显示一个标准的字体。
small-caps	浏览器会显示小型大写字母的字体。*/

{
font-variant: small-caps;
}

font-weight //规定字体的粗细	1

/*	normal	默认值。定义标准的字符。
bold	定义粗体字符。
bolder	定义更粗的字符。
lighter	定义更细的字符。
100-900	定义由粗到细的字符。400 等同于 normal，而 700 等同于 bold。*/

{
font-weight: normal;
}

@font-face {}

//一个规则，允许网站下载并使用其他超过"Web- safe"字体的字体	3

/*	font-family	name	必需的。定义字体的名称。
src	URL	必需的。定义该字体下载的网址（S）
font-stretch	normal
condensed
ultra-condensed
extra-condensed
semi-condensed
expanded
semi-expanded
extra-expanded
ultra-expanded	可选。定义该字体应该如何被拉长。默认值是"正常"
font-style	normal
italic
oblique	可选。定义该字体应该是怎样样式。默认值是"正常"
font-weight	normal
bold
100-900	可选。定义字体的粗细。默认值是"正常"
unicode-range	unicode-range	可选。定义该字体支持Unicode字符的范围。默认值是"ü+0-10 FFFF"*/

@font-face {
font-family: myFirstFont;
src: url('Sansation_Light.ttf'), url('Sansation_Light.eot');
/* IE9 */
}

font-size-adjust //为元素规定 aspect 值	3
{
font-size-adjust: 0.58;
}

font-stretch //收缩或拉伸当前的字体系列	3

/*内容生成属性(Generated Content Properties)*/

//content	与 :before 以及 :after 伪元素配合使用，来插入生成内容	2
counter-increment //递增或递减一个或多个计数器	2
counter-reset //创建或重置一个或多个计数器	2
quotes //设置嵌套引用的引号类型	2
crop //允许replaced元素只是作为一个对象代替整个对象的矩形区域	3
move-to //Causes an element to be removed from the flow and reinserted at a later point in the document	3
page-policy //判定基于页面的给定元素的适用于计数器的字符串值	3

/*网格（Grid） 属性*/

grid-columns //指定在网格中每列的宽度	3
grid-rows //指定在网格中每列的高度	3

/*超链接(Hyperlink) 属性*/

target //简写属性设置target-name, target-new,和target-position属性	3
target-name //指定在何处打开链接（目标位置）	3
target-new //指定是否有新的目标链接打开一个新窗口或在现有窗口打开新标签	3
target-position //指定应该放置新的目标链接的位置	3

/*线框(Linebox) 属性*/

alignment-adjust //允许更精确的元素的对齐方式	3
alignment-baseline //其父级指定的内联级别的元素如何对齐	3
baseline-shift //允许重新定位相对于dominant-baseline的dominant-baseline	3
dominant-baseline //指定scaled-baseline-table	3
drop-initial-after-adjust //设置下拉的主要连接点的初始对齐点	3
drop-initial-after-align //校准行内的初始行的设置就是具有首字母的框使用初级连接点	3
drop-initial-before-adjust //设置下拉的辅助连接点的初始对齐点	3
drop-initial-before-align //校准行内的初始行的设置就是具有首字母的框使用辅助连接点	3
drop-initial-size //控制局部的首字母下沉	3
drop-initial-value //激活一个下拉式的初步效果	3
inline-box-align //设置一个多行的内联块内的行具有前一个和后一个内联元素的对齐	3
line-stacking //一个速记属性设置line-stacking-strategy, line-stacking-ruby,和line-stacking-shift属性	3
line-stacking-ruby //设置包含Ruby注释元素的行对于块元素的堆叠方法	3
line-stacking-shift //设置base-shift行中块元素包含元素的堆叠方法	3
line-stacking-strategy //设置内部包含块元素的堆叠线框的堆叠方法	3
text-height //行内框的文本内容区域设置block-progression维数	3

/*列表(List) 属性*/

list-style //在一个声明中设置所有的列表属性	1
list-style-image //将图象设置为列表项标记	1
list-style-position //设置列表项标记的放置位置	1
list-style-type //设置列表项标记的类型	1

/*外边距(Margin) 属性*/

margin //在一个声明中设置所有外边距属性	1
{
margin: 10px 5px 15px 20px;
/*	上边距是 10px
右边距是 5px
下边距是 15px
左边距是 20px*/
margin: 10px 5px 15px;
/*	上边距是 10px
右边距和左边距是 5px
下边距是 15px*/
margin: 10px 5px;
/*	上边距和下边距是 10px
右边距和左边距是 5px*/
margin: 10px;
/*	所有四个边距都是 10px*/
}

margin-bottom //设置元素的下外边距	1
margin-left //设置元素的左外边距	1
margin-right //设置元素的右外边距	1
margin-top //设置元素的上外边距	1

/*字幕(Marquee) 属性*/

marquee-direction //设置内容移动的方向	3
marquee-play-count //设置内容移动多少次	3
marquee-speed //设置内容滚动的速度有多快	3
marquee-style //设置内容移动的样式	3

/*多列(Multi-column) 属性*/

column-count //指定元素应该分为的列数	3
column-fill //指定如何填充列	3
column-gap //指定列之间的差距	3
column-rule //对于设置所有column-rule-*属性的简写属性	3
column-rule-color //指定列之间的颜色规则	3
column-rule-style //指定列之间的样式规则	3
column-rule-width //指定列之间的宽度规则	3
column-span //指定元素应该跨越多少列	3
column-width //指定列的宽度	3
columns //缩写属性设置列宽和列数	3

/*页面媒体(Paged Media) 属性*/

fit //如果其宽度和高度属性都不是auto给出一个提示，如何大规模替换元素	3
fit-position //判定方框内对象的对齐方式	3
image-orientation //指定用户代理适用于图像中的向右或顺时针方向的旋转	3
page //指定一个元素应显示的页面的特定类型	3
size //指定含有BOX的页面内容的大小和方位	3

/*定位（Positioning） 属性*/

position //规定元素的定位类型	2

/*	absolute	生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。
元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
fixed	生成绝对定位的元素，相对于浏览器窗口进行定位。
元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
relative	生成相对定位的元素，相对于其正常位置进行定位。
因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。
static	默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。*/

h2 {
position: absolute;
left: 100px;
top: 150px;
}

top //设置定位元素的上外边距边界与其包含块上边界之间的偏移	2
img {
position: absolute;
top: 5px;
}

bottom //设置定位元素下外边距边界与其包含块下边界之间的偏移	2

/*	对于绝对定位元素，bottom属性设置单位高于/低于包含它的元素的底边。
对于相对定位元素，bottom属性设置单位高于/低于其正常位置的元素的底边。*/

{
position: absolute;
bottom: 5px;
}

left //设置定位元素左外边距边界与其包含块左边界之间的偏移	2

/*	auto	默认值。通过浏览器计算左边缘的位置。
%	设置以包含元素的百分比计的左边位置。可使用负值。
length	使用 px、cm 等单位设置元素的左边位置。可使用负值。*/

img {
position: absolute;
left: 5px;
}

right //设置定位元素右外边距边界与其包含块右边界之间的偏移	2
img {
position: absolute;
right: 5px;
}

clear //规定元素的哪一侧不允许其他浮动元素	1

/*	left	在左侧不允许浮动元素。
right	在右侧不允许浮动元素。
both	在左右两侧均不允许浮动元素。
none	默认值。允许浮动元素出现在两侧。*/

img {
float: left;
}

p.clear {
clear: both;
}

clip //剪裁绝对定位元素	2

/*	shape	设置元素的形状。唯一合法的形状值是：rect (top, right, bottom, left)
auto	默认值。不应用任何剪裁。*/

img {
position: absolute;
clip: rect(0px, 60px, 200px, 0px);
}

cursor //规定要显示的光标的类型（形状）	2

/*	url	需使用的自定义光标的 URL
default	默认光标（通常是一个箭头）
auto	默认。浏览器设置的光标。
crosshair	光标呈现为十字线。
pointer	光标呈现为指示链接的指针（一只手）
move	此光标指示某对象可被移动。
e-resize	此光标指示矩形框的边缘可被向右（东）移动。
ne-resize	此光标指示矩形框的边缘可被向上及向右移动（北/东）。
nw-resize	此光标指示矩形框的边缘可被向上及向左移动（北/西）。
n-resize	此光标指示矩形框的边缘可被向上（北）移动。
se-resize	此光标指示矩形框的边缘可被向下及向右移动（南/东）。
sw-resize	此光标指示矩形框的边缘可被向下及向左移动（南/西）。
s-resize	此光标指示矩形框的边缘可被向下移动（北/西）。
w-resize	此光标指示矩形框的边缘可被向左移动（西）。
text	此光标指示文本。
wait	此光标指示程序正忙（通常是一只表或沙漏）。
help	此光标指示可用的帮助（通常是一个问号或一个气球）。*/

span.crosshair {
cursor: crosshair
}

span.help {
cursor: help
}

span.wait {
cursor: wait
}

display //规定元素应该生成的框的类型	1

/*	none	此元素不会被显示。
block	此元素将显示为块级元素，此元素前后会带有换行符。
inline	默认。此元素会被显示为内联元素，元素前后没有换行符。
inline-block	行内块元素。（CSS2.1 新增的值）
list-item	此元素会作为列表显示。
run-in	此元素会根据上下文作为块级元素或内联元素显示。
compact	CSS 中有值 compact，不过由于缺乏广泛支持，已经从 CSS2.1 中删除。
marker	CSS 中有值 marker，不过由于缺乏广泛支持，已经从 CSS2.1 中删除。
table	此元素会作为块级表格来显示（类似 <table>），表格前后带有换行符。
inline-table	此元素会作为内联表格来显示（类似 <table>），表格前后没有换行符。
table-row-group	此元素会作为一个或多个行的分组来显示（类似 <tbody>）。
table-header-group	此元素会作为一个或多个行的分组来显示（类似 <thead>）。
table-footer-group	此元素会作为一个或多个行的分组来显示（类似 <tfoot>）。
table-row	此元素会作为一个表格行显示（类似 <tr>）。
table-column-group	此元素会作为一个或多个列的分组来显示（类似 <colgroup>）。
table-column	此元素会作为一个单元格列显示（类似 <col>）
table-cell	此元素会作为一个表格单元格显示（类似 <td> 和 <th>）
table-caption	此元素会作为一个表格标题显示（类似 <caption>）*/

p.inline {
display: inline;
}

float //规定框是否应该浮动	1

/*	left	元素向左浮动。
right	元素向右浮动。
none	默认值。元素不浮动，并会显示在其在文本中出现的位置。*/

img {
float: right;
}

overflow //规定当内容溢出元素框时发生的事情	2

/*	visible	默认值。内容不会被修剪，会呈现在元素框之外。
hidden	内容会被修剪，并且其余内容是不可见的。
scroll	内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。
auto	如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。*/

div {
width: 150px;
height: 150px;
overflow: scroll;
}

visibility //规定元素是否可见	2

/*	visible	默认值。元素是可见的。
hidden	元素是不可见的。
collapse	当在表格元素中使用时，此值可删除一行或一列，但是它不会影响表格的布局。
被行或列占据的空间会留给其他内容使用。如果此值被用在其他的元素上，会呈现为 "hidden"。*/

h2 {
visibility: hidden;
}

z-index //设置元素的堆叠顺序	2
img {
position: absolute;
left: 0px;
top: 0px;
z-index: -1;
}


/*分页（Print） 属性*/

orphans //设置当元素内部发生分页时必须在页面底部保留的最少行数	2
page-break-after //设置元素后的分页行为	2
page-break-before //设置元素前的分页行为	2
page-break-inside //设置元素内部的分页行为	2
widows //设置当元素内部发生分页时必须在页面顶部保留的最少行数	2

/*Ruby 属性*/

ruby-align //控制Ruby文本和Ruby基础内容相对彼此的文本对齐方式	3
ruby-overhang //当Ruby文本超过Ruby的基础宽，确定ruby文本是否允许局部悬置任意相邻的文本，除了自己的基础	3
ruby-position //它的base控制Ruby文本的位置	3
ruby-span //控制annotation 元素的跨越行为	3

/*语音（Speech） 属性*/

mark //缩写属性设置mark-before和mark-after属性	3
mark-after //允许命名的标记连接到音频流	3
mark-before //允许命名的标记连接到音频流	3
phonemes //指定包含文本的相应元素中的一个音标发音	3
rest //一个缩写属性设置rest-before和rest-after属性	3
rest-after //一个元素的内容讲完之后，指定要休息一下或遵守韵律边界	3
rest-before //一个元素的内容讲完之前，指定要休息一下或遵守韵律边界	3
voice-balance //指定了左，右声道之间的平衡	3
voice-duration //指定应采取呈现所选元素的内容的长度	3
voice-pitch //指定平均说话的声音的音调（频率）	3
voice-pitch-range //指定平均间距的变化	3
voice-rate //控制语速	3
voice-stress //指示着重力度	3
voice-volume //语音合成是指波形输出幅度	3

/*表格（Table） 属性*/

border-collapse //规定是否合并表格边框	2
border-spacing //规定相邻单元格边框之间的距离	2
caption-side //规定表格标题的位置	2
empty-cells //规定是否显示表格中的空单元格上的边框和背景	2
table-layout //设置用于表格的布局算法	2

/*文本（Text） 属性*/

color //设置文本的颜色	1
{
color: #00ff00;
color: red;
color: rgb(0, 0, 255);
}

direction //规定文本的方向 / 书写方向	2

/*	ltr	默认。文本方向从左到右。
rtl	文本方向从右到左。*/

{
direction: rtl;
}

letter-spacing //设置字符间距	1
{
letter-spacing: 2px
}

line-height //设置行高	1

/*	normal	默认。设置合理的行间距。
number	设置数字，此数字会与当前的字体尺寸相乘来设置行间距。
length	设置固定的行间距。
%	基于当前字体尺寸的百分比行间距。*/

{
line-height: 90%
}

text-align //规定文本的水平对齐方式	1

/*	left	把文本排列到左边。默认值：由浏览器决定。
right	把文本排列到右边。
center	把文本排列到中间。
justify	实现两端对齐文本效果。*/

{
text-align: center
}

text-decoration //规定添加到文本的装饰效果	1

/*	none	默认。定义标准的文本。
underline	定义文本下的一条线。
overline	定义文本上的一条线。
line-through	定义穿过文本下的一条线。
blink	定义闪烁的文本。*/

{
text-decoration: overline
}

text-indent //规定文本块首行的缩进	1
{
text-indent: 50px;
}

text-transform //控制文本的大小写	1

/*	none	默认。定义带有小写字母和大写字母的标准的文本。
capitalize	文本中的每个单词以大写字母开头。
uppercase	定义仅有大写字母。
lowercase	定义无大写字母，仅有小写字母。*/

{
text-transform: uppercase;
}

unicode-bidi //2
vertical-align //设置元素的垂直对齐方式	1

/*	baseline	默认。元素放置在父元素的基线上。
sub	垂直对齐文本的下标。
super	垂直对齐文本的上标
top	把元素的顶端与行中最高元素的顶端对齐
text-top	把元素的顶端与父元素字体的顶端对齐
middle	把此元素放置在父元素的中部。
bottom	把元素的顶端与行中最低的元素的顶端对齐。
text-bottom	把元素的底端与父元素字体的底端对齐。
length
%	使用 "line-height" 属性的百分比值来排列此元素。允许使用负值。*/

{
vertical-align: text-top;
}

white-space //设置怎样给一元素控件留白	1

/*	normal	默认。空白会被浏览器忽略。
pre	空白会被浏览器保留。
nowrap	文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。
pre-wrap	保留空白符序列，但是正常地进行换行。
pre-line	合并空白符序列，但是保留换行符。*/

{
white-space: nowrap;
}

word-spacing //设置单词间距	1
hanging-punctuation //指定一个标点符号是否可能超出行框	3
punctuation-trim //指定一个标点符号是否要去掉	3
text-align-last //当 text-align 设置为 justify 时，最后一行的对齐方式。	3
text-justify //当 text-align 设置为 justify 时指定分散对齐的方式。	3
text-outline //设置文字的轮廓。	3
text-overflow //指定当文本溢出包含的元素，应该发生什么	3
text-shadow //为文本添加阴影	3
text-wrap //指定文本换行规则	3
word-break //指定非CJK文字的断行规则	3
word-wrap //设置浏览器是否对过长的单词进行换行。	3

/*2D/3D 转换属性*/

transform //适用于2D或3D转换的元素	3
transform-origin //允许您更改转化元素位置	3
transform-style //3D空间中的指定如何嵌套元素	3
perspective //指定3D元素是如何查看透视图	3
perspective-origin //指定3D元素底部位置	3
backface-visibility //定义一个元素是否应该是可见的，不对着屏幕时	3

/*过渡（Transition） 属性*/

transition //此属性是 transition-property、transition-duration、transition-timing-function、transition-delay 的简写形式。	3
transition-property //设置用来进行过渡的 CSS 属性。	3
transition-duration //设置过渡进行的时间长度。	3
transition-timing-function //设置过渡进行的时序函数。	3
transition-delay //指定过渡开始的时间。	3

/*用户外观(User-interface) 属性*/

appearance //定义元素的外观样式	3
box-sizing //允许您为了适应区域以某种方式定义某些元素	3
icon //为元素指定图标	3
nav-down //指定用户按向下键时向下导航的位置	3
nav-index //指定导航（tab）顺序。	3
nav-left //指定用户按向左键时向左导航的位置	3
nav-right //指定用户按向右键时向左导航的位置	3
nav-up //指定用户按向上键时向上导航的位置a	3
outline-offset //设置轮廓框架在 border 边缘外的偏移	3
resize //定义元素是否可以改变大小	3