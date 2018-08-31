
import FileViewEntity from './file_view_entity';

/**
 * @function 文件夹实体类
 */
export default class FolderViewEntity {

  // 文件夹编号
  id: string | number;

  // 文件夹名
  name: string = '文件夹';

  // 创建日期
  date: string = '2016-11-10';

  // 文件夹图标
  cover: string = 'http://7xsotm.com1.z0.glb.clouddn.com/demo.png';

  // 当前文件夹是否被选中
  selected: bool = false;

  // 父文件夹对象,默认为null，即不包含父文件夹
  parent: FolderViewEntity = null;

  // 子文件夹数组
  children: [FolderViewEntity] = null;

  // 文件夹中文件列表
  files: [FileViewEntity] = null;


  /**
   * @function 默认构造函数
   * @param data JSONObject
   */
  constructor(data = {}) {

    Object.assign(this, data);
  }

}