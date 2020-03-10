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

export function assign<T, S>(tar: T, src: S): T & S {
  // @ts-ignore
  for (const k in src) tar[k] = src[k];
  return tar as T & S;
}

export function run(fn: Function) {
  return fn();
}

export function runAll(fns: Function[]) {
  fns.forEach(run);
}
