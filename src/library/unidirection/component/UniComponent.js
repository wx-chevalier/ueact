// @flow

import Component from '../../../isomorphic/component/classic/Component';

/**
 * Description 单向数据流组件，执行真正的组件渲染与挂载操作
 * 等价于 React 中 ReactComponent
 * 等价于 preact 中的 src/components.js
 *
 */
export default class UniComponent<P, S> extends Component<P, S> {
  /** 组件展示名 */
  static displayName: string = 'UniComponent';

  /** 渲染回调 */
  _renderCallbacks: Array<Function> = [];

  /** 组件内的暂缓刷新的状态 */
  _pendingState: S | null = null;

  /**
   * Description 继承自 Component 父类的构造函数
   * @param props
   * @param context
   */
  constructor(props, context) {
    super(props, context);
  }

  /** Description 通过复制用户设定的 state 到 this.state 以更新组件状态
   *	@param partialState 用户传入的新的状态对象，或者用于生成新的状态的回调函数
   *	@param {function} callback	在组件更新完毕之后的回调函数
   */
  setState(partialState: Object | Function, callback: Function) {
    // 获取组件当前的状态
    let currentState: Object = this.state;

    // 保存当前的状态，使用一层浅复制
    if (!this.prevState) this.prevState = Object.assign({}, currentState);

    // 根据输入的 State 对象，组合出新的 State 对象
    Object.assign(
      currentState,
      typeof partialState === 'function'
        ? partialState(currentState, this.props)
        : partialState
    );

    // 当存在回调时，则将回调加入到组件的渲染回调
    if (callback) this._renderCallbacks.push(callback);

    this.updater.enqueueUpdate(this, callback, partialState);
  }

  /**
   * Description 强制触发组件的重渲染操作
   * @param callback
   */
  forceUpdate(callback: Function) {
    // 当存在回调时，则将回调加入到组件的渲染回调
    if (callback) this._renderCallbacks.push(callback);

    this.updater.enqueueForceUpdate(this, callback);
  }
}
