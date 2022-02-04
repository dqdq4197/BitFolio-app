import React from 'react';
import styled, { css } from 'styled-components/native';
import Text, { TextStyleProps } from '/components/common/Text';


interface TitleWrapProps extends TextStyleProps {
  title?: string | React.ReactNode;
  children?: React.ReactNode;
  paddingBottomZero?: boolean;
  parentPaddingZero?: boolean;
  marginTopZero?: boolean;
  marginBottomZero?: boolean;
  transparent?: boolean
}
const SurfaceWrap = ({
  title,
  children,
  paddingBottomZero = false,
  parentPaddingZero = false,
  marginTopZero = false,
  marginBottomZero = false,
  transparent = false,
  ...textStyles
}: TitleWrapProps) => {

  return (
    <Container
      paddingBottomZero={paddingBottomZero}
      parentPaddingZero={parentPaddingZero}
      marginTopZero={marginTopZero}
      transparent={transparent}
    >
      {title &&
        <TitleWrap marginBottomZero={marginBottomZero} parentPaddingZero={parentPaddingZero}>
          {typeof title === 'string'
            ? <Text
              fontL
              color100
              bold
              {...textStyles}
            >
              {title}
            </Text>
            : title
          }
        </TitleWrap>
      }
      {children}
    </Container>
  )
}

export default SurfaceWrap;

type Props = Pick<
  TitleWrapProps,
  | 'paddingBottomZero'
  | 'parentPaddingZero'
  | 'marginTopZero'
  | 'marginBottomZero'
  | 'transparent'
>

const Container = styled.View<Props>`
  background-color: ${({ theme, transparent }) =>
    transparent ? 'transparent' : theme.base.background.surface};
  padding: ${({ theme }) => `${theme.content.surfacePadding} ${theme.content.spacing}`};
  ${(props) => props.parentPaddingZero && css`
    padding-left: 0;
    padding-right: 0;
  `}
  ${(props) => props.paddingBottomZero && css`
    padding-bottom: 0;
  `
  }
  ${(props) => !props.marginTopZero && css`
    margin-top: ${props.theme.content.blankSpacing};
  `
  }
`
const TitleWrap = styled.View<Props>`
  flex-direction: row;
  ${(props) => !props.marginBottomZero && css`
    margin-bottom: 20px;
  `} 
  ${(props) => props.parentPaddingZero && css`
    padding: 0 ${props.theme.content.spacing};
  `}
`