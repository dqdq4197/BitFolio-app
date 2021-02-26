
import { DefaultTheme } from 'styled-components/native';

export const darkTheme: DefaultTheme = {
  dark: true,
  colors: {
    background_100: '#100F10',
    background_200: '#1B1B1B',
    background_300: '#242424',
    text_100: 'white',
    text_200: 'rgba(0,0,0.96)',
    text_300: 'rgb(134, 142, 150)'
  }
}

export const lightTheme: DefaultTheme = {
  dark: false,
  colors: {
    background_100: '#100F10',
    background_200: '#1B1B1B',
    background_300: '#242424',
    text_100: 'white',
    text_200: 'rgba(0,0,0.96)',
    text_300: 'rgb(134, 142, 150)'
  }
}
