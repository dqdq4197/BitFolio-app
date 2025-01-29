import { useState, useLayoutEffect } from 'react'

import { useAppSelector } from '/hooks/useRedux'
import { krwFormat, digitToFixed } from '/lib/utils'
import { getCurrencySymbol } from '/lib/utils/currencyFormat'

const useCurrencyFormat = (
  currentPrice: number,
  includeCurrencySymbol = true
): string => {
  const { currency } = useAppSelector(state => state.baseSettingReducer)
  const [price, setPrice] = useState<number | string>('')

  useLayoutEffect(() => {
    if (includeCurrencySymbol) {
      const symbol = getCurrencySymbol(currency)

      setPrice(`${symbol}${krwFormat(digitToFixed(currentPrice as number, 2))}`)
    } else {
      setPrice(krwFormat(digitToFixed(currentPrice as number, 2)))
    }
  }, [currency, currentPrice, includeCurrencySymbol])

  return price as string
}

export default useCurrencyFormat
