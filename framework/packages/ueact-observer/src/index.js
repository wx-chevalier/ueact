// @flow
import './polyfill/setImmediate';
import _observeProxy from './proxy/observe';

// 判断是否可以使用 Proxy
const hasProxy =
  typeof Proxy !== 'undefined' && Proxy.toString().match(/native code/);

if(hasProxy){
  export const observe = _observeProxy;
}else {
  export const observe = _observeProxy;
}
