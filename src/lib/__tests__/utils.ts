import { baseTypes } from 'base-types';
import {
  getCurrencySymbol,
  getOnlyDecimal,
  AddSeparator,
  exponentToNumber,
  currencyFormat,
} from '../utils/currencyFormat';
import { digitToFixed, convertUnits } from '../utils';
import { CURRENCIES } from '../constant';

// currencyFormat.ts & digitToFixed.ts & convertUnits.ts
describe('currencyFormat & converter utils testing', () => {
  it('returns the correct currency symbol', () => {
    for (const currency in CURRENCIES) {
      const { symbol } = CURRENCIES[currency as baseTypes.Currency];
      expect(getCurrencySymbol(currency as baseTypes.Currency)).toBe(symbol);
    }
  });

  it('return only decimal number or mask string', () => {
    expect(
      getOnlyDecimal({ value: 5003.324, minLength: 3, zeroMask: '--' })
    ).toBe('324');
    expect(getOnlyDecimal({ value: 5003, minLength: 3, zeroMask: '--' })).toBe(
      '--'
    );
    expect(
      getOnlyDecimal({
        value: 5003.30003123,
        minLength: 6,
        noneZeroCnt: 4,
        zeroMask: '--',
      })
    ).toBe('3000312');
  });

  it('returns a string including separator', () => {
    expect(AddSeparator(12345678900000)).toBe('12,345,678,900,000');
  });

  it('returns the converted exponential number to a whole number', () => {
    expect(exponentToNumber(123e12)).toBe(123000000000000);
  });

  it('returns the formatted currency', () => {
    expect(currencyFormat({ value: 520032.1234, prefix: '₩' })).toBe(
      '₩520,032.12'
    );
    expect(
      currencyFormat({
        value: 10000.1234,
        prefix: '₩',
        includeSeparator: false,
      })
    ).toBe('₩10000.12');
    expect(currencyFormat({ value: -0.00005, prefix: '$' })).toBe('-$0.00005');
    expect(currencyFormat({ value: -2.04, prefix: '$' })).toBe('-$2.04');
  });

  it('return digit to fixed', () => {
    expect(digitToFixed(123.1234, 3)).toBe(123.123);
    expect(digitToFixed(-123.1234, 2)).toBe(-123.13);
  });

  it('return converted units', () => {
    expect(convertUnits(-123.1234, 'krw')).toBe(
      `-${CURRENCIES.krw.symbol}123.123`
    );
    expect(convertUnits(123123123.1234, 'krw')).toBe(
      `${CURRENCIES.krw.symbol}1.23억`
    );
    expect(convertUnits(123123123123123.1234, 'krw')).toBe(
      `${CURRENCIES.krw.symbol}123.12조`
    );
    expect(convertUnits(12312312312312312.1234, 'usd')).toBe(
      `${CURRENCIES.usd.symbol}12.31Q`
    );
    expect(convertUnits(123123123123.1234, 'usd')).toBe(
      `${CURRENCIES.usd.symbol}123.12B`
    );
    expect(convertUnits(123123123.1234, 'usd')).toBe(
      `${CURRENCIES.usd.symbol}123.12M`
    );
    expect(convertUnits(1231.1234, 'usd')).toBe(
      `${CURRENCIES.usd.symbol}1,231.123`
    );
    expect(convertUnits(1231.1234, 'usd', false)).toBe(`1,231.123`);
  });
})