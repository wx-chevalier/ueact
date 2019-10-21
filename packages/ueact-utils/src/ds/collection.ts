import { isValidArray } from './array';

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
