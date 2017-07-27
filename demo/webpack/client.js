// @flow

import { createVNode } from '../../src/isomorphic/vdom/node/createVNode';
import ReactiveHelloWorld from './container/ReactiveHelloWorld';
// import { renderUni } from '../../src/unidirection/render';
import UniHelloWorld from './container/UniHelloWorld';
import { renderVNode } from '../../src/platform/dom/render';
import VNode from './vnode/VNode';
import { renderUni } from '../../src/library/unidirection/render';

let el = document.querySelector('#root');

renderUni(
  <div>
    <UniHelloWorld />
  </div>,
  el
);
// el.appendChild(VNode);
