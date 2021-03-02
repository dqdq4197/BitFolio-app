
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
  content: {
    padding: '16px'
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
  content: {
    padding: '16px'
  }
}

