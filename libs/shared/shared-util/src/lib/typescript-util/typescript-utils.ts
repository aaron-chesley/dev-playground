export type Methods<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

export type Serialized<T> = Omit<T, Methods<T>>;
