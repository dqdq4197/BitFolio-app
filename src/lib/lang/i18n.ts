import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './en/translation.json';
import translationKO from './ko/translation.json';

export const resources = {
  en: {
    translation: translationEN,
  },
  ko: {
    translation: translationKO
  }
} as const;

const options = {
  lng: 'ko',
  fallbackLng: 'ko',
  debug: true,
  resources,
  // react: {
  //   useSuspense: false,
  //   wait: false
  // }
}

i18n
  .use(initReactI18next)

// initialize if not already initialized
// if (!i18n.isInitialized) {
  i18n.init(options);
// }

// const batch = require.context("../foo/", false,  /\.js$/)
// {t('n.selected', { n: 5 })}
// "n.selected": "{{n}} 개 선택됨."

// import { Localization } from 'expo-localization';
