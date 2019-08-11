// https://github.com/sveltejs/svelte/blob/master/test/store/index.js
import {
  Subscriber,
  Unsubscriber,
  StartStopNotifier,
  Readable,
  Writable,
  SubscribeInvalidateTuple,
  Updater,
  Invalidator
} from './types';

import { runAll, noop, safeNotEqual, isFunction } from 'ueact-utils';

const subscriber_queue: any[] = [];

/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */
export function readable<T>(value: T, start: StartStopNotifier<T>): Readable<T> {
  return {
    subscribe: writable(value, start).subscribe
  };
}

/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
export function writable<T>(value: T, start: StartStopNotifier<T> = noop): Writable<T> {
  let stop: Unsubscriber | null;
  const subscribers: Array<SubscribeInvalidateTuple<T>> = [];

  function set(new_value: T): void {
    if (safeNotEqual(value, new_value)) {
      value = new_value;
      if (stop) {
        // store is ready
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s = subscribers[i];
          s[1]();
          subscriber_queue.push(s, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }

  function update(fn: Updater<T>): void {
    set(fn(value));
  }

  function subscribe(run: Subscriber<T>, invalidate: Invalidator<T> = noop): Unsubscriber {
    const subscriber: SubscribeInvalidateTuple<T> = [run, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run(value);

    return () => {
      const index = subscribers.indexOf(subscriber);
      if (index !== -1) {
        subscribers.splice(index, 1);
      }
      if (subscribers.length === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }

  return { set, update, subscribe };
}

/** One or more `Readable`s. */
type Stores = Readable<any> | [Readable<any>, ...Array<Readable<any>>];

/** One or more values from `Readable` stores. */
type StoresValues<T> = T extends Readable<infer U>
  ? U
  : { [K in keyof T]: T[K] extends Readable<infer U> ? U : never };

/**
 * Derived value store by synchronizing one or more readable stores and
 * applying an aggregation function over its input values.
 * @param {Stores} stores input stores
 * @param {function(Stores=, function(*)=):*}fn function callback that aggregates the values
 * @param {*=}initial_value when used asynchronously
 */
export function derived<T, S extends Stores>(
  stores: S,
  fn: (values: StoresValues<S>, set?: Subscriber<T>) => T | Unsubscriber | void,
  initial_value?: T
): Readable<T | undefined> {
  const single = !Array.isArray(stores);
  const stores_array: Array<Readable<any>> = single
    ? [stores as Readable<any>]
    : (stores as Array<Readable<any>>);

  const auto = fn.length < 2;

  return readable(initial_value, set => {
    let inited = false;
    const values: StoresValues<S> = [] as StoresValues<S>;

    let pending = 0;
    let cleanup = noop;

    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result as T);
      } else {
        cleanup = isFunction(result) ? (result as Unsubscriber) : noop;
      }
    };

    const unsubscribers = stores_array.map((store, i) =>
      store.subscribe(
        value => {
          values[i] = value;
          pending &= ~(1 << i);
          if (inited) {
            sync();
          }
        },
        () => {
          pending |= 1 << i;
        }
      )
    );

    inited = true;
    sync();

    return function stop() {
      runAll(unsubscribers);
      cleanup();
    };
  });
}
