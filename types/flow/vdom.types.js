// @flow

import VNode from '../../src/isomorphic/vdom/node/VNode';
import Component from '../../src/isomorphic/component/classic/Component';

export type NodeNameType = String | Function | Component;

export type DiffListMove = {
  index: number,
  // type 0 is removing, type 1 is inserting
  type: 0 | 1,
  item?: VNode
};

export type HostParentType = {
  parent: HTMLElement,
  predecessor: undefined | null | HTMLElement
};
