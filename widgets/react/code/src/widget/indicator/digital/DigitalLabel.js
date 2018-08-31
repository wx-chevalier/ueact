
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const zhDigital = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

/**
 * 组件DigitalLabel，用于显示合适的数字
 */
export default class DigitalLabel extends PureComponent {
  static propTypes = {
    digital: PropTypes.number,
    local: PropTypes.string
  };

  static defaultProps = {
    digital: 0,
    local: 'zh'
  };
  /**
   * @function 组件挂载完成回调
   */
  componentDidMount() {}

  /**
   * @function 默认渲染函数
   */
  render() {
    const { digital, local } = this.props;

    let digitalMap;

    switch (local) {
      case 'zh':
        digitalMap = zhDigital;
        break;

      default:
        digitalMap = zhDigital;
    }

    return (
      <span className="digital_label">
        {digitalMap[digital]}
      </span>
    );
  }
}
