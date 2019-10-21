/**
 * @name combine excels
 * @author changming.zy<changming.zy@alibaba-inc.com>
 */
const fs = require('fs-extra');
const path = require('path');
const xlsx = require('node-xlsx');

const utils = require('./util');

const RESULT_EXCEL_NAME = 'i18n-combined.xlsx';
const XLSX_EXT_NAME = '.xlsx';
const XLSX_HEADER = ['Key', 'Simplified Chinese', 'English'];
const SHEET_NAME = 'languages';

/**
 * Step by step
 * 1. List excels in certain folder
 * 2. Combine excels, remove duplicated same chinese
 */

async function jsonToXlsx(files) {
  const retSheet = {
    name: 'language',
    data: [XLSX_HEADER]
  };

  const strMapping = {};

  for (let file of files) {
    const isExist = await fs.pathExists(file);

    if (!isExist) {
      continue;
    }

    const content = await fs.readJson(file);

    Object.keys(content).forEach(key => {
      if (!strMapping[key]) {
        strMapping[key] = {};
      }

      if (file.includes('en')) {
        strMapping[key].en = content[key];
      } else {
        strMapping[key].zh = content[key];
      }
    });
  }

  // 生成 Excel
  const data = [XLSX_HEADER];

  Object.keys(strMapping).forEach(key => {
    data.push([key, strMapping[key].zh, strMapping[key].en]);
  });

  const buffer = xlsx.build([{ name: 'i18n', data: data }]); // Returns a buffer
  const xlsxPath = `${process.cwd()}${path.sep}${RESULT_EXCEL_NAME}`;

  fs.writeFileSync(xlsxPath, buffer);

  try {
  } catch (e) {
    console.log('Error found!');
    console.log(e);
  }
}

module.exports = jsonToXlsx;
