![ueact banner](https://user-images.githubusercontent.com/5803001/44896692-a51adc00-ad2b-11e8-9be9-ac495c77932e.png)

# Ueact: 渐进式，多调和策略，多渲染终端的乐高式微前端框架以及可复用的碎片化组件

![](https://badge.fury.io/gh/wxyyxc1992%2FUeact.svg)

Ueact 并不是一个严谨的框架，笔者在在编写该框架的过程中始终遵循分层独立原则，更多的倾向于框架的可读性与可解释性，不可避免地会影响性能。笔者编写该框架的初衷也是希望方便感兴趣的读者了解 React/Vue.js 这样框架的原理与基本代码结构，同时也吸收了像 preact、anu 这样优秀的轻量级框架的优化方向。不过笔者代码写得差也不要当真嘛，Just For Fun!

Ueact 也不仅仅是框架，更包含了笔者对于微前端、交互式界面构建等架构/应用领域的思考与探索。其中的 widgets 目录 源于 fractal-components，是笔者日常工作中总结出来的应用、组件库以及组件开发模式，为了保证其独立性与复用性，笔者以不同的方式实现了组件。fractal-components 中包含了可复用的组件，还有很多纯界面化展示的组件，可以参考 [CodePen](https://codepen.io/dashboard/)。

# TOC | 目录

![](https://github.com/danistefanovic/build-your-own-x/raw/master/feynman.png)

## Core Framework | 界面框架

- [shared](./framework/shared): 通用模块

  - [ueact-common](./framework/shared/ueact-common): 基础工具库
  - [ueact-jsx](./framework/shared/ueact-jsx): JSX 解析与元素创建
  - [ueact-vdom](./framework/shared/ueact-vdom): Virtual DOM 定义、创建与 Diff
  - [ueact-component](./framework/shared/ueact-component): 通用组件定义

* [reconciler](./framework/reconciler): 调和算法

  - [ueact-reactive](./framework/ueact-reactive): 响应式监听
  - [ueact-stack](./framework/ueact-stack): 单向数据流
  - [ueact-fiber](./framework/ueact-fiber): Fiber 异步调和

- [render](./framework/render): 渲染模块

  - [ueact-dom-render](./framework/render/ueact-dom-render): DOM 渲染
  - [ueact-console-render](./framework/render/ueact-console-render): Console 渲染
  - [ueact-native-render](./framework/render/ueact-native-render): 移动端渲染
  - [ueact-server-render](./framework/render/ueact-server-render): 服务端渲染
  - [ueact-test-render](./framework/render/ueact-test-render): 测试用渲染

## Architecture & Visual Builder | 架构与可视化搭建

- [micro-frontend](./micro-frontend): 微前端

  - [ueact-rr](./micro-frontend/ueact-rr): 面向 React & Redux 技术栈的微前端方案
  - [ueact-mixed-spa](./framework/micro-frontend/ueact-mixed-spa): 多框架混合 SPA

- [lego](./lego): 可视化界面搭建

  - [ueact-layout](./lego/ueact-layout): 交互式动态布局库
  - [ueact-form](./lego/ueact-form): 表单解决方案
  - [ueact-bpm](./lego/ueact-bpm): 流程引擎

## Widgets & Fractal Components | 界面插件/碎片化组件

- [CSS](./css): 纯 CSS 实现的组件

  - [mobile-style-preset](./css/mobile-style-preset): 移动端样式预置库，CSS/SCSS

- [Vanilla JS](./vanilla): 朴素 JavaScript 与 CSS 实现的组件

  - [fc-draggable-toolbar](./vanilla/fc-draggable-toolbar): 可拖拽的工具栏

- [React](./widgets/react): 基于 React 实现的组件

  - [fc-react-responsive](./widgets/react/fc-react-responsive): React 响应式组件
  - [fc-react-scroll](./widgets/react/fc-react-scroll): React 滚动组件
  - [fc-react-todos](./widgets/react/fc-react-todos): React Todos 复用组件库
  - [fc-react-animated](./widgets/react/fc-react-animated): 一系列 React 动画/动画组件
  - [fc-react-hocs](./widgets/react/fc-react-hocs): React 中常用的高阶函数集锦

- [React Native](./react-native): 基于 React Native 实现的组件

- [Vue.js](./vue): Vue.js 系列组件

- [Weapp](./weapp): 微信小程序组件

  - [fc-weapp-mindmap](./weapp/fc-weapp-mindmap): 微信小程序中的思维脑图

# Development | 开发

## Scaffold | 脚手架

- 使用 [Lerna](https://github.com/lerna/lerna#lernajson) 进行项目间依赖管理。

```sh
# 列举所有子项目
$ lerna list

# 为所有子项目安装依赖，并且 Link
$ lerna bootstrap

# 在全部子项目中执行命令
$ lerna exec
```

- 使用 Rollup/Microbundle/Webpack 进行项目打包

- 使用 Parcel 运行测试界面
