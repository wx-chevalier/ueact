/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export function getRandomArbitrary(min = 0, max = 100, floatLength = 2): number {
  return Number((Math.random() * (max - min) + min).toFixed(floatLength));
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min = 0, max = 100) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** 格式化显示体积 */
export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/** 格式化百分比 */
export function formatPercent(percent: number) {
  return `${(percent * 100).toFixed(2)}%`;
}

// 左侧补全
export function paddingLeftZero(num: number) {
  if (num > 9) {
    return `${num}`;
  }

  return `0${num}`;
}
