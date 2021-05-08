import React from 'react';
import styled, { css } from 'styled-components/native';
import Text from '/components/common/Text';


type TitleWrapProps = {
  isMain?: boolean;
  title?: string,
  children?: React.ReactNode;
  paddingBottomZero?: boolean;
}
const SurfaceWrap = ({ isMain = false, title, children, paddingBottomZero }: TitleWrapProps) => {
  return (
    <Container isMain={isMain} paddingBottomZero={paddingBottomZero}>
      { title &&
        <TitleWrap isMain={isMain}>
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
}
const Container = styled.View<Props>`
  background-color: ${({ theme }) => theme.base.background.surface};
  padding: ${({ theme }) => `${theme.content.surfacePadding} ${theme.content.spacing}`};
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