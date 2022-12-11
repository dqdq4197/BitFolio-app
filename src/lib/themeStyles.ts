import { DefaultTheme } from 'styled-components/native';
import { pallete } from './pallete';

const commonStyle = {
  colors: {
    // 이후 제거 예정.
    ...pallete,
  },
  pallete: {
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
    },
    warning: {
      light: '#ffb74d',
      main: '#ffa726',
      dark: '#f57c00',
    },
    info: {
      light: '#4fc3f7',
      main: '#29b6f6',
      dark: '#0288d1',
    },
    success: {
      light: '#81c784',
      main: '#66bb6a',
      dark: '#388e3c',
    },
  },
  size: {
    font_xxxl: '48px',
    font_xxl: '32px',
    font_xl: '24px',
    font_x: '21px',
    font_l: '18px',
    font_ml: '15px',
    font_m: '13px',
    font_s: '11px',
    font_xs: '10px',
  },
  content: {
    spacing: '16px',
    blankSpacing: '16px',
    surfacePadding: '20px',
  },
  border: {
    s: '3px',
    m: '6px',
    l: '9px',
    ml: '12px',
    xl: '20px',
  },
  zIndex: {
    speedDial: 1050,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
};

export const darkTheme: DefaultTheme = {
  dark: true,
  base: {
    background: {
      '100': '#000000', // '#100F10',
      '200': '#1B1B1B',
      '300': '#242424',
      '400': '#323232',
      '500': '#525252',
      surface: '#121212',
      hovered: 'rgba(18, 18, 18, .96)', // #121212 + overlay 0.04
    },
    text: {
      '100': '#ffffffde',
      '200': 'rgba(255, 255, 255, 0.6)',
      '300': 'rgba(255, 255, 255, 0.38)',
      '400': 'rgb(134, 142, 150)',
    },
    primaryColor: '#3861fb',
    secondPrimaryColor: 'rgba(56, 97, 251,0.5)',
    light100: 'rgba(0, 0, 0, 0.96)',
    dark100: 'rgba(255, 255, 255, 0.87)',
    error: '#e23636',
    upColor: '#00e676',
    downColor: '#ea3943',
    removeColor: '#F85149',
    underlayColor: {
      '100': '#1B1B1B',
      '200': '',
    },
  },
  ...commonStyle,
};

export const lightTheme: DefaultTheme = {
  dark: false,
  base: {
    background: {
      '100': '#f4f4f4',
      '200': '#F8F8F8',
      '300': '#f3f2f7',
      '400': '#d4d2d9',
      '500': '#99989c',
      surface: '#ffffff',
      hovered: 'rgba(18, 18, 18, .96)',
    },
    text: {
      '100': '#000000f5',
      '200': '#58667E',
      '300': '#aeaeae',
      '400': 'rgb(134, 142, 150)',
    },
    primaryColor: '#3861fb',
    secondPrimaryColor: 'rgba(56, 97, 251,0.7)',
    light100: 'rgba(0, 0, 0, 0.96)',
    dark100: 'rgba(255, 255, 255, 0.87)',
    error: '#e23636',
    upColor: '#00e676',
    downColor: '#ea3943',
    removeColor: '#F85149',
    underlayColor: {
      '100': '#f2f3f5',
      '200': '',
    },
  },
  ...commonStyle,
};
