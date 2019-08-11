import { inBrowser } from './../env';

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
export function noop(...args: any[]) {}

/**
 * Always return false.
 */
export const no = (...args: any[]) => false;

/**
 * Return same value
 */
export const identity = (_: any) => _;

export let now: () => number = inBrowser ? () => window.performance.now() : () => Date.now();

export function assign<T, S>(tar: T, src: S): T & S {
  // @ts-ignore
  for (const k in src) tar[k] = src[k];
  return tar as T & S;
}

export function isPromise<T = any>(value: any): value is PromiseLike<T> {
  return value && typeof value === 'object' && typeof value.then === 'function';
}
