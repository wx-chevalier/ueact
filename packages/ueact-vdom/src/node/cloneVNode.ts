// @flow

import { VNode } from './VNode';
import { createVNode } from './createVNode';
import { VNodePropsType } from './types';

/**
 * Description 克隆某个虚拟节点
 * @param vNode
 * @param props
 * @param childrenArgs
 * @return {*}
 */
export function cloneVNode(vNode: VNode, props: VNodePropsType, ...childrenArgs: any[]) {
  return createVNode(
    vNode.tagName,
    Object.assign({}, vNode.props, props),
    ...(childrenArgs || vNode.children)
  );
}

export default cloneVNode;
