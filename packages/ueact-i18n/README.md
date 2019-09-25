## auto-translate-converter
a cli work for part of i18n project chain

## Demo

![](/img/atcDemoShow.gif)

## Install

- via npm(**node version>=6.0**)
  ```
  npm install autotranslate -g
  ```

- local install
  ```
  git clone https://github.com/eJayYoung/auto-translate-converter.git
  cd auto-translate-converter
  npm link
  ```

## [Implement Docment](./Implement.md)

## Usage

there's few command for this tools.

`atc` is a shortcut for **auto-translate-conveter**

### **`atc -h`**

  ```
    Usage: atc <command> [directory path | file path]


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    build     extract chinese iteral from project and generate a excel
    replace   replace chinese iteral to i18(key)
    combine   combine mulit excel file into a total one
  ```

### **`atc build`** <br>
  build excel file contain project chinese words. 

### **`atc replace`** <br>
  replace i18n(key) to chinese words that needs to translate

> the cli also support relative path after `build` or `replace` command.
> eg. `atc build src/pages/home/Home.jsx`

## Config

the default config in the cli
```javascript
module.exports = {
  root: './src',
  ignore: ['app', 'i18n', 'images', 'lib', 'util'],
  basename: ['js', 'jsx'],
  prefix: process.cwd().split('/').pop(),
  autoKey: true,
  mergePreI18n: false,
  customCall: 'i18n',
}
```

you can also add a json file require named as `atc.config.js` in the root of your project, then you can cover the default config.


| property | type | default | description |
| --------- | ---- | ------- | ----------- |
| `root` | String | './src' | the root parse file path in project |
| `ignore` | Array | `['app', 'i18n', 'images', 'lib', 'util']` | default ignore catelog, support relative path |
| `basename` | Array | `['js', 'jsx']` | default traverse file extension |
| `parseOpts` | Object | | customized `option` for [`babylon.parse(code, [options])`](https://github.com/babel/babel/tree/master/packages/babylon#options) |
| `printOpts` | Object | `{}` | customized `options` for [`recast.print(ast, [options])`](https://github.com/benjamn/recast/blob/master/lib/options.js) |
| `prefix` | String | `process.cwd().split('/').pop()` | use your Project Name as default for the front part of key |
| `autoKey` | Boolean | `true` | if `true`,  automatic according defalut chinese translate to pinyin rule to generate the last part of key, otherwise `false` you can also custom fill the last part of key keep unique in single file so that you can better manage your code. |
| `mergePreI18n` | Boolean | `false` | if `true` , will merge with exist i18n file words |
| `customCall` | String | `i18n` | custom definition the replace callExpression. |

