// @flow

import VNode from '../../../isomorphic/vdom/node/VNode';
import UniComponent from './UniComponent';
import { instantiateComponent } from '../../../isomorphic/component/utils/instantiateComponent';
import { isFunction } from '../../../shared/ds/type';
import StackReconciler from '../reconciler/StackReconciler';
import type { HostParentType } from '../../../../types/flow/vdom.types';
import UniUpdateQueue from '../reconciler/UniUpdateQueue';

/**
 * An incrementing ID assigned to each component when it is mounted. This is
 * used to enforce the order in which `ReactUpdates` updates dirty components.
 *
 * @private
 */
let nextMountID = 1;

/**
 * Description
 * 等价于 React 中 ReactCompositeComponent 中实现的功能
 * 等价于 preact 中 src/vdom/component.js 中实现的功能
 */
export default class UniCompositeComponent {
  /** 这个 VNode 存放的是尚未创建组件实例的，即未渲染子组件与子元素的原始虚拟结点 */
  // <CustomComponent/> => VNode{ nodeName = CustomComponent }
  shallowVNode: VNode;

  /** 该 VNode 对应的组件实例 */
  _instance: UniComponent;


  /**
   * Description 默认构造函数
   * @param vNode
   */
  constructor(vNode: VNode) {
    this.shallowVNode = vNode;
  }

  /**
   * Description 初始化 rawVNode 中包含的组件实例，执行该组件的渲染函数获得 renderedVNode，执行该 VNode 的渲染获得 DOM 元素，并且添加事件监听
   * @return {e}
   * @param hostParent
   */
  mountComponent(hostParent: HostParentType): HTMLElement {
    // 创建实例并且创建对应的 VNode，这里屏蔽了普通组件与函数式组件的差异
    // 这里的 Instance 是直接通过 new 创建，因此肯定为 UniComponent 或者 PureComponent
    this._instance = instantiateComponent(
      this.shallowVNode,
      null,
      UniComponent
    );

    this._instance._updateQueue = UniUpdateQueue;

    const {
      componentWillMount,
      componentDidMount,
      _renderCallbacks
    } = this._instance;

    // 判断是否存在预挂载回调
    if (componentWillMount && isFunction(componentWillMount)) {
      componentWillMount();
    }

    // 执行组件的挂载操作，并且获取到组件渲染得到的 HTML 元素
    const el: HTMLElement = this.performInitialMount(hostParent);

    // 判断该组件是否存在挂载完毕回调
    if (componentDidMount && isFunction(componentDidMount)) {
      componentDidMount();
    }

    // 在这里还需要触发内置的回调
    if (_renderCallbacks) {
      while (_renderCallbacks.length) {
        _renderCallbacks.pop().call(this._instance);
      }
    }

    return el;
  }

  performInitialMount(hostParent: HostParentType): HTMLElement {
    return StackReconciler.mountUniComponent(this._instance, hostParent);
  }
}
