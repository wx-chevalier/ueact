// @flow

import Component from '../classic/Component';
import { createEmptyVNode } from '../../vdom/node/vnode-utils';
import PureComponent from '../classic/PureComponent';
import type { NodeNameType } from '../../../../types/flow/vdom.types';
import { isFunction } from '../../../shared/ds/type';
import VNode from '../../vdom/node/VNode';

/** 存放所有的 Components 实例，以方便进行组件复用
 *  这里使用组件名作为键值，因此如果存在组件名重复的情况可能会导致组件冲突
 * */
const componentsPool: {
  [String]: Array<Component>
} = {};

/**
 * Description 从传入的组件构造函数或者函数式组件中创建出组件实例
 * @param vNode
 * @param context
 * @param ComponentClass
 */
export function instantiateComponent(
  vNode: VNode,
  context: Object = undefined,
  ComponentClass = Component
) {
  // 这里单独获取出 VNode 对应的结点名以方便进行调试或者操作
  let nodeName: NodeNameType = vNode.nodeName;

  let instance: Component;

  let props = vNode.props || {};

  // 在创建组件时，将 VNode 的 children 传入到组件中
  props.children = vNode.children;

  // 如果传入的只是普通标签，则返回纯组件
  if (!isFunction(nodeName)) {
    instance = new PureComponent(props, context);

    instance.render = () => {
      return vNode;
    };
  } else {
    let classOrFunction = nodeName,
      components = componentsPool[nodeName];

    if (classOrFunction.prototype && classOrFunction.prototype.render) {
      // 如果存在 render 函数，则表示为类构造函数
      instance = new classOrFunction(props, context);
    } else {
      // 如果是函数式组件，则设置其构造函数
      instance = new PureComponent(props, context);
      instance.constructor = classOrFunction;
      instance.render = () => {
        return classOrFunction(props);
      };
    }

    // 如果组件被禁用，则返回空节点
    if (instance._disable) {
      return createEmptyVNode();
    }

    if (components) {
      // 如果存在该组件的缓存列表
      for (let i = components.length; i--; ) {
        if (components[i].constructor === classOrFunction) {
          // 设置当前实例的新基，以完成组件复用
          // Todo
          instance.nextBase = components[i].nextBase;
          components.splice(i, 1);
          break;
        }
      }
    }
  }

  instance.vNode = vNode;

  return instance;
}
