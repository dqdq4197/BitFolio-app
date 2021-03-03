import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    dark: boolean,
    base: {
      background: {
        '100': string,
        '200': string,
        '300': string,
      },
      text: {
        '100': string,
        '200': string,
        '300': string,
        '400': string
      }
    },
    size: {
      font_xxxl: number,
      font_xxl: number,
      font_xl: number,
      font_l: number,
      font_ml: number,
      font_m: number,
      font_s: number,
      font_xs: number
    },
    colors: ColorsType,
    content: {
      padding: string,
    }
  }
}

interface ColorsType extends PalleteType {}
interface PalleteType {
  red:        Amber;
  pink:       Amber;
  purple:     Amber;
  deepPurple: Amber;
  indigo:     Amber;
  blue:       Amber;
  lightBlue:  Amber;
  cyan:       Amber;
  teal:       Amber;
  green:      Amber;
  lightGreen: Amber;
  lime:       Amber;
  yellow:     Amber;
  amber:      Amber;
  orange:     Amber;
  deepOrange: Amber;
  brown:      { [key: string]: string };
  grey:       { [key: string]: string };
  blueGrey:   { [key: string]: string };
}

export interface Amber {
  "50":  string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
  a100:  string;
  a200:  string;
  a400:  string;
  a700:  string;
}