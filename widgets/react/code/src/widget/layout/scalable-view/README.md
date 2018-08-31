# ScalableComponent

> 借鉴了[pageResponse](https://github.com/peunzhang/pageResponse/blob/master/README.md)这个移动端响应式插件本项目的开发环境脚手架使用了[Webpack-React-Redux-Boilerplate](https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/tree/boilerplate)

# Usage

使用`npm`命令下载安装该依赖:

```
npm i scalable-component --save
```

## 设置视口

```
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
```

## 导入 ScalableComponent

```
/**
 * Created by apple on 16/6/30.
 */
import React from "react";
import {render} from "react-dom";
import ScalableComponent from "./scalable";

render(<ScalableComponent mode="contain" wrapperBackgroundColor="rgb(117,155,156)">
    <div style={{color:"white"}}>
        <h1 style={{position:"absolute"}}>HI</h1>
        <p style={{position:"absolute",top:"50px"}}>This is Demo For Scalable</p>
        <img height="504px" width="320px" src="http://img5.cache.netease.com/photo/0031/2014-09-20/A6K9J0G94UUJ0031.jpg"
             alt=""/>
    </div>
</ScalableComponent>, document.getElementById('root'));
```

ths props of ScalableComponent is :

```
    static propTypes = {
        mode: PropTypes.oneOf(['auto', 'contain', 'cover']), //modes
        width: PropTypes.number, //width of the visual Design
        height: PropTypes.number, //height of the visual Design
        origin: PropTypes.string,//origin for scale
        wrapperBackgroundColor: PropTypes.string//background Color for hatch area
    };
```

# Mode

## Contain

Contain 模式即保证页面完全包含在浏览器窗口中,在保证页面的宽高比情况下调整页面的宽度或者高度中的较大者,使得页面水平垂直居中,左右或上下可能出现空白。

![](https://user-images.githubusercontent.com/5803001/34641517-9804daa2-f340-11e7-8114-8413b91559d5.gif)

## Cover

Cover 模式即使页面完全覆盖浏览器窗口,保持页面的宽高比，调整页面的宽度或高度（较小者),页面水平垂直居中，超出浏览器窗口左右或上下的内容会被隐藏
![](https://user-images.githubusercontent.com/5803001/34641518-9909a8c4-f340-11e7-8778-dd6dfe3f5538.gif)

## Auto

保持页面的宽高比，调整页面的宽度，使页面宽度完全包含在浏览器窗口中
![](https://user-images.githubusercontent.com/5803001/34641516-93ee7482-f340-11e7-87de-e6b979479036.gif)
