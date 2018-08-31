// @flow

import VNode from "../node/VNode";
// 节点发生替换
export const REPLACE = 0;

// 数组重排序
export const REORDER = 1;

// 属性变更
export const PROPS = 2;

// 文本内容变更
export const TEXT = 3;

export function patchText(content: String) {
  return {
    type: TEXT,
    content
  };
}

export function patchProps(props: Object) {
  return {
    type: PROPS,
    props
  };
}

export function patchReorder(moves: Object) {
  return {
    type: REORDER,
    moves
  };
}

export function patchReplace(node: VNode) {
  return {
    type: REPLACE,
    node
  };
}
