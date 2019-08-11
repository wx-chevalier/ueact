import { inBrowser, isNative, isIOS } from '../env';
import { handleError, noop } from '.';
import { now } from './utils';

/** 异步调用某个函数的简单实现，这里混用了 MicroTask 与 MacroTask
 *	@param {Function} callback
 */
export const defer =
  typeof Promise === 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

export let raf = inBrowser ? (cb: FrameRequestCallback) => requestAnimationFrame(cb) : noop;

/** 使用 MicroTask 来异步执行批次任务 */
export const nextTick = (function() {
  // 需要执行的回调列表
  const callbacks: Function[] = [];

  // 是否处于挂起状态
  let pending = false;

  // 时间函数句柄
  let timerFunc: Function;

  // 执行并且清空所有的回调列表
  function nextTickHandler() {
    pending = false;
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // nextTick 的回调会被加入到 MicroTask 队列中，这里我们主要通过原生的 Promise 与 MutationObserver 实现
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    let p = Promise.resolve();
    let logError = (err: Error) => {
      console.error(err);
    };
    timerFunc = () => {
      p.then(nextTickHandler).catch(logError);

      // 在部分 iOS 系统下的 UIWebViews 中，Promise.then 可能并不会被清空，因此我们需要添加额外操作以触发
      if (isIOS) setTimeout(noop);
    };
  } else if (
    typeof MutationObserver !== 'undefined' &&
    (isNative(MutationObserver) ||
      // PhantomJS and iOS 7.x
      MutationObserver.toString() === '[object MutationObserverConstructor]')
  ) {
    // 当 Promise 不可用时候使用 MutationObserver
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    let counter = 1;
    let observer = new MutationObserver(nextTickHandler);
    let textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = () => {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // 如果都不存在，则回退使用 setTimeout
    /* istanbul ignore next */
    timerFunc = () => {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick(cb?: Function, ctx?: Object): void | Promise<any> {
    let _resolve: Function;
    callbacks.push(() => {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });

    if (!pending) {
      pending = true;
      timerFunc();
    }

    // 如果没有传入回调，则表示以异步方式调用
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => {
        _resolve = resolve;
      });
    }
  };
})();

export interface Task {
  abort(): void;
  promise: Promise<void>;
}

const tasks = new Set<[Function, Function]>();
let running = false;

function run_tasks() {
  tasks.forEach(task => {
    if (!task[0](now())) {
      tasks.delete(task);
      task[1]();
    }
  });

  running = tasks.size > 0;
  if (running) raf(run_tasks);
}

export function clear_loops() {
  // for testing...
  tasks.forEach(task => tasks.delete(task));
  running = false;
}

export function loop(fn: (num: number) => void): Task {
  let task: [Function, Function];

  if (!running) {
    running = true;
    raf(run_tasks);
  }

  return {
    promise: new Promise<void>(fulfil => {
      tasks.add((task = [fn, fulfil]));
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
