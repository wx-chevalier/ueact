/**
 * @name combine excels
 * @author changming.zy<changming.zy@alibaba-inc.com>
 */
const fs = require('fs');
const path = require('path');
const xlsx = require('node-xlsx');

const RESULT_EXCEL_NAME = 'i18n-combined.xlsx';
const XLSX_EXT_NAME = '.xlsx';
const XLSX_HEADER = [
  'AppName',
  'English',
  'Key',
  'Simplified Chinese',
  'Traditional Chinese',
  'Traditional Chinese HK',
  'Spanish',
  'Portuguese',
  'French',
  'German',
  'Italian',
  'Russian',
  'Japanese',
  'Korean',
  'Arabic',
  'Turkish',
  'Thai',
  'Vietnamese',
  'Dutch',
  'Hebrew',
  'Indonesian',
  'Polish',
  'Hindi',
  'Ukrainian',
  'Malay',
  'Singapore',
  'Filipino',
  'Description',
  'Group'
];
const SHEET_NAME = 'languages';

/**
 * Step by step
 * 1. List excels in certain folder
 * 2. Combine excels, remove duplicated same chinese
 */

function isI18nSheet(name, data) {
  return name === SHEET_NAME && JSON.stringify(data[0]) === JSON.stringify(XLSX_HEADER);
}

function removeDuplicatedChs(resArr, targetArr) {
  const data = resArr.slice(1);
  const dataMap = {};
  data.forEach((item) => {
    dataMap[item[3]] = item;
  });
  targetArr.forEach((item) => {
    if (!dataMap[item[3]]) {
      dataMap[item[3]] = item;
    }
  });
  const res = [XLSX_HEADER];
  Object.keys(dataMap).forEach((chs) => {
    res.push(dataMap[chs]);
  });
  return res;
}

function listExcels(folder) {
  const retSheet = {
    name: 'language',
    data: [XLSX_HEADER]
  }
  try {
    const res = fs.readdirSync(folder);
    console.log(`Reading folder: ${folder}`);
    console.log(`Folder contents:`, res);
    if (res && res.length > 0) {
      let filesFoundCount = 0;
      res.forEach((fileName) => {
        if (fileName !== RESULT_EXCEL_NAME && fileName.indexOf(XLSX_EXT_NAME) > -1 && fileName.indexOf('~$') === -1) {
          const sheets = xlsx.parse(path.join(folder, fileName));
          sheets.forEach((sheet) => {
            const name = sheet.name;
            const data = sheet.data;
            if (isI18nSheet(name, data)) {
              retSheet.data = removeDuplicatedChs(retSheet.data, data.slice(1));
            }
          });
          filesFoundCount++;
        }
      });
      if (filesFoundCount === 0) {
        console.log('Warning: There is no xlsx files found.');
        return;
      }
      const buf = xlsx.build([retSheet]);
      const resPath = path.join(folder, RESULT_EXCEL_NAME);
      fs.writeFileSync(resPath, buf);
      console.log(`Result here: ${resPath}`);
    } else {
      console.log('Warning: There is no xlsx files found.');
    }
  } catch (e) {
    console.log('Error found!');
    console.log(e);
  }
}

module.exports = listExcels;