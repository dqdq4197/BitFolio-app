import AsyncStorage from '@react-native-async-storage/async-storage'
import { baseTypes } from 'base-types'
import { getLocales } from 'expo-localization'
import i18n, { LanguageDetectorAsyncModule } from 'i18next'
import { initReactI18next } from 'react-i18next'

import { head } from 'lodash'
import { expectUnreachable } from '../utils/sweet'
import translationEN from './en/translation.json'
import translationKO from './ko/translation.json'
import { LANGUAGE_STORAGE_KEY } from '/lib/constant'

export const resources = {
  en: {
    translation: translationEN,
  },
  ko: {
    translation: translationKO,
  },
} as const

export const onLanguageChange = async (value: baseTypes.Language) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, value)
    i18n.changeLanguage(value)
  } catch (e) {
    console.log('fails: save local language')
  }
}

export const getDeviceLanguage = () => {
  const locales = getLocales()
  const locale =
    head(locales) ??
    expectUnreachable('Guaranteed to contain at least 1 element.')

  return locale.languageCode || options.fallbackLng
}

const languageDetector: LanguageDetectorAsyncModule = {
  init: () => {},
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: async (callback: (lng: string) => void) => {
    const userLang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY)

    const deviceLang =
      userLang === 'default'
        ? getDeviceLanguage()
        : userLang || getDeviceLanguage()

    callback(deviceLang)
  },
  cacheUserLanguage: () => {},
}

const options = {
  fallbackLng: 'en',
  debug: true,
  resources,
}

i18n.modules.languageDetector = languageDetector
i18n.use(initReactI18next).init(options)

// initialize if not already initialized

export default i18n
