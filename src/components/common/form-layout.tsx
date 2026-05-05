import React, { PropsWithChildren } from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import useGlobalTheme from '@/hooks/use-global-theme'

type LayoutProps = {
  stickyFooterComponent: React.ReactNode
}

const FormLayout = ({
  stickyFooterComponent,
  children,
}: PropsWithChildren<LayoutProps>) => {
  const { theme } = useGlobalTheme()
  const insets = useSafeAreaInsets()
  const keyboardVerticalOffset =
    Platform.OS === 'ios' ? insets.top + 56 + 10 : 56

  return (
    <Container
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <StyledScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingTop: parseInt(theme.content.surfacePadding, 10),
        }}
      >
        <StyledView>{children}</StyledView>
      </StyledScrollView>
      {stickyFooterComponent}
    </Container>
  )
}

export default FormLayout

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.base.background.surface};
`

const StyledScrollView = styled.ScrollView`
  width: 100%;
  padding: ${({ theme }) => `0 ${theme.content.spacing}`};
`

const StyledView = styled.View`
  justify-content: center;
`
