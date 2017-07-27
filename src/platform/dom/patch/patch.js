// @flow

import {
  PROPS,
  REORDER,
  REPLACE,
  TEXT
} from '../../../isomorphic/vdom/patch/path-actions';
import { setAttributes } from '../element/element-utils';
import { DiffListMove } from '../../../../types/flow/vdom.types';
import { toArray } from '../../../shared/util/array';
import { renderVNode } from '../render';

/**
 * Description 执行真实的补丁修复
 * @param el
 * @param patches
 */
export default function patch(
  el: HTMLElement,
  patches: Object
): HTMLElement | void {
  let walker = {
    index: 0
  };

  // 开始从根节点开始提取出补丁
  return dfsWalk(el, walker, patches);
}

/**
 * Description 深度优先遍历
 * @param el
 * @param walker
 * @param patches
 */
export function dfsWalk(el: HTMLElement, walker, patches): HTMLElement | void {
  // 提取出当前的差异补丁
  let currentPatches = patches[walker.index];

  // 这里对实际的 DOM 节点进行深度优先遍历
  let len = el.childNodes ? el.childNodes.length : 0;

  // 遍历当前子节点，执行对应修复
  for (let i = 0; i < len; i++) {
    let child = el.childNodes[i];

    walker.index++;

    // 优先执行子结点修复
    dfsWalk(child, walker, patches);
  }

  // 执行本层结点的修复
  if (currentPatches) {
    // 这里实际上仅返回了最外层的结果
    return applyPatches(el, currentPatches);
  } else {
    return el;
  }
}

/**
 * Description 对于某个结点执行修订
 * @param el
 * @param currentPatches
 */
export function applyPatches(
  el: HTMLElement,
  currentPatches: Array
): HTMLElement | void {
  // 新创建的元素
  let newEl = null;

  currentPatches.forEach((currentPatch: Object) => {
    switch (currentPatch.type) {
      case REPLACE:
        newEl =
          typeof currentPatch.node === 'string'
            ? document.createTextNode(currentPatch.node)
            : renderVNode(currentPatch.node);

        // 创建了新的结点，执行结点替换
        el.parentNode.replaceChild(newEl, el);

        // 会返回本层创建的根节点
        break;
      case REORDER:
        reorderChildren(el, currentPatch.moves);
        break;
      case PROPS:
        setAttributes(el, currentPatch.props);
        break;
      case TEXT:
        if (el.textContent) {
          el.textContent = currentPatch.content;
        } else {
          // 修复 IE 的特定问题
          el.nodeValue = currentPatch.content;
        }
        break;
      default:
        throw new Error('Unknown patch type ' + currentPatch.type);
    }
  });

  return newEl;
}

/**
 * Description 对于数组中的结点进行重排序
 * @param el
 * @param moves
 */
function reorderChildren(el: HTMLElement, moves: Array<DiffListMove>) {
  // 将节点子元素转化为数组
  let staticNodeList = toArray(el.childNodes);
  let maps = {};

  staticNodeList.forEach((childEl: HTMLElement) => {
    if (childEl.nodeType === 1) {
      let key = childEl.getAttribute('key');
      if (key) {
        maps[key] = childEl;
      }
    }
  });

  // 根据数组的移动情况对于子元素进行重新排序
  moves.forEach((move: DiffListMove) => {
    let index = move.index;

    // 如果是需要移除的
    if (move.type === 0) {
      // 移除对应结点
      if (staticNodeList[index] === el.childNodes[index]) {
        el.removeChild(el.childNodes[index]);
      }

      // 在静态结点列表中移除
      staticNodeList.splice(index, 1);
    } else if (move.type === 1) {
      // 插入某个新结点
      let insertNode = maps[move.item.key]
        ? maps[move.item.key] // 重用某个旧的已经经过 Patch 的结点
        : typeof move.item === 'object'
          ? // 如果是 VNode 对象，则直接执行该节点的渲染结果
            renderVNode(move.item)
          : document.createTextNode(move.item);

      // 在静态结点列表中插入
      staticNodeList.splice(index, 0, insertNode);

      // 插入新的结点
      el.insertBefore(insertNode, el.childNodes[index] || null);
    }
  });
}
