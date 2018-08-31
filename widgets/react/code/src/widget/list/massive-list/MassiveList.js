
import React, { Component, PropTypes } from 'react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';
import PullToRefresh from '../../container-view/scroll-view/pull-to-refresh/PullToRefresh';
/**
 * 组件 MassiveList
 */
export default class MassiveList extends Component {
  state = {
    isRowLoaded: true
  };

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
  componentDidMount() {}

  shouldComponentUpdate(nextProps, nextState) {
    // 仅有当数据源不同时进行重渲染
    // dataSource 务必为 Immutable 类型的对象
    return this.props.dataSource !== nextProps.dataSource;
  }

  /**
   * @function 默认渲染函数
   */
  render() {
    const {
      dataSource,
      height,
      rowHeight,
      rowRenderer,
      onLoadMore,
      EmptyPlaceHolder
    } = this.props;

    return (
      <section className="massive_list__container">
        {this._renderRefresh(
          <AutoSizer disableHeight>
            {({ width }) =>
              (<List
                ref={$list => {
                  this.$list = $list;
                }}
                className="massive_list"
                height={height}
                overscanRowCount={1}
                noRowsRenderer={() => <EmptyPlaceHolder />}
                rowCount={dataSource.length}
                rowHeight={rowHeight}
                rowRenderer={rowRenderer}
                onScroll={({ scrollHeight, scrollTop }) => {
                  // 修正滚动主体的滚动距离
                  if (this.$scrollBody) {
                    this.$scrollBody.setAttribute(
                      'inner-scroll-top',
                      scrollTop
                    );
                  }

                  // 判断是否要进行加载更多
                  if (
                    scrollTop > scrollHeight * (2 / 3) &&
                    this.state.isRowLoaded &&
                    onLoadMore &&
                    typeof onLoadMore === 'function'
                  ) {
                    this.setState(
                      {
                        isRowLoaded: false
                      },
                      () => {
                        this.props.onLoadMore(() => {
                          this.setState({
                            isRowLoaded: true
                          });
                        });
                      }
                    );
                  }
                }}
                width={width}
              />)}
          </AutoSizer>
        )}
      </section>
    );
  }

  /**
   * @function 判断是否需要渲染下拉刷新
   * @param el
   * @private
   */
  _renderRefresh = el => {
    const { onRefresh } = this.props;

    if (!!onRefresh && typeof onRefresh === 'function') {
      return (
        <PullToRefresh
          onRefresh={this._handleRefresh}
          onMount={$body => {
            this.$scrollBody = $body;
          }}
        >
          {el}
        </PullToRefresh>
      );
    } 
      return el;
    
  };

  /**
   * @function 处理刷新事件
   * @param resolve
   * @param reject
   * @private
   */
  _handleRefresh = (resolve, reject) => {
    // 执行数据加载事件
    this.props.onRefresh(
      () => {
        this.$list.forceUpdateGrid();
        resolve();
      },
      () => {}
    );
  };

  /**
   * @function 从列表中抓取数据
   * @param index
   * @private
   */
  _getDatum = index => this.props.dataSource[index % this.props.dataSource.length];
}

// 默认属性
MassiveList.propTypes = {
  // 数据源
  // 如果数据源为 Array，默认执行 ShallowCompare
  dataSource: PropTypes.array.isRequired,

  // 整个列表的行高
  height: PropTypes.number.isRequired,

  // 行高，为固定值或者动态函数
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,

  // 行渲染函数，必须
  rowRenderer: PropTypes.func.isRequired,

  // 空白占位符
  EmptyPlaceHolder: PropTypes.element,

  // 上拉加载，如果定义则添加否则忽略该功能
  // https://parg.co/bhV
  // (resolve, reject) => {}
  onLoadMore: PropTypes.func,

  // 下拉刷新，如果定义则添加否则忽略该功能
  // (resolve, reject)=>{}
  onRefresh: PropTypes.func
};

// 默认属性
MassiveList.defaultProps = {
  dataSource: [],
  rowHeight: ({ index }) => {},
  rowRenderer: ({ index, isScrolling, key, style }) => {},
  EmptyPlaceHolder: <div className="noRows">No rows</div>
};
