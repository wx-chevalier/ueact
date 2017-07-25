// @flow
import {
  createElementByTag,
  getEventListeners,
  getHTMLProps,
  getStyleProps,
  setAttribute
} from '../element/element-utils';
import flatten from 'ramda/src/flatten';
import classNames from 'classnames';
import type { propsType } from '../../../types/flow/types';

/**
 * Description 从 JSX 中构建虚拟 DOM
 * @param tagName
 * @param props
 * @param childrenArgs
 */
export function createElement(
  tagName: string,
  props: propsType,
  ...childrenArgs: [any]
) {
  // 保证属性非空指针
  props = props || {};

  // 处理所有子元素，如果子元素为单纯的字符串，则直接创建文本节点
  const children = flatten(childrenArgs).map(child => {
    // 如果子元素同样为 Element，则创建该子元素的副本
    if (child instanceof HTMLElement) {
      return child;
    }

    if (typeof child === 'boolean' || child === null) {
      child = '';
    }

    return document.createTextNode(child);
  });

  // 从标签中创建元素
  const el = createElementByTag(tagName);

  // 同时支持 class 与 className 设置
  const className = props.class || props.className;

  // 如果存在样式类，则设置
  if (className) {
    setAttribute(tagName, el, 'class', classNames(className));
  }

  // 解析行内样式
  getStyleProps(props).forEach(prop => {
    el.style.setProperty(prop.name, prop.value);
  });

  // 解析其他 HTML 属性
  getHTMLProps(props).forEach(prop => {
    setAttribute(tagName, el, prop.name, prop.value);
  });

  // 设置事件监听，这里为了解决部分浏览器中异步问题因此采用同步写法
  let events = getEventListeners(props);

  for (let event of events) {
    el[event.name] = event.listener;
  }

  // 设置 HTML
  const setHTML = props.dangerouslySetInnerHTML;

  // 如果是手动设置 HTML，则添加 HTML，否则设置显示子元素
  if (setHTML && setHTML.__html) {
    el.innerHTML = setHTML.__html;
  } else {
    children.forEach(child => {
      el.appendChild(child);
    });
  }

  return el;
}

// 为 createElement 取个别名，方便引用
export const createElementAlias = createElement;