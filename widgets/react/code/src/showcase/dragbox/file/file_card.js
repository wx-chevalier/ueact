
import React, { Component, PropTypes } from 'react';
import FileViewEntity from '../../../entity/file_view_entity';
import Checkbox from 'material-ui/Checkbox';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import HoverablePaper from '../../../../shape/paper/HoverablePaper';
import { genColor } from '../../../../indicator/color/utils';
import EllipticalLabel from '../../../../indicator/label/elliptical/EllipticalLabel';

require('./file_card.scss');

/**
 * @function 获取颜色
 * @param file
 * @return {{type: {fontSize: number, fontWeight: number, color: type[]}}}
 */
function getStyles(file: FileViewEntity) {

  return {
    type: {
      fontSize: 24,
      fontWeight: 600,
      color: genColor(file.name.substring(file.name.lastIndexOf('.') + 1).toUpperCase()),
      position: 'absolute',
      bottom: '2em'
    }
  }

}
/**
 * 组件FileCard,文件卡片
 */
export default class FileCard extends Component {

  static propTypes = {
    // 文件实体类
    file: PropTypes.instanceOf(FileViewEntity),
    // 模式
    mode: PropTypes.oneOf(['full', 'select']),
    // 文件选择事件
    onSelect: PropTypes.func
  };

  static defaultProps = {
    file: new FileViewEntity(),
    mode: 'full'
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

  /**
   * @function 默认渲染函数
   */
  render() {


    const file: FileViewEntity = this.props.file;

    const {mode} = this.props;

    // 判断是否允许操作
    let iconMenu = '';

    if (mode === 'full') {
      iconMenu = (<IconMenu
        onTouchTap={event => event.stopPropagation()}
        className='icon_menu'
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
    }

    // 判断是否存在展示图片，不存在则设置字
    let cover = null;

    if (file.cover) {
      cover = <div className="cover" style={{backgroundImage:`url(${file.cover})`}} />;
    } else {

      cover = (<div className="cover">
        <span style={getStyles(file).type}>{(file.name.substring(file.name.lastIndexOf('.') + 1)).toUpperCase()}</span>
               </div>)
    }

    return (<section className="file_card__container">
      <HoverablePaper>
        <div className="content">
          <div className={`checkbox ${this.state.hover || this.props.selected ? 'checkbox--selected' : ''}`}>
            <Checkbox
              id="checkbox"
              checked={file.selected}
              onCheck={()=>{
                this.props.onSelect(file.id);
              }}
              onTouchTap={event => event.stopPropagation()}
            />
          </div>

          {cover}

          <div className="bottom">

            <div className="info">

              <div className="name">
                <EllipticalLabel
                  label={file.name}
                />
              </div>

              <div className="date">{file.date}</div>

            </div>
            <div className="menu">
              {iconMenu}
            </div>
          </div>


        </div>
      </HoverablePaper>
            </section>)

  }

}

