

declare module 'base-types' {
  export namespace baseTypes { 
    type Theme = "light" | "dark" | "default" | null | undefined;
    type Currency = 'krw' | 'usd' | 'eur';
    type Language = 'ko' | 'en' | 'default';
    type ChartTimeFrame = 1 | 7 | 30 | 365 | 'max';
  }

  export namespace chartType {
    type percentageStatus = 'negative' | 'unchanged' | 'positive'
  }
}

declare module 'mapped-types' {
  export type Merge<A, B> = ({ [K in keyof A]: K extends keyof B ? B[K] : A[K] } &
    B) extends infer O
    ? { [K in keyof O]: O[K] }
    : never;
}