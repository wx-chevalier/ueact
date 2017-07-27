// @flow

import VNode from '../../isomorphic/vdom/node/VNode';
import UniCompositeComponent from './component/UniCompositeComponent';
import { createElementAlias } from '../../platform/dom/jsx/createElement';
import type { HostParentType } from '../../../types/flow/vdom.types';
import { mountComponent } from './component/mountComponent';
import { isFunctionAlias } from '../../shared/util/type';

/**
 * Description 渲染某个 VNode 到 HTML 元素
 * @param vNode
 * @param parent
 */
export function render(vNode: VNode, parent: HTMLElement): HTMLElement {
  // 构建 UniCompositeComponent 实例
  const ccInstance = new UniCompositeComponent(vNode);

  // 挂载该组件包含的 UniComponent 实例
  return ccInstance.mountComponent({
    parent
  });
}

export default render;

export const renderUni = render;

/**
 * Description 渲染当前元素及其包含的子树
 * @param vNode
 * @return {*}
 */
export function renderVNode(vNode: VNode): HTMLElement {
  let props = Object.assign({}, vNode.props);

  delete props.children;

  // 为根节点创建对应的 DOM 节点对象
  let el = createElementAlias(vNode.nodeName, props);

  let childEl = null;

  // 依次渲染子元素
  vNode.children.forEach((child: VNode) => {
    // 如果子元素仍然是 VNode 实例
    if (child instanceof VNode) {
      if (isFunctionAlias(child.nodeName)) {
        const ccInstance = new UniCompositeComponent(child);

        childEl = ccInstance.mountComponent({
          parent: el,
          predecessor: childEl
        });
      } else {
        childEl = renderVNode(child);
        el.appendChild(childEl);
      }
    } else {
      childEl = document.createTextNode(child);
      el.appendChild(childEl);
    }
  });

  // 设置该 vNode 对应的 Ref
  vNode.setRef(el);

  return el;
}

/**
 * Description 将某个生成的 DOM 结点挂载到指定父节点
 * @param hostParent
 * @param el
 */
export function mountElement(
  hostParent: HostParentType,
  el: HTMLElement
): Boolean {
  let { parent, predecessor } = hostParent;

  if (predecessor === undefined && parent.firstChild) {
    parent.replaceChild(el, parent.firstChild);
  } else if (predecessor === null) {
    parent.appendChild(el);
  } else {
    parent.appendChild(el);
  }
}
