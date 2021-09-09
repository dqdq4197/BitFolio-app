import React from 'react';
import styled, { css } from 'styled-components/native';
import Text from '/components/common/Text';


type TitleWrapProps = {
  title?: string;
  children?: React.ReactNode;
  paddingBottomZero?: boolean;
  parentPaddingZero?: boolean;
  marginTopZero?: boolean;
  marginBottomZero?: boolean;
  fontL?: boolean,
  fontX?: boolean,
  fontXL?: boolean,
  transparent?: boolean
}
const SurfaceWrap = ({ 
  title, 
  children, 
  paddingBottomZero = false, 
  parentPaddingZero = false,
  marginTopZero = false,
  marginBottomZero = false,
  fontL,
  fontX,
  fontXL,
  transparent = false
}: TitleWrapProps) => {

  return (
    <Container 
      paddingBottomZero={paddingBottomZero} 
      parentPaddingZero={parentPaddingZero}
      marginTopZero={marginTopZero}
      transparent={transparent}
    >
      { title &&
        <TitleWrap marginBottomZero={marginBottomZero} parentPaddingZero={parentPaddingZero}>
          <StyledText 
            color100 
            bold 
            fontXL={fontXL}
            fontX={fontX}
            fontL={fontL}
          >
            { title }
          </StyledText>
        </TitleWrap>
      }
      { children }
    </Container>
  )
}

export default SurfaceWrap;

type Props = {
  paddingBottomZero?: boolean;
  parentPaddingZero?: boolean;
  marginTopZero?: boolean;
  marginBottomZero?: boolean;
  transparent?: boolean;
}
const Container = styled.View<Props>`
  flex: 1;
  background-color: ${({ theme, transparent }) => 
    transparent ? 'transparent' : theme.base.background.surface };
  padding: ${({ theme }) => `${theme.content.surfacePadding} ${theme.content.spacing}`};
  ${ (props) => props.parentPaddingZero && css`
    padding-left: 0;
    padding-right: 0;
  `}
  ${ (props) => props.paddingBottomZero && css`
    padding-bottom: 0;
  `
  }
  ${ (props) => !props.marginTopZero && css`
    margin-top: ${props.theme.content.blankSpacing};
  `
  }
`
const TitleWrap = styled.View<Props>`
  ${(props) => !props.marginBottomZero && css`
    margin-bottom: 20px;
  `} 
  ${(props) => props.parentPaddingZero && css`
    padding: 0 ${props.theme.content.spacing};
  `}
`
const StyledText = styled(Text)`
  ${(props) => props.fontXL || props.fontL
    ? css`
    `
    : css`
      font-size: ${props.theme.size.font_x};
    `
  }
`