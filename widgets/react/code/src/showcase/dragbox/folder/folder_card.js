
import React, { Component, PropTypes } from 'react';
import { amber500 } from 'material-ui/styles/colors';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FolderViewEntity from '../../../entity/folder_view_entity';
import HoverablePaper from '../../../../shape/paper/HoverablePaper';
import Checkbox from 'material-ui/Checkbox';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

require('./folder_card.scss');

const styles = {
  menu: {
    position: 'absolute',
    top: 8,
    right: 4,
    height: 62,
  },
  folderIcon: {
    verticalAlign: 'middle',
    cursor: 'pointer',
    fill: amber500,
    width: 44,
    height: 44
  },
}

/**
 * 组件FolderCard
 */
export default class FolderCard extends Component {

  static propTypes = {
    // 该文件夹实体类
    folder: PropTypes.instanceOf(FolderViewEntity),
    // 模式
    mode: PropTypes.oneOf(['full', 'select']),
    // 外部传入的文件夹是否被选中
    selected: PropTypes.bool,
    // 文件夹选择事件
    onSelect: PropTypes.func,
    // 文件夹打开事件
    onOpen: PropTypes.func
  };

  static defaultProps = {
    folder: new FolderViewEntity(),
    mode: 'full',
    selected: false
  };

  /**
   * @function 默认构造函数
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    }
  }

  /**
   * @function 组件挂载完成回调
   */
  componentDidMount() {

  }

  itemTouchTap() {

  }

  /**
   * @function 默认渲染函数
   */
  render() {

    const folder: FolderViewEntity = this.props.folder;

    const {mode, onOpen} = this.props;

    // 判断是否允许操作
    let iconMenu = '', checkbox = '';

    if (mode === 'full') {
      iconMenu = (<IconMenu
        onTouchTap={event => event.stopPropagation()}
        style={styles.menu}
        onItemTouchTap={this.itemTouchTap}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      >
        <MenuItem key={1} primaryText="重命名" />
        <MenuItem key={2} primaryText="移动至" />
        <MenuItem key={3} primaryText="下单生产" />
        <MenuItem key={4} primaryText="删除" />
                  </IconMenu>);
      checkbox = (<Checkbox
        id="checkbox"
        className={`checkbox ${this.state.hover || this.props.selected ? 'checkbox--selected' : ''}`}
        checked={this.props.selected}
        onCheck={this.props.onSelect}
        onTouchTap={event => event.stopPropagation()}
      />)
    }

    return (<section
      className="folder_card__container"
      onMouseEnter={()=>{this.setState({hover:true})}}
      onMouseLeave={()=>{this.setState({hover:false})}}
    >
      <HoverablePaper>
        <div className="content" onClick={()=>{onOpen(folder.id)}}>
          {checkbox}
          <FileFolder style={styles.folderIcon} />
          <div className="folder_name">{folder.name}</div>
          {iconMenu}
        </div>

      </HoverablePaper>
            </section>)

  }

}

