// @flow
import VNode from '../../isomorphic/vdom/node/VNode';
import { renderVNode } from '../unidirection/renderToDOM';
import mountReactiveComponent from './component/mountReactiveComponent';

/**
 * Description 渲染 VNode 到指定节点
 * @param vNode
 * @param parent
 */
export function render(vNode: VNode, parent: HTMLElement) {
  if (vNode instanceof HTMLElement) {
    parent.parentNode.replaceChild(vNode, parent);
    return;
  }

  if (vNode.componentInstance) {
    // 挂载组件并且添加事件监听
    mountReactiveComponent(vNode.componentInstance);
  }

  let el = renderVNode(vNode);

  // 挂载实际的 DOM 节点
  parent.parentNode.replaceChild(el, parent);

  if (vNode.componentInstance) {
    vNode.componentInstance.componentDidMount();
  }
}

export default render;

export const renderMVVM = render;
