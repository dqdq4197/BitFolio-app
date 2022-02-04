import { useState, useLayoutEffect } from 'react';
import { useAppSelector } from '/hooks/useRedux';
import { krwFormat, digitToFixed } from '/lib/utils';

const useCurrencyFormat = (
  currentPrice: number,
  includeCurrencySymbol = true
): string => {
  const { currency } = useAppSelector(state => state.baseSettingReducer);
  const [price, setPrice] = useState<number | string>('');

  useLayoutEffect(() => {
    if (includeCurrencySymbol) {
      if (currency === 'krw') {
        setPrice(`₩${krwFormat(digitToFixed(currentPrice as number, 2))}`);
      } else if (currency === 'usd') {
        setPrice(`$${krwFormat(digitToFixed(currentPrice as number, 2))}`);
      } else if (currency === 'eur') {
        setPrice(`€${krwFormat(digitToFixed(currentPrice as number, 2))}`);
      }
    } else {
      if (currency === 'krw') {
        setPrice(krwFormat(digitToFixed(currentPrice as number, 2)));
      } else if (currency === 'usd') {
        setPrice(krwFormat(digitToFixed(currentPrice as number, 2)));
      } else if (currency === 'eur') {
        setPrice(krwFormat(digitToFixed(currentPrice as number, 2)));
      }
    }
  }, [currency, currentPrice]);

  return price as string;
};

export default useCurrencyFormat;
