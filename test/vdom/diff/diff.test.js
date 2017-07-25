// @flow
import { createVNode } from '../../../src/vdom/node/createVNode';
import { diff } from '../../../src/vdom/diff/diff';

describe('测试属性差异对比', () => {
  let oldNode = (
    <div>
      <span className="header" />
    </div>
  );

  let newNode = (
    <div>
      <span className="headerNew" />
    </div>
  );

  console.log(diff(oldNode,newNode))
});

describe('测试列表项差异对比', () => {
  let oldNode = (
    <div>
      <span key="1">1</span>
      <span key="2">2</span>
      <span key="3">3</span>
    </div>
  );

  let newNode = (
    <div>
      <span key="3">3a</span>
      <span key="1">1</span>
      <span key="2">2</span>
    </div>
  );

  let patches = diff(oldNode, newNode);

  it('包含两个差异项', () => {
    expect(Object.keys(patches)).toHaveLength(2);
  });
});
