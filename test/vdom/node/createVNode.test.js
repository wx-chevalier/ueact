// @flow
const debug = require('debug')('vnode');

import { createVNode } from '../../../src/isomorphic/vdom/node/createVNode';
import { shuffle } from '../../../src/shared/ds/array';

let NameLabel = props =>
  <span className="name">
    {props.name}
  </span>;

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

let oldNode = (
  <div>
    <div className="header">
      <span className="id">ID</span>
      <span className="name" style={{ color: 'red' }}>
        Name
      </span>
    </div>
    {data.map(({ id, name }) => {
      return (
        <div key={id}>
          <span>
            {id}
          </span>
          <span>
            {name}
          </span>
        </div>
      );
    })}
  </div>
);

let newNode = (
  <div>
    <div className="header2">
      <span className="id">NewID</span>
      <span className="name">Name</span>
    </div>
    {shuffle(data).map(({ id, name }) => {
      return (
        <div key={id}>
          <span>
            {id}
          </span>
          <span>
            {name}
          </span>
        </div>
      );
    })}
  </div>
);

debug(oldNode);
