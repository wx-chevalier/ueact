
import React, { Component } from 'react';
import PropTypes from "prop-types";

/**
 * 组件ListTree,显示列表状的树形组件
 */
export default class ListTree extends Component {
  static propTypes = {};

  static defaultProps = {};

  /**
   * @function 组件挂载完成回调
   */
  componentDidMount() {}

  /**
   * @function 默认渲染函数
   */
  render() {
    return <section className="list_tree__container" />;
  }
}
