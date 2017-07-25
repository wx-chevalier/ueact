// @flow
import flatten from 'ramda/src/flatten';

import VNode from './VNode';
import Component from '../../component/Component';
import { isNative } from '../../shared/env/compatibility';
import { instantiateComponent } from '../../component/instantiateComponent';

/**
 * Description 从标签或者组件类名中创建 VNode 实例
 * @param tagName
 * @param props
 * @param childrenArgs
 * @return {*}
 */
export function createVNode(
  tagName: String | Component | Function,
  props: Object = {},
  ...childrenArgs: any
) {
  // 处理 Props 置空而直接将子元素传入到 Props 参数的情况
  if (Array.isArray(props)) {
    childrenArgs = props;
    props = {};
  }

  let count = 0;

  // 处理所有子元素，如果子元素为单纯的字符串，则直接创建文本节点
  const children = flatten(childrenArgs).map(child => {
    // 如果子元素同样为 VNode，则创建该子元素的副本
    if (child instanceof VNode) {
      return child;
    }

    if (typeof child === 'boolean' || child === null) {
      child = '';
    }
    // 记录目前 VNode 中 VNode 子节点数量
    count++;

    return '' + child;
  });

  // 如果是函数式组件，则需要反向调用该函数
  if (tagName instanceof Function) {
    props = props || {};
    props.children = children;

    // 创建实例并且创建对应的 VNode
    let instance = instantiateComponent(tagName, props);

    let vNode = instance.render();

    vNode.componentInstance = instance;
    instance.vNode = vNode;

    vNode.count = count;

    return vNode;
  } else {
    // 否则直接返回创建好的虚拟节点
    let vNode = new VNode(tagName, props, children);

    vNode.count = count;

    return vNode;
  }
}

export default createVNode;
