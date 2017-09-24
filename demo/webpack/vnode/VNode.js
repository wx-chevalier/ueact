// @flow
import { createVNode } from '../../../src/isomorphic/vdom/node/createVNode';

import { diff } from '../../../src/isomorphic/vdom/diff/diff';
import patch from '../../../src/isomorphic/vdom/patch/patch-dom';
import { shuffle } from '../../../src/shared/ds/array';
import {renderVNode} from "../../../src/platform/dom/render";

const data = [
  {
    id: 0,
    name: 'Name1'
  },
  {
    id: 1,
    name: 'Name2'
  },
  {
    id: 2,
    name: 'Name3'
  }
];

let handleClick = () => {
  // ensure `patches` is minimum
  let patches = diff(oldNode, newNode);

  let newEl = patch(el, patches);

  console.log(newEl);
};

let Item = ({ id, name }) =>
  <div key={id}>
    <span>
      {id}
    </span>
    <span>
      {name}
    </span>
  </div>;

let oldNode = (
  <div>
    <button onClick={handleClick}>点击执行 diff & patch</button>
    <div className="header">
      <span className="id">ID</span>
      <span className="name" style={{ color: 'red' }}>
        Name
      </span>
    </div>
    {data.map(({ id, name }) => Item({ id, name }))}
  </div>
);

let newNode = (
  <section style={{ color: 'blue' }}>
    <div className="header2">
      <span className="id">NewID</span>
      <span className="name">Name</span>
    </div>
    {shuffle(data).map(({ id, name }) => Item({ id, name }))}
  </section>
);

let el = renderVNode(oldNode);

export default el;
