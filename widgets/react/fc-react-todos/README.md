# fc-react-todos

## Demo

源代码查看：[code/stories/todo](../code/stories/todo.js)

# Usage

```sh
# 在 JavaScript 项目中使用
$ create-react-app myapp

# 在 TypeScript 项目中使用
$ create-react-app myapp --scripts-version=react-scripts-ts-antd
```

## asyncComponent

## withLog

```js
import { withLog } from 'fc-react-hocs';

const Button = withLog(props => {
  console.log(props);
})(({ name }) => <button>{name}</button>);
```
