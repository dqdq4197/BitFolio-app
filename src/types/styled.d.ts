import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    dark: boolean,
    colors: {
      background_100: string,
      background_200: string,
      background_300: string,
      text_100: string,
      text_200: string,
      text_300: string,
    };
  }
}