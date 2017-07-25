// @flow
import { observeDOM } from './dom/observeDOM';
import VNode from '../vdom/node/VNode';
import { renderToDOM } from '../renderers/dom/renderToDOM';
import mountReactiveComponent from './component/mountReactiveComponent';

/**
 * Description 渲染 VNode 到指定节点
 * @param vNode
 * @param parent
 */
export function render(vNode: VNode, parent: Element) {
  if (vNode instanceof HTMLElement) {
    parent.parentNode.replaceChild(vNode, parent);
    return;
  }

  if (vNode.componentInstance) {
    // 挂载组件并且添加事件监听
    mountReactiveComponent(vNode.componentInstance);
  }

  let ele = vNode.render();

  // 挂载实际的 DOM 节点
  parent.parentNode.replaceChild(ele, parent);

  // 挂载完毕后设置元素对象
  vNode.__ref = ele;

  if (vNode.componentInstance) {
    vNode.componentInstance.componentDidMount();
  }
}

export default render;

export const renderMVVM = render;
