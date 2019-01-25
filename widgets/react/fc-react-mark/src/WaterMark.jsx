/**
 * 通用水印组件。
 *
 * 使用方法（共两种）：
 *
 * 1. 作为 react component 使用：
 *
 * ```jsx
 * import React, {Component, PropTypes} from 'react'
 * import ReactDOM from 'react-dom'
 *
 *
 * class MyComponentWithWatermark extends Component {
 *   constructor(props) {
 *     super(props)
 *   }
 *
 *   render() {
 *     return (
 *       <WaterMark text={'我是水印'} opacity={0.04}>
 *       <div>Hello</div>
 *       <div>World</div>
 *       </WaterMark>
 *     )
 *   }
 * }
 * ```
 *
 *
 * ReactDOM.render(<MyComponentWithWatermark/>, document.getElementById('root'))
 *
 *
 * 2. 直接在 DOM 元素上渲染：
 *
 * ```js
 * const el = document.getElementById('watermark')
 *
 * WaterMark.render(el, '我是水印', 0.04)
 * ```
 *
 * 注意：在使用时，`el` 的直接父元素必须为“主要元素”，意即如果对此父元素进行样式修改，
 * 在影响水印显示的同时，页面的主要内容（或敏感内容）也须受到影响，不能正常显示。否则，
 * 如果 `el` 的父元素被删掉了、或者aa隐藏了，对页面敏感内容的显示不会产生任何影响，那么就没有意义了。
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Mark from './mark';

class WaterMark extends Component {
  static displayName = 'WaterMark';

  static propTypes = {
    text: PropTypes.string,
    opacity: PropTypes.number,
    children: PropTypes.node,
    className: PropTypes.string
  };

  static defaultProps = {
    text: 'WaterMark',
    opacity: 0.05,
    children: null,
    className: null
  };

  componentDidMount() {
    this.mark = new Mark(this.element, {
      text: this.props.text,
      opacity: this.props.opacity
    });
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.text === this.props.text) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.mark.draw();
    }
  }

  render() {
    const { children, text, opacity, className, ...props } = this.props;

    if (children) {
      return (
        <div {...props}>
          <div
            ref={e => {
              this.element = e;
            }}
          >
            {children}
          </div>
        </div>
      );
    }

    return (
      <div
        className={classnames('mr-watermark', className)}
        ref={e => {
          this.element = e;
        }}
      />
    );
  }
}

/**
 * 在 DOM 元素上直接渲染水印
 *
 * @param {DOM}    el       - 目标 DOM 元素
 * @param {String} text     - 水印文本
 * @param {Number} opacity  - 文本的不透明度，与 CSS 中的 `opacity` 属性一致
 *
 * @return {Mark}
 *
 */
WaterMark.render = (el, text, opacity = 0.025) =>
  new Mark(el, {
    text,
    opacity
  });

export default WaterMark;
