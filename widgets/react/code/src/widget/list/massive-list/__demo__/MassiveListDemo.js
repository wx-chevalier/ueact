import React, { PropTypes, Component } from 'react';
import './MassiveListDemo.css';
import MassiveList from '../MassiveList';
import { generateRandomList } from './utils';

export default class MassiveListDemo extends Component {


  state = {
    list: [],
  };

  constructor() {
    super();
  }

  componentDidMount() {

    this.setState({
      list: [].concat(generateRandomList())
    })

  }

  render() {

    return (<div
      className="pull_to_refresh_demo__container"
      ref={($div) => {
      this.$div = $div;
    }}
    >
      {
        !this.$div ? <div /> : <MassiveList
          dataSource={this.state.list}
          height={this.$div.clientHeight || 300}
          rowHeight={this._getRowHeight}
          rowRenderer={this._rowRenderer}
          onLoadMore={(resolve, reject) => {
            console.log("onLoadMore");
            resolve();
          }}
          onRefresh={this._handleRefresh}
        />
      }

            </div>)

  }


  /**
   * @function 处理刷新
   * @private
   */
  _handleRefresh = (resolve, reject) => {

    // 设置状态，然后执行数据更新
    this.setState({
      list: [].concat(generateRandomList())
    }, () => {
      resolve();
    });

  };

  /**
   * @function 从列表中抓取数据
   * @param index
   * @private
   */
  _getDatum = (index) => this.state.list[index % this.state.list.length];

  /**
   * @function 获取到指定行高
   * @param index
   * @private
   */
  _getRowHeight = ({index}) => this._getDatum(index).size;


  /**
   * @function 行渲染
   * @param index
   * @param isScrolling
   * @param key
   * @param style
   * @return {XML}
   * @private
   */
  _rowRenderer = ({index, isScrolling, key, style}) => {


    // 如果正在滚动则不进行渲染
    if (
      isScrolling
    ) {
      return (
        <div
          className="row isScrollingPlaceholder"
          key={key}
          style={style}
        >
          Scrolling...
        </div>
      )
    }

    // 获取对应行数据
    const datum = this._getDatum(index);

    return (
      <div
        className="row"
        key={key}
        style={style}
      >
        <div
          className="letter"
          style={{
            backgroundColor: datum.color
          }}
        >
          {datum.name.charAt(0)}
          <img className="avatar" src={datum.avatar} alt="" />
        </div>
        <div>
          <div className="name">
            {datum.name}
          </div>
          <div className="index">
            This is row {index}
          </div>
        </div>
        <span className="height">
          {datum.size}px
        </span>
      </div>
    )
  }

}