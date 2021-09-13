import React, { forwardRef } from 'react';
import { Platform, ScrollViewProps, Animated, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import SurfaceTopView from './SurfaceTopView';


const isIos = Platform.OS === 'ios'
const BOTTOM_COLOR = 'transparent';

type RefType = Animated.LegacyRef<ScrollView> | ScrollView

interface CustomProps extends ScrollViewProps {
  children: React.ReactNode
  as?: Animated.AnimatedComponent<typeof ScrollView>
}

const CustomScrollView = forwardRef<RefType, CustomProps>(
  ({ ...props }, ref) => {

  return (
    <Container
      ref={ref}
      {...props}
    >
      <SurfaceTopView />
      { props.children }
    </Container>
  );
})

export default CustomScrollView;

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => {
    return isIos ? BOTTOM_COLOR : theme.base.background.surface
  }};
`