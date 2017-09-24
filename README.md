
> 重要！Ueact 只是实验性框架，请勿在任何生产环境下使用，笔者只是想严肃地自己撸一遍现有的前端框架。

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2017/6/1/logo.png)![](https://badge.fury.io/gh/wxyyxc1992%2FUeact.svg)

# Ueact: 彻底的渐进式前端框架

截止到目前，Ueact 并不是一个严谨的框架，笔者在在编写该框架的过程中始终遵循分层独立原则，更多的倾向于框架的可读性与可解释性，不可避免地会影响性能。笔者编写该框架的初衷也是希望方便感兴趣的读者了解 React/Vue.js 这样框架的原理与基本代码结构；不过笔者也吸收了像 preact、anu 这样优秀的轻量级框架的优化方向。不过笔者代码写得差也不要当真嘛，Just For Fun!

## Online Demo

- [基于 JSX 与 Observer-X 的简单计数器](http://wxyyxc1992.github.io/ueact/browser/count.html)

- [TODOMVC](http://wxyyxc1992.github.io/ueact/browser/todomvc.html)

- [基本的 VNode 算法演示](http://wxyyxc1992.github.io/ueact/browser/vnode.html)

## Reference Frameworks & Library

****

- [React](https://github.com/facebook/react): A declarative, efficient, and flexible JavaScript library for building user interfaces.
- [Preact](https://github.com/developit/preact): [preact-render-to-string](https://github.com/developit/preact-render-to-string)
- [Infero](https://github.com/infernojs/inferno): An extremely fast, React-like JavaScript library for building modern user interfaces.
- [anu](https://github.com/RubyLouvre/anu): 读作 安努 ，苏美尔的主神，开天辟地。一个无痛替换线上 React 的迷你 React 框架。

****

- [Vue](https://github.com/vuejs/vue)
- [Moon]()
- [San](https://github.com/ecomfe/san): a MVVM Component Framework for the Web

****

- [simple-virtual-dom](https://github.com/livoras/simple-virtual-dom): Simple virtual-dom algorithm. It has only ~500 lines of code, including very basic idea of virtual-dom algorithm.
- [virtual-dom](https://github.com/Matt-Esch/virtual-dom): A JavaScript DOM model supporting element creation, diff computation and patch operations for efficient re-rendering


# Usage


# LifeCycle

- created / componentWillMount

- mounted / componentDidMount

- shouldComponentUpdate

- updated / componentDidUpdate

- unmounted / componentWillUnMount

beforeCreate — called after the instance has been initialized but before watchers/events have been setup

created — called after the instance has been initialized, the computed props, data watchers and events have been setup but the component has not been mounted to the el dom element

beforeMount — called right before mounting process begins

mounted — called after the instance has been mounted and the el in the DOM is replaced with your component.

beforeUpdate — called after the data changes but before the virtual DOM has been updated

updated — called after the DOM was updated

beforeDestroy — called before an instance is about to be destroyed but full functionality of the instance is still available

destroy — called after the instance has been destroyed

# Benchmark

- [Results for js web frameworks benchmark – round 6](https://hackernoon.com/top-resources-to-explore-react-fiber-9a2b19114520)