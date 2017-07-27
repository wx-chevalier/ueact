// @flow

import VNode from '../../vdom/node/VNode';
import ComponentUpdater from '../update/Updater';
/**
 * Description Ueact 组件抽象类型
 */
export default class Component {
  /**
   * @region Public Properties
   */

  /** 组件所在上下文 */
  context: Object = undefined;

  /** 组件传入的属性对象 */
  props: Object = {};

  /** 组件的内部状态对象 */
  state: Object = {};

  /** 组件的关联的 vNode 句柄 */
  vNode: VNode;

  /**
   * @endregion Public Properties
   */

  /**
   * @region Private Properties
   */

  /**
   * 标志位表示该组件是否处于非激活状态
   * 该标志位用来避免某个进入更新队列的组件在更新完成之前被重复加入到更新队列中
   * */
  _disable: Boolean = false;

  /** 标志位表示该组件是否存在数据尚未同步到界面 */
  _dirty: Boolean = true;

  /** 指向该组件根节点对应的 DOM 句柄 */
  get _ref(): HTMLElement | void {
    if (this.vNode) {
      return this.vNode._ref;
    } else {
      return null;
    }
  }

  /** 指向该组件的键值 */
  _key: any = void 666;

  /**
   * @endregion
   */

  /**
   * @region Public Methods
   */

  /**
   * Description 组件的构造函数
   * @param props
   * @param context
   * @param updater 组件使用的内部更新器实例，将会在渲染时被动态注入
   */
  constructor(props: Object, context: Object, updater: ComponentUpdater) {
    this.props = props;

    this.context = context;

    this.updater = updater || ComponentUpdater
  }

  /** @region LifeCycle */
  /**
   * ------------------ The Life-Cycle of a Composite Component ------------------
   *
   * - constructor: Initialization of state. The instance is now retained.
   *   - componentWillMount
   *   - render
   *   - [children's constructors]
   *     - [children's componentWillMount and render]
   *     - [children's componentDidMount]
   *     - componentDidMount
   *
   *       Update Phases:
   *       - componentWillReceiveProps (only called if parent updated)
   *       - shouldComponentUpdate
   *         - componentWillUpdate
   *           - render
   *           - [children's constructors or receive props phases]
   *         - componentDidUpdate
   *
   *     - componentWillUnmount
   *     - [children's componentWillUnmount]
   *   - [children destroyed]
   * - (destroyed): The instance is now blank, released by React and ready for GC.
   *
   * -----------------------------------------------------------------------------
   */
  /** 组件创建完毕，即将挂载时候的回调 */
  componentWillMount() {}

  /** 组件挂载完毕的回调 */
  componentDidMount() {}

  /** 组件是否应该更新的回调 */
  shouldComponentUpdate() {}

  /** @endregion LifeCycle */

  /**
   * @endregion Public Methods
   */

  render() {
    console.error(`
      Please Override render Function
    `);
  }
}
