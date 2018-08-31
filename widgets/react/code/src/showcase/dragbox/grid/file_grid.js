
import React, { Component, PropTypes } from 'react';
import FolderViewEntity from '../entity/folder_view_entity';
import FileViewEntity from '../entity/file_view_entity';
import FileCard from './cards/file/file_card';
/**
 * 组件FileGrid，文件网格
 */
export default class FileGrid extends Component {

  static propTypes = {
    // 文件夹实体类
    folder: PropTypes.instanceOf(FolderViewEntity),

    // 输入当前模式，模式包括:
    // 全模式(默认,full):
    // 选择模式(select)
    mode: PropTypes.oneOf(['full', 'select']),

    // 选中文件
    onSelect: PropTypes.func,
  };

  static defaultProps = {

    // 默认为完整模式
    mode: 'full',

    // 选中文件回调
    onSelect: (fileID) => {
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
   * @function 渲染所有的文件
   * @private
   */
  _renderFiles() {

    const files: [FileViewEntity] = this.props.folder.files || [];

    return files.map((file: FileViewEntity, index) => (<div className="file" key={index}>
      <FileCard
        {...this.props}
        file={file}
      />
    </div>));

  }

  /**
   * @function 默认渲染函数
   */
  render() {

    return (<section className="file_grid__container">

      {
        this._renderFiles()
      }

            </section>)

  }

}

