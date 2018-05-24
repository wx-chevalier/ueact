// @flow

import Component from '../classic/Component';
/**
 * Description
 * 等价于 React ReactNoopUpdateQueue，用于定义通用的 Updater 接口
 */
export default class UpdateQueue {
  /**
   * Description 检测某个复合组件是否已经被挂载
   * @param {Component} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  static isMounted(publicInstance: Component): Boolean {
    return false;
  }

  /**
   * Description 设置某个组件的状态
   *
   * @param {Component} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param callerName
   * @internal
   */
  static enqueueUpdate(
    publicInstance: Component,
    callback: Function,
    partialState: Object,
    callerName: String
  ) {}

  /**
   * Description 立刻强制某个组件进行更新，常用于以非 setState 方式更改了组件状态
   * @param publicInstance
   * @param callback
   */
  static enqueueForceUpdate(publicInstance: Component, callback: Function) {}
}

// 不需要进行渲染
export const NO_RENDER = 0;

// 同步渲染
export const SYNC_RENDER = 1;

// 强制渲染
export const FORCE_RENDER = 2;

// 异步渲染
export const ASYNC_RENDER = 3;
