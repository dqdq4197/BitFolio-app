import React from 'react';
import styled from 'styled-components/native';
import { Animated } from 'react-native';

type HeaderProps = {
  HEADER_MAX_HEIGHT: number,
  HEADER_MIN_HEIGHT: number,
  scrollY: Animated.Value
}

const MarketListHeader = ({ HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, scrollY }:HeaderProps) => {
  
  const viewHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp'
  })

  const viewZIndex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT],
    outputRange: [0, 0, 1000],
    extrapolate: 'clamp'
  })
  return (
    <StyledView 
      as={Animated.View}
      style={{
        height: viewHeight,
        zIndex: viewZIndex,
        elevation: viewZIndex
      }}
    >

    </StyledView>
  )
}

export default MarketListHeader;



const StyledView = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${({theme}) => theme.base.background[100]};
`