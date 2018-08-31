/**
 * 异步组件 HOC
 * const AsyncButton = asyncComponent(() => {
    return import('../Button');
   });
 */

import React, { Component } from 'react';

const ALL_INITIALIZERS = [];
const LOAD_MAP = {};

const asyncComponent = (importComponent, renderLoadingComponent) => {
  ALL_INITIALIZERS.push(importComponent);

  return class extends Component {
    state = {
      LazyComponent: null
    };

    componentDidMount() {
      importComponent().then(cmp => {
        this.setState({ LazyComponent: cmp.default });
      });
    }

    render() {
      const { LazyComponent } = this.state;

      return LazyComponent ? (
        <LazyComponent {...this.props} />
      ) : (
        renderLoadingComponent()
      );
    }
  };
};

// 简单的预加载函数
asyncComponent.preload = () => {
  Promise.all(ALL_INITIALIZERS);
};

export default asyncComponent;
