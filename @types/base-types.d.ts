declare module 'base-types' {
  export namespace baseTypes {
    type Theme = 'light' | 'dark' | 'default' | null | undefined;
    type Currency = 'krw' | 'usd' | 'eur';
    type Language = 'ko' | 'en' | 'default';
    type ChartTimeFrame = 1 | 7 | 30 | 365 | 'max';
    type Exchange = 'globalAverage' | 'upbit' | 'binance';
  }

  export namespace chartType {
    type changeStatus = 'RISE' | 'EVEN' | 'FALL';
  }
}

declare module 'mapped-types' {
  export type Merge<A, B> = ({ [K in keyof A]: K extends keyof B ? B[K] : A[K] } &
    B) extends infer O
    ? { [K in keyof O]: O[K] }
    : never;

  export type ModifyPartial<T, U> = Omit<T, keyof U> & Partial<U>;
}
