import dayjs, { Dayjs } from 'dayjs';

import { paddingLeftZero } from './number';
import { inBrowser } from '../env';

export let now: () => number = inBrowser ? () => window.performance.now() : () => Date.now();

export type Dateable = string | number | Dayjs | undefined;

/**
 * @start Formatter
 */

/**
 * 获取两个日期间的 Duration
 * @param m1 日期较小值
 * @param m2 日期较大值
 * @param len number 可选参数，保留时间描述位数
 * @param strip boolean 可选参数，剩余时间
 */

export function formatDurationWithRange(
  m1: Dateable,
  m2: Dateable,
  options: { len?: number; strip?: boolean } = {}
) {
  if (!m1 || !m2) {
    return '-';
  }

  return formatDuration(dayjs(m2).valueOf() - dayjs(m1).valueOf(), options);
}

const MILLISECONDS_SECOND = 1000;
const MILLISECONDS_MINUTE = MILLISECONDS_SECOND * 60;
const MILLISECONDS_HOUR = MILLISECONDS_MINUTE * 60;
const MILLISECONDS_DAY = MILLISECONDS_HOUR * 24;

/**
 * 格式为数字时钟
 * @param duration
 */
export function formatDurationAsDigitalClock(
  // 这里的 duration 指的是毫秒
  duration: number
) {
  const hours = Math.floor(duration / MILLISECONDS_HOUR) || 0;
  const minutes = Math.floor((duration % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE) || 0;
  const seconds = Math.floor((duration % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND) || 0;

  return `${paddingLeftZero(hours)}:${paddingLeftZero(minutes)}:${paddingLeftZero(seconds)}`;
}

/**
 * 将某个时间差格式化展示为字符串
 */
export function formatDuration(
  // 这里的 duration 指的是毫秒
  duration: number,
  { len = 3, strip = false }: { len?: number; strip?: boolean } = {}
) {
  if (!duration) {
    return '-';
  }

  let str = '';

  let usedBit = 0;

  const days = Math.floor(duration / MILLISECONDS_DAY);
  const hours = Math.floor((duration % MILLISECONDS_DAY) / MILLISECONDS_HOUR);
  const minutes = Math.floor((duration % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE);
  const seconds = Math.floor((duration % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND);

  let du, hu, mu, su;

  if (navigator.language.indexOf('zh') > -1) {
    du = '天';
    hu = '时';
    mu = '分';
    su = '秒';
  } else {
    du = 'd';
    hu = 'h';
    mu = 'm';
    su = 's';
  }

  if (days !== 0 && usedBit < len) {
    str = `${days}${du}`;
    usedBit++;
  }

  if (hours !== 0 && usedBit < len) {
    str = `${str} ${hours}${hu}`;
    usedBit++;
  }

  if (minutes !== 0 && usedBit < len) {
    str = `${str} ${minutes}${mu}`;
    usedBit++;
  }

  if (seconds !== 0 && usedBit < len) {
    str = `${str} ${seconds}${su}`;
  }

  return strip ? str.replace(' ', '') : str;
}

/**
 * @end Formatter
 */
