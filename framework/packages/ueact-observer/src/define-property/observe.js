// @flow

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

}
