import React from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import useGlobalTheme from '/hooks/useGlobalTheme';


const { width } = Dimensions.get('window')

interface IndicatorType {
  size?: 'large' | 'small'
  isLoaded: boolean,
}
export default function GlobalIndicator({ size="large", isLoaded }:IndicatorType) {

  const { theme } = useGlobalTheme();

  if(isLoaded) return <></>;
  return (
    <IndicatorWrap>
      <ActivityIndicator 
        size={size} 
        color={ theme.base.text[100] }
      />
    </IndicatorWrap>
  )
}



const IndicatorWrap = styled.View`
  position:absolute;
  background-color: ${({theme}) => theme.base.background[200]};
  flex: 1;
  width: ${width}px; 
  height: 100%;
  align-items: center;
  justify-content: center;
`