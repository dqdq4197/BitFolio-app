import React, { PropsWithChildren } from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'
import Constants from 'expo-constants'

import useGlobalTheme from '/hooks/useGlobalTheme'

type LayoutProps = {
  stickyFooterComponent: React.ReactNode
}

/**
 * navigation presentation mode일 경우 상단 offset이 발생하기 때문에
 * sticky footer offset이 약간에 오차가 있어서
 * presentation mode가 아닌 화면에 구현할 시 'keyboardVerticalOffset'값을
 * 수정해주어야 할듯
 * 현재 -> 상태바 + header 높이 + presentation offset(10)으로 가정
 * 일반적인 상태 -> 상태바 + 44
 */
const KEYBOARD_VERTICAL_OFFSET =
  Platform.OS === 'ios' ? Constants.statusBarHeight + 56 + 10 : 56

const FormLayout = ({
  stickyFooterComponent,
  children,
}: PropsWithChildren<LayoutProps>) => {
  const { theme } = useGlobalTheme()

  return (
    <Container
      behavior="padding"
      keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
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
