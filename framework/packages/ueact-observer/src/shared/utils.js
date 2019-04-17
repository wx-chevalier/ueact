// @flow

/**
 * 定义某个私有属性
 * @param   {*} obj - receiver
 * @param   {String} key - property name
 * @param   {*} value - value to set
 */
export function definePrivateProp(obj: any, key: string, value: any): void {
  Object.defineProperty(obj, key, {
    value,
    enumerable: false,
    configurable: false,
    writable: false
  });
}
