// @flow

import VNode from "../../src/vdom/node/VNode";
export type DiffListMove = {
  index: number,
  // type 0 is removing, type 1 is inserting
  type: 0 | 1,
  item?: VNode
};
