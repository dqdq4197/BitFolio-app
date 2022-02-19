import { PAIR_CURRENCIES } from '../constant';

type CurrencyFormat = {
  value: string | number;
  prefix?: string;
  zeroMask?: string;
  includeSeparator?: boolean;
};

type OnlyDecimalProps = {
  value: number;
  minLength: number;
  maxLength?: number;
  zeroMask?: string;
  noneZeroCnt?: number;
};

const { hasOwnProperty } = Object.prototype;

export function limitToScale(
  numStr: string,
  scale: number,
  fixedDecimalScale: boolean
) {
  let str = '';
  const filler = fixedDecimalScale ? '0' : '';
  for (let i = 0; i <= scale - 1; i += 1) {
    str += numStr[i] || filler;
  }
  return str;
}

export function roundToPrecision(
  numStr: string,
  scale: number,
  fixedDecimalScale: boolean
) {
  const numberParts = numStr.split('.');
  const roundedDecimalParts = parseFloat(`0.${numberParts[1] || '0'}`)
    .toFixed(scale)
    .split('.');
  const intPart = numberParts[0]
    .split('')
    .reverse()
    .reduce((roundedStr, current, idx) => {
      if (roundedStr.length > idx) {
        return (
          (Number(roundedStr[0]) + Number(current)).toString() +
          roundedStr.substring(1, roundedStr.length)
        );
      }
      return current + roundedStr;
    }, roundedDecimalParts[0]);
  const decimalPart = limitToScale(
    roundedDecimalParts[1] || '',
    (numberParts[1] || '').length,
    fixedDecimalScale
  );
  return intPart + (decimalPart ? `.${decimalPart}` : '');
}

export function AddSeparator(value: string | number) {
  const x =
    typeof value === 'number' ? value.toString().split('.') : value.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? `.${x[1]}` : '';
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    // eslint-disable-next-line no-useless-concat
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }

  return x1 + x2;
}

/**
 * @description 소수점 이하의 값만 반환
 * @param  {number} value - 변경할 숫자
 * @param  {number} minLength - 소수점 최소 자릿수
 * @param  {number|undefined} maxLength - 소수점 최대 자릿수 * undefined -> 0이 아닌 수 나올때 까지 리턴
 * @param  {number|undefined} maxLength - 리턴할 값에 0이 아닌 숫자 갯수
 * @param  {string} zeroMask - [default: '00'] 소수 자리가 없을 경우 mask
 */

export function getOnlyDecimal({
  value,
  minLength,
  maxLength,
  noneZeroCnt = 2,
  zeroMask = '00',
}: OnlyDecimalProps): string {
  const result = value.toString().split('.');

  if (!result[1]) {
    return zeroMask;
  }
  let maxTemp = maxLength ?? minLength;
  let nonZeroCnt = 0;

  if (maxLength === undefined) {
    for (let i = 0; i < result[1].length; i += 1) {
      if (result[1][i] !== '0') {
        if (i >= minLength) maxTemp = Math.max(i + 1, maxTemp);
        nonZeroCnt += 1;
        if (nonZeroCnt === noneZeroCnt) break;
      }
    }
  }

  if (result[1].length >= maxTemp) {
    return result[1].substr(0, maxTemp);
  }
  return result[1];
}

/**
 * @param  {baseTypes.Currency} currency usd, eur, krw, etc.
 */
export function getCurrencySymbol(currency: string): string {
  const lowerCaseCurrency = currency.toLowerCase();

  if (hasOwnProperty.call(PAIR_CURRENCIES, lowerCaseCurrency)) {
    return PAIR_CURRENCIES[lowerCaseCurrency].unit;
  }
  return currency.toUpperCase();
}

/**
 * @param  {string|number} value value to format
 * @param  {string | undefined} prefix currency symbol mark
 * @param  {boolean} includeSeparator [default: true]
 */
export function currencyFormat({
  value,
  prefix,
  includeSeparator = true,
}: CurrencyFormat): string {
  const numStr = typeof value === 'number' ? value.toString() : value;
  // eslint-disable-next-line prefer-const
  let [intPart, decimalPart] = numStr.split('.');
  const isNegative = Number(value) < 0;
  let sPrefix = prefix ?? '';
  if (isNegative) {
    intPart = intPart.substr(1);
    sPrefix = `-${sPrefix}`;
  }

  if (!decimalPart) {
    return sPrefix + AddSeparator(intPart);
  }

  const intPartLength = intPart.length;
  const decimalPartLength = decimalPart.length;
  let result = '';
  let decimalCnt = 0;
  let decimalZeroCnt = 0;

  if (Number(intPart) > 0) {
    result = `${intPart}.`;
    if (intPartLength === 1) {
      decimalCnt = 3;
    } else {
      decimalCnt = 2;
    }
  } else {
    result = '0.';

    for (let i = 0; i < decimalPartLength; i += 1) {
      if (decimalPart[i] === '0') {
        decimalZeroCnt += 1;
      } else {
        break;
      }
    }

    if (decimalZeroCnt < 4) {
      decimalCnt = decimalZeroCnt + 4;
    } else if (decimalZeroCnt === 4 || decimalZeroCnt === 5) {
      decimalCnt = decimalZeroCnt + 3;
    } else {
      decimalCnt = decimalZeroCnt + 2;
    }
  }

  for (let i = 0; i < decimalCnt; i += 1) {
    if (i >= decimalPartLength) break;
    result += decimalPart[i];
  }

  result = sPrefix + (includeSeparator ? AddSeparator(result) : result);

  return result;
}

export const exponentToNumber = (num: number) => {
  let temp: any = num;
  if (Math.abs(num) < 1.0) {
    const e = parseInt(num.toString().split('e-')[1], 10);
    if (e) {
      temp *= 10 ** (e - 1);
      temp = `0.${new Array(e).join('0')}${temp.toString().substring(2)}`;
    }
  } else {
    let e = parseInt(temp.toString().split('+')[1], 10);
    if (e > 20) {
      e -= 20;
      temp /= 10 ** e;
      temp += new Array(e + 1).join('0');
    }
  }

  return temp;
};
