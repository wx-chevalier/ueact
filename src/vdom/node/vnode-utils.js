// @flow

import VNode from './VNode';

export const createEmptyVNode = (text: string = '') => {
  const node = new VNode();
  // node.text = text;
  // node.isComment = true;
  return node;
};

/**
 * Description 创建
 * @param val
 * @return {VNode}
 */
export function createTextVNode(val: string | number) {
  return new VNode(undefined, undefined, undefined, String(val));
}