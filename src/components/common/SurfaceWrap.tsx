import React, { CSSProperties } from 'react'
import styled, { css } from 'styled-components/native'

import Text, { TextStyleProps } from '/components/common/Text'

interface TitleWrapProps extends TextStyleProps {
  title?: string | React.ReactNode
  paddingBottomZero?: boolean
  parentPaddingZero?: boolean
  marginTopZero?: boolean
  marginBottomZero?: boolean
  transparent?: boolean
  flex?: CSSProperties['flex']
}
const SurfaceWrap = ({
  title,
  children,
  paddingBottomZero = false,
  parentPaddingZero = false,
  marginTopZero = false,
  marginBottomZero = false,
  transparent = false,
  flex,
  ...textStyles
}: TitleWrapProps) => {
  return (
    <Container
      $paddingBottomZero={paddingBottomZero}
      $parentPaddingZero={parentPaddingZero}
      $marginTopZero={marginTopZero}
      $transparent={transparent}
      $flex={flex}
    >
      {title && (
        <TitleWrap
          $marginBottomZero={marginBottomZero}
          $parentPaddingZero={parentPaddingZero}
        >
          {typeof title === 'string' ? (
            <Text fontL color100 bold {...textStyles}>
              {title}
            </Text>
          ) : (
            title
          )}
        </TitleWrap>
      )}
      {children}
    </Container>
  )
}

export default SurfaceWrap

type StyledProps = {
  $paddingBottomZero?: boolean
  $parentPaddingZero?: boolean
  $marginTopZero?: boolean
  $marginBottomZero?: boolean
  $transparent?: boolean
  $flex?: CSSProperties['flex']
}

const Container = styled.View<StyledProps>`
  background-color: ${({ theme, $transparent }) =>
    $transparent ? 'transparent' : theme.base.background.surface};
  padding: ${({ theme }) =>
    `${theme.content.surfacePadding} ${theme.content.spacing}`};

  ${({ $flex }) =>
    $flex &&
    css`
      flex: ${$flex};
    `}

  ${({ $parentPaddingZero }) =>
    $parentPaddingZero &&
    css`
      padding-left: 0;
      padding-right: 0;
    `}

  ${({ $paddingBottomZero }) =>
    $paddingBottomZero &&
    css`
      padding-bottom: 0;
    `}

  ${({ $marginTopZero, theme }) =>
    !$marginTopZero &&
    css`
      margin-top: ${theme.content.blankSpacing};
    `}
`

const TitleWrap = styled.View<StyledProps>`
  flex-direction: row;

  ${({ $marginBottomZero }) =>
    !$marginBottomZero &&
    css`
      margin-bottom: 20px;
    `}

  ${({ $parentPaddingZero, theme }) =>
    $parentPaddingZero &&
    css`
      padding: 0 ${theme.content.spacing};
    `}
`
