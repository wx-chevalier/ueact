// @flow

/**
 * Description 将 HTML 格式的不完全 JSX 转化为 标准 JSX
 * @param html
 * @return {string}
 */
export function html2JSX(html: string) {
  return completeAutoCloseSlash(trimEventQuote(trimValueQuote(html)));
}

/**
 * Description 修复 input 的不闭合
 * <input > => <input />
 * @param html
 * @return {string}
 */
export function completeAutoCloseSlash(html: string) {
  let tmpStr = html;

  // 匹配所有的监听
  const regex = /<(input|img).*>/g;

  let match: Array<any>;

  while ((match = regex.exec(tmpStr))) {
    tmpStr = tmpStr.replace(match[0], match[0].replace(/>/g, '/>'));
  }

  return tmpStr;
}

/**
 * Description 去除输入的 HTML 中的事件监听的引号
 * `onclick="{methods.handleClick}"` => `onclick={methods.handleClick}`
 * @return {string}
 * @param html
 */
export function trimEventQuote(html: string) {
  let tmpStr = html;

  // 匹配所有的监听
  const regex = /on\w*="{[\w|\.]*}"/g;

  let match: Array<any>;

  while ((match = regex.exec(tmpStr))) {
    tmpStr = tmpStr.replace(match[0], match[0].replace(/"/g, ''));
  }

  return tmpStr;
}

/**
 * Description 移除 value 值的额外引号
 * `value="{state.a}"` => `value={state.a}`
 * @param html
 * @return {string}
 */
export function trimValueQuote(html: string) {
  let tmpStr = html;

  // 匹配所有的监听
  const regex = /value\w*="{[\w|\.]*}"/g;

  let match: Array<any>;

  while ((match = regex.exec(tmpStr))) {
    tmpStr = tmpStr.replace(match[0], match[0].replace(/"/g, ''));
  }

  return tmpStr;
}
