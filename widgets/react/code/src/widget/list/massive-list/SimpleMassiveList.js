
import React, { Component, PropTypes } from 'react';

/**
 * 组件 SimpleMassiveList
 */
export default class SimpleMassiveList extends Component {

  /**
   * @function 默认构造函数
   * @param props
   */
  constructor(props) {
    super(props);
  }

  /**
   * @function 组件挂载完成回调
   */
  componentDidMount() {

  }

  /**
   * @function 默认渲染函数
   */
  render() {

    return (<section className="" />)

  }

}

// 声明默认属性
SimpleMassiveList.propTypes = {

  // 数据源
  // 如果数据源为 Array，默认执行 ShallowCompare
  dataSource: PropTypes.array
};
