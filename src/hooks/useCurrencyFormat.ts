import { useState, useLayoutEffect } from 'react';
import { useAppSelector } from '/hooks/useRedux';
import krwFormat from '/lib/func/krwFormat';




const useCurrencyFormat = (currentPrice: number):string => {
  const { currency } = useAppSelector(state => state.baseSettingReducer);
  const [price, setPrice] = useState<number | string>('');
  
  useLayoutEffect(() => {
    if(currency === 'krw') {
      setPrice('₩' + krwFormat(currentPrice as number))
    } else if(currency === 'usd') {
      setPrice('$' + krwFormat(currentPrice as number))
    } else if(currency === 'eur') {
      setPrice('€' + krwFormat(currentPrice as number))
    }
  }, [currency])

  return price as string;
}

export default useCurrencyFormat;