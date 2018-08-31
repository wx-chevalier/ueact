
import React, { Component, PropTypes } from 'react';
import { grey500, grey600 } from 'material-ui/styles/colors';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import HoverablePaper from '../../../../shape/paper/HoverablePaper';

require('./folder_card.scss');

const styles = {
  addIcon: {
    verticalAlign: 'middle',
    fill: grey600,
    marginLeft: 10,
    marginRight: 3,
    width: 28,
    height: 28
  },
  iconNavigationCloseBtn: {
    position: 'absolute',
    right: 0,
    top: 0
  }
};

/**
 * 组件newFolderCard，显示创建新的文件夹
 */
export default class NewFolderCard extends Component {

  static propTypes = {
    onCreateFolder: PropTypes.func,
  };

  static defaultProps = {
    onCreateFolder: (name) => {
      alert(name);
    }
  };

  /**
   * @function 默认构造函数
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {

      showForm: false

    };
  }

  /**
   * @function 组件挂载完成回调
   */
  componentDidMount() {

  }

  /**
   * @function 默认渲染函数
   */
  render() {

    const {onClick} = this.props;

    // 新建文件夹的提示
    const tip = (<div
      className="content"
      onTouchTap={() => this.setState({showForm:true})}
    >
      <ContentAdd
        style={styles.addIcon}
      />
      <div className="folder_name">新建文件夹</div>
                 </div>);

    // 创建新文件夹表单
    const form = (<div className="content">
      <IconButton
        onTouchTap={() => {}}
        style={styles.iconNavigationCloseBtn}
      >
        <NavigationClose color={grey500} />
      </IconButton>
                  </div>);

    return (<section className="folder_card__container new_folder_card__container">
      <HoverablePaper>
        {this.state.showForm ? form : tip}
      </HoverablePaper>
            </section>)

  }

}

