
import React, { Component, PropTypes } from 'react';
import FolderViewEntity from '../entity/folder_view_entity';
import ParentFolderCard from './cards/folder/parent_folder_card';
import NewFolderCard from './cards/folder/new_folder_card';
import FolderCard from './cards/folder/folder_card';

require('./folder_grid.scss');
/**
 * 组件Folder,显示某个文件夹
 */
export default class FolderGrid extends Component {

  static displayName = 'FolderGrid';

  static propTypes = {

    // 文件夹实体类
    folder: PropTypes.instanceOf(FolderViewEntity),

    // 输入当前模式，模式包括:
    // 全模式(默认,full):
    // 选择模式(select)
    mode: PropTypes.oneOf(['full', 'select']),

    // 判断是否全员处于选中状态，仅限文件
    allSelected: PropTypes.bool,

    // 是否允许创建子文件夹
    allowCreate: PropTypes.bool,

    // 打开某个文件夹
    onOpen: PropTypes.func,

    // 创建文件夹
    onCreate: PropTypes.func,

    // 选中文件夹
    onSelect: PropTypes.func,

    // 以下操作仅当传入有效回调时候才会显示
    // 重命名某个文件夹
    onRename: PropTypes.func,

    // 删除某个文件夹
    onDelete: PropTypes.func,

    // 移动某个文件夹
    onMove: PropTypes.func,

  };

  static defaultProps = {

    // 默认为完整模式
    mode: 'full',

    // 默认不允许创建新文件夹
    allowCreateFolder: false,

    // 选中文件回调
    onSelectFile: (fileID) => {
      console.log(fileID)
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
   * @function 渲染文件夹列表
   * @private
   */
  _renderFolders() {


    // 传入的文件夹对象
    const folder: FolderViewEntity = this.props.folder;

    const {allowCreateFolder, mode, onOpen} = this.props;

    const folders: [FolderViewEntity] = [];

    // 判断是否有父文件夹
    if (folder.parent) {

      // 如果存在父文件夹，则添加父文件夹图标
      folders.push(
        <div className="folder">
          <ParentFolderCard
            folder={folder.parent}
            onClick={onOpen}
          />
        </div>
      );

    }

    // 判断是否允许创建新文件夹
    if (allowCreateFolder) {
      // 如果存在父文件夹，则添加父文件夹图标
      folders.push(<div className="folder">
        <NewFolderCard />
      </div>);
    }

    // 渲染其他文件夹
    folder.children.forEach((f: FolderViewEntity, index) => {

      folders.push(<div className="folder" key={index}>
        <FolderCard
          {...this.props}
          folder={f}
          onOpen={onOpen}
        />
      </div>)

    });

    return folders;

  }

  /**
   * @function 默认渲染函数
   */
  render() {

    return (<section className="folder_grid__container">

      <div className="folders">
        {this._renderFolders()}
      </div>

      <div className="files">
        {this.props.children}
      </div>

            </section>)

  }

}

