import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import Text, { TextStyleProps } from './Text'

type SizeType =
  | 'font_xl'
  | 'font_x'
  | 'font_l'
  | 'font_ml'
  | 'font_m'
  | 'font_s'
  | 'font_xs'

interface TextProps extends TextStyleProps {
  children: string
  defaultSize?: SizeType
}

type sizeArrType = SizeType[]

const DynamicSizeText = ({
  children,
  defaultSize = 'font_m',
  ...props
}: TextProps) => {
  const [sizeArr, setSizeArr] = useState<sizeArrType>([])

  useEffect(() => {
    const sizes: sizeArrType = [
      'font_xl',
      'font_x',
      'font_l',
      'font_ml',
      'font_m',
      'font_s',
      'font_xs',
    ]
    const index = sizes.findIndex(size => size === defaultSize)
    const newSizes = sizes.slice(index)
    if (newSizes.length < 3) {
      while (newSizes.length < 3) {
        newSizes.push('font_xs')
      }
    }

    setSizeArr(newSizes)
  }, [defaultSize])

  return (
    <CustomText {...props} strLength={children.length} sizeArr={sizeArr}>
      {children}
    </CustomText>
  )
}

export default DynamicSizeText

type CustomTextProps = {
  strLength: number
  sizeArr: sizeArrType
}

const CustomText = styled(Text)<CustomTextProps>`
  ${({ strLength, theme, sizeArr }) => {
    switch (strLength) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
        return `font-size: ${theme.size[sizeArr[0]]}`
      case 13:
      case 14:
      case 15:
        return `font-size: ${theme.size[sizeArr[1]]}`

      default:
        return `font-size: ${theme.size[sizeArr[2]]}`
    }
  }}
`
