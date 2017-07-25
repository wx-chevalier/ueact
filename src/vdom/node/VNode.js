// @flow
import { createElementAlias } from '../../dom/jsx/createElement';
import { createEmptyVNode } from './vnode-utils';
import Component from '../../component/Component';

/**
 * Description Ueact 中使用的虚拟元素
 */
export default class VNode {
  /**
   * Required Properties
   */

  tagName: string;

  /** 该 VNode 对应的键 */
  key: any;

  /**
   * Optional Properties
   */

  /** 该 VNode 中子节点为 VNode 的数目，用于在深度优先遍历时作为某个节点的唯一标识 */
  count: number;

  /** 该 VNode 关联的 Component 实例 */
  componentInstance: Component;

  /**
   * Private Properties
   */

  /** 该 VNode 渲染之后的 DOM 元素句柄*/
  __ref: HTMLElement;

  /**
   * Description 构造函数
   * @param tagName 标签名
   * @param props 元素属性，使用对象来存放键值对
   * @param children
   */
  constructor(tagName: String, props: Object, children: [any]) {
    this.tagName = tagName;

    this.props = props || {};

    this.children = children || [];

    // 设置默认的 Key 值
    this.key = props ? props.key : void 666;
  }

  /**
   * Description 渲染当前元素及其包含的子树
   */
  render() {
    // 为根节点创建对应的 DOM 节点对象
    let el = createElementAlias(this.tagName, this.props);

    // 依次渲染子元素
    this.children.forEach((child: VNode) => {
      let childEl = null;

      if (child instanceof VNode) {
        childEl = child.render();
      } else {
        childEl = document.createTextNode(child);
      }

      el.appendChild(childEl);
    });

    this.__ref = el;

    return el;
  }

  renderToString() {}
}
