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
