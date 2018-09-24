import * as React from 'react';

export type ResizableBoxDirection =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft'
  | 'topLeft';

export interface ResizableBoxState {
  width: number | string;
  height: number | string;
  direction?: ResizableBoxDirection;
  original?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  isResizing?: boolean;
  resizeCursor: string;
}

export type NumberSize = {
  width: number;
  height: number;
};

export type Size = {
  width: string | number;
  height: string | number;
};

export type CSSSize = {
  width: string;
  height: string;
};

export type HandleComponent = {
  top?: React.ReactNode;
  right?: React.ReactNode;
  bottom?: React.ReactNode;
  left?: React.ReactNode;
  topRight?: React.ReactNode;
  bottomRight?: React.ReactNode;
  bottomLeft?: React.ReactNode;
  topLeft?: React.ReactNode;
};

export type ResizeCallback = (
  event: MouseEvent | TouchEvent,
  direction: ResizableBoxDirection,
  elementRef: HTMLDivElement,
  delta: NumberSize
) => void;

export type ResizeStartCallback = (
  e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  dir: ResizableBoxDirection,
  elementRef: HTMLDivElement,
  delta: NumberSize
) => void;

export interface ResizableBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  onResizeStart?: ResizeStartCallback;
  onResize?: ResizeCallback;
  onResizeStop?: ResizeCallback;
  style?: React.CSSProperties;
  handleStyles?: {
    top?: React.CSSProperties;
    right?: React.CSSProperties;
    bottom?: React.CSSProperties;
    left?: React.CSSProperties;
    topRight?: React.CSSProperties;
    bottomRight?: React.CSSProperties;
    bottomLeft?: React.CSSProperties;
    topLeft?: React.CSSProperties;
  };
  handleClasses?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    topRight?: string;
    bottomRight?: string;
    bottomLeft?: string;
    topLeft?: string;
  };
  enable?: {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
    topRight?: boolean;
    bottomRight?: boolean;
    bottomLeft?: boolean;
    topLeft?: boolean;
  };
  className?: string;
  defaultSize?: {
    width?: string | number;
    height?: string | number;
  };
  size?: {
    width?: string | number;
    height?: string | number;
  };
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  grid?: number[];
  snap?: {
    x?: number[];
    y?: number[];
  };
  bounds?: 'parent' | 'window' | HTMLElement;
  lockAspectRatio?: boolean | number;
  lockAspectRatioExtraWidth?: number;
  lockAspectRatioExtraHeight?: number;
  handleWrapperStyle?: React.CSSProperties;
  handleWrapperClass?: string;
  handleComponent?: HandleComponent;
}

export default class ResizableBox extends React.Component<ResizableBoxProps, ResizableBoxState> {
  ResizableBox: HTMLElement;

  size: {
    width: number;
    height: number;
  };

  updateSize({ width, height }: Size): void;
}
