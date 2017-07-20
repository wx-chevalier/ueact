// @flow

import { observe } from 'observer-x/dist/observer-x.es';
import { html2JSX } from '../../dom/jsx/html2JSX';

const contextMethods = ['methods', 'hooks'];

export function observeDOM(ele: Element, context = {}, Babel: any = undefined) {
  let innerContext = Object.assign(
    {
      state: {},
      methods: {},
      hooks: {},
      root: ele
    },
    context
  );

  // 将内部状态转化为可观测变量
  let state = observe(innerContext.state);

  innerContext.state = state;

  // 绑定定义的方法
  contextMethods.forEach((contextMethod: string) => {
    let methods = innerContext[contextMethod];

    for (let methodName of Object.keys(methods)) {
      methods[methodName] = methods[methodName].bind(innerContext);
    }
  });

  state.listen(changes => {
    renderFromStr(innerContext);

    innerContext.hooks.updated && innerContext.hooks.updated();

  });

  // 如果尚未编译，则首先执行编译
  if (Babel) {
    let input = html2JSX(ele.outerHTML);

    let output = Babel.transform(input, {
      presets: ['es2015'],
      plugins: [
        [
          'transform-react-jsx',
          {
            pragma: 'Ueact.createDOMElement'
          }
        ]
      ]
    }).code;

    innerContext.rawJSX = output.replace(/"use strict";/, '').trim();

    innerContext.hooks.created && innerContext.hooks.created();

    renderFromStr(innerContext);

    // 触发回调事件
    innerContext.hooks.mounted && innerContext.hooks.mounted();
  }
}

/**
 * Description 从输入的 JSX 函数字符串中完成构建
 * @param innerContext
 */
function renderFromStr(innerContext) {
  let func = new Function(
    'innerContext',
    `
     let { state, methods, hooks } = innerContext;
     let ele = ${innerContext.rawJSX}
     return ele;
    `
  ).bind(innerContext);

  // 构建新节点
  let newEle: Element = func(innerContext);

  // 使用指定元素的父节点替换自身
  innerContext.root.parentNode.replaceChild(newEle, innerContext.root);

  // 替换完毕之后删除旧节点的引用，触发 GC
  innerContext.root = newEle;


}
