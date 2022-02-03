import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';

import useGlobalTheme from '/hooks/useGlobalTheme';

type LayoutProps = {
  stickyFooterComponent: React.ReactNode
  children: React.ReactNode
}

const KEYBOARD_VERTICAL_OFFSET = Platform.OS === 'ios' ? Constants.statusBarHeight + 44 : 44;

const FormLayout = ({ 
  stickyFooterComponent, 
  children 
}: LayoutProps) => {

  const { theme } = useGlobalTheme();
  return (
    <Container 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET} 
    >
      <StyledScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingTop: parseInt(theme.content.surfacePadding)
        }}
      >
        <StyledView>
          { children }
        </StyledView>
      </StyledScrollView>
      { stickyFooterComponent }
    </Container>
  )
}

export default FormLayout;

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.base.background.surface};
`

const StyledScrollView = styled.ScrollView`
  flex: 1;
  padding: ${({ theme }) => `0 ${theme.content.spacing}`};
`

const StyledView = styled.View`
  justify-content: center;
`