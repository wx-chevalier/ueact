// @flow

import { diffList } from '../../../src/isomorphic/vdom/diff/diffList';

describe('测试 diffList 完整工作流', () => {
  it('数组重排序与属性替换', () => {
    let oldList = [
      { id: 'a', name: 'a1' },
      { id: 'b' },
      { id: 'c' },
      { id: 'd' },
      { id: 'e' }
    ];
    let newList = [
      { id: 'c' },
      { id: 'a', name: 'a2' },
      { id: 'b' },
      { id: 'e' },
      { id: 'f' }
    ];

    let diffs = diffList(oldList, newList, 'id');

    expect(diffs.moves).toMatchObject([
      { index: 3, type: 0 },
      { index: 0, type: 1, item: { id: 'c' } },
      { index: 3, type: 0 },
      { index: 4, type: 1, item: { id: 'f' } }
    ]);

    expect(diffs.children).toMatchObject([
      { id: 'a', name: 'a2' },
      { id: 'b' },
      { id: 'c' },
      null,
      { id: 'e' }
    ]);

    // 首先将 oldList 中需要保留的对象与 newList 中对应的对象进行值对比，并且进行赋值
    // 所有 key 相同的对象都是会被保留的
    for (let i = 0; i < oldList.length; i++) {
      if (diffs.children[i] && diffs.children[i].name) {
        oldList[i].name = diffs.children[i].name;
      }
    }

    for (let move of diffs.moves) {
      if (move.type === 0) {
        oldList.splice(move.index, 1); // type 0 is removing
      } else {
        oldList.splice(move.index, 0, move.item); // type 1 is inserting
      }
    }

    expect(oldList).toMatchObject(newList);
  });
});

describe('测试 diff', () => {
  it('能够获得正确的 moves');
  it('能够');
});
