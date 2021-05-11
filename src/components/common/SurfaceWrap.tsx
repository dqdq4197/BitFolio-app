import React from 'react';
import styled, { css } from 'styled-components/native';
import Text from '/components/common/Text';


type TitleWrapProps = {
  isMain?: boolean;
  title?: string;
  children?: React.ReactNode;
  paddingBottomZero?: boolean;
  parentPaddingZero?: boolean;
}
const SurfaceWrap = ({ 
  isMain = false, 
  title, 
  children, 
  paddingBottomZero = false, 
  parentPaddingZero = false
}: TitleWrapProps) => {
  return (
    <Container isMain={isMain} paddingBottomZero={paddingBottomZero} parentPaddingZero={parentPaddingZero}>
      { title &&
        <TitleWrap isMain={isMain} parentPaddingZero={parentPaddingZero}>
          <StyledText color100 bold fontXL={isMain}>
            { title }
          </StyledText>
        </TitleWrap>
      }
      {children}
    </Container>
  )
}

export default SurfaceWrap;

type Props = {
  isMain?: boolean,
  paddingBottomZero?: boolean,
  parentPaddingZero?: boolean
}
const Container = styled.View<Props>`
  background-color: ${({ theme }) => theme.base.background.surface};
  padding: ${({ theme }) => `${theme.content.surfacePadding} ${theme.content.spacing}`};
  ${ (props) => props.parentPaddingZero && css`
    padding-left: 0;
    padding-right: 0;
  `}
  ${ (props) => props.paddingBottomZero && css`
    padding-bottom: 0;
  `
  }
  ${ (props) => !props.isMain && css`
    margin-top: ${props.theme.content.blankSpacing};
  `
  }
`
const TitleWrap = styled.View<Props>`
  ${(props) => !props.isMain && css`
    margin-bottom: 20px;
  `} 
  ${(props) => props.parentPaddingZero && css`
    padding: 0 ${props.theme.content.spacing};
  `}
`
const StyledText = styled(Text)`
  ${(props) => props.fontXL 
    ? css`
      font-size: ${props.theme.size.font_xl};
    `
    : css`
      font-size: ${props.theme.size.font_x};
    `
  }
`