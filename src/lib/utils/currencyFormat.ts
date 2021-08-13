import { baseTypes } from 'base-types';

type CurrencyFormat = {
  value: string | number
  prefix?: string
  zeroMask?: string
}

type OnlyDecimalProps = {
  value:number
  minLength: number
  maxLength?: number
  zeroMask?: string
}
export function limitToScale(numStr: string, scale: number, fixedDecimalScale: boolean) {
  let str = ''
  const filler = fixedDecimalScale ? '0' : '';
  for (let i = 0; i <= scale - 1; i++) {
    str += numStr[i] || filler;
  }
  return str;
}

export function roundToPrecision(numStr: string, scale: number, fixedDecimalScale: boolean) {
  const numberParts = numStr.split('.');
  const roundedDecimalParts = parseFloat(`0.${numberParts[1] || '0'}`).toFixed(scale).split('.');
  const intPart = numberParts[0].split('').reverse().reduce((roundedStr, current, idx) => {
    if (roundedStr.length > idx) {
      return (Number(roundedStr[0]) + Number(current)).toString() + roundedStr.substring(1, roundedStr.length);
    }
    return current + roundedStr;
  }, roundedDecimalParts[0]);
  const decimalPart = limitToScale(roundedDecimalParts[1] || '', (numberParts[1] || '').length, fixedDecimalScale);
  return intPart + (decimalPart ? '.' + decimalPart : '');
}

export function AddSeparator(value: string | number) {
  var x = typeof value === 'number' ? value.toString().split('.') : value.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  
  return x1 + x2;
}

/**
 * @description 소수점 이하의 값만 반환
 * @param  {number} value - 변경할 숫자
 * @param  {number} minLength - 소수점 최소 자릿수 
 * @param  {number|undefined} maxLength - 소수점 최대 자릿수 * undefined -> 0이 아닌 수 나올때 까지 리턴
 * @param  {string} zeroMask - [default: '00'] 소수 자리가 없을 경우 mask
 */

export function getOnlyDecimal({
  value, 
  minLength,
  maxLength, 
  zeroMask = '00'
}: OnlyDecimalProps):string {
  let result = value.toString().split('.');

  if(!result[1]) {
    return zeroMask;
  } else {
    let maxTemp = maxLength ?? minLength;
    let nonZeroCnt = 0;

    if(maxLength === undefined) {
      for(let i = 0; i < result[1].length; i++) {
        if(result[1][i] !== '0') {
          if(i > minLength)
            maxTemp = Math.max(i + 1, maxTemp) 
            nonZeroCnt++;
          if(nonZeroCnt === 2) break;
        }
      }
    }  
    
    if(result[1].length >= maxTemp) {
      return result[1].substr(0, maxTemp);
    } else {
      return result[1];
    }
  }
};

/**
 * @param  {baseTypes.Currency} currency usd, eur, krw, etc.
 */
export function getCurrencySymbol(currency: baseTypes.Currency): string {
  switch (currency) {
    case 'krw':
      return '₩'
    case 'eur':
      return '€'

    default: 
      return '$'
  }
}

/**
 * @param  {string|number} value value to format
 * @param  {string | undefined} prefix currency symbol mark
 * @param  {string} zeroMask [default: '--'] 값이 0일 경우 mask 
 */
export function currencyFormat({
  value, 
  prefix, 
  zeroMask= '--',
}: CurrencyFormat): string {
  let numStr = typeof value === 'number' ? value.toString() : value;
  let [intPart, decimalPart] = numStr.split('.');
  const isNegative = Number(value) < 0;
  let sPrefix = prefix ?? '';
  if(isNegative) {
    intPart = intPart.substr(1);
    sPrefix = '-' + sPrefix;
  }

  if(!decimalPart) {
    return sPrefix + AddSeparator(intPart);
  }

  const intPartLength = intPart.length;
  const decimalPartLength = decimalPart.length;
  let result = '';
  let decimalCnt = 0;
  let decimalZeroCnt = 0;
  if(numStr === '0') {
    result = zeroMask;
  } else {
    if(Number(intPart) > 0) {
      result = intPart + '.';
      if(intPartLength === 1) {
        decimalCnt = 3;
      } else {
        decimalCnt = 2;
      }
    } else {
      result = '0.';
      for(let i = 0; i < decimalPartLength; i++) {
        if(decimalPart[i] === '0') {
          decimalZeroCnt++;
        } else {
          break;
        }        
      }

      if(decimalZeroCnt < 4) {
        decimalCnt = decimalZeroCnt + 4;
      } else if(decimalZeroCnt === 4 || decimalZeroCnt === 5) {
        decimalCnt = decimalZeroCnt + 3;
      } else {
        decimalCnt = decimalZeroCnt + 2;
      }
    }
    for(let i = 0; i < decimalCnt; i++) {
      if(i >= decimalPartLength) break;
      result += decimalPart[i];
    }
  }
  
  result = sPrefix + AddSeparator(result);

  return result;
}