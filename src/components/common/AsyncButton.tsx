import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { css } from 'styled-components/native';
import useGlobalTheme from '/hooks/useGlobalTheme';
import Text, { TextStyleProps } from './Text';

type ButtonProps = {
  text: string
  width?: number
  height: number
  isDisabled: boolean
  isLoading: boolean
  onPress: () => void
  textStyle?: TextStyleProps
}
const AsyncButton = (props: ButtonProps) => {

  const { theme } = useGlobalTheme();

  return (
    <Container
      {...props}
      disabled={props.isDisabled}
    >
      <CustomText 
        {...props}
        {...props.textStyle} 
        margin="0 10px 0 0"
        bold  
      >
        { props.text }
      </CustomText>
      { props.isLoading 
        ? <ActivityIndicator size="small" color={ theme.base.primaryColor } />
        : null
      }
    </Container>
  )
}

export default AsyncButton;

const Container = styled.TouchableOpacity<ButtonProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${({ theme }) => theme.border.l};
  border-top-right-radius: ${({ theme }) => theme.border.l};
  ${({ theme, height, isDisabled, width }) => css`
    width: ${ width ? width + 'px' : '100%' };
    height: ${ height }px;
    background-color: ${ isDisabled ? theme.base.background[400] : theme.base.primaryColor };
  `}
`

const CustomText = styled(Text)<ButtonProps>`
  color: ${({ isDisabled }) => 
    isDisabled ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,1)'
  }
`