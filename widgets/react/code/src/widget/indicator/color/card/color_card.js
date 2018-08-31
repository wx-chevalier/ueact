/**
 * Created by apple on 16/9/19.
 */
import React, { Component, PropTypes } from 'react';

/**
 * @function 颜色卡片
 */
export default class ColorCard extends Component {

  static propTypes = {
    color: PropTypes.string.isRequired, // 色卡的颜色
  }

  static defaultProps = {
    color: 'black'
  }

  /**
   * @function 默认渲染函数
   * @return {XML}
   */
  render() {

    require('./color_card.scss');

    return <div className="color_card__container" style={{backgroundColor: this.props.color}} />
  }

}