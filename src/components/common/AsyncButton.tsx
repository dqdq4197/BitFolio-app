import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { css } from 'styled-components/native';
import useGlobalTheme from '/hooks/useGlobalTheme';
import Text, { TextStyleProps } from './Text';

export interface AsyncButtonProps extends TextStyleProps {
  text: string
  width?: number
  height: number
  isDisabled: boolean
  isLoading: boolean
  onPress: () => void
  borderPosition?: Array<'top' | 'bottom'>
  initialBgColor?: string
}

const AsyncButton = ({
  text, 
  width, 
  height, 
  isDisabled, 
  isLoading, 
  onPress, 
  borderPosition,
  initialBgColor, 
  ...textStyle 
}: AsyncButtonProps) => {

  const { theme, scheme } = useGlobalTheme();

  return (
    <Container
      borderPosition={borderPosition}
      width={width}
      height={height}
      isDisabled={isDisabled}
      disabled={isDisabled}
      activeOpacity={0.6}
      initialBgColor={initialBgColor}
      onPress={onPress}
    >
      <CustomText 
        {...textStyle} 
        isDisabled={isDisabled}
        bold
      >
        { text }
      </CustomText>
      { isLoading 
        ? <IndicatorWarp>
            <ActivityIndicator size="small" color={ theme.base.primaryColor } />
          </IndicatorWarp>
        : null
      }
    </Container>
  )
}

export default AsyncButton;

type ContainerProps = Pick<
  AsyncButtonProps, 
  "borderPosition" | "height" | "isDisabled" | "width" | "initialBgColor"
>

type TextProps = Pick<AsyncButtonProps, "isDisabled">

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
  ${({ theme, height, isDisabled, width, initialBgColor }) => css`
    width: ${ width ? width + 'px' : '100%' };
    height: ${ height }px;
    background-color: ${ 
      isDisabled 
        ? theme.dark
          ? theme.base.background[400] 
          : theme.base.background[500] 
        : initialBgColor || theme.base.primaryColor 
    };
  `}
`

const CustomText = styled(Text)<TextProps>`
  color: ${({ isDisabled }) => 
    isDisabled ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,1)'
  };
`

const IndicatorWarp = styled.View`
  margin-left: 10px;
`