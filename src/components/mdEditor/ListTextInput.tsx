import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { useColorScheme } from 'react-native-appearance';
import RenderText from './RenderText';
import { unicodes } from './constants';




interface ListTProps {
  text: string,
  style: 'ordered' | 'unordered',
  listIndex: number,
}

const { width } = Dimensions.get('window');
const ListTextInput = ({
  text,
  style,
  listIndex,
}:ListTProps) => {
  const scheme = useColorScheme();
  
  return (
    <ListView>
      <ListMark>
        {style === 'unordered' ? unicodes.UL_BULLET : listIndex + 1 + " ."}
      </ListMark>
      <StyledTextInput
        keyboardAppearance={scheme === 'dark' ? 'dark' : 'light'}
        multiline
        value={text}
        blurOnSubmit={false}
        spellCheck={false}
        scrollEnabled={false}
      >

      </StyledTextInput>

    </ListView>
  )
}

export default ListTextInput;

const ListView = styled.View`
  flex-direction: row;
  width: ${width}px;
  align-items: center;
`

const ListMark = styled.Text`
  color: white;
  padding: 0 0px 0 15px;
  /* background-color: rgba(255,255,255, .2); */
  font-size:${({theme}) => theme.size.font_l};
`

const StyledTextInput = styled.TextInput`
  padding: 5px 15px;
  width: 100%;
  /* background-color: rgba(255,255,255, .2); */
  font-size:${({theme}) => theme.size.font_l};
  color:white;

`