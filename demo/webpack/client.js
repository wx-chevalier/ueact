// @flow

import { createVNode } from '../../src/vdom/node/createVNode';
import ReactiveHelloWorld from './component/ReactiveHelloWorld';
import render from '../../src/mvvm/render';

render(<ReactiveHelloWorld />, document.querySelector('#root'));
