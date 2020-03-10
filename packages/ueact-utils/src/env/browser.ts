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

/** 获得 Chrome 的版本号 */
export function getChromeVersion(): number | boolean {
  const arr = navigator.userAgent.split(' ');
  let chromeVersion = '';
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < arr.length; i++) {
    if (/chrome/i.test(arr[i])) chromeVersion = arr[i];
  }
  if (chromeVersion) {
    return Number(chromeVersion.split('/')[1].split('.')[0]);
  } else {
    return false;
  }
}

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
