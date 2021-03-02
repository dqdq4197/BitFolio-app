import React from 'react';
import { StatusBar } from 'react-native';
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
        animated={true}
        backgroundColor='transparent'
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
        {children}
    </Container>
  )
}


const Container = styled.SafeAreaView`
  height: 100%;
  background-color: ${({theme}) => {
    return theme.base.background[100];
  }}
`

export default GeneralTemplate;