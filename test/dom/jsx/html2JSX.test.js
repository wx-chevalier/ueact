// @flow
import { completeInputSlash, trimEventQuote } from '../../../src/dom/jsx/html2JSX';

const testHTML = `
 <header class="header">
        <h1>todos</h1>
        <input class="new-todo" autofocus="" autocomplete="off" placeholder="What needs to be done?" value="{state.count}" onchange="{methods.handleChange}">
 </header>
`;

describe('测试 HTML 标签转化为 JSX 语法', () => {
  it('测试 completeInputSlash', () => {
    // 测试的正则表达式
    const regex = /<input[.|^\/]*>/g;

    expect(regex.test(completeInputSlash(testHTML))).not.toBeTruthy();
  });

  it('测试 trimEventQuote', () => {
    console.log(trimEventQuote(testHTML));
  });
});
