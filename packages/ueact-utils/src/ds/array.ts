import { chunk } from 'lodash';

/**
 * Check is Array and contains some elements
 * @param arrayLike
 */
export function isValidArray(arrayLike: any) {
  return Array.isArray(arrayLike) && arrayLike.length > 0;
}

/**
 * 将数据扁平化
 * @param list
 */
export const flatten = (list: Array<any>): Array<any> =>
  list.reduce((a: any, b: any) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
export function shuffle(a: Array<any>) {
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

/** 将数组转化为 Map */
export function groupByDistinctly(arr: any[], key: string | number) {
  const map = {};

  arr.forEach(a => {
    map[a[key]] = a;
  });

  return map;
}

/** 分组并且填充 */
export function chunkWithFill(array: any[], size: number, fillObj: any): any[][] {
  const chunkedArray = chunk(array, size);
  const lastChunk = chunkedArray[chunkedArray.length - 1];

  if (fillObj !== undefined && lastChunk.length < size) {
    lastChunk.push(
      ...Array.from({
        length: size - lastChunk.length
      }).map(() => fillObj)
    );
  }

  return chunkedArray;
}

/** 添加或删除 */
export function addOrRemove(arr: any[], obj: any) {
  if (!arr || !Array.isArray(arr)) {
    return arr;
  }

  // 存在则删除
  if (arr.indexOf(obj) > -1) {
    return arr.filter(a => a !== obj);
  }

  return [...arr, obj];
}

/** 插入到某个数组中 */
export const insertArray = (arr: any[], index: number, newItem: any) => [
  ...arr.slice(0, index),

  newItem,

  ...arr.slice(index)
];
