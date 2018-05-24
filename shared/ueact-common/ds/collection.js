// @flow

import { isNative } from '../env/compatibility';

let _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = class Set implements ISet {
    set: Object;
    constructor() {
      this.set = Object.create(null);
    }
    has(key: string | number) {
      return this.set[key] === true;
    }
    add(key: string | number) {
      this.set[key] = true;
    }
    clear() {
      this.set = Object.create(null);
    }
  };
}

interface ISet {
  has(key: string | number): boolean,
  add(key: string | number): mixed,
  clear(): void
}

export { _Set };
export type { ISet };
