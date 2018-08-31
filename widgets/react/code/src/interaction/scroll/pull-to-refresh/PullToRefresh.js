import React, { PropTypes, Component } from 'react';
import WebPullToRefresh from './wptr.js';
import './PullToRefresh.scss';

/**
 * Description 下拉刷新界面
 */
export default class PullToRefresh extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handleRefresh() {
    return new Promise((resolve, reject) => {
      this.props.onRefresh(resolve, reject);
    });
  }

  init() {
    if (!this.state.initialized) {
      WebPullToRefresh().init({
        contentEl: this.$refresh,
        ptrEl: this.$ptr,
        bodyEl: this.$body,
        distanceToRefresh: this.props.distanceToRefresh || undefined,
        loadingFunction: this.handleRefresh,
        resistance: this.props.resistance || undefined,
        hammerOptions: this.props.hammerOptions || undefined
      });
      this.setState({
        initialized: true
      });
    }
  }

  componentDidMount() {
    if (!this.props.disabled) {
      this.init();
    }
  }

  componentDidUpdate() {
    if (!this.props.disabled) {
      this.init();
    }
  }

  render() {
    const {
      children,
      disabled,
      distanceToRefresh,
      hammerOptions,
      icon,
      loading,
      onRefresh,
      resistance,
      ...rest
    } = this.props;

    if (disabled) {
      return (
        <div {...rest}>
          {children}
        </div>
      );
    }

    return (
      <div
        ref={$body => {
          this.$body = $body;
          this.props.onMount($body);
        }}
        {...rest}
      >
        <div
          ref={$ptr => {
            this.$ptr = $ptr;
          }}
          className="ptr-element"
        >
          {icon || <span className="genericon genericon-next" />}
          {loading ||
            <div className="loading">
              <span className="loading-ptr-1" />
              <span className="loading-ptr-2" />
              <span className="loading-ptr-3" />
            </div>}
        </div>
        <div
          ref={$refresh => {
            this.$refresh = $refresh;
          }}
          className="refresh-view"
        >
          {children}
        </div>
      </div>
    );
  }
}

PullToRefresh.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  onMount: PropTypes.func,
  icon: PropTypes.element,
  loading: PropTypes.element,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  distanceToRefresh: PropTypes.number,
  resistance: PropTypes.number,
  hammerOptions: PropTypes.object
};
