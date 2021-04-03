import React, { useRef, useEffect, useState } from 'react';
import { 
  TextInput, 
  NativeSyntheticEvent, 
  TextInputSelectionChangeEventData,
  TextInputKeyPressEventData
} from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import styled, { css } from 'styled-components/native';
import ControlBar from './ControlBar';
import KeyboardAwareScrollView from './KeyboardAwareScrollView';
import { unicodes, types, actions } from './constants';
import RenderText from './RenderText';
import Text from '/components/common/Text';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const CONTROL_BAR_HEIGHT = 45;
interface ContentType {
  type: string,
  payload: {
    text?: string,
    styles?: string[]
  }
}

const Editor = () => {

  const textInputRef = useRef<TextInput>(null);
  const [focusState, setFocusState] = useState({
    index: 0,
    action: ''
  });
  const [contentStorage, setContentStorage] = useState<ContentType[]>([
    {
      type: types.PARAGRAPH,
      payload: {
        text: `${unicodes.TEXT_MARKER}hello${unicodes.TEXT_MARKER}${unicodes.TEXT_LINK}${unicodes.TEXT_ITALIC}${unicodes.TEXT_BOLD}hi${unicodes.TEXT_BOLD}${unicodes.TEXT_ITALIC}${unicodes.TEXT_LINK}how are ${unicodes.TEXT_BOLD}you${unicodes.TEXT_BOLD}?`,
        styles: [
          'NORMAL',
        ]
      }
    },
    {
      type: types.PARAGRAPH,
      payload: {
        text: "",
        styles: [
          'NORMAL',
        ]
      }
    }
  ])
  const [selection, setSelection] = useState({
    start: 0,
    end: 0
  })
  const scheme = useColorScheme();

  useEffect(() => {
    if(textInputRef.current) {
      textInputRef.current.focus();
      if(focusState.action === actions.ENTER || focusState.action === actions.BACKSPACE || (focusState.action === actions.LINEPOP && focusState.index !== 0)) {
        textInputRef.current.setNativeProps({ selection })
        console.log('하하', selection, focusState.action);
      }
    }

  }, [focusState.index])

  const updateFocusState = (index:number, action:string, selectionEnd: number) => {
    setFocusState({ index, action })
    setSelection({
      start: selectionEnd,
      end: selectionEnd
    })
  }

  const FocusActionReset = (index?: number) => {

    if(index !== undefined) {
      setFocusState({
        index,
        action: actions.TYPING
      })
    } else if(focusState.action !== actions.TYPING) {
      setFocusState(prevState => ({
        ...prevState,
        action: actions.TYPING
      }))
    }
  }

  console.log(focusState.action, selection);

  const handleInputChangeText = (text:string, index:number) => {
    const lineBreak = /\r|\n/.exec(text);
    let { action } = focusState;
    if (lineBreak) {
      return ;
    }
    if(action === actions.LINEPOP || action === actions.BACKSPACE) {
      // return FocusActionReset();
    }
    const currentContext = contentStorage[index];

    currentContext.payload.text = text;

    setContentStorage((prev) => [
      ...prev.slice(0, index),
      currentContext,
      ...prev.slice(index + 1, contentStorage.length)
    ])

    // FocusActionReset();
  }

  const handleInputKeyPress = (
    event:NativeSyntheticEvent<TextInputKeyPressEventData>, 
    index:number
  ) => {
    if(focusState.index !== index) return ;
    const { key } = event.nativeEvent;
    const currentContext = contentStorage[index];
    const currentText = currentContext.payload.text as string;

    // enter key 
    if(key === 'Enter') {
      const editedText = currentText.slice(0, selection.start);
      currentContext.payload.text = editedText;

      let newContext = {
        type: types.PARAGRAPH,
        payload: {
          text: currentText.slice(selection.end, currentText.length),
          styles: [],
        }
      }
      setContentStorage(
        (prev) => [
          ...prev.slice(0, index),
          currentContext,
          newContext,
          ...prev.slice(index + 1, prev.length)
        ]
      )
      updateFocusState(index + 1, actions.ENTER, 0)
    }
    
    if(key === "Backspace" && index !== 0) {
      const prevContext = contentStorage[index - 1];
      const prevText = prevContext.payload.text as string;


      if(selection.end === 0) {
        if(prevContext.type === types.DELIMITER) {
          console.log('3')

          setContentStorage(
            (prev) => [
              ...prev.slice(0, index - 1),
              ...prev.slice(index, prev.length)
            ]
          )
          updateFocusState(index - 1, actions.BACKSPACE, 0);
        } else {
          if(currentText === "") {
            //onPress backspace remove current line
            console.log('2')

            setContentStorage(
              (prev) => [
              ...prev.slice(0, index),
              ...prev.slice(index + 1, prev.length)
              ]
            )
            updateFocusState(index - 1, actions.LINEPOP, prevText.length)
          } else {
            //onPress backspace merge previous line
            console.log('1')
            const editedText = prevText + currentText;
            prevContext.payload.text = editedText;
            setContentStorage(
              (prev) => [
                ...prev.slice(0, index - 1),
                prevContext,
                ...prev.slice(index + 1, prev.length)
              ]
            )
            updateFocusState(index - 1, actions.BACKSPACE, prevText.length)
          }
        }
      }
    }
  }

  console.log(contentStorage)

  const replaceRange = (
    s: string,
    start: number,
    end: number,
    substitute: string
  ) => {
    return s.substring(0, start) + substitute + s.substring(start, end) + substitute + s.substring(end);
  }

  const handleBoldPress = () => {
    const { index } = focusState;
    const currentContext = contentStorage[index]
    const currentText = currentContext.payload.text as string;
    const editedText = replaceRange(currentText, selection.start, selection.end, unicodes.TEXT_BOLD)
    
    currentContext.payload.text = editedText;

    setContentStorage(
      (prev) => [
        ...prev.slice(0, index),
        currentContext,
        ...prev.slice(index + 1, prev.length)
      ]
    )
  }

  const handleQuotePress = () => {
    let { index } = focusState;
    let currentContext = contentStorage[index];

    if(currentContext.type === types.QUOTE) {
      currentContext.type = types.PARAGRAPH;
    } else {
      currentContext.type = types.QUOTE;
    }

    setContentStorage(
      (prev) => [
        ...prev.slice(0, index),
        currentContext,
        ...prev.slice(index + 1, prev.length)
      ]
    )
  }

  const handleHeaderPress = () => {
    let { index } = focusState;
    let currentContext = contentStorage[index];

    if(currentContext.type === types.HEADER) {
      currentContext.type = types.PARAGRAPH;
    } else {
      currentContext.type = types.HEADER;
    }

    setContentStorage(
      (prev) => [
        ...prev.slice(0, index),
        currentContext,
        ...prev.slice(index + 1, prev.length)
      ]
    )
  }

  const handleDelimiterPress = () => {
    let { index } = focusState;
    const nextContext = contentStorage[index + 1];
    const isLastContent = index === contentStorage.length - 2;
    let newContext:ContentType[] = [];

    newContext.push({
      type: types.DELIMITER,
      payload: {}
    })

    if(isLastContent || nextContext.type === types.DELIMITER) {
      newContext.push({
        type: types.PARAGRAPH,
        payload: {
          text: "",
          styles: []
        }
      })
    }

    setContentStorage(
      (prev) => [
        ...prev.slice(0, index + 1),
        ...newContext,
        ...prev.slice(index + 1, prev.length)
      ]
    )
    updateFocusState(index + 2, actions.TYPING, 0);
  }

  const handleSelectionChange = (
    event: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
    index: number
  ) => {
    const { selection } = event.nativeEvent;
    const { index: focusIndex, action } = focusState;

    if(focusIndex === index) {
      if(action === actions.ENTER) {
        setSelection({
          start: 0,
          end: 0
        })
      } else if(action === actions.LINEPOP) {
        // todo when action is pop
      } else if(action === actions.BACKSPACE) {
        // todo when action is backspace
      } else {
        setSelection(selection)
      }
    }
  }


  const InputArea = () => (
    contentStorage.map((content, index) => {
      const { type, payload } = content;
      
      if(type === types.PARAGRAPH || type === types.QUOTE || type === types.HEADER) {
        return (
          <StyledTextInput
            key={'input' + index} 
            keyboardAppearance={scheme === 'dark' ? 'dark' : 'light'}
            ref={focusState.index === index ? textInputRef : null}
            multiline
            value={''}
            returnKeyType='next'
            returnKeyLabel="next"
            blurOnSubmit={false}
            spellCheck={false}
            scrollEnabled={false}
            contextMenuHidden={true}
            onChangeText={(text) => handleInputChangeText(text, index)} 
            onKeyPress={(event) => handleInputKeyPress(event, index)}
            onSelectionChange={event => handleSelectionChange(event, index)}
            onFocus={() => { 
                FocusActionReset(index)}
            }
            style={contentStorage.length - 1 === index && { display: 'none' }}
            type={type}
          >
            <RenderText 
              type={type}
              paragraph={payload.text as string}
            />
          </StyledTextInput>
        )
      } else if(type === types.DELIMITER) {
        return (
          <StyledDelimiter key={'input' + index}> 
            <Text fontXXXL>
              * * *
            </Text>
          </StyledDelimiter>
        )
      }
    })
  )
  return (
    <>
      <KeyboardAwareScrollView
        autoScrollDependency={focusState.index}
        extraScrollHeight={CONTROL_BAR_HEIGHT}
      >
        {InputArea()}
      </KeyboardAwareScrollView>
      <ControlBar 
        selecting={selection.start !== selection.end}
        onBoldPress={handleBoldPress}
        onQuotePress={handleQuotePress}
        onHeaderPress={handleHeaderPress}
        onDelimiterPress = {handleDelimiterPress}
      />
    </>
  )
}

export default Editor;


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

const StyledDelimiter = styled.View`
  height: 50px;
  width: 100%;
  justify-content: center;
  align-items: center;
`