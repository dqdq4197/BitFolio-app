import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import styled from 'styled-components/native';


type TemplateProps = {
  children: React.ReactNode
}
const GeneralTemplate = ({ children }: TemplateProps) => {

  const scheme = useColorScheme();
  
  return (
    <Container>
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

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => {
    return theme.base.background[100];
  }};
  padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight + 'px' : 0};
`

export default GeneralTemplate;