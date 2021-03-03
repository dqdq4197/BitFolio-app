
import { DefaultTheme } from 'styled-components/native';
import { pallete } from './pallete';

export const darkTheme: DefaultTheme = {
  dark: true,
  base: {
    background: {
      '100': '#100F10',
      '200': '#1B1B1B',
      '300': '#242424',
    },
    text: {
      '100': 'white',
      '200': 'rgba(0,0,0.96)',
      '300': 'rgb(233, 236, 239)',
      '400': 'rgb(134, 142, 150)'
    },
  },
  colors: {
    ...pallete,
  },
  size: {
    font_xxxl: 48,
    font_xxl: 32,
    font_xl: 24,
    font_l: 20,
    font_ml: 16,
    font_m: 14,
    font_s: 12,
    font_xs: 10
  },
  content: {
    padding: '20px'
  }
}

export const lightTheme: DefaultTheme = {
  dark: false,
  base: {
    background: {
      '100': '#100F10',
      '200': '#1B1B1B',
      '300': '#242424',
    },
    text: {
      '100': 'white',
      '200': 'rgba(0,0,0.96)',
      '300': 'rgb(233, 236, 239)',
      '400': 'rgb(134, 142, 150)'
    }
  },
  colors: {
    ...pallete
  },
  size: {
    font_xxxl: 48,
    font_xxl: 32,
    font_xl: 24,
    font_l: 20,
    font_ml: 16,
    font_m: 14,
    font_s: 12,
    font_xs: 10
  },
  content: {
    padding: '16px'
  }
}

