/**
 * Convert a value to a string that is actually rendered.
 */
export function toString(val: any): string {
  return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val);
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
export function toNumber(val: string): number | string {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
export function makeMap(str: string, expectsLowerCase?: boolean): (key: string) => true | void {
  const map = Object.create(null);
  const list: Array<string> = str.split(',');
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? val => map[val.toLowerCase()] : val => map[val];
}

/**
 * Check if a tag is a built-in tag.
 */
export const isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
export const isReservedAttribute = makeMap('key,ref,slot,is');

/**
 * Remove an item from an array
 */
export function remove(arr: Array<any>, item: any): Array<any> | void {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

/**
 * Check whether the object has the property.
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj: Object | Array<any>, key: string): boolean {
  return hasOwnProperty.call(obj, key);
}

/**
 * Create a cached version of a pure function.
 */
export const cached = (fn: Function) => {
  //1
  let cache = {}; // 2
  return (...args: any[]) => {
    //3
    let stringifiedArgs = JSON.stringify(args); //4
    let result = (cache[stringifiedArgs] = cache[stringifiedArgs] || fn(...args)); //5
    return result; //6
  };
};
/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g;
export const camelize = cached((str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
});

/**
 * Capitalize a string.
 */
export const capitalize = cached((str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /([^-])([A-Z])/g;
export const hyphenate = cached((str: string): string => {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase();
});

/**
 * Simple bind, faster than native
 */
export function bind(fn: Function, ctx: Object): Function {
  function boundFn(a: any) {
    const l: number = arguments.length;
    return l ? (l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a)) : fn.call(ctx);
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn;
}

/**
 * Mix properties into target object.
 */
export function extend(to: Object, _from?: Object): Object {
  for (const key in _from) {
    to[key] = _from[key];
  }
  return to;
}

export function objectWithoutProperties<T, K extends keyof T>(obj: T, exclude: K[]) {
  // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
  const target = {} as Pick<T, Exclude<keyof T, K>>;
  for (const k in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, k) &&
      // @ts-ignore
      exclude.indexOf(k) === -1
    ) {
      // @ts-ignore
      target[k] = obj[k];
    }
  }
  return target;
}

/**
 * Merge an Array of Objects into a single Object.
 */
export function toObject(arr: Array<any>): Object {
  const res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}
