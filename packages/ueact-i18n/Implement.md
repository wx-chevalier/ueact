# auto-translate-converter - 5分钟搞定老项目文案国际化


## 背景

由于历史原因，很多老项目都是中文硬编码的，所以改造的大部分工作就是需要将这些 **中文文案** 替换成 `i18n(key)`。在此之前，都是人力完成这些重复的工作，不仅低效，开发人员的积极性也不高，因此自动化方案成为后续项目国际化改造的不二之选。

**auto-translate-converter** 是这次自动化方案实践的产物，主要用来批量替换代码中的中文为 `i18n(key)`。不过还有很多待优化完善的地方，仅供参考。

## 需求分析

目前国际化改造的自动方案分为三个步骤：

1. 提取出项目代码中所有的中文，生成对应的美杜莎key，最终生成xlsx（**自动**）
2. 将xlsx交给业务方完成翻译文案（**手动**）
3. 根据最后修改的xlsx，把代码中的中文替换成我们想要的i18n(key)（**自动**）

其中做的好处有：

- 将文案的翻译自由交给业务方，使翻译内容更贴合业务场景
- 将文案的key的修改自由交给前端同学，更方便管理语义化的变量名
- 把有迹可循的重复工作交给机器

因此我们的工具 `auto-translate-converter` 只需要两条命令

- `atc build` 对应第一步骤
- `atc replace` 对应第三步骤

## 准备工作

子曰：工欲善其事，必先利其器。
因此合理的工具选型也是必要的。
此次方案使用的主要类库如下：

