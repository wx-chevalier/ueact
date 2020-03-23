export const is = (x: any, y: any) => {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  }
  return x !== x && y !== y; // eslint-disable-line
};

export function isPromise<T = any>(value: any): value is PromiseLike<T> {
  return value && typeof value === 'object' && typeof value.then === 'function';
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
export function isObject(obj: any): boolean {
  return obj !== null && typeof obj === 'object';
}

const _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject(obj: any): boolean {
  return _toString.call(obj) === '[object Object]';
}

export function isRegExp(v: any): boolean {
  return _toString.call(v) === '[object RegExp]';
}

/**
 * Check is Array and contains some elements
 * @param arrayLike
 */
export function isValidArray(arrayLike: any) {
  return Array.isArray(arrayLike) && arrayLike.length > 0;
}

/**
 * Check if val is a valid array index.
 */
export function isValidArrayIndex(val: any): boolean {
  const n = parseFloat(val);
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

/** 如果数组有有效值且对象有值，则判断为有效 */
export function isValid(obj: any) {
  if (Array.isArray(obj)) {
    return isValidArray(obj);
  }

  // 处理 null, undefined
  if (!obj) {
    return false;
  }

  if (typeof obj === 'object') {
    return isValidArray(Object.keys(obj));
  }

  return true;
}
