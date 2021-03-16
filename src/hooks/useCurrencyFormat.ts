import { useState, useLayoutEffect } from 'react';
import { useAppSelector } from '/hooks/useRedux';
import krwFormat from '/lib/utils/krwFormat';




const useCurrencyFormat = (currentPrice: number):string => {
  const { currency } = useAppSelector(state => state.baseSettingReducer);
  const [price, setPrice] = useState<number | string>('');
  
  const toFixed = (num: number) => {
    return Math.floor(num * 100) / 100
  }
  useLayoutEffect(() => {
    if(currency === 'krw') {
      setPrice('₩' + krwFormat(toFixed(currentPrice as number)))
    } else if(currency === 'usd') {
      setPrice('$' + krwFormat(toFixed(currentPrice as number)))
    } else if(currency === 'eur') {
      setPrice('€' + krwFormat(toFixed(currentPrice as number)))
    }
  }, [currency, currentPrice])

  return price as string;
}

export default useCurrencyFormat;