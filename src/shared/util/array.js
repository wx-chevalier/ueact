// @flow

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
export function shuffle(a: Array) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
}

/**
 * Description 将 arguments 等类似于数组的对象转化为数组
 * @param listLike
 * @return {Array}
 */
export function toArray(listLike: any) {
  if (!listLike) {
    return [];
  }

  let list = [];

  for (let i = 0, len = listLike.length; i < len; i++) {
    list.push(listLike[i]);
  }

  return list;
}

export const toArrayAlias = toArray;
