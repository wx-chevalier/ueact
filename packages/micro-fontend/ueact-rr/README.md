# Micro Frontend with React & Redux

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
