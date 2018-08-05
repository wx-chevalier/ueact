// @flow
import { createElementAlias } from '../../../platform/dom/jsx/createElement';
import { createEmptyVNode } from './vnode-utils';
import Component from '../../component/classic/Component';
import type { NodeNameType } from '../../../../types/flow/vdom.types';

/**
 * Description Ueact 中使用的虚拟元素
 * 等价于src/isomorphic/classic/element/ReactElement
 */
export default class VNode {

  /** Required Properties */

  nodeName: NodeNameType;

  /** 该 VNode 对应的键 */
  key: any;

  /** Optional Properties */

  /** 该 VNode 中子节点为 VNode 的数目，用于在深度优先遍历时作为某个节点的唯一标识 */
  count: Number;

  /** 该 VNode 关联的 Component 实例 */
  componentInstance: Component;

  /** Private Properties */

  /** 该 VNode 渲染之后的 DOM 元素句柄*/
  _ref: HTMLElement;

  /**
   * Description 构造函数
   * @param nodeName
   * @param props 元素属性，使用对象来存放键值对
   * @param children
   */
  constructor(nodeName: NodeNameType, props: Object, children: [any]) {
    this.nodeName = nodeName;

    this.props = props || {};

    this.children = children || [];

    // 设置默认的 Key 值
    this.key = props ? props.key : void 666;
  }

  /**
   * Description 设置当前 VNode 对应的引用
   * @param _ref
   */
  setRef(_ref: HTMLElement) {
    this._ref = _ref;
  }
}
