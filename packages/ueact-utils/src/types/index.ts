export type DeepPartial<T> = {
  [key in keyof T]?: DeepPartial<T[key]>;
};

export type Type<T> = new (...args: unknown[]) => T;
