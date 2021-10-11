import { baseTypes } from 'base-types';
import krwFormat from './krwFormat';
import { CURRENCIES } from '/lib/constant';

export default function(
  num: number, 
  currency: baseTypes.Currency,
  addCurrencyMark: boolean = true
) {
  const isNegative = num < 0;
  let numToString = isNegative 
    ? Math.floor(num).toString().substring(1) 
    : Math.floor(num).toString();
  let numLen = numToString.length;
  let currencyMark = currency === 'default' ? '₩' : CURRENCIES[currency].symbol;
  let result = '';
  let beforePrefix = isNegative ? '-' : '';
  beforePrefix += addCurrencyMark ? currencyMark : '';

  console.log(num, num.toString().indexOf('-') === 0 ? num.toString().slice(1) : num);
  if(currency === 'usd' || currency === 'eur') {
    switch(numToString.length) {
      case 7:
      case 8:
      case 9:
        result = numToString.substr(0, numLen - 6) + '.'
          + numToString.substr(numLen - 6, 2)  + 'M'
        break;
      case 10:
      case 11:
      case 12:
        result = numToString.substr(0, numLen - 9) + '.'
          + numToString.substr(numLen - 9, 2)  + 'B'
        break;
      case 13:
      case 14:
      case 15:
        result = numToString.substr(0, numLen - 12) + '.'
          + numToString.substr(numLen - 12, 2)  + 'T'
        break;
      case 16:
      case 17:
      case 18:
        result = numToString.substr(0, numLen - 15) + '.'
        + numToString.substr(numLen - 15, 2)  + 'Q'
        break;

      default :
        result = num.toString().indexOf('-') === 0 ? krwFormat(num).slice(1) : krwFormat(num);
        break;
    }
    return beforePrefix + result
  }

  if(currency === 'krw') {
    //1,000,000,000,000,000
    switch(numToString.length) {
      case 5:
      case 6:
      case 7:
      case 8:
        result = numToString.substr(0, numLen - 4) + '.'
          + numToString.substr(numLen - 4, 2)  + '만'
        break;
      case 9:
      case 10:
      case 11:
      case 12:
        result = numToString.substr(0, numLen - 8) + '.'
          + numToString.substr(numLen - 8, 2)  + '억'
        break;
      case 13:
      case 14:
      case 15:
      case 16:
        result = numToString.substr(0, numLen - 12) + '.'
          + numToString.substr(numLen - 12, 2)  + '조'
        break;
      case 17:
      case 18:
      case 19:
      case 20:
        result = numToString.substr(0, numLen - 16) + '.'
          + numToString.substr(numLen - 16, 2)  + '경'
        break;

      default :
        result = num.toString().indexOf('-') === 0 ? krwFormat(num).slice(1) : krwFormat(num);
        break;
    }
    return beforePrefix + result
  }
}