import { element } from '../element';

describe('create', () => {
  it('element', () => {
    const $a = element('a');
    expect($a.tagName).toEqual('A');
  });
});
