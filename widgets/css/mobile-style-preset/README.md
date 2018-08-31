<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Mobile Style Preset](#mobile-style-preset)
  - [Media Query](#media-query)
  - [CSS Children Selector](#css-children-selector)
- [Mobile Reset](#mobile-reset)
  - [border-box](#border-box)
  - [Responsive Basic Size](#responsive-basic-size)
  - [Table](#table)
- [Layout](#layout)
  - [Flex box](#flex-box)
- [Utilities](#utilities)
  - [Scroll](#scroll)
  - [Visibility On Mobile](#visibility-on-mobile)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# [Mobile Style Preset](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/OpenSource/mobile-style-preset/README.md)

> 项目的很多设想受[Mobi.css](https://github.com/xcatliu/mobi.css)启发,这是一个非常优秀的面向移动端样式的CSS轻量级库,如果想要寻找合适的Production-Ready的库请直接转向Mobi.css

笔者最近一直在基于APICloud做Mobile Web与Hybrid APP开发,。笔者在构想Mobile Style Preset之处,觉得它应该具有如下特性:

- Pure CSS,不考虑引入JavaScript。
- 轻量级非侵入式，笔者在使用BootStrap这些稍显重量级的框架时会感觉给默认样式的侵入太多，在需要进行些修改时会导致。
- Mobile First & SCSS First，因为笔者主要是在React中以SCSS进行样式设置，因此所有的属性设置都会以Mixin形式提供使用，而在Dist版本中以提供可以直接使用的样式类。


[Mobile Style Preset](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/OpenSource/mobile-style-preset/README.md)主要是笔者在日常工作中一些常用的移动端样式的总结,目前推荐是在SCSS中使用MSP，首先需要用`npm`命令安装:

```
npm i mobile-style-preset --save
```

然后在Webpack中,需要将node_mudules添加到搜索路径中:

```
{
  test: /\.scss$/, 
  loader: 'style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true&includePaths[]=./node_modules' 
},
```

然后在项目的scss文件中,使用`import`引入:

```
@import "~mobile-style-preset/msp.scss";
```

目前Mobile Style Preset正在处于开发中,接口与样式类名可能发生变化,如果有建议或者想法的也欢迎提ISSUE一起讨论,欢迎指出错误。



## Media Query
对于移动端开发中遇到的首要问题即使响应式开发问题,可以参考笔者的[前端响应式实践](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/Frontend/Advanced/Render/Responsive/Frontend-ResponsiveSize.md)。总结而言,常见的响应式开发可以有使用Viewport Size、使用媒介查询、使用类似于[ScalableComponent](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/OpenSource/scalable-component/README.md)这样的按比例缩放的库等等。而目前因为还需要适配大量的低版本的浏览器与性能的考量，笔者还是选择使用了Media Query来设置HTML的FontSize基准值，然后使用`em`作为主要的尺寸单位。首先看下我们常见的移动端尺寸（以iPhone为主）：

| Device                    | resolution (px) | device-width/ device-height (px)         |
| ------------------------- | --------------- | ---------------------------------------- |
| iPhone                    | 320 x 480       | 320 x 480, in both portrait and landscape mode |
| iPhone 4                  | 640 x 960       | 320 x 480, in both portrait and landscape mode. `device-pixel-ratio`is 2 |
| iPhone 5, 5s              | 640 x 1136      | 320 x 568, in both portrait and landscape mode. `device-pixel-ratio`is 2 |
| iPhone 6                  | 750 x 1334      | 375 x 667, in both portrait and landscape mode. `device-pixel-ratio`is 2 |
| iPhone 6 plus             | 1242 x 2208     | 414 x 736, in both portrait and landscape mode. `device-pixel-ratio`is 3 |
| iPad 1 and 2              | 768 x 1024      | 768 x 1024, in both portrait and landscape mode |
| iPad 3                    | 1536 x 2048     | 768 x 1024, in both portrait and landscape modeCSS pixel density is 2 |
| Samsung Galaxy S I and II | 480 x 800       | 320 x 533, in portrait modeCSS pixel density is 1.5 |
| Samsung Galaxy S III      | 720 x 1280      | 360? x 640?, in portrait mode            |
| HTC Evo 3D                | 540 x 960       | 360 x 640, portrait modeCSS pixel density is 1.5 |
| Amazon Kindle Fire        | 1024 x 600      | 1024 x 600, landscape mode               |

在Mobile Style Preset中，笔者是改造的[sass-mediaqueries](https://github.com/paranoida/sass-mediaqueries/blob/master/_media-queries.scss)，主要是面向iPhone的几个型号进行适配，另外添加了部分Android设备的支持，这里以iPad的Media Query为例:

```
@mixin ipad($orientation: all)
{
  $deviceMinWidth: 768px;
  $deviceMaxWidth: 1024px;

  @if $orientation == all
  {
    @media only screen and (min-device-width: $deviceMinWidth) and (max-device-width: $deviceMaxWidth)
    {
      @content;
    }
  }
  @else
  {
    @media only screen and (min-device-width: $deviceMinWidth) and (max-device-width: $deviceMaxWidth)
    and (orientation:#{$orientation})
    {
      @content;
    }
  }
}
```



## CSS Children Selector

子元素选择器是使用CSS时常有的选择器之一，这里改用了[Family.scss](https://github.com/LukyVj/family.scss)来提供了内置的快速的SCSS`:nth-child`mixins。另外在iOS 8中直接使用`:nth-child`会存在[一定问题](http://stackoverflow.com/questions/27127879/nth-child-not-working-on-iossafari-8)，需要提供如下的Polyfill才能保证正常工作:

```
.itemgrid-3cols li:nth-of-type(3n+1) {
    clear: left;
}
```

而对于便捷的子元素选择器，可以使用@include引入相应的mixins:

```
ul li {
  background: blue;

  @include first(3) {
    background: blue;
  }
}
```

其编译之后的输出为:

```
ul li {
  background: blue;
}
ul li:nth-child(-n + 3) {
  background: blue;
}
```



# Mobile Reset

完整的Mobile Reset部分样式代码参考[这里](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/OpenSource/mobile-style-preset/_mobile-reset.scss)，本章节将部分笔者觉得有意思的知识点列举讲解下。

## border-box

对于所有元素的样式重置中，其包含如下样式:

```
* {
  //将边距重置为0
  margin: 0;
  padding: 0;
  border: 0;

  //将盒模型的模式设置为boder-box,即将border包含在内
  box-sizing: border-box;
}
```

其中设置box-sizing值为border-box，即将盒模型的模式设置为boder-box,即将border包含在内。其默认值为content-box，即在默认情况下当你设置某个元素的高为500px时，该高度不会包含边距。这一点会导致譬如笔者进行Flex布局之后，如果设置了元素的边距导致整体宽度超过了父容器，结果导致溢出或者换行的情况。



## Responsive Basic Size

```

//基准的HTML大小为12px
html {
  font-size: 12px;
}

//对于屏幕大于375的,设置为15px
@include min-screen(375px) {
  html {
    font-size: 15px;
  }
}

//iPhone4与5同宽度
@include iphone4(portrait) {
  html {
    font-size: 9px;
  }
}

//以iPhone 5 为基准尺寸
@include iphone5(portrait) {
  html {
    font-size: 12px;
  }
}

//大概1.17倍
@include iphone6(portrait) {
  html {
    font-size: 14px;
  }
}

//大概1.29 倍
@include iphone6-plus(portrait) {
  html {
    font-size: 16px;
  }
}
```



## Table

```
table {
  width: auto;
  border-collapse: collapse;
  border-spacing: 0;
}
```

HTML中使用Tables进行布局一直是个很头疼的问题，它们使用起来很简单，但是无法进行响应式操作，并且也不方便进行全局样式设置。譬如，如果你打算为Table的边与单元的边添加样式，可能得到的结果如下:

  ```
  table {
      width: 600px;
      border: 1px solid #505050;
      margin-bottom: 15px;
      color:#505050;
  }

  td{
      border: 1px solid #505050;
      padding: 10px;
  }
  ```


![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/9/1/6BBCF480-65A4-4DA2-A956-0BEE74B471AF.png)

这里存在的问题是出现了很多的重复的边，会导致视觉上不协调的情况，那么我们可以通过设置`border-collapse:collapse`来进行处理:

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/9/1/721C04EE-5635-4090-A61A-8E156A85BF10.png)



# Layout

## Flex box

笔者目前主要使用Flexbox作为布局基础，关于Flexbox的用法可以参考笔者的[CSS Flexbox 入门与最佳实践](https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices/blob/master/Frontend/CSS/Layout/CSS-Flexbox.md)文章。

```
/*设置常见布局*/

//水平方向上布局
@mixin msp-flex-container {

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  flex-wrap: wrap;
}

.msp-flex-vertical-container {

  @include msp-flex-container;

}

//垂直方向上布局
@mixin msp-flex-vertical-container {

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  flex-wrap: wrap;
}

.msp-flex-vertical-container {

  @include msp-flex-vertical-container;

}

//设置Flex上元素
@mixin msp-flex-item($width) {

  flex: 1 0 $width;

}

.msp-flex-item-1-2 {
  @include msp-flex-item(50%);

}

.msp-flex-item-1-3 {
  @include msp-flex-item(33.33%);
}

.msp-flex-item-2-3 {
  @include msp-flex-item(66.67%);
}

.msp-flex-item-1-4 {
  @include msp-flex-item(25%);
}

.msp-flex-item-3-4 {
  @include msp-flex-item(75%);
}
```



# Utilities

## Scroll

在iOS中可能存在滚动平滑问题，其问题的复现可以在iOS中打开[[Overflow Scrolling on iOS](http://codepen.io/wxyyxc1992/pen/BLzapp)](http://codepen.io/wxyyxc1992/pen/BLzapp)查看效果，笔者同样提供了简单的Mixin与CSS样式类进行使用，源码如下:

```
//设置平滑滚动
@mixin smooth-scroll {
  -webkit-overflow-scrolling: touch;
}

//可以直接使用的平滑滚动的类
.vertical-scroll {

  overflow-x: hidden;
  overflow-y: scroll;
  //这里随意设置了一个最大高度,提醒要设置最大高度
  max-height: 50rem;
  @include smooth-scroll;

}

//设置水平滚动
.horizaontal-scroll {

  overflow-x: scroll;
  overflow-y: hidden;
  //这里设置最大宽度为100%
  width: 100%;
  @include smooth-scroll;

}
```



## Visibility On Mobile

这里以480px与769px分别为移动端与PC端的尺寸分割:

```
//设置是否需要显示在移动设备上
@mixin show-on-mobile {

  @include min-screen(480px) {
    @content;
  }

}

.show-on-mobile {

  @include show-on-mobile {
    display: none;
  }

}

@mixin hide-on-mobile {

  @include min-screen(769px) {
    @content;
  }

}

.hide-on-mobile {

  @include hide-on-mobile {
    display: none;
  }

}
```

