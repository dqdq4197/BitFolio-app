import React from 'react';
import { Platform, ScrollViewProps } from 'react-native';
import styled from 'styled-components/native';

const isIos = Platform.OS === 'ios'
const SPACER_SIZE = 1000;
const BOTTOM_COLOR = 'transparent';

interface CustomProps extends ScrollViewProps {
  children: React.ReactNode
}
const CustomScrollView = ({ ...props }: CustomProps) => {

  return (
    <ScrollView
      {...props}
    >
      { isIos && <View /> }
      { props.children }
    </ScrollView>
  );
}

export default CustomScrollView;

const ScrollView = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => {
    return isIos ? BOTTOM_COLOR : theme.base.background.surface
  }};
`

const View = styled.View`
  position: absolute;
  z-index: -1;
  height: ${ SPACER_SIZE }px;
  background-color: ${({ theme }) => theme.base.background.surface};
  top: -${ SPACER_SIZE }px;
  left: 0;
  right: 0;
`