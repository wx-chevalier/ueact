'use strict';

const fs = require('fs');
const path = require('path');

// default config
const DEFAULT_CONFIG = {
  root: './src',
  ignore: ['app', 'i18n', 'images', 'lib', 'util'],
  basename: ['js', 'jsx'],
  parseOpts: {
    allowImportExportEverywhere: true,
    plugins: [
      'jsx',
      'flow',
      'flowComments',
      'typescript',
      'doExpressions',
      'objectRestSpread',
      'decorators',
      'decorators2',
      'classProperties',
      'classPrivateProperties',
      'classPrivateMethods',
      'exportDefaultFrom',
      'exportNamespaceFrom',
      'asyncGenerators',
      'functionBind',
      'functionSent',
      'dynamicImport',
      'numericSeparator',
      'optionalChaining',
      'importMeta',
      'optionalCatchBinding',
      'throwExpressions',
      'pipelineOperator',
      'nullishCoalescingOperator',
      'exportExtensions',
    ]
  },
  printOpts: {},
  argvPath: process.argv[3] ? `./${process.argv[3]}` : './src',
  prefix: path.basename(process.cwd()),
  autoKey: true,
  mergePreI18n: false,
  customCall: 'i18n',
};


let customConfig = {};

if (fs.existsSync(`${process.cwd()}/atc.config.js`)) {
  customConfig = require(`${process.cwd()}/atc.config.js`);
}

const config = Object.assign(DEFAULT_CONFIG, customConfig)

module.exports = config;
