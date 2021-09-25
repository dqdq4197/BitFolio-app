import { 
  PAPAGO_PREFIX,
  NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET
} from '/lib/constant';
import axios from 'axios';

type PapageParams = {
  query: string
}

export const http = axios.create({
  baseURL: PAPAGO_PREFIX,
  headers: {
    'X-Naver-Client-Id': NAVER_CLIENT_ID, 
    'X-Naver-Client-Secret': NAVER_CLIENT_SECRET
  },
})

export const config = {
  baseURL: PAPAGO_PREFIX,
  headers: {
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Naver-Client-Id': NAVER_CLIENT_ID, 
    'X-Naver-Client-Secret': NAVER_CLIENT_SECRET
  },
}

export const translate = {
  papago: {
    detectLangs: (params: PapageParams) => {
      return {
        url: '/',
        params
      }
    }
  }
}