// @flow

import observe from '../../src/proxy/observe';
import { changes } from '../../src/shared/symbols';

describe('测试根属性监听', () => {
  it('基本数据类型监听', done => {
    const obj = observe({ property: 'prop' });

    obj.listen(changes => {
      expect(changes.get('property')).toEqual({
        value: 'property',
        oldValue: 'prop'
      });

      done();
    });
    obj.property = 'property';
  });

  it('数组监听', done => {
    const obj = observe({});

    obj.arr = [1];

    obj.arr.listen(changes => {
      expect(changes.get('1')).toEqual({
        value: 2,
        oldValue: undefined
      });

      done();
    });

    obj.arr.push(2);

    obj.arr.splice(0, 1, 3);
  });
});

describe('测试子属性监听', () => {
  it('子属性自动监听', (done: Function) => {
    const obj = observe({});

    obj.property = {};

    obj.property.listen(changes => {
      expect(changes.get('name')).toEqual({
        value: 'name',
        oldValue: undefined
      });

      done();
    });

    obj.property.name = 'name';
  });
});
