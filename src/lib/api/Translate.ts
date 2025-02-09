import axios from 'axios'

import { PAPAGO_PREFIX } from '/lib/constant'

type PapageParams = {
  query: string
}

export const http = axios.create({
  baseURL: PAPAGO_PREFIX,
  headers: {
    'X-Naver-Client-Id': process.env.EXPO_PUBLIC_NAVER_CLIENT_ID,
    'X-Naver-Client-Secret': process.env.EXPO_PUBLIC_NAVER_CLIENT_SECRET,
  },
})

export const config = {
  baseURL: PAPAGO_PREFIX,
  headers: {
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Naver-Client-Id': process.env.EXPO_PUBLIC_NAVER_CLIENT_ID,
    'X-Naver-Client-Secret': process.env.EXPO_PUBLIC_NAVER_CLIENT_SECRET,
  },
}

export const translate = {
  papago: {
    detectLangs: (params: PapageParams) => {
      return {
        url: '/',
        params,
      }
    },
  },
}
