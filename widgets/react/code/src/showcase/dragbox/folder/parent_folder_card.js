
import React, { Component, PropTypes } from 'react';
import FolderViewEntity from '../../../entity/folder_view_entity';
import { grey600 } from 'material-ui/styles/colors';
import HoverablePaper from '../../../../shape/paper/HoverablePaper';
import ParentFolder from "../../../../shape/svg-icon/file/folder_parent";

require('./folder_card.scss');

const styles = {
  parentFolderIcon: {
    verticalAlign: 'middle',
    fill: grey600,
    marginLeft: 4,
    marginRight: 4,
    width: 38,
    height: 44
  }
};

/**
 * 组件ParentFolderCard，显示回到上一层文件夹
 */
export default class ParentFolderCard extends Component {

  static propTypes = {
    folder: PropTypes.instanceOf(FolderViewEntity),
    onClick: PropTypes.func,
  };

  static defaultProps = {
    onClick: () => {
      alert('回到上一级');
    }
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
  componentDidMount() {

  }

  /**
   * @function 默认渲染函数
   */
  render() {

    const {onClick, folder} = this.props;

    return (<section className="folder_card__container">
      <HoverablePaper>
        <div
          className="content"
          onTouchTap={()=>{
            onClick(folder.id)
          }}
          onClick={()=>{onClick(folder.id)}}
        >
          <ParentFolder
            style={styles.parentFolderIcon}
          />
          <div className="folder_name">返回上一级</div>
        </div>
      </HoverablePaper>
            </section>)

  }

}

