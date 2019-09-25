'use strict';

//dependences
const fs = require('fs');
const path = require('path');
const xlsx = require('node-xlsx');
const pinyin = require('pinyin');
const glob = require('glob');

const config = require('./config');
const utils = require('./util');

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function(obj) {
      if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}

// From
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
if (!Object.entries)
  Object.entries = function( obj ){
    var ownProps = Object.keys( obj ),
        i = ownProps.length,
        resArray = new Array(i); // preallocate the Array
    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    
    return resArray;
  };

/**
 * @param {Array} files
 * @return chnArr
 * chnArr example
 * [
 *  ['recruit-fbi.pages.companyPackageManagement.packageManagement.', '是']
 * ]
 *
 */
function generateChnArr(files) {
  const i18n_zh_cn_map = {};
  const i18n_en_map = {};
  // 获取所有的i18n下，中文
  utils.getFilePathByName('zh-cn.js', (single_zh_cn_map, relative_path) => {
    const prefix = (`${config.prefix ? `${config.prefix}.` : ''}${relative_path.split('/').slice(2, -2).join('.')}`);
    for (const key in single_zh_cn_map) {
      if (JSON.stringify(i18n_zh_cn_map).indexOf(`:"${single_zh_cn_map[key]}"`) === -1) {
        const newkey = prefix + '.' + key;
        i18n_zh_cn_map[newkey.replace(/\.\./g, '.')] = single_zh_cn_map[key];
      }
    }
  })
  // 获取所有的i18n下，英文
  utils.getFilePathByName('en.js', (single_en_map, relative_path) => {
    const prefix = (`${config.prefix ? `${config.prefix}.` : ''}${relative_path.split('/').slice(2, -2).join('.')}`);
    for (const key in single_en_map) {
      const newkey = prefix + '.' + key;
      i18n_en_map[newkey.replace(/\.\./g, '.')] = single_en_map[key];
    }
  })

  const i18nZhcnArr = Object.entries(i18n_zh_cn_map);
  const cacheMap = {};
  let chnArr = [];
  files.map((file, i) => {
    const ast = utils.getAST(file);
    utils.visitAST(ast, (path, v) => {
      if(utils.chnRegExp.test(v)) {
        v.replace(/(\:|\：|)$/g, '');
        const prefix = `${config.prefix ? `${config.prefix}.` : ''}${file.split('/').slice(2, -1).join('.')}.`;
        chnArr.push([prefix, v.trim()]);
      }
    });
  })

  // 二维数组去重
  chnArr = chnArr.reduce((cur, next) => {
    cacheMap[next[1]] ? '' : cacheMap[next[1]] = true && cur.push(next);
    return cur;
  }, []);
  chnArr = config.autoKey ? uniquePinyinKey(chnArr) : chnArr;
  // 整合i18n里zh-cn.js的文案
  if (!!config.mergePreI18n) {
    chnArr = chnArr.filter(n => !i18nZhcnArr.some(m => m.indexOf(n[1]) !== -1)).concat(i18nZhcnArr);
  }
  chnArr.map(n => {
    // 把已有的en.js内容也提取到xlsx里面
    const enVal = i18n_en_map[n[0]] || '';
    n.unshift(config.prefix, enVal)
  });
  return chnArr;
}

/**
 * 
 * @param {Array} arr 二维数组
 * [
 *  ['recruit-fbi.pages.companyPackageManagement.packageManagement.', '成功']
 * ]
 * @return {Array} 二维数组 
 * [
 *  ['recruit-fbi.pages.companyPackageManagement.packageManagement.cheng_gong', '成功']
 * ]
 */

function uniquePinyinKey(arr) {
  const chnMap = {};
  const res = [];
  arr.map(([prefix, chn]) => {
    if (chnMap[prefix]) {
      chnMap[prefix][chn] = true;
    } else {
      chnMap[prefix] = {};
      chnMap[prefix][chn] = true;
    }
  });
  Object.entries(chnMap)
    .map(([prefix, sgChnMap]) => {
      //针对每个页面添加一个对象cacheMap用来缓存去重
      const cacheMap = {};
      Object.keys(sgChnMap)
        .sort((x, y) => x.length - y.length)
        .map(chn => {
          let limit = 2;
          let pinyinKey;
          let singleRepeat = false;
          let count = 0;
          // 各种标点符号
          const symbolReg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5|\u002d|\u005f|\u0028|\u0029)]/g;
          do {
            // 默认按limit个数来生成pinyinKey
            pinyinKey = generatePinyinKey(chn.replace(symbolReg, ''), limit);
            if (cacheMap[pinyinKey]) {
              // 若在cacheMap中有相同的pinyinKey，有以下两种情况：
              // 1. 中文的length比limit还要长，就limit += 2,继续往后取两个拼音字符连接
              // 2. 中文为同音词,长度一样，就在pinyinKey后面加上递加的数字
              singleRepeat = true;
              if (limit < chn.length) {
                limit += 2
              }else {
                // 假设cacheMap已有ce_shi(测试)的key，这时再来一个同音词(侧室),将生成ce_shi1的key,然后存入cacheMap
                // 若再来一个同音词(侧视),
                count ++;
                pinyinKey += String(count);
                cacheMap[pinyinKey] = true;
                singleRepeat = false;
              }
            }else {
              //若没缓存在cacheMap里的话，就存进去
              cacheMap[pinyinKey] = true;
              singleRepeat = false;
            }
          } while(singleRepeat) // 若在当前页面，cacheMap里有重复的pinyinKey,就返回到do中生成新的pinyinKey
          res.push([`${prefix}${pinyinKey}`, chn]);
        })
    })
  return res;
}


/**
 * @param {String} chn 
 * @param {Number} limit 
 * 根据中文转成拼音字符串，用_连接
 */
function generatePinyinKey(chn, limit) {
  const pinyinArr = pinyin(chn, {
    style: pinyin.STYLE_NORMAL
  });
  return pinyinArr.slice(0, Math.min(pinyinArr.length, limit)).join('_');
}


/**
 * @param {Array} chnArr
 * 根据chnMap生成excel
 */
function generateMCMSxlsx(chnArr) {
  const tempPath = config.templatePath
    ? `${path.resolve(config.templatePath)}`
    : `${path.join(path.resolve(__dirname, '..'), '/template/mcms_intl-i18nadmin_en_US.xlsx')}`;
  const template = xlsx.parse(fs.readFileSync(tempPath));
  template[0].data = template[0].data.concat(chnArr);
  const newBuffer = xlsx.build(template);
  const xlsxPath = `${process.cwd()}${path.sep}${config.prefix}_i18n.xlsx`;
  try {
    fs.writeFileSync(xlsxPath, newBuffer);
    console.timeEnd('generate MCMSxlsx');
    console.log(`build success ${xlsxPath}`.green);
    console.log(`words count: ${chnArr.length}`);
  }catch(e) {
    throw new Error(`build failed: ${e}`);
  }
}


module.exports = function() {
  const files = utils.getFiles();
  console.time('generate ChnArr');
  const chnArr = generateChnArr(files);
  console.timeEnd('generate ChnArr');
  console.time('generate MCMSxlsx');
  generateMCMSxlsx(chnArr);
  console.log(`file count: ${files.length}`);
};