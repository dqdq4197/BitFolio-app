import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'

import useLocales from '/hooks/useLocales'
import { currencyFormat, getCurrencySymbol } from '/lib/utils/currencyFormat'

import Text, { TextStyleProps } from './Text'

interface ValueProps extends TextStyleProps {
  value: number | null
  beforePrefix?: string
  afterPrefix?: string
  isCurrencyFormat?: boolean
}

const IncreaseDecreaseValue = ({
  value,
  beforePrefix,
  afterPrefix,
  isCurrencyFormat = false,
  ...props
}: ValueProps) => {
  const { currency } = useLocales()
  const [returnValue, setReturnValue] = useState<string | number | null>(value)

  useEffect(() => {
    if (isCurrencyFormat && value !== null) {
      setReturnValue(
        (value < 0 ? '-' : '') +
          currencyFormat({
            value: Math.sign(value) * value,
            prefix: getCurrencySymbol(currency),
          })
      )
    } else {
      setReturnValue(value)
    }
  }, [value, isCurrencyFormat, currency])

  return (
    <CustomText value={value} {...props}>
      {value === null
        ? '--'
        : value > 0
        ? `+${beforePrefix ?? ''}${returnValue}${afterPrefix ?? ''}`
        : `${beforePrefix ?? ''}${returnValue}${afterPrefix ?? ''}`}
    </CustomText>
  )
}

export default IncreaseDecreaseValue

const CustomText = styled(Text)<ValueProps>`
  color: ${({ theme, value }) =>
    value === null
      ? theme.base.text[200]
      : value > 0
      ? theme.base.upColor
      : value === 0
      ? theme.base.text[200]
      : theme.base.downColor};
`
