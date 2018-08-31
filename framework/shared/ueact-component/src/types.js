// @flow

/** 组件生命周期的接口回调 */
export interface ComponentLifecycle<P, S> {
  componentDidMount?(): void;
  componentWillMount?(): void;
  componentWillReceiveProps?(nextProps: P, nextContext: any): void;
  shouldComponentUpdate?(nextProps: P, nextState: S, nextContext: any): boolean;
  componentWillUpdate?(nextProps: P, nextState: S, nextContext: any): void;
  componentDidUpdate?(prevProps: P, prevState: S, prevContext: any): void;
  componentWillUnmount?(): void;
}