/* @jsx v */

import { diff } from '../diff';
import { v } from '../../node';

describe('测试属性差异对比', () => {
  let oldNode: any = (
    <div>
      <span className="header" />
      <span className="body" />
    </div>
  );

  let newNode: any = (
    <div>
      <span className="headerNew" />
      <span className="body" />
    </div>
  );

  let patches = diff(oldNode, newNode);

  it('包含一个差异结点，且是最后一个结点发生变化', () => {
    expect(Object.keys(patches)).toHaveLength(1);
    expect(patches).toHaveProperty('1');
  });

  it('差异结点中仅有 Props 发生了变化', () => {
    expect(patches['1'][0]).toMatchObject({
      type: 2,
      props: {
        className: 'headerNew'
      }
    });
  });
});

describe('测试列表项差异对比', () => {
  let oldNode: any = (
    <div>
      <span key="1">1</span>
      <span key="2">2</span>
      <span key="3">3</span>
    </div>
  );

  let newNode: any = (
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
