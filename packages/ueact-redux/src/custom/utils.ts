import { Store, Subscriber } from './types';

export function validateStore(store: Store<any>, name: string) {
  if (!store || typeof store.subscribe !== 'function') {
    throw new Error(`'${name}' is not a store with a 'subscribe' method`);
  }
}

export function subscribe(store: Store<any>, callback: Subscriber<any>) {
  return store.subscribe(callback);
}

export function getStoreValue(store: Store<any>) {
  let value;
  subscribe(store, (_: any) => (value = _))();
  return value;
}
