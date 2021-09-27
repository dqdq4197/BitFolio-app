import axios from 'axios';
import { GOOGLE_PLATFROM_KEY } from '@env';
import { 
  TRANSLATE_PREFIX,
} from '/lib/constant';

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
      params.key = GOOGLE_PLATFROM_KEY;
      return {
        url: `/languages`,
        params
      }
    },
  }
  
}