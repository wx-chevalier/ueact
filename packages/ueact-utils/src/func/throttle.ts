/**
 * Ensure a function is called only once.
 */
export function once(fn: Function): Function {
  let called = false;
  return function(this: any) {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

/**
 * limits your function to be called at most every W milliseconds, where W is wait.
 * Calls over W get dropped.
 * Thanks to Pat Migliaccio.
 * see https://medium.com/@pat_migliaccio/rate-limiting-throttling-consecutive-function-calls-with-queues-4c9de7106acc
 * @param fn
 * @param wait
 * @example let throttledFunc = throttle(myFunc,500);
 */
export function throttle(fn: Function, wait: number) {
  let isCalled = false;

  return function(...args: any[]) {
    if (!isCalled) {
      fn(...args);
      isCalled = true;
      setTimeout(function() {
        isCalled = false;
      }, wait);
    }
  };
}
/**
 * limits your function to be called at most every W milliseconds, where W is wait.
 * Calls to your func that happen more often than W get queued up to be called later.
 * @param fn
 * @param wait
 */
export function throttleAndQueue(fn: Function, wait: number) {
  let isCalled = false;
  let callQueue: Function[] = [];

  let caller = function() {
    if (callQueue && callQueue.length && !isCalled) {
      isCalled = true;
      const callable = callQueue.shift();

      if (callable) {
        callable();
      }

      setTimeout(function() {
        isCalled = false;
        caller();
      }, wait);
    }
  };

  return function(this: any, ...args: any[]) {
    callQueue.push(fn.bind(this, ...args));

    caller();
  };
}
