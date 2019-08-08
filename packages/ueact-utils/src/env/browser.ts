// can we use __proto__?
export const hasProto = '__proto__' in {};

// Browser environment sniffing
export const inBrowser = typeof window !== 'undefined';
export const UA = inBrowser && window.navigator.userAgent.toLowerCase();
export const isIE = UA && /msie|trident/.test(UA);
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0;
export const isEdge = UA && UA.indexOf('edge/') > 0;
export const isAndroid = UA && UA.indexOf('android') > 0;
export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefix has a "watch" function on Object.prototype...
export const nativeWatch = ({} as any).watch;

export let supportsPassive = false;
if (inBrowser) {
  try {
    const opts = {};
    Object.defineProperty(opts, 'passive', {
      get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    });
    window.addEventListener('test-passive', null as any, opts);
  } catch (e) {}
}

declare global {
  interface Window {
    __VUE_DEVTOOLS_GLOBAL_HOOK__?: Function;
  }
}

// detect devtools
export const devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
