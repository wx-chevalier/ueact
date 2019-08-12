import { VNode, VNodeType } from '../node';

export enum PatchType {
  // 节点发生替换
  REPLACE = 0,

  // 数组重排序
  REORDER = 1,

  // 属性变更
  PROPS = 2,

  // 文本内容变更
  TEXT = 3
}

export interface Patch {
  type: PatchType;
  // 其他类型
  [key: string]: any;
}

export type Patches = Record<number | string, Patch[]>;

export function patchText(content: VNodeType) {
  return {
    type: PatchType.TEXT,
    content
  };
}

export function patchProps(props: Object) {
  return {
    type: PatchType.PROPS,
    props
  };
}

export function patchReorder(moves: Object) {
  return {
    type: PatchType.REORDER,
    moves
  };
}

export function patchReplace(node: VNode) {
  return {
    type: PatchType.REPLACE,
    node
  };
}
