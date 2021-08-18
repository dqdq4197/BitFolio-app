import React from 'react';
import { Platform, ScrollViewProps, Animated, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import SurfaceTopView from './SurfaceTopView';


const isIos = Platform.OS === 'ios'
const BOTTOM_COLOR = 'transparent';

interface CustomProps extends ScrollViewProps {
  children: React.ReactNode
  as?: Animated.AnimatedComponent<typeof ScrollView>
}
const CustomScrollView: React.FunctionComponent<CustomProps> = ({ ...props }) => {

  return (
    <Container
      {...props}
    >
      <SurfaceTopView />
      { props.children }
    </Container>
  );
}

export default CustomScrollView;

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => {
    return isIos ? BOTTOM_COLOR : theme.base.background.surface
  }};
`