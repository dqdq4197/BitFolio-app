import 'styled-components/native'

declare module 'styled-components/native' {
  export interface DefaultTheme {
    dark: boolean
    base: {
      background: {
        '100': string
        '200': string
        '300': string
        '400': string
        '500': string
        surface: string
        hovered: string
      }
      text: {
        '100': string
        '200': string
        '300': string
        '400': string
      }
      primaryColor: string
      secondPrimaryColor: string
      light100: string
      dark100: string
      error: string
      upColor: string
      downColor: string
      removeColor: string
      underlayColor: {
        '100': string
        '200': string
      }
    }
    size: {
      font_xxxl: string
      font_xxl: string
      font_xl: string
      font_x: string
      font_l: string
      font_ml: string
      font_m: string
      font_s: string
      font_xs: string
    }
    colors: PalleteType
    pallete: Pallete
    content: {
      spacing: string
      blankSpacing: string
      surfacePadding: string
    }
    border: {
      s: string
      m: string
      l: string
      ml: string
      xl: string
    }
    zIndex: {
      speedDial: number
      drawer: number
      modal: number
      snackbar: number
      tooltip: number
    }
  }
}

type Step = Record<'light' | 'main' | 'dark', string>
type Pallete = Record<'error' | 'warning' | 'info' | 'success', Step>

interface PalleteType {
  red: Amber
  pink: Amber
  purple: Amber
  deepPurple: Amber
  indigo: Amber
  blue: Amber
  lightBlue: Amber
  cyan: Amber
  teal: Amber
  green: Amber
  lightGreen: Amber
  lime: Amber
  yellow: Amber
  amber: Amber
  orange: Amber
  deepOrange: Amber
  brown: { [key: string]: string }
  grey: { [key: string]: string }
  blueGrey: { [key: string]: string }
}

export interface Amber {
  '50': string
  '100': string
  '200': string
  '300': string
  '400': string
  '500': string
  '600': string
  '700': string
  '800': string
  '900': string
  a100: string
  a200: string
  a400: string
  a700: string
}
