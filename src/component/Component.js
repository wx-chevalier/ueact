// @flow

import VNode from '../vdom/node/VNode';
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

  /** 标志位表示该组件是否处于非激活状态 */
  _disable = false;

  /** 标志位表示该组件是否存在数据尚未同步到界面 */
  _dirty = true;

  /** 指向该组件根节点对应的 DOM 句柄 */
  get __ref() {
    if (this.vNode) {
      return this.vNode.__ref;
    } else {
      return null;
    }
  }

  /** 指向该组件的键值 */
  __key = void 666;

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
   */
  constructor(props, context) {
    this.props = props;

    this.context = context;
  }

  /** @region LifeCycle */

  componentWillMount() {}

  componentDidMount() {}

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
