

declare module 'base-types' {
  export namespace baseTypes { 
    type Theme = "light" | "dark" | null | undefined;
    type Currency = 'krw' | 'usd' | 'eur';
    type Language = 'ko' | 'en';
    type ChartTimeFrame = 1 | 7 | 30 | 365 | 'max';
  } 
}
