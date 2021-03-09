import React, { useRef } from 'react';
import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import { useActionSheet } from '@expo/react-native-action-sheet';

type HeaderProps = {
  HEADER_MAX_HEIGHT: number,
  HEADER_MIN_HEIGHT: number,
  scrollY: Animated.Value
}


const MarketListHeader = ({ HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, scrollY }:HeaderProps) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const options = ['Delete', 'Save', 'Cancel'];
  const destructiveButtonIndex = 0;
  const cancelButtonIndex = 2;
  const headerHeight = useHeaderHeight();
  
  const showActionSheet = () => {
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      buttonIndex => {
        // Do something here depending on the button index selected
      },
    );
  }
  
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
        // marginTop: headerHeight - 50,
        // height: viewHeight,
        // zIndex: viewZIndex,
        // elevation: viewZIndex
      }}
    >
      <SearchInput />
    </StyledView>
  )
}

export default MarketListHeader;



const StyledView = styled.View`
  flex-direction: row;
  /* height: 100px; */
  background-color: ${({theme}) => theme.base.background[100]};
`
const SearchInput = styled.TextInput`
  flex: 1;
  height: 50px;
  margin-right: 3px;
`