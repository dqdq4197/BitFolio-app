
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
      '200': 'rgb(255, 255, 255)',
      '300': 'rgb(233, 236, 239)',
      '400': 'rgb(134, 142, 150)'
    },
  },
  colors: {
    ...pallete,
  },
  size: {
    font_xxxl: '48px',
    font_xxl: '32px',
    font_xl: '24px',
    font_l: '20px',
    font_ml: '16px',
    font_m: '14px',
    font_s: '12px',
    font_xs: '10px'
  },
  content: {
    spacing: '16px'
  },
  border: {
    's': '3px',
    'm': '6px',
    'ml': '12px',
    'xl': '20px',
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
      '200': 'rgb(0,0,0.96)',
      '300': 'rgb(233, 236, 239)',
      '400': 'rgb(134, 142, 150)'
    }
  },
  colors: {
    ...pallete
  },
  size: {
    font_xxxl: '48px',
    font_xxl: '32px',
    font_xl: '24px',
    font_l: '20px',
    font_ml: '16px',
    font_m: '14px',
    font_s: '12px',
    font_xs: '10px'
  },
  content: {
    spacing: '16px'
  },
  border: {
    's': '3px',
    'm': '6px',
    'ml': '12px',
    'xl': '20px',
  }
}

