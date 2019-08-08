// @flow

export const // 所有的监听函数
  listeners = new WeakMap(),
  // 某个对象的父对象
  objTree = new Map(),
  // 分发消息到当前对象的监听函数
  dispatch = Symbol(),
  // 分发消息到当前对象所在的对象树中的监听函数
  dispatchTree = Symbol(),
  // 判断是否为 observer-x 对象
  isObserveX = Symbol(),
  // 判断是否需要递归调用监听函数
  isRecrusive = Symbol,
  // 判断是否为数组
  isArray = Symbol(),
  // 定时器对象
  timer = Symbol(),
  // 存放该对象的修改
  changes = Symbol();
