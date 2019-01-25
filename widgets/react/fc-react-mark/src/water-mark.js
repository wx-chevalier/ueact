/**
 * 水印基础类。
 *
 * 用法：
 *
 * ```js
 * const el = document.getElementById('watermark')
 *
 * const mark = new Mark(el, {
 *   text: 'Hello World',
 *   opacity: 0.05
 * })
 * ```
 *
 * 注意：在使用时，`el` 的直接父元素必须为“主要元素”，意即如果对此父元素进行样式修改，
 * 在影响水印显示的同时，页面的主要内容（或敏感内容）也须受到影响，不能正常显示。否则，
 * 如果 `el` 的父元素被删掉了、或者隐藏了，对页面敏感内容的显示不会产生任何影响，那么就没有意义了。
 *
 */

export default class Mark {
  /**
   * @param {DOM} el         - 目标 DOM 元素
   * @param {Object} options - 初始化的选项
   *   opitons.text {String}       - 水印文本
   *   opitons.opacity {Number}    - 文本的不透明度
   *
   */
  constructor(el, options = {}) {
    if (el && el.nodeType === 1) {
      this.el = el;
    } else {
      throw new Error('`el` must be a valid DOM element node!');
    }

    this.options = {
      text: '水印',
      opacity: 0.05,
      ...options
    };

    this.init();
  }

  init() {
    this.draw();
    this.observeDOM();
  }

  observeDOM() {
    const { el } = this;
    const parentEl = el.parentElement;

    const obs = new MutationObserver(mutations => {
      // When "Edit as HTML"(edit parent elements), `el` is removed from the document
      if (!document.contains(el)) {
        parentEl.appendChild(el);
      }

      const mutation = mutations[0];

      if (mutation.removedNodes.length) {
        if (mutation.removedNodes[0] === el) {
          parentEl.appendChild(el);
        }
      }

      if (
        mutation.target === el &&
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        if (el.className) el.className = '';
      }

      const nextStyle = { ...window.getComputedStyle(el) };

      if (nextStyle.height < this.style.height) {
        el.style.setProperty('height', 'auto', 'important');
      }
      if (nextStyle.width < this.style.width) {
        el.style.setProperty('width', 'auto', 'important');
      }

      const attributesChanged = shallowDiff(this.style, nextStyle);
      if (attributesChanged.length) {
        attributesChanged.forEach(k => {
          el.style.setProperty(k, this.style[k], 'important');
        });
      }
    });

    obs.observe(document, { childList: true, attributes: true, subtree: true });
  }

  draw() {
    const { text, opacity } = this.options;

    const { el } = this;
    const url = genImgDataURL(text, opacity);

    this.setAttrs({
      'background-image': `url(${url})`,
      'background-repeat': 'repeat',
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      display: 'block',
      visibility: 'visible',
      'z-index': '100000',
      'pointer-events': 'none'
    });

    this.style = { ...window.getComputedStyle(el) };
  }

  setAttrs(obj) {
    const { el } = this;
    Object.keys(obj).forEach(key => {
      el.style.setProperty(key, obj[key], 'important');
    });
  }
}

const genImgDataURL = memoize((text, opacity) => {
  const canvas = document.createElement('canvas');

  const context = canvas.getContext('2d');
  context.font = '14px Arial';
  const size = context.measureText(text);
  const width = Math.ceil(size.width) + 20;
  const height = 60;

  canvas.width = width;
  canvas.height = height;

  context.font = '14px Arial';
  context.fillStyle = `rgba(0,0,0,${opacity})`;

  context.translate(width / 2, height / 2);
  context.rotate(-(Math.PI / 180) * 15);
  context.translate(-width / 2, -height / 2);
  context.fillText(text, 0, height / 2);

  return canvas.toDataURL();
});

function memoize(func) {
  const memo = {};

  return function _memoize(...args) {
    const key = JSON.stringify(args);

    if (key in memo) {
      return memo[key];
    }
    memo[key] = func.apply(this, args);
    return memo[key];
  };
}

function shallowDiff(a, b) {
  const list = [
    'position',
    'display',
    'visibility',
    'top',
    'left',
    'right',
    'bottom',
    'opacity',
    'z-index',
    'background',
    'transform'
  ];

  const diff = [];

  Object.keys(a).forEach(k => {
    if (list.indexOf(k) !== -1 && a[k] !== b[k]) {
      diff.push(k);
    }
  });

  return diff;
}
