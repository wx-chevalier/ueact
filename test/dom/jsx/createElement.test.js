// @flow
import { createElement } from '../../../src/dom/jsx/createElement';

describe('测试 createElement', () => {
  it('createElement 创建子元素为空的单标签', () => {
    expect(createElement).toBeInstanceOf(Function);

    let el = createElement('div', {
      style: {
        color: 'red'
      }
    });

    expect(el).toBeInstanceOf(HTMLElement);

    expect(el.tagName.toLowerCase()).toBe("div");

    expect(el.style.color).toBe("red");

  });
});
