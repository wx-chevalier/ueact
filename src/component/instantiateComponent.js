// @flow

import Component from './Component';
import { createEmptyVNode } from '../vdom/node/vnode-utils';
/** 存放所有的 Components 实例，以方便进行组件复用
 *  这里使用组件名作为键值，因此如果存在组件名重复的情况可能会导致组件冲突
 * */
const componentsPool: {
  [String]: Array<Component>
} = {};

/**
 * Description 从传入的组件构造函数或者函数式组件中创建出组件实例
 * @param classOrFunction
 * @param props
 * @param context
 */
export function instantiateComponent(
  classOrFunction: Function,
  props: Object,
  context: Object
) {
  let components = componentsPool[classOrFunction.name],
    instance: Component;

  if (classOrFunction.prototype && classOrFunction.prototype.render) {
    // 如果存在 render 函数，则表示为类构造函数
    instance = new classOrFunction(props, context);
  } else {
    instance = new Component(props, context);
    instance.constructor = classOrFunction;
    instance.render = ()=>{
      return classOrFunction(props)
    }
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

  return instance;
}
