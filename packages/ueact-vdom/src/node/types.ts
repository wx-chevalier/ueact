import { VNode } from './VNode';

/** 虚拟节点的类型标记 */
export const VNodeFlags = {
  Text: 1,
  HtmlElement: 1 << 1,

  ComponentClass: 1 << 2,
  ComponentFunction: 1 << 3,
  ComponentUnknown: 1 << 4,

  HasKeyedChildren: 1 << 5,
  HasNonKeyedChildren: 1 << 6,

  SvgElement: 1 << 7,
  MediaElement: 1 << 8,
  InputElement: 1 << 9,
  TextareaElement: 1 << 10,
  SelectElement: 1 << 11,
  Void: 1 << 12,

  FormElement: 0,
  Element: 0,
  Component: 0
};

VNodeFlags.FormElement =
  VNodeFlags.InputElement | VNodeFlags.TextareaElement | VNodeFlags.SelectElement;

VNodeFlags.Element =
  VNodeFlags.HtmlElement |
  VNodeFlags.SvgElement |
  VNodeFlags.MediaElement |
  VNodeFlags.InputElement |
  VNodeFlags.TextareaElement |
  VNodeFlags.SelectElement;

VNodeFlags.Component =
  VNodeFlags.ComponentFunction | VNodeFlags.ComponentClass | VNodeFlags.ComponentUnknown;

export interface VNodePropsType {
  key: string;
  style?: Object;
  class?: string;
  className?: string;
  dangerouslySetInnerHTML?: string;
}

export type VNodeType = VNode | string;

export type VNodeTagType = keyof HTMLElementTagNameMap;
