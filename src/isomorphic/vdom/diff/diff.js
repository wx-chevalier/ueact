/** @flow */

import VNode from '../node/VNode';
import { isStringAlias as isString } from '../../../shared/ds/type';
import {
  patchProps,
  patchReorder,
  patchReplace,
  patchText
} from '../patch/patch-actions';
import { diffList } from './diffList';

/**
 * Description 比较两棵树的差异
 * @param oldNode
 * @param newNode
 */
export function diff(oldNode: VNode, newNode: VNode) {
  // 记录深度遍历的下标，也用来作为本次遍历中每个结点的唯一标识
  let index = 0;

  // 遍历过程中标记处的需要修正的地方
  let patches = {};

  // 深度优先遍历整棵树
  dfsWalk(oldNode, newNode, index, patches);

  return patches;
}

/**
 * Description 深度优先遍历
 * @param oldNode
 * @param newNode
 * @param index
 * @param patches
 */
export function dfsWalk(
  oldNode: VNode,
  newNode: VNode,
  index: number,
  patches: Object
) {
  // 本层需要修正的地方
  let currentPatch = [];

  if (newNode === null) {
    // 如果该节点已经被移除，则不需要进行任何操作，常见于列表中重排序等情况
  } else if (isString(oldNode) && isString(newNode)) {
    // 如果新旧节点都是字符串节点，则直接比较内容
    if (oldNode !== newNode) {
      currentPatch.push(patchText(newNode));
    }
  } else if (
    oldNode.nodeName === newNode.nodeName &&
    oldNode.key === newNode.key
  ) {
    // 如果节点的标签和键一致，则开始比较 Props 与 Children
    let propsPatches = diffProps(oldNode, newNode);

    if (propsPatches) {
      currentPatch.push(patchProps(propsPatches));
    }

    // 比较子元素差异
    if (!isIgnoreChildren(newNode)) {
      diffChildren(
        oldNode.children,
        newNode.children,
        index,
        patches,
        currentPatch
      );
    }
  } else {
    currentPatch.push(patchReplace(newNode));
  }

  if (currentPatch.length) {
    patches[index] = currentPatch;
  }
}

/**
 * Description 比较子元素的差异
 * @param oldChildren
 * @param newChildren
 * @param index
 * @param patches
 * @param currentPatch
 */
function diffChildren(
  oldChildren: Array<VNode>,
  newChildren: Array<VNode>,
  index: number,
  patches: Object,
  currentPatch: Array
) {
  // 比较两个列表的差异
  let diffs = diffList(oldChildren, newChildren, 'key');

  // 获取新的子元素，这里的子元素的排序方式与原子元素一致
  newChildren = diffs.children;

  // 如果存在需要移动的部分
  if (diffs.moves.length) {
    let reorderPatch = patchReorder(diffs.moves);

    currentPatch.push(reorderPatch);
  }

  // 表示当前节点的左子节点
  let leftNode: VNode = null;
  let currentNodeIndex = index;

  oldChildren.forEach((child, i) => {
    let newChild = newChildren[i];

    currentNodeIndex =
      leftNode && leftNode.count
        ? currentNodeIndex + leftNode.count + 1
        : currentNodeIndex + 1;

    dfsWalk(child, newChild, currentNodeIndex, patches);
    leftNode = child;
  });
}

/**
 * Description 比较两个节点的 Props 差异
 */
export function diffProps(oldNode: VNode, newNode: VNode) {
  // 差异统计数目
  let count = 0;

  // 旧的 Props
  let oldProps = oldNode.props;

  // 新的 Props
  let newProps = newNode.props;

  let key, value;
  let propsPatches = {};

  // 寻找改变的 Props
  // 注意，这里是需要在原型链上进行搜索的
  for (key in oldProps) {
    value = oldProps[key];
    if (newProps[key] !== value) {
      count++;
      propsPatches[key] = newProps[key];
    }
  }

  // 寻找新增的 Props
  for (key in newProps) {
    value = newProps[key];

    // 这里是为了避免新的 Props 值复写了 oldProps 的原型链上的值
    if (!oldProps.hasOwnProperty(key)) {
      count++;
      propsPatches[key] = newProps[key];
    }
  }

  // 如果不存在差异则返回空
  if (count === 0) {
    return null;
  }

  return propsPatches;
}

/**
 * Description 根据节点中的 Props 设置情况判断是否需要忽略进行子节点比较
 * @param node
 * @return {boolean}
 */
export function isIgnoreChildren(node) {
  return node.props && node.props.hasOwnProperty('ignore');
}
