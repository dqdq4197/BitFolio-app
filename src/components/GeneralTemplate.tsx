import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/stack';



type TemplateProps = {
  children: React.ReactNode
}
const GeneralTemplate = ({ children }: TemplateProps) => {

  const scheme = useColorScheme();
  const headerHeight = useHeaderHeight();
  
  return (
    <Container 
      as={SafeAreaView}
      navHeight={headerHeight}
    >
      <StatusBar
        translucent={true}
        animated={true}
        backgroundColor='transparent'
        barStyle={scheme === 'dark' ? 'light-content' : 'light-content'}
      />
      {children}
    </Container>
  )
}

interface ContainerProps {
  navHeight: number
}
const Container = styled.SafeAreaView<ContainerProps>`
  flex: 1;
  background-color: ${({theme}) => {
    return theme.base.background[100];
  }};
  padding-top: ${
    (props) => Platform.OS === 'android' 
      ? StatusBar.currentHeight as number + 'px' 
      : props.navHeight + 'px'
  };
`

export default GeneralTemplate;