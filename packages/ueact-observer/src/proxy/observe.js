// @flow

import {
  dispatch,
  dispatchTree,
  isArray,
  isObserveX,
  isRecrusive,
  objTree
} from '../shared/symbols';
import { enhance } from '../shared/enhance';

/**
 * Proxy Handler 通过 Proxy 设置某个对象的属性，若该属性值为对象则递归监控该对象
 * @type {Object}
 */
export const ProxyHandler = {
  set(target: ?Object, property: string, value: any) {
    if (!target) {
      throw new Error('Target is not valid!');
    }

    // 暂存旧值
    let oldValue = target[property];

    // 过滤并没有发生变化的属性
    if (target[property] !== value) {
      // 判断该值是否为已监听值
      if (value === Object(value) && !value[isObserveX]) {
        // 如果尚未设置该值的监听，可能为初始设置或者新添加的属性
        target[property] = observe(value, {
          property,
          target,
          recursive: target[isRecrusive]
        });
      } else {
        // 该值已经被监听，则直接设置该值属性
        target[property] = value;
      }

      // 触发监听事件，判断预设参数判断是否需要递归监听
      if (target[isRecrusive]) {
        if (target[dispatchTree]) {
          target[dispatchTree](property, value, oldValue);
        }
      } else {
        if (target[dispatch]) {
          target[dispatch](property, value, oldValue);
        }
      }
    }

    return true;
  }
};

/**
 * Description 将某个对象转化为可观测对象
 * @param   {*} obj - anything can be an observe-x Proxy
 * @param property 该 obj 挂载的父对象属性（根对象则为空）
 * @param parentObj 该 obj 从属的父对象
 * @param recursive 是否需要递归监听
 * @returns {Proxy}
 */
export default function observe(
  obj,
  { property = null, parentObj = null, recursive = false }: ObserveParams = {}
) {
  // 如果存在父属性与父对象，则设置
  if (property && parentObj) {
    objTree.set(obj, {
      property,
      parentObj
    });
  }

  // 重新映射值与方法，这里对于数组进行了额外处理
  if (Array.isArray(obj)) {
    obj[isArray] = true;
    // 重新映射数组初始值
    obj.forEach(function(item, i) {
      obj[i] = null; // 强制重置

      // 这里为了避免数组中存在对象值，因此依次对于数组中的对象进行设置操作
      // 数组可以看做属性为下标的对象
      ProxyHandler.set(obj, i, item);
    });
  }

  return new Proxy(
    enhance(obj || {}, { property, parentObj, recursive }),
    Object.create(ProxyHandler)
  );
}
