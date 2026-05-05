import React from 'react'
import { Platform, ScrollViewProps, Animated, ScrollView } from 'react-native'
import styled from 'styled-components/native'

import SurfaceTopView from './surface-top-view'

const isIos = Platform.OS === 'ios'
const BOTTOM_COLOR = 'transparent'

type RefType = Animated.LegacyRef<ScrollView> | ScrollView

interface CustomProps extends ScrollViewProps {
  children: React.ReactNode
  as?: Animated.AnimatedComponent<typeof ScrollView>
}

function CustomScrollView({ ref, ...props }: CustomProps & { ref?: RefType }) {
  return (
    <Container ref={ref} {...props}>
      <SurfaceTopView />
      {props.children}
    </Container>
  )
}

export default CustomScrollView

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => {
    return isIos ? BOTTOM_COLOR : theme.base.background.surface
  }};
`
