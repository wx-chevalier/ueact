// @flow

import { createElementAlias } from './jsx/createElement';
import VNode from '../../isomorphic/vdom/node/VNode';
/**
 * Description 渲染当前元素及其包含的子树
 * @param vNode
 * @return {*}
 */
export function renderVNode(vNode: VNode): HTMLElement {
  // 为根节点创建对应的 DOM 节点对象
  let el = createElementAlias(vNode.nodeName, vNode.props);

  let childEl = null;

  // 依次渲染子元素
  vNode.children.forEach((child: VNode) => {
    // 如果子元素仍然是 VNode 实例
    if (child instanceof VNode) {
      childEl = renderVNode(child);
    } else {
      childEl = document.createTextNode(child);
    }

    el.appendChild(childEl);
  });

  // 设置该 vNode 对应的 Ref
  vNode.setRef(el);

  return el;
}
