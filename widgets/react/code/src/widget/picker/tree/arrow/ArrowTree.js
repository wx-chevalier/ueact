
import React, { Component, PropTypes } from 'react';

import ArrowTreeNode from './ArrowTreeNode';

require('./ArrowTree.scss');

/**
 * @function 默认的可展开收缩的树
 */
export default class ArrowTree extends Component {
  static displayName = 'ArrowTree';

  static propTypes = {
    // 默认传入的树形数据
    treeData: PropTypes.arrayOf(
      PropTypes.shape({
        // 节点名
        name: PropTypes.string.isRequired,
        // 点击事件
        onClick: PropTypes.func,
        // 是否默认展开,不设置则默认收缩,设置为true则展开
        expanded: PropTypes.bool,
        // 子元素
        children: PropTypes.array
      })
    ).isRequired,

    // 判断是否允许多级展开
    // 这里为了简单考虑,仅处理第一级菜单中的是否允许多级展开
    multiple: PropTypes.bool
  };

  static defaultProps = {
    multiple: false,

    treeData: [
      {
        name: '名称',
        onClick: () => {},
        expanded: false,
        children: []
      }
    ]
  };

  /**
   * @function 默认构造函数
   * @param props
   */
  constructor(props) {
    super(props);

    // 存放每个节点的展开状态
    const nodeExpandedState = {};

    // 根据输入的Props构建每个节点的伸缩状态
    this.props.treeData.forEach((node, index) => {
      nodeExpandedState[node.name] = !!node.expanded;
    });

    this.state = {
      // 节点的展开状态
      nodeExpandedState
    };

    // 将函数绑定到组件中
    this._toggleCollapse = this._toggleCollapse.bind(this);
  }

  /**
   * @function 默认构造函数
   * @return {XML}
   */
  render() {
    const treeData = this.props.treeData;

    // 判断该级别是否有某个有子节点
    let hasChildInThisLayer = false;

    for (const node of treeData) {
      if (node.children) hasChildInThisLayer = true;
    }

    return (
      <section className="tree__container">
        {treeData.map((node, index) => (
          <ArrowTreeNode
            key={`${node.name}${index}`}
            {...node}
            toggleCollapse={this._toggleCollapse}
            expanded={this.state.nodeExpandedState[node.name]}
            hasChildInThisLayer={hasChildInThisLayer}
          />
          ))}
      </section>
    );
  }

  /**
   * @function 点击伸缩按钮的事件
   * @param name
   * @private
   */
  _toggleCollapse(name) {
    // 判断是否允许多节点展开
    if (this.props.multiple) {
      // 直接将原节点状态设置为反
      this.setState({
        nodeExpandedState: Object.assign({}, this.state.nodeExpandedState, {
          [name]: !this.state.nodeExpandedState[name]
        })
      });
    } else {
      // 如果仅允许单节点展开,则先全部设置为false
      // 存放每个节点的展开状态
      const nodeExpandedState = {};

      // 根据输入的Props构建每个节点的伸缩状态
      this.props.treeData.forEach((node, index) => {
        nodeExpandedState[node.name] =
          node.name === name ? !this.state.nodeExpandedState[node.name] : false;
      });

      this.setState({
        nodeExpandedState
      });
    }
  }
}

// 默认的样式
const styles = {};
