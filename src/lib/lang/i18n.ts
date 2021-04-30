import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as en from './en';
import * as ko from './ko';
import translationEn from './en/translation.json';
import translationKo from './ko/translation.json';

const LocaleEn = {...en};
console.log(LocaleEn);

export const resources = {
  en: LocaleEn,
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'ko',
  debug: false,
  resources,
});


// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import { Localization } from 'expo-localization';
// import * as localeKr from './ko';
// import * as localeEn from './en';


// const kr = { ...localeKr };
// const En = { ...localeEn };

// i18n
//   .use(initReactI18next)
//   .init({
//     lng: 'ko',
//     fallbackLng: 'ko',
//     debug: true,
//     resources: { kr, En },
//     interpolation: {
//       escapeValue: false, // not needed for react!!
//     },
//   });

// export default i18n;