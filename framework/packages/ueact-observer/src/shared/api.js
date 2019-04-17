// @flow

import { isArray } from './symbols';

/**
 * Description 判断传入的是否为函数类型
 * @param fn ?Function
 */
const checkFunctionType = (fn: ?Function) => {
  const type = typeof fn;
  if (type !== 'function')
    throw `The observerX.listen method accepts as argument "typeof 'function'", "${type}" is not allowed`;
};

/**
 * Description 根据输入的监听器暴露外部属性
 * @param listenerMap
 */
export const getAPIs = (listenerMap: WeakMap<Object, Array<Function>>) => ({
  /**
   * 设置对于某个对象或者数组的监听
   * @param   {Function} fn - 与待监听的属性相关的回调函数
   * @returns {API}
   */
  listen(fn: Function) {
    checkFunctionType(fn);

    if (!listenerMap.has(this)) {
      listenerMap.set(this, []);
    }

    let listeners = listenerMap.get(this);

    if (listeners) {
      listeners.push(fn);
    } else {
      throw new Error('Listener Array is invalid for' + this);
    }

    return this;
  },

  /**
   * 移除对于某个设置过订阅的属性的订阅函数
   * @param   {Function} fn - 取消订阅的函数
   * @returns {API}
   */
  unlisten(fn: Function) {
    const callbacks = listenerMap.get(this);
    if (!callbacks) return;
    if (fn) {
      const index = callbacks.indexOf(fn);
      if (~index) callbacks.splice(index, 1);
    } else {
      listenerMap.set(this, []);
    }

    return this;
  },

  /**
   * 将 observer-x 内置对象转化为 JSON 对象
   * @returns {Object} - JSON 对象
   */
  toJSON(): any {
    return Object.keys(this).reduce((ret, key) => {
      const value = this[key];
      ret[key] = value && value.toJSON ? value.toJSON() : value;
      return ret;
    }, this[isArray] ? [] : {});
  }
});
