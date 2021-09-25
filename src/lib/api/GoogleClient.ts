import { 
  TRANSLATE_PREFIX,
  GOOGLE_PLATFROM_KEY,
} from '/lib/constant';
import axios from 'axios';

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