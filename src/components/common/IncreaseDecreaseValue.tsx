import React from 'react';
import styled from 'styled-components/native';
import Text, { TextStyleProps } from './Text';


type ValueProps = {
  value: number | null
  beforePrefix?: string
  afterPrefix?: string
  textStyle?: TextStyleProps
}

const IncreaseDecreaseValue = ({ 
  value, 
  beforePrefix, 
  afterPrefix, 
  textStyle 
}: ValueProps) => {
  
  return (
    <CustomText value={value} {...textStyle}>
      { value === null 
        ? '--'
        : value > 0
          ? `+${ beforePrefix ?? '' }${ value }${ afterPrefix ?? '' }`
          : `${ beforePrefix ?? '' }${ value }${ afterPrefix ?? '' }`
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