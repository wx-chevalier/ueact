/** 创建元素 */
export function element<K extends keyof HTMLElementTagNameMap>(name: K) {
  return document.createElement<K>(name);
}

export function svg_element<K extends keyof SVGElementTagNameMap>(name: K): SVGElement {
  return document.createElementNS<K>('http://www.w3.org/2000/svg', name);
}
