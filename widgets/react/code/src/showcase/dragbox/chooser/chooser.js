
import React, { Component, PropTypes } from 'react';
import SparkMD5 from 'spark-md5';
import BlueWhiteRaisedButton from '../../picker/button/raised/blue_white_raised_button';
import './chooser.scss';

/**
 * @function 组件UploadChooser
 */
export default class UploadChooser extends Component {
  static propTypes = {
    // 判断是否允许选择多个文件
    multiple: PropTypes.bool,

    // 上传按钮显示的名称
    label: PropTypes.string,

    // 文件类型
    types: PropTypes.arrayOf(PropTypes.string),

    // 已存在的文件名
    existedFiles: PropTypes.arrayOf(PropTypes.string),

    // 判断是否需要进行MD5操作
    md5: PropTypes.bool,

    // 选择成功之后的回调事件
    onChange: PropTypes.func,

    // 显示的按钮
    children: PropTypes.node
  };

  static defaultProps = {
    multiple: false,

    label: '本地上传',

    // 设置为null表示可以上传任意文件
    types: null,

    // 设置为空数组表示没有现存的文件
    existedFiles: [],

    // 默认需要进行md5操作
    md5: true,

    onChange: (files: [object]) => {
      files.forEach(file => {
        console.log(file);
      });
    }
  };

  /**
   * @function 默认构造函数
   * @param props
   */
  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
  }

  /**
   * @function 组件挂载完成回调
   */
  componentDidMount() {}

  _onChange = () => {
    const files = this.refs.upload.files;

    // 如果没有选择文件则直接返回
    if (files.length < 1) {
      return;
    }

    const { existedFiles, md5, onChange } = this.props;

    const willUploadFiles = [];

    for (let index = 0; index < files.length; index++) {
      if (existedFiles.indexOf(files[index].name) === -1) {
        // 如果未发现重名

        willUploadFiles.push(files[index]);
      }
    }

    if (md5) {
      // 对所有文件执行MD5计算操作
      md5MultipleFiles(willUploadFiles, 0, [], md5s => {
        for (let index = 0; index < willUploadFiles.length; index++) {
          willUploadFiles[index].md5 = md5s[index];
        }

        onChange(willUploadFiles);
      });

      // 本函数执行返回
      return;
    }

    // 如果选择了有效的文件，则触发外部函数
    if (willUploadFiles.length) {
      onChange(willUploadFiles);
    }

    // 重置当前表单
    this.refs.form.reset();
  };

  /**
   * @function 默认渲染函数
   */
  render() {
    const { label, multiple, types } = this.props;

    let accept = '*';

    // 根据设置的输入的可选文件类型判断是否限制文件类型
    if (types) {
      accept = types.join(',');
    }

    let children = this.props.children;

    if (!this.props.children) {
      children = (
        <BlueWhiteRaisedButton
          className="upload_chooser__button"
          label={label}
          reverse={false}
        />
      );
    }

    return (
      <div className="upload_chooser__container">
        {children}
        {/* 隐藏起来的文件上传表单 */}
        <form ref="form">
          {multiple
            ? <input
              className="upload_chooser__input"
              accept={accept}
              onChange={this._onChange}
              multiple
              ref="upload"
              type="file"
            />
            : <input
              className="upload_chooser__input"
              accept={accept}
              onChange={this._onChange}
              ref="upload"
              type="file"
            />}
        </form>
      </div>
    );
  }
}

/**
 * @function 对多个文件执行MD5计算操作
 * @param files
 * @param index
 * @param md5s
 * @param cb
 */
function md5MultipleFiles(files: [object], index, md5s, cb) {
  // 判断是否已经全部结束
  if (index === files.length) {
    // 全部结束则执行总回调
    cb(md5s);
    return;
  }

  // 否则对下一个元素执行MD5计算操作
  md5SingleFile(files[index], md5 => {
    // 将计算值添加到数组中
    md5s.push(md5);

    md5MultipleFiles(files, index + 1, md5s, cb);
  });
}

/**
 * @function 对文件执行MD5操作
 * @param file
 * @param cb
 */
function md5SingleFile(file: object, cb): string {
  const blobSlice =
    File.prototype.slice ||
    File.prototype.mozSlice ||
    File.prototype.webkitSlice;
  const chunkSize = 2097152; // Read in chunks of 2MB
  const chunks = Math.ceil(file.size / chunkSize);
  let currentChunk = 0;
  const spark = new SparkMD5.ArrayBuffer();
  const fileReader = new FileReader();

  function loadNext() {
    const start = currentChunk * chunkSize;
    const end = start + chunkSize >= file.size ? file.size : start + chunkSize;

    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
  }

  fileReader.onload = event => {
    // 该值记录了对某个文件进行MD5操作的进度
    const percent = parseFloat((currentChunk / chunks * 100).toFixed(1));

    spark.append(event.target.result); // Append array buffer

    currentChunk++;

    if (currentChunk < chunks) {
      loadNext();
    } else {
      const md5 = spark.end(); // 完成md5
      cb(md5);
    }
  };

  fileReader.onerror = () => {
    console.warn('error.');
  };

  loadNext();
}
