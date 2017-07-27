// @flow

import { isFunction } from '../../../src/shared/util/type';
describe('测试类型判断函数', () => {
  test('测试 isFunction', () => {
    expect(isFunction(() => {})).toBeTruthy();

    expect(isFunction(undefined)).not.toBeTruthy();
  });
});
