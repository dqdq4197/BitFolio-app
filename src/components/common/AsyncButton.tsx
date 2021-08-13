import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { css } from 'styled-components/native';
import useGlobalTheme from '/hooks/useGlobalTheme';
import Text, { TextStyleProps } from './Text';

interface ButtonProps extends TextStyleProps {
  text: string
  width?: number
  height: number
  isDisabled: boolean
  isLoading: boolean
  onPress: () => void
  borderPosition?: Array<'top' | 'bottom'>
}

const AsyncButton = ({
  text, 
  width, 
  height, 
  isDisabled, 
  isLoading, 
  onPress, 
  borderPosition, 
  ...textStyle 
}: ButtonProps) => {

  const { theme } = useGlobalTheme();

  return (
    <Container
      borderPosition={borderPosition}
      width={width}
      height={height}
      isDisabled={isDisabled}
      disabled={isDisabled}
      activeOpacity={0.6}
      onPress={onPress}
    >
      <CustomText 
        {...textStyle} 
        isDisabled={isDisabled}
        margin="0 10px 0 0"
        bold
      >
        { text }
      </CustomText>
      { isLoading 
        ? <ActivityIndicator size="small" color={ theme.base.primaryColor } />
        : null
      }
    </Container>
  )
}

export default AsyncButton;

type ContainerProps = Pick<
  ButtonProps, 
  "borderPosition" | "height" | "isDisabled" | "width"
>

type TextProps = Pick<ButtonProps, "isDisabled">

const Container = styled.TouchableOpacity<ContainerProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${({ borderPosition }) => borderPosition?.includes('top') && css`
    border-top-left-radius: ${({ theme }) => theme.border.l};
    border-top-right-radius: ${({ theme }) => theme.border.l};
  `}
  ${({ borderPosition }) => borderPosition?.includes('bottom') && css`
    border-bottom-left-radius: ${({ theme }) => theme.border.l};
    border-bottom-right-radius: ${({ theme }) => theme.border.l};
  `}
  ${({ theme, height, isDisabled, width }) => css`
    width: ${ width ? width + 'px' : '100%' };
    height: ${ height }px;
    background-color: ${ isDisabled ? theme.base.background[400] : theme.base.primaryColor };
  `}
`

const CustomText = styled(Text)<TextProps>`
  color: ${({ isDisabled }) => 
    isDisabled ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,1)'
  }
`