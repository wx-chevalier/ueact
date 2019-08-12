import { VNode } from './VNode';

export const createEmptyVNode = () => {
  const node = new VNode();
  return node;
};

/**
 * Description 创建
 * @param val
 * @return {VNode}
 */
export function createTextVNode(text: string | number) {
  return new VNode(undefined, undefined, [String(text)]);
}
