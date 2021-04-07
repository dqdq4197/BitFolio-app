import React, { forwardRef } from 'react';
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInputSelectionChangeEventData,
  TextInputFocusEventData
} from 'react-native';
import styled, { css } from 'styled-components/native';
import { useColorScheme } from 'react-native-appearance';
import RenderText from './RenderText';
import { types } from './constants';


interface PlainTextInputProps {
  index: number,
  focusState: {
    index: number,
    action: string
  },
  payload: {
    text: string,
    styles: string[]
  },
  type: string,
  isLastIndex: boolean,
  onInputChangeText: (text:string, index:number) => void,
  onInputKeyPress: (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>, 
    index: number
  ) => void,
  onSelectionChange: (
    event: NativeSyntheticEvent<TextInputSelectionChangeEventData>, 
    index: number
  ) => void,
  onFocus: (
    event: NativeSyntheticEvent<TextInputFocusEventData>, 
    index: number
  ) => void,
  onTextRendering: (bool: boolean) => void,
}

const PlainTextInput = forwardRef<TextInput, PlainTextInputProps>(
  ({
    index,
    focusState,
    type,
    isLastIndex,
    payload,
    onInputChangeText,
    onInputKeyPress,
    onSelectionChange,
    onFocus,
    onTextRendering,
  }, textInputRef) => {
  const scheme = useColorScheme();

  return (
    <StyledTextInput
      keyboardAppearance={scheme === 'dark' ? 'dark' : 'light'}
      ref={focusState.index === index ? textInputRef : null}
      multiline
      value={""}
      blurOnSubmit={false}
      spellCheck={false}
      scrollEnabled={false}
      onChangeText={(text) => onInputChangeText(text, index)} 
      onKeyPress={(event) => onInputKeyPress(event, index)}
      onSelectionChange={event => onSelectionChange(event, index)}
      onFocus={(event) => onFocus(event, index)}
      textAlignVertical="center"
      style={isLastIndex && { display: 'none' }}
      type={type}
    >
      <RenderText 
        type={type}
        paragraph={payload.text}
        onTextRendering={onTextRendering}
        index={index}
      />
    </StyledTextInput>
  )
})

export default PlainTextInput;

interface TextInputProps {
  type: string,
}
const StyledTextInput = styled.TextInput<TextInputProps>`
  color: white;
  /* background-color: rgba(255,255,255, .2); */

  ${(props) => { 
    switch(props.type) {
      case types.QUOTE: 
        return StyledQuote
      case types.HEADER:
        return StyledHeader
      default:
        return StyledParagraph
    }
  }}
`

const StyledParagraph = css`
  font-size:${({theme}) => theme.size.font_l};
  padding: 5px 15px;
`

const StyledQuote = css`
  padding: 5px 20px;
  border-left-width: 5px;
  border-left-color: white;
`

const StyledHeader = css`
  padding: 10px 20px;
`