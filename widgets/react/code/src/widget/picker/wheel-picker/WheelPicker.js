
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IScroll from 'iscroll';
import { propEq, findIndex } from 'ramda';

import {
  getComputedHeight,
  getYOffset
} from '../../../shared/style/size/utils.js';

import './WheelPicker.scss';

/**
 * Description 转轮选择器
 */
export default class WheelPicker extends Component {
  constructor(props) {
    super(props);

    // 搜索默认值对应的下标
    const valueIndex: number = findIndex(propEq('value', this.props.value))(
      this.props.options
    );

    // 设置初始属性
    this.state = {
      valueIndex,
      height: 0
    };
  }

  componentWillReceiveProps(newProps) {
    if ('value' in newProps) {
      const index = newProps.options.findIndex(
        option => option.value === newProps.value
      );
      if (newProps.options === this.props && index === this.state.valueIndex) {
        return;
      }
      this.setState({
        valueIndex: index
      });
    }
  }

  /**
   * Description 组件挂载完毕的回调事件
   */
  componentDidMount() {
    if (this._container) {
      // 计算高度 创建 iScroll
      this.setState(
        {
          height: getComputedHeight(this._container)
        },
        () => {
          window.top._scroll = this._scroll = new IScroll(this._container, {
            mouseWheel: true
          });
          this._scroll.on('scrollEnd', this._onScrollEnd);
          this._scrollToDestination(0);
        }
      );
    }
  }

  componentWillUnmount() {
    if (this._scroll) {
      this._scroll.destroy();
      this._scroll = null;
    }
  }

  _onScrollEnd = () => {
    const { valueIndex } = this.state;
    let y = this._scroll.y;
    if (y > 0) y = 0;
    if (y < this._scroll.maxScrollY) y = this._scroll.maxScrollY;
    const newIndex = Math.abs(Math.round(y / this._itemHeight));
    this.setState(
      {
        valueIndex: newIndex
      },
      () => {
        const option = this.props.options[this.state.valueIndex];

        this.props.onScroll(option.value, option);
      }
    );
  };

  /**
   * Description 经过指定时间后滚动到指定位置
   * @param time
   * @private
   */
  _scrollToDestination(time: number = 0) {
    if (!this._container || !this._scroll) return;
    const { height, valueIndex } = this.state;
    const yOffset: number = getYOffset(
      height,
      this.props.visibleRowNum,
      valueIndex
    );

    if (this._scroll.y !== yOffset) {
      this._scroll.scrollTo(0, yOffset, time);
    }
  }

  render() {
    // 如果不展示，则直接返回空界面
    if (!this.props.show) {
      return <div />;
    }

    const { prefix, options, visibleRowNum, onScroll, onSelect } = this.props;

    const { height, value } = this.state;

    const itemHeight = (this._itemHeight = height / visibleRowNum);

    const coverHeight = itemHeight * (visibleRowNum - 1) / 2;

    // 滚动到传入的当前值的所在位置
    this._scrollToDestination(350);

    return (
      <div
        className="wp_scroll_select"
        ref={ele => (this._container = ele)}
        style={{ height: '100%' }}
      >
        <ul
          className="wp_scroll_select_list"
          style={{ padding: `${coverHeight}px 0` }}
        >
          {options.map(option =>
            (<li
              className="wp_scroll_select_item"
              key={option.value}
              style={{
                height: itemHeight,
                lineHeight: `${itemHeight}px`
              }}
              onClick={() => {
                // 然后调用选择回调
                onSelect(option.value, option);
              }}
            >
              {option.label}
             </li>)
          )}
        </ul>
        <div
          className="wp_scroll_select_cover_top"
          style={{ height: coverHeight }}
        />
        <div
          className="wp_scroll_select_cover_bottom"
          style={{ height: coverHeight }}
        />
      </div>
    );
  }
}

// 设置组件属性
WheelPicker.propTypes = {
  // 传入的选择项
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool
    })
  ).isRequired,

  // 选定事件
  onSelect: PropTypes.func.isRequired,

  // 是否展示
  show: PropTypes.bool,

  // 传入的当前值
  value: PropTypes.any,

  // 滚动事件
  onScroll: PropTypes.func,

  // 展示选项

  // 设置最多可见的行数
  visibleRowNum: PropTypes.number

  // 设置是否需要全局背景蒙板以及确定与取消的按钮
};

WheelPicker.defaultProps = {
  show: true,
  onScroll: (value: any, option: object) => {
    console.log(`onScroll: ${value}`);
  },
  visibleRowNum: 5
};
