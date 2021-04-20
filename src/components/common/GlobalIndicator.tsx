import React from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import styled from 'styled-components/native';


const { width } = Dimensions.get('window')

interface IndicatorType {
  size?: 'large' | 'small'
  isLoaded: boolean,
}
export default function GlobalIndicator({ size="large", isLoaded }:IndicatorType) {

  if(isLoaded) return <></>;
  return (
    <IndicatorWrap>
      <ActivityIndicator 
        size={size} 
        color="white"
      />
    </IndicatorWrap>
  )
}



const IndicatorWrap = styled.View`
  position:absolute;
  background-color: ${({theme}) => theme.colors.grey[900]};
  flex: 1;
  width: ${width}px; 
  height: 100%;
  align-items: center;
  justify-content: center;
`