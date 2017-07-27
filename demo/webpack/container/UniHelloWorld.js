// @flow

import { createVNode } from '../../../src/isomorphic/vdom/node/createVNode';
import UniComponent from '../../../src/library/unidirection/component/UniComponent';

const Label = ({ name }) =>
  <span>
    {name}
  </span>;

export default class UniHelloWorld extends UniComponent {
  render() {
    return (
      <div>
        Hello <Label name="World" />!
        <div>
          <Label name="王下邀月熊" />
        </div>
      </div>
    );
  }
}
