import krwFormat from './krwFormat';
import { baseTypes } from 'base-types';

export default function(num: number, language: baseTypes.Language) {
  let numToString = Math.floor(num).toString()
  let numLen = numToString.length;

  if(language === 'en') {
    switch(numToString.length) {
      case 7:
      case 8:
      case 9:
        return numToString.substr(0, numLen - 6) + '.'
          + numToString.substr(numLen - 6, 2)  + 'M'
      case 10:
      case 11:
      case 12:
        return numToString.substr(0, numLen - 9) + '.'
          + numToString.substr(numLen - 9, 2)  + 'B'
      case 13:
      case 14:
      case 15:
        return numToString.substr(0, numLen - 12) + '.'
          + numToString.substr(numLen - 12, 2)  + 'T'
      case 16:
      case 17:
      case 18:
        return numToString.substr(0, numLen - 15) + '.'
        + numToString.substr(numLen - 15, 2)  + 'Q'

      default :
        return krwFormat(num);
    }
  }

  if(language === 'ko') {
    //1,000,000,000,000,000
    switch(numToString.length) {
      case 5:
      case 6:
      case 7:
      case 8:
        return numToString.substr(0, numLen - 4) + '.'
          + numToString.substr(numLen - 4, 2)  + '만'
      case 9:
      case 10:
      case 11:
      case 12:
        return numToString.substr(0, numLen - 8) + '.'
          + numToString.substr(numLen - 8, 2)  + '억'
      case 13:
      case 14:
      case 15:
      case 16:
        return numToString.substr(0, numLen - 12) + '.'
          + numToString.substr(numLen - 12, 2)  + '조'
      case 17:
      case 18:
      case 19:
      case 20:
        return numToString.substr(0, numLen - 16) + '.'
          + numToString.substr(numLen - 16, 2)  + '경'

      default :
        return krwFormat;
    }
  }
}