- [node-glob](https://github.com/isaacs/node-glob) ———— 遍历项目文件
- [babylon](https://github.com/babel/babel/tree/master/packages/babylon) ———— 将代码解析(parse)成AST，作为babel背后的解析器，各种新语法都可以支持。
- [recast](https://github.com/benjamn/recast) ———— 遍历和修改AST，基于ast-types，也是ast-types作者的项目
- [node-xlsx](https://github.com/mgcrea/node-xlsx) ———— 解析和生成xlsx
- [pinyin](https://github.com/hotoo/pinyin) ———— 将中文转成拼音，生成唯一key

工具都准备好了，就看如何来实现了

## 实现思路

### atc build

![undefined](./img/build.png) 

1.使用 `glob` 来遍历项目文件，`fs.readFileSync` 来读取文件代码

> PS: `glob` 只支持单一文件后缀，因此需要根据自己想获取的文件类型，来遍历出不同类型的文件

2.使用 `recast` 和 `babylon` 将读取的代码解析成AST，查询所有的字符串节点

- 在这里使用的是 `recast` 的 `parse` 方法来解析，虽然recast默认使用`esprima`来解析，不过它也支持自定义解析器，这样我们还是使用的 `babylon`作为解析器

 ```javascript
const babylon = require('babylon');
const recast = require('recast');
const  parseOptions = {
	parser: {
		parse: (source) => {
			return babylon.parse(source, config.parseOpts)
		}
	}
};
let ast;
try {
	ast = recast.parse(code, parseOptions);
}catch(e) {
	throw new Error('file parse ast error');
}
 
```

- `recast` 基于 `ast-types`，支持访问各种类型节点，此次方案主要查找了 `Literal` (字符串字面量)，`JSXText` (JSX文本)，`TemplateElement` (es6模版字符串)
```javascript
visitAST(ast, cb) {
  recast.visit(ast, {
	visitLiteral: (path) => {
	  const v = path.node.value;
	  cb(path, v);
	  this.traverse(path);
	},
	visitJSXText: function(path){
	  const v = path.node.value;
	  cb(path, v);
	  this.traverse(path);
	},
	visitTemplateElement: function(path) {
	  const v = path.node.value.raw;
	  cb(path, v);
	  this.traverse(path);
	}
  })
}
```

3.根据正则表达式匹配出中文的节点,并生成该文案的唯一key。


- 根据这些字符串节点返回的值，来正则匹配是否为中文，[匹配中文的正则表达式](https://stackoverflow.com/questions/21109011/javascript-unicode-string-chinese-character-but-no-punctuation)已根据unicode block list整理出来了`/[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/`

> 不过在使用正则时要慎用全局模式，是由于全局模式的正则表达式有个属性 `lastIndex`， 用来表示上一次匹配文本之后的第一个字符的位置，若上次匹配的结果是由 `test()` 或 `exec()`找到的，它们都以 lastIndex 属性所指的位置作为下次检索的起始点。而我们在每次匹配时，只需要 `lastIndex` 都从0开始即可，所以可以不用全局模式，详情可见[理解正则表达式的全局匹配](http://bubkoo.com/2014/03/19/understanding-the-flag-g-of-JavaScript's-regular-expressions/)

- 生成key的策略
![undefined](./img/pinyin.png) 

	在遍历获取中文字符串时，同时也可以获取到该字符串所有文件路径，将该路径用 `.` 连接，即为key的前半部分，后半部分为该文案的拼音，但是有的文案属于一句话，全部提取会导致key太长。因此为了让后半部分的key唯一，采用如下策略:

	- 默认取字符串前两个字的拼音用 `_` 连接
	- 将一个文件中所有的字符串按照字符数升序排列
	- 若发现该文件中某个词的前两个字在已转的拼音中有重复的
	  - 若该词为谐音词，长度跟之前的相同，则在已转拼音后添加递增数字
 	  - 若该词长度足够，则继续往后取两个字的拼音

	效果如下
	
	```javascript
	// 项目名称 autoTranslate-test
	// 文件路径 autoTranslate-test/src/pages/demo/Demo.jsx

	autoTranslate-test.pages.demo.ce_shi 		测试
	autoTranslate-test.pages.demo.ce_shi1		侧视
	autoTranslate-test.pages.demo.ce_shi_shu_ju	测试数据
  	```
	
	> 当然，如果不怕麻烦的话，也可以交给前端同学自定义key的后半部分，后续在auto-translate-conveter的配置文件中会讲到

4.将上面获取的文案和key拼成一个二维数组，生成xlsx
解析美杜莎的xlsx模版，将内容替换成我们从项目中生成的二维数组，再生成我们想要的xlsx，就像这样：
![undefined](./img/xlsx.png) 

### atc replace

我们的国际化方案是使用[i18n-helper](http://npmjs.org/package/i18n-helper)，因此我们在项目使用自定义方法 `i18n(key)` 来获取美杜莎的文案。

1.首先在每个目录下，我们需要判断页面中有没有引入或者定义了i18n，没有引入的文件需要引入

```javascript
let i18mImport = [];
recast.visit(ast, {
  visitVariableDeclarator: function(path) {
	if (path.node.id.name === 'i18n') {
		i18nImport.push(path);
	}
	this.traverse(path);
  },
  visitImportDeclaration: function(path) {
	if (path.node.source.value === 'i18n') {
		i18nImport.push(path);
	}
	this.traverse(path);
  }
})

if (i18mImport.length === 0) {
在头部引入i18n
}
```

2.根据最后更新的xlsx生成Map，然后在文件遍历时，若字符串在Map中存在，则把字符串替换成对应的i18n(key)
```javascript
const recast = require('recast');
const n = recast.types.namedTypes;
const b = recast.types.builders;
const chnMap = {};

/**
 * 将xlsx的数据转成chnMap
 * chnMap
 * {
 * 	"测试": "autoTranslate-test.pages.demo.ce_shi"
 * }
 */

visitAST(ast, (path, value) => {
	if (value 在 chnMap 中存在) {
		const i18nCall = b.callExpression(
            b.identifier('i18n'),
            [b.literal(key)]
        );
		const parentType = path.parentPath.node.type;
		if (若父节点类型为SwitchCase || (父节点类型为ObjectProperty，且当前节点类型是key) {
		//提醒用户，会语法出错，请手动修改实现方式
		} else if (若该节点在JSX中或者JSX组件的属性中) {
			// 则需要在i18nCall外面再包一层{}
			path.replace(b.jsxExpressionContainer(i18nCall));
		}else {
			// 则直接替换
			path.replace(i18nCall);
		}
	}
})
```

> 这里需要注意的一点是：在之前的项目中有很多在 `Switch case` 或者在 `Object` 的 `key` 用中文硬编码，若是替换成我们定义的 `i18n(key)` 就会造成语法错误，在这里只能将错误信息提示给前端同学，手动修改逻辑代码的实现方式。

这样我们就完成了针对中文字符串的精准替换。

## 工具使用技巧

由于本次方案的工具 `auto-translate-converter` 是面向前端同学使用，那自然需要具备易上手，灵活配置的特性。

- 安装
```javascript
npm install autotranslate -g
```


- 命令行的使用

```javascript
// 以atc build为例，replace同理

atc build 					// 默认在根目录执行
atc build src/page/demo		// 支持指定执行目录

```

- 配置文件

开发者可以在项目根目录下添加一个文件`atc.config.js`进行配置, 输出内容如下：

```javascript
{
	root: './src',  // 项目遍历的根目录
	ignore: ['app', 'i18n', 'images', 'lib', 'util'], // 想忽略的文件目录
	basename: ['js', 'jsx'], // 想遍历的文件类型
	parseOpts: {}, // 自定义 babylon.parse(code, [options])，详情见https://github.com/benjamn/recast/blob/master/lib/options.js
	printOpts: {}, // 自定义recast.print(code, [options], 详情见 https://github.com/benjamn/recast/blob/master/lib/options.js)
	prefix: process.cwd().split('/').pop(), // key的前半部分的前缀，默认使用项目目录名
	autoKey: true, // 是否自动生成完整key，false的话只会生成前半部分的路径key，后面可以自己在xlsx添加
}
```
> 用户自定义的配置项将会直接覆盖初始默认项,使用的Object.assign

这样使用上手很方便，也拥有一定灵活的配置。

## 写在最后

这次写工具的经历，不仅仅是在技术方面的广度有所提升，还让我从产品的视角去分析考虑，不光只埋头于代码实现，也要关注流程优化，用户体验。
目前 `auto-translate-converter` 的默认配置只针对基于 `nowa` 的项目使用，当然还有一些配置也有待更新，比如自定义i18n方法。
如果您有比较好的建议和想法，欢迎提issue或者PR。








