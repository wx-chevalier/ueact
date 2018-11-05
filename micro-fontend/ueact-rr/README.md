# Micro Frontend with React & Redux

# Concerns

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
  ReactDOM.render(
    React.createElement('p', {}, 'Hello, AMD!'),
    document.getElementById('root')
  );
});
```

## IoC | 控制反转

### Service Declaration & Implemention | 服务声明与实现

### Serice Initialization | 服务初始化与依赖树解析

- 循环依赖处理

## Debug | 调试

### Mock API

内置了 [Xiddler](https://github.com/wxyyxc1992/Pudding/tree/master/tools/xiddler) 作为 Mock 解决方案。

## Runtime | 运行时特性

### Navigation | 路由导航
