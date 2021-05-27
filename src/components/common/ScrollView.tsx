import React from 'react';
import { Platform, ScrollViewProps } from 'react-native';
import styled from 'styled-components/native';
import SurfaceTopView from './SurfaceTopView';


const isIos = Platform.OS === 'ios'
const BOTTOM_COLOR = 'transparent';

interface CustomProps extends ScrollViewProps {
  children: React.ReactNode
}
const CustomScrollView = ({ ...props }: CustomProps) => {

  return (
    <ScrollView
      {...props}
    >
      <SurfaceTopView />
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