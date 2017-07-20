// @flow

import { isSVG } from './svg';
import omit  from 'ramda/src/omit';

export const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

/**
 * Description 复制某个节点
 * @param node
 * @return {Node}
 */
export const cloneNode = node => {
  const clone = node.cloneNode(true);

  // 注意，这里就是需要遍历原型链上所有属性
  for (let key in node) {
    if (key.indexOf('on') === 0 && typeof node[key] === 'function') {
      clone[key] = node[key];
    }
  }

  return clone;
};

/**
 * Description 构建元素
 * @param tagName
 * @return {Element}
 */
export const createDOMElementByTag = (tagName: string) => {
  if (isSVG(tagName)) {
    return document.createElementNS('http://www.w3.org/2000/svg', tagName);
  }

  return document.createElement(tagName);
};

/**
 * Description 设置标签属性
 * @param tagName
 * @param el
 * @param name
 * @param value
 */
export const setAttribute = (tagName, el, name, value) => {
  if (isSVG(tagName)) {
    el.setAttribute(name, value);
  } else {
    el.setAttributeNS(null, name, value);
  }
};

/**
 * Description 设置元素对象的属性值
 * @param node
 * @param name
 * @param value
 */
export function setProperty(node, name, value) {
  try {
    node[name] = value;
  } catch (e) {}
}

/**
 * Description 获取元素的行内样式
 * @param props
 * @return {Array}
 */
export const getStyleProps = (props: propsType) => {
  let styleObject = {};

  if (!props.style) {
    return [];
  } else if (typeof props.style === 'string') {
    styleObject = _convertStyleStringToObject(props.style);
  } else {
    styleObject = props.style;
  }

  // 对原始输入的样式对象进行修正
  return Object.keys(styleObject).map(name => {
    let value = styleObject[name];

    if (typeof value === 'number' && !IS_NON_DIMENSIONAL.test(name)) {
      value += 'px';
    }

    return { name, value };
  });
};

/**
 * Description 将样式字符串转化为样式对象
 * @param styleStr
 * @return {{}}
 * @private
 */
function _convertStyleStringToObject(styleStr: string) {
  let result = {},
    attributes = styleStr.split(';');

  for (let i = 0; i < attributes.length; i++) {
    let entry = attributes[i].split(':');

    let key = entry.splice(0, 1)[0];
    let value = entry.join(':');

    if (key && value) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Description 设置行内样式
 * @param props
 * @return {Array}
 */
export const getHTMLProps = (props: propsType) => {
  const allProps = omit(
    ['class', 'className', 'style', 'key', 'dangerouslySetInnerHTML'],
    props
  );

  return Object.keys(allProps)
    .filter(name => name.indexOf('on') !== 0)
    .map(name => ({
      name,
      value: props[name]
    }));
};

/**
 * Description 获取事件监听
 * @param props
 * @return {Array}
 */
export const getEventListeners = (props: propsType) => {
  return Object.keys(props)
    .filter(name => name.indexOf('on') === 0)
    .map(name => {
      return {
        name: name.toLowerCase(),
        eventName: name.toLowerCase().substr(2, name.length - 2),
        listener: props[name]
      };
    });
};
