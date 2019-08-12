# Micro Frontend with React & Redux

# Concerns | 关注点

## Principles | 原则

- 灵活

  - 仅可能地简单、直接、非侵入
  - 应用可独立运行
  - 支持多框架兼容

- 受控

  - 视图与服务剥离
  - 统一服务调用网关、IoC 服务实例生成、服务依赖与调用的分布式追踪
  - 统一组件样式规范

- 迁移

  - 可便捷迁入其他应用
  - 可便捷迁出到其他平台

## Package & Load | 应用打包与加载

### AMD

```js
// main.js
requirejs.config({
  // module name mapped to CDN url
  paths: {
    // Require.js appends `.js` extension for you
    react: 'https://unpkg.com/react@15.3.2/dist/react',
    'react-dom': 'https://unpkg.com/react-dom@15.3.2/dist/react-dom'
  }
});

// load the modules defined above
requirejs(['react', 'react-dom'], function(React, ReactDOM) {
  // now you can render your React elements
  ReactDOM.render(React.createElement('p', {}, 'Hello, AMD!'), document.getElementById('root'));
});
```

## Service Gateway | 服务网关

### Service Declaration & Implemention | 服务声明与实现

### Serice Initialization | 服务初始化与依赖树解析

- 循环依赖处理

## Runtime | 运行时特性

### Navigation | 路由导航

### Service Degradation | 服务降级

- 接口调用降级
- 内部服务互依赖降级

### Distributed Trace | 分布式调用追踪

## Development Flow | 开发流体验

### Type Interface | 类型接口

- 内置服务提供 TypeScript 类型支持
- 自添加服务，提供

### Debug | 调试

### Mock API

内置了 [Xiddler](https://github.com/wxyyxc1992/Pudding/tree/master/tools/xiddler) 作为 Mock 解决方案。
