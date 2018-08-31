
import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import BlueWhiteRaisedButton from '../../picker/button/raised/blue_white_raised_button';
import BlueBorderRaisedButton from '../../picker/button/raised/blue_border_raised_button';
import { NavigationCancel } from 'material-ui/svg-icons';
import IconButton from 'material-ui/IconButton';
import BlueLinkButton from '../../picker/button/link/link_button';
import update from 'react-addons-update';
import validator from '../../declarative_validator/validator';
 // ES6
require('./DynamicList.scss');

const style = {
  deleteButtonIcon: {
    color: 'rgb(137, 137, 137)'
  }
};

/**
 * 组件DynamicList，动态可增删的列表组件
 */
export default class DynamicList extends Component {

  static displayName = 'DynamicList';

  static propTypes = {

    // 渲染每一行的标签
    renderRowLabel: PropTypes.func,

    // 控制每一行输入的元素类别
    renderInputComponent: PropTypes.func,

    // 输入的每一行的初始数据
    emptyValue: PropTypes.any,

    // 每一行的校验规则
    validateRules: PropTypes.any,

    // 点击取消的回调
    onCancel: PropTypes.func,

    // 数据校验失败
    onError: PropTypes.func,

    // 点击确定提交的回调
    onSubmit: PropTypes.func,

    // 最大行数限制
    maxRows: PropTypes.number,

  };

  static defaultProps = {
    renderRowLabel: (index) => (index),
    /**
     * @param index 当前行下标
     * @param value 当前显示值
     * @param onChange 重新赋值的响应函数
     * @return {XML}
     */
    renderInputComponent: (index, value, onRowChange) => <TextField name="text_field" value={value} onChange={(event)=>{onRowChange(index,event.target.value)}} />,
    emptyValue: '初始值',
    onCancel: undefined,
    onError: (error) => {
      console.log(error)
    },
    onSubmit: (values) => {
      console.log(values)
    },
    maxRows: -1// -1 表示没有限制
  };

  state = {
    values: [this.props.emptyValue],
    editing: true,
  };

  /**
   * @function 默认构造函数
   * @param props
   */
  constructor(props) {
    super(props);

    this._onAdd = this._onAdd.bind(this);

    this._onChange = this._onChange.bind(this);

    this._onDelete = this._onDelete.bind(this);

    this._onSubmit = this._onSubmit.bind(this);

  }

  /**
   * @function 组件挂载完成回调
   */
  componentDidMount() {

  }

  /**
   * @function 响应子组件的数据改动
   * @param index
   * @param value
   */
  _onChange(index, value) {

    // 修改列表中对应的值属性
    // 创建一个新的列表
    const newValues = [...this.state.values];

    newValues[index] = value;

    this.setState({
      values: newValues,
      editing: true,
    })


  }

  /**
   * @function 点击添加事件
   * @private
   */
  _onAdd() {

    const newValues = [...this.state.values];

    if (this.props.maxRows != -1 && this.props.maxRows <= newValues.length) return;

    newValues.push(this.props.emptyValue);

    this.setState({
      values: newValues,
      editing: true,
    })
  }

  /**
   * @function 点击删除事件
   * @private
   */
  _onDelete(index) {

    const {values} = this.state;

    // 删除对应行的值
    this.setState({
      values: update(values, {$splice: [[index, 1]]}),
      editing: true,
    })

  }

  /**
   * @function
   * @private
   */
  _onSubmit() {

    const {validateRules, onSubmit, onError} = this.props;

    const {values} = this.state;

    let validated = true;

    const error: [{
      // 行号
      rowID:string,
      // 错误描述
      columns:any

    }] = [];

    for (let rowID = 0; rowID < values.length; rowID++) {

      const value = values[rowID];

      if (typeof validateRules === 'string') {
        // 如果输入的仅仅为字符串
        if (!validator(validateRules, value)) {
          validated = false;
        }

        error.push({
          rowID
        });

      } else if (Array.isArray(validateRules)) {

        const columns = [];

        // 判断输入是否为数组
        for (let i = 0; i < validateRules.length && i < values.length; i++) {


          // 如果输入的仅仅为字符串
          if (!validator(validateRules[i], value[i])) {
            validated = false;
            columns.push(i);
          }

        }

        if (!validated) {
          error.push({
            rowID,
            columns
          });
        }

      } else if (typeof validateRules === 'object') {
        // 判断输入是否为对象,如果为对象则抽取出所有的key进行比较
        const keys = Object.keys(validateRules);

        const columns = {};

        for (const key of keys) {

          // 如果输入的仅仅为字符串
          if (!validator(validateRules[key], value[key])) {
            columns[key] = true;
            validated = false;
          }
        }

        if (!validated) {
          error.push({
            rowID,
            columns
          });
        }

      }


    }

    if (!validated) {

      // 如果验证失败
      onError(error);

    } else {

      if (values.length > 1) {
        // 首先进行验证，然后进行提交
        onSubmit([].concat(values).splice(0, values.length - 1));
      }

      // 设置状态为已保存
      this.setState({
        editing: false
      });

    }


  }

  /**
   * @function 渲染每行尾部的Button
   * @param index
   * @return {XML}
   * @private
   */
  _renderRowButton(index: number) {
    const {values} = this.state;

    if (index === values.length - 1) {
      // 如果是最后一个
      return <BlueLinkButton onClick={this._onAdd} label="添加" />

    } 

      // 否则返回删除
      return (<IconButton
        onClick={(event)=>{this._onDelete(index)}}
        children={<NavigationCancel />}
        iconStyle={style.deleteButtonIcon}
      />)
    

  }

  /**
   * @function 默认渲染函数
   */
  render() {

    const {renderRowLabel, renderInputComponent, onCancel, onSubmit, maxRows} = this.props;

    const {values, editing} = this.state;

    return (<section className="dynamic_list__container">

      {
        values.map((value, index) => (<div className="row" key={index}>
          {/* 渲染标签 */}
          <div className="label">
            {renderRowLabel(index)}
          </div>
          <div className="input">
            {renderInputComponent(index, value, this._onChange)}
          </div>
          <div className="button">

            {/* 判断是否为最后一个，如果为最后一个则显示添加 */}
            {this._renderRowButton(index)}

          </div>
        </div>))
      }

      <div className="buttons">
        <div className="tip">
          <p>{editing ? '尚未保存' : `已保存${values.length - 1}项`}</p>
          <p>{maxRows > 0 ? `最多可以填写${maxRows}项` : null}</p>
        </div>
        {
          onCancel && <div className="cancel">
            <BlueBorderRaisedButton label="取消" onClick={()=>{onCancel(values)}} />
                      </div>
        }
        <div className="save">
          <BlueWhiteRaisedButton label="保存" onClick={this._onSubmit} />
        </div>
      </div>

            </section>)

  }

}

