export function destroyEach(iterations: any, detaching: boolean) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i]) iterations[i].d(detaching);
  }
}

export function listen(
  node: Node,
  event: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions | EventListenerOptions
) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}

export function preventDefault(fn: Function) {
  return function(event: Event) {
    event.preventDefault();
    // @ts-ignore
    return fn.call(this, event);
  };
}

export function stopPropagation(fn: Function) {
  return function(event: Event) {
    event.stopPropagation();
    // @ts-ignore
    return fn.call(this, event);
  };
}

export function add_resize_listener(element: HTMLElement, fn: EventListenerOrEventListenerObject) {
  if (getComputedStyle(element).position === 'static') {
    element.style.position = 'relative';
  }

  const object = document.createElement('object');
  object.setAttribute(
    'style',
    'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;'
  );
  object.type = 'text/html';
  object.tabIndex = -1;

  let win: WindowProxy | null;

  object.onload = () => {
    win = object.contentDocument!.defaultView;
    win!.addEventListener('resize', fn);
  };

  if (/Trident/.test(navigator.userAgent)) {
    element.appendChild(object);
    object.data = 'about:blank';
  } else {
    object.data = 'about:blank';
    element.appendChild(object);
  }

  return {
    cancel: () => {
      win && win.removeEventListener && win.removeEventListener('resize', fn);
      element.removeChild(object);
    }
  };
}
