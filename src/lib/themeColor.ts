
import { DefaultTheme } from 'styled-components/native';
import { pallete } from './pallete';

export const darkTheme: DefaultTheme = {
  dark: true,
  base: {
    background: {
      '100': '#000000',   // '#100F10',
      '200': '#1B1B1B',
      '300': '#242424',
      '400': '#616161',
      'surface': '#121212',
      'hovered': 'rgba(18, 18, 18, .96)', // #121212 + overlay 0.04
    },
    text: {
      '100': 'rgba(255, 255, 255, 0.87)',
      '200': 'rgba(255, 255, 255, 0.6)',
      '300': 'rgba(255, 255, 255, 0.38)',
      '400': 'rgb(134, 142, 150)'
    },
    primaryColor: '#344955',
    error: '#CF6679'
  },
  colors: {
    ...pallete,
  },
  size: {
    font_xxxl: '48px',
    font_xxl: '32px',
    font_xl: '24px',
    font_l: '18px',
    font_ml: '15px',
    font_m: '13px',
    font_s: '11px',
    font_xs: '10px'
  },
  content: {
    spacing: '16px',
    blankSpacing: '16px',
  },
  border: {
    's': '3px',
    'm': '6px',
    'l': '9px',
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
      '400': '#616161',
      'surface': 'rgb(18, 18, 18, 0.8)',
      'hovered': 'rgba(18, 18, 18, .96)'
    },
    text: {
      '100': '#FFFFFF',
      '200': 'rgb(0,0,0.96)',
      '300': 'rgb(233, 236, 239)',
      '400': 'rgb(134, 142, 150)'
    },
    primaryColor: '#34955',
    error: '#CF6679'
  },
  colors: {
    ...pallete
  },
  size: {
    font_xxxl: '48px',
    font_xxl: '32px',
    font_xl: '24px',
    font_l: '18px',
    font_ml: '15px',
    font_m: '13px',
    font_s: '11px',
    font_xs: '10px'
  },
  content: {
    spacing: '16px',
    blankSpacing: '16px',
  },
  border: {
    's': '3px',
    'm': '6px',
    'l': '9px',
    'ml': '12px',
    'xl': '20px',
  }
}

