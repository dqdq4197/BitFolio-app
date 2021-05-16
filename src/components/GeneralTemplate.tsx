import React from 'react';
import { StatusBar, Platform, Appearance } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/stack';
import useGlobalTheme from '/hooks/useGlobalTheme';



type TemplateProps = {
  children: React.ReactNode
}

const STATUSBAR_DEFAULT_HEIGHT = 20;

const GeneralTemplate = ({ children }: TemplateProps) => {
  const { scheme } = useGlobalTheme();
  const headerHeight = useHeaderHeight();

  return (
    <Container 
      navHeight={headerHeight}
    >
      <StatusBar
        translucent
        animated
        backgroundColor={'transparent'}
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      {children}
    </Container>
  )
}

interface ContainerProps {
  navHeight: number
}

// status bar 높이 빼주자 padding-top에  
const Container = styled.SafeAreaView<ContainerProps>`
  flex: 1;
  background-color: ${({theme}) => {
    return theme.base.background[100];
  }};
  /* padding-top: ${
    (props) => Platform.OS === 'android' 
      ? StatusBar.currentHeight as number + 'px' 
      : props.navHeight - STATUSBAR_DEFAULT_HEIGHT + 'px'
  }; */
`

export default GeneralTemplate;