import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Text, { TextStyleProps } from './Text';
import { currencyFormat, getCurrencySymbol } from '/lib/utils/currencyFormat';
import useLocales from '/hooks/useLocales';


type ValueProps = {
  value: number | null
  beforePrefix?: string
  afterPrefix?: string
  textStyle?: TextStyleProps
  isCurrencyFormat?: boolean
}

const IncreaseDecreaseValue = ({ 
  value, 
  beforePrefix, 
  afterPrefix, 
  textStyle,
  isCurrencyFormat=false
}: ValueProps) => {

  const { currency } = useLocales();
  const [returnValue, setReturnValue] = useState<string | number | null>(value);
  
  useEffect(() => {
    if(isCurrencyFormat && value !== null) {
      setReturnValue(
        (value < 0 ? '-' : '') +
        currencyFormat({
          value: Math.sign(value) * value,
          prefix: getCurrencySymbol(currency)
        })
      )
    } else {
      setReturnValue(value);
    }
  }, [value, isCurrencyFormat])

  return (
    <CustomText value={value} {...textStyle}>
      { value === null 
        ? '--'
        : value > 0
          ? `+${ beforePrefix ?? '' }${ returnValue }${ afterPrefix ?? '' }`
          : `${ beforePrefix ?? '' }${ returnValue }${ afterPrefix ?? '' }`
      }
    </CustomText>
  )
}

export default IncreaseDecreaseValue;

const CustomText = styled(Text)<ValueProps>`
  color: ${
    ({ theme, value }) => value === null
      ? theme.base.text[200]
      : value > 0 
        ? theme.base.upColor
        : value === 0 
          ? theme.base.text[200]
          : theme.base.downColor
  }
`