/**
 * Description 获取对象类型
 * @param obj
 */
export function type(obj: any) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
}

export function isFunction(maybaFunction: any) {
  return type(maybaFunction) === 'Function';
}
export const isFunctionAlias = isFunction;

/**
 * Description 判断传入的对象是否为字符串
 * @param maybeStr
 * @return {boolean}
 */
export function isString(maybeStr: any) {
  return type(maybeStr) === 'String';
}

export const isStringAlias = isString;

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
export function isUndef(v: any): boolean {
  return v === undefined || v === null;
}

export function isDef(v: any): boolean {
  return v !== undefined && v !== null;
}

export function isTrue(v: any): boolean {
  return v === true;
}

export function isFalse(v: any): boolean {
  return v === false;
}

/**
 * Check if value is primitive
 */
export function isPrimitive(value: any): boolean {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
}