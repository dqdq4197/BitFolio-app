import React, { useState, useEffect } from 'react'
import { Image, Dimensions } from 'react-native'
import styled, { css } from 'styled-components/native'

import GlobalIndicator from './GlobalIndicator'

type BorderRadius = 'm' | 's'
type ImageType = {
  uri: string
  width: number
  height: number
  fullWidth?: boolean
  borderRedius?: BorderRadius
}

const { width: win } = Dimensions.get('window')

const CustomImage = ({
  uri,
  width,
  height,
  fullWidth = false,
  borderRedius,
}: ImageType) => {
  const [updatedWidth, setUpdatedWidth] = useState(width)
  const [updatedHeight, setUpdatedHeight] = useState(height)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (fullWidth) {
      const ratio = win / width
      setUpdatedWidth(win)
      setUpdatedHeight(height * ratio)
    }
  }, [width, height, fullWidth])

  const handleLoadEnd = () => {
    setIsLoaded(true)
  }

  // cache -> ios 전용
  return (
    <StyledImageWrap
      borderRedius={borderRedius}
      width={updatedWidth}
      height={updatedHeight}
    >
      <Image
        source={{
          uri,
          cache: 'force-cache',
        }}
        onLoadEnd={handleLoadEnd}
        style={{
          width: updatedWidth,
          height: updatedHeight,
        }}
        resizeMode="contain"
      />
      <GlobalIndicator isLoaded={isLoaded} />
    </StyledImageWrap>
  )
}

export default CustomImage

type WrapProps = {
  borderRedius?: BorderRadius
  width: number
  height: number
}

const StyledImageWrap = styled.View<WrapProps>`
  ${({ width, height }) => css`
    width: ${width}px;
    height: ${height}px;
  `}
  ${({ theme, borderRedius }) =>
    borderRedius &&
    css`
      border-radius: ${theme.border[borderRedius]};
    `}
  overflow: hidden;
`
