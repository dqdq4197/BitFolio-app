import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import styled, {css} from 'styled-components/native';
import GeneralTemplate from '/components/GeneralTemplate';


type QuoteProps = {

}

const Quote = ({}:QuoteProps) => {

  return (
    <GeneralTemplate>
      <StyledText>
        Quote
      </StyledText>
    </GeneralTemplate>
  )
}

const StyledText = styled.Text`
  color: ${({theme}) => theme.colors.text_100}
`

export default Quote;