

/**
 * @function 文件实体类
 */
export default class FileViewEntity {

  static displayName = 'FileViewEntity';

  // 文件编号
  id: string | number;

  // 文件夹名
  name: string = '未命名';

  // 文件图标
  cover: string = 'http://7xsotm.com1.z0.glb.clouddn.com/demo.png';

  // 文件是否被选中
  selected: bool = false;

  // 文件点击的链接跳转
  link: string;

  // 创建日期
  date: string = '2016-11-10';


  /**
   * @function 默认构造函数
   * @param data JSONObject
   */
  constructor(data = {}) {

    // 判断name是否为空或者空字符串
    if (!data.name) {
      data.name = '未命名';
    }

    Object.assign(this, data);
  }

}