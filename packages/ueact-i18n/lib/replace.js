'use strict';

//dependences
const fs = require('fs');
const path = require('path');
const xlsx = require('node-xlsx');
const babylon = require('babylon');
const recast = require('recast');
const colors = require('colors');
const n = recast.types.namedTypes;
const b = recast.types.builders;

const config = require('./config');
const utils = require('./util');

module.exports = function () {
  const xlsxBuffer = xlsx.parse(fs.readFileSync(`${process.cwd()}${path.sep}${config.prefix}_i18n.xlsx`));
  const callDef = config.customCall;
  let successCount = 0;
  const notMatchZhArr = [];
  const writeFileList = [];
  const newChnMap = {};
  xlsxBuffer[0].data.slice(1).reduce((cur, next) => {
    if (!newChnMap[next[2]]) {
      newChnMap[next[3]] = next[2];
    }
  }, []);
  const files = utils.getFiles();
  files.map((file, i) => {
    // 如果是en.js文件，则跳过，后面和zh-cn.js一起处理
    if (/i18n\/en\.js$/g.test(file)) {
      return;
    }
    let hasImportI18n = [],
      hasI18nKey;
    // 替换中文字符串为i18n(key)
    let ast = utils.getAST(file);
    utils.visitAST(ast, (path, v) => {
      const value = String(v).trim();
      const loc = path.node.loc;
      const key = newChnMap[value];
      if (key) {
        successCount++;
        hasI18nKey = true; // 用来判断该页面有国际化字段
        if (key.split('.').pop() === '') throw new Error(`${callDef} key "${key}" should has unique end`);
        const i18nCall = b.callExpression(
          b.identifier(callDef),
          [b.literal(key)]
        );
        const parentType = path.parentPath.node.type;
        if (parentType === 'SwitchCase' || (parentType === 'ObjectProperty' && path.name === 'key')) {
          console.log(`【autoTranslate WARNING】: In ${file}, "${value}" at << Position: line ${loc.start.line}, from ${loc.start.column} to ${loc.end.column} >> can't replace to ${callDef}('${key}'), please manually changing the code implementation`)
          return false;
        } else if (parentType === 'JSXElement' || parentType === 'JSXAttribute') {
          path.replace(b.jsxExpressionContainer(i18nCall));
        } else {
          path.replace(i18nCall);
        }
      } else if (utils.chnRegExp.test(v)) {
        notMatchZhArr.push(v.trim());
      }
    });
    // 判断页面有没有引入或者定义i18n
    recast.visit(ast, {
      visitImportDeclaration: function (path) {
        if (path.node.source.value === callDef) {
          hasImportI18n.push(path);
        }
        this.traverse(path);
      },
      visitVariableDeclarator: function (path) {
        if (path.node.id.name === callDef) {
          hasImportI18n.push(path);
        }
        this.traverse(path);
      }
    });
    // 添加i18n定义
    const i18nImportDef = b.variableDeclaration("const", [
      b.variableDeclarator(
        b.identifier(callDef),
        b.callExpression(
          b.identifier("require"),
          [b.literal(callDef)]
        )
      )
    ]);
    // 页面没有引入i18n则插入一个
    recast.visit(ast, {
      visitImportDeclaration: function (path) {
        const parentPathValue = path.parentPath.value;
        const importNum = parentPathValue.filter(n => n.type === 'ImportDeclaration');
        if (hasImportI18n.length === 0 && path.name === importNum.length - 1) {
          path.parentPath.get(path.name).insertAfter(i18nImportDef);
        }
        this.traverse(path);
      },
      visitProgram: function (path) {
        const hasImport = path.node.body.filter(n => n.type === 'ImportDeclaration');
        if (hasImport.length === 0 && hasImportI18n.length === 0 && hasI18nKey) {
          path.get('body').unshift(i18nImportDef);
        }
        this.traverse(path);
      }
    })
    let newCode = recast.print(ast, config.printOpts).code;
    // 如果文件是zh-cn.js, 则用zh-cn覆盖对应的en
    if (/i18n\/zh-cn\.js$/g.test(file)) {
      const enFilePath = file.replace('zh-cn.js', 'en.js');
      writeFileList.push({
        file: utils.p(enFilePath),
        code: newCode
      });
    }
    // 将所有需要执行的任务放在列表中，统一执行
    writeFileList.push({
      file: utils.p(file),
      code: newCode
    });
    if (i === files.length - 1) {
      if (notMatchZhArr.length) {
        console.log(`scanned count: ${successCount + notMatchZhArr.length}`);
        console.log(`success replace count: ${successCount}`);
        console.log('replace failed'.red);
        console.log(notMatchZhArr.toString().yellow);
      } else {
        writeFileList.forEach((test, i) => {
          try {
            fs.writeFileSync(test.file, test.code);
            if (i === writeFileList.length - 1) {
              console.log('replace success'.green);
              console.log(`files count: ${i + 1}`);
            }
          } catch (e) {
            throw new Error('replace failed');
          }
        })
      }
    }
  })
}
