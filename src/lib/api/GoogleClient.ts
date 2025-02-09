import axios from 'axios'

import { TRANSLATE_PREFIX } from '/lib/constant'

interface LangugesParams {
  target: string
  model: string
  key: string
}

export const http = axios.create({
  baseURL: TRANSLATE_PREFIX,
})

export const Cryptocompare = {
  translate: {
    languages: (params: LangugesParams) => {
      return {
        url: `/languages`,
        params: {
          ...params,
          key: process.env.EXPO_PUBLIC_GOOGLE_PLATFORM_KEY,
        },
      }
    },
  },
}
