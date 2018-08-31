

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import HardWareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import HardWareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import styles from './styles';

/**
 * @function 简单的用于展示图片/视频资源的走马灯
 */
export default class SimpleMediaCarousel extends Component {
  static propTypes = {
    // 需要展示的数据
    medium: PropTypes.arrayOf(
      PropTypes.shape({
        // 资源编号,从0开始
        id: PropTypes.number,
        // 资源类型,图片或者视频
        type: PropTypes.oneOf(['image', 'video']),
        // 资源的封面路径
        src: PropTypes.string,
        // 点击该资源的事件
        onClick: PropTypes.func
      })
    ).isRequired,

    // 左箭头样式
    leftArrow: PropTypes.element,

    // 右箭头样式
    rightArrow: PropTypes.element
  };

  static defaultProps = {
    leftArrow: <HardWareKeyboardArrowLeft />,
    rightArrow: <HardWareKeyboardArrowRight />
  };

  /**
   * @function 默认构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      // 当前要展示的资源的下标
      current: props.medium && props.medium.length > 0 ? props.medium[0].id : 0,
      // 能够展示的最大的资源的下标
      max: props.medium && props.medium.length > 0 ? props.medium.length - 1 : 0
    };
  }

  /**
   * @function 如果Props发生了变更,则调整能够展示的最大的资源的下标
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      max:
        nextProps.medium && nextProps.medium.length > 0
          ? nextProps.medium.length - 1
          : 0
    });
  }

  /**
   * @function 点击左箭头响应函数
   */
  handleSlideLeft = () => {
    this.setState({
      current:
        this.state.current === 0 ? this.state.max : this.state.current - 1
    });
  };

  /**
   * @function 点击右箭头响应函数
   */
  handleSlideRight = () => {
    this.setState({
      current:
        this.state.current === this.state.max ? 0 : this.state.current + 1
    });
  };

  /**
   * @function 默认渲染视频
   * @param media
   * @param index
   * @return {XML}
   */
  static renderVideo(media, index) {
    return (
      <div style={styles.video} key={index} allowFullScreen>
        <video controls name="media" style={styles.video}>
          <source src={media.src} type="video/mp4" />
        </video>
      </div>
    );
  }

  /**
   * @function 默认渲染图片
   * @param media
   * @param index
   * @return {XML}
   */
  static renderImage(media, index) {
    return (
      <div
        key={index}
        style={{ ...styles.image, backgroundImage: `url(${media.src})` }}
      />
    );
  }

  render() {
    const { medium, leftArrow, rightArrow } = this.props;

    const leftArrowVisible = !(this.state.current === 0);
    const rightArrowVisible = !(this.state.current === this.state.max);

    return (
      <section style={styles.root}>
        <IconButton
          onTouchTap={leftArrowVisible && this.handleSlideLeft}
          iconStyle={styles.icon}
          style={styles.leftArrow}
        >
          {leftArrowVisible && leftArrow}
        </IconButton>
        <div style={styles.media}>
          {medium &&
            medium.length > 0 &&
            medium.map(media => (
                media.id === this.state.current &&
                (() => {
                  switch (media.type) {
                    case 'video':
                      return SimpleMediaCarousel.renderVideo(
                        media,
                        `${media.id}`
                      );
                    case 'image':
                      return SimpleMediaCarousel.renderImage(
                        media,
                        `${media.id}`
                      );
                    default:
                      return null;
                  }
                })()
              ))}
        </div>
        <IconButton
          onTouchTap={rightArrowVisible ? this.handleSlideRight : () => {}}
          iconStyle={styles.icon}
          style={styles.rightArrow}
        >
          {rightArrowVisible && rightArrow}
        </IconButton>
      </section>
    );
  }
}
