// @flow

import Updater from '../../../isomorphic/component/update/Updater';

/**
 * Description 组件更新类型
 * 等价于 React 中的 ReactUpdateQueue.js
 * 等价于 preact src/render-queue.js
 */
export default class UniUpdater extends Updater {
  // @override
  static enqueueUpdate(
    publicInstance: Component,
    callback: Function,
    partialState: Object,
    callerName: String
  ) {

  }
}
