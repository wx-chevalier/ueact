// @flow

import Reconciler from './Reconciler';
import UniComponent from '../component/UniComponent';
import { mountElement, renderVNode } from '../render';
import { HostParentType } from '../../../../types/flow/vdom.types';

/**
 * Description 栈调和工具
 */
export default class StackReconciler extends Reconciler {
  /**
   * Description 将 mountComponent 独立出来是为了保证 Component 的通用性
   * @param componentInstance
   * @param hostParent
   * @param opts
   * @param mountAll
   * @param isChild
   * @return {HTMLElement}
   */
  static mountUniComponent(
    componentInstance: UniComponent,
    hostParent: HostParentType,
    opts: Object,
    mountAll: Boolean,
    isChild: Boolean
  ): HTMLElement {
    // 从组件中渲染出实际的 VNode
    let renderedVNode = componentInstance.render();

    renderedVNode.componentInstance = componentInstance;

    // 将该虚拟结点渲染为元素
    let el = renderVNode(renderedVNode);

    // 实际地将组件进行挂载
    mountElement(hostParent, el);

    // 将实际的 DOM 元素挂载到组件实例上
    renderedVNode._ref = el;

    componentInstance.vNode = renderedVNode;

    return el;
  }
}
