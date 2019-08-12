import { flatten } from 'ueact-utils';

import { VNode } from './VNode';
import { VNodeTagType, VNodeType, VNodePropsType } from './types';

/**
 * Description 从标签或者组件类名中创建 VNode 实例
 * @param tagName
 * @param props
 * @param childrenArgs
 * @return {*}
 * 等价于 React 中 src/isomorphic/classic/element/ReactElement.createElement
 */
export function createVNode(
  tagName: VNodeTagType,
  props: VNodePropsType,
  ...childrenArgs: VNodeType[]
): VNode {
  // 处理 Props 置空而直接将子元素传入到 Props 参数的情况
  if (Array.isArray(props)) {
    childrenArgs = props;
    props = { key: 'invalid' };
  }

  let count = 0;

  // 处理所有子元素，如果子元素为单纯的字符串，则直接创建文本节点
  const children: VNodeType[] = flatten(childrenArgs).map(child => {
    // 如果子元素同样为 VNode，则创建该子元素的副本
    if (child instanceof VNode) {
      return child;
    }

    if (typeof child === 'boolean' || child === null) {
      child = '';
    }

    // 记录目前 VNode 中 VNode 子节点数量
    count++;

    // 否则返回字符串类型的子节点
    return '' + String(child);
  });

  // 否则直接返回创建好的虚拟节点
  let vNode = new VNode(tagName, props, children);

  vNode.count = count;

  return vNode;
}

export default createVNode;
