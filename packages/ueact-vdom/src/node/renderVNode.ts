import { noop } from 'ueact-utils';

export let renderVNode: Function = noop;

export function set_renderVNode(_renderVNode: Function) {
  renderVNode = _renderVNode;
}
