import React, { useRef, useEffect, useState } from 'react';
import { 
  TextInput, 
  NativeSyntheticEvent, 
  TextInputSelectionChangeEventData
} from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import styled from 'styled-components/native';
import ControlBar from './ControlBar';
import KeyboardAwareScrollView from './KeyboardAwareScrollView';
import { unicodes, types, actions } from './constants';
import RenderText from './RenderText';
// import Text from '/components/common/Text';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const CONTROL_BAR_HEIGHT = 45;

const Editor = () => {

  const textInputRef = useRef<TextInput>(null);
  const [focusState, setFocusState] = useState({
    index: 0,
    action: ''
  });
  const [contentStorage, setContentStorage] = useState([
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
      }
    }

  }, [focusState.index])


  const updateCursorPosition = (index:number, action:string, selectionEnd: number) => {
    setFocusState({ index, action })
    setSelection({
      start: selectionEnd,
      end: selectionEnd
    })
  }

  const FocusActionReset = (index?: number) => {
    if(index) {
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

  const handleInputChangeText = (text:string, index:number) => {
    const lineBreak = /\r|\n/.exec(text);
    if (lineBreak) {
      return ;
    }
    const currentContext = contentStorage[index];

    if(currentContext.payload.text === "" && text === "") {
      return FocusActionReset();
    }
    currentContext.payload.text = text;

    setContentStorage((prev) => [
      ...prev.slice(0, index),
      currentContext,
      ...prev.slice(index + 1, contentStorage.length)
    ])

    FocusActionReset();
  }

  // backspace remove input text
  const handleInputKeyPress = (event:any, index:number) => {
    if(focusState.index !== index) return ;
    const { key } = event.nativeEvent;
    
    if(key === "Backspace" && index !== 0) {
      const currentText = contentStorage[index].payload.text;
      const prevContext = contentStorage[index - 1];
      const prevText = prevContext.payload.text;

      if(currentText === "") {
        //onPress backspace remove current line
        setContentStorage((prev) => [
          ...prev.slice(0, index),
          ...prev.slice(index + 1, prev.length)
        ])
        updateCursorPosition(index - 1, actions.LINEPOP, prevText.length)
      } else if(selection.end === 0) {
        //onPress backspace merge previous line
        const editedText = prevText + currentText;
        prevContext.payload.text = editedText;
        setContentStorage(
          (prev) => [
            ...prev.slice(0, index - 1),
            prevContext,
            ...prev.slice(index + 1, prev.length)
          ]
        )
        updateCursorPosition(index - 1, actions.BACKSPACE, prevText.length)
      }
    }
  }

  console.log(contentStorage);
  // enter key 
  const handleInputSubmitEditing = (index:number) => {
    console.log('enter')
    const oldContext = contentStorage[index];
    const text = oldContext.payload.text;
    const editedText = text.slice(0, selection.start);
    oldContext.payload.text = editedText

    let newContext = {
      type: types.PARAGRAPH,
      payload: {
        text: text.slice(selection.end, text.length),
        styles: []
      }
    }
    setContentStorage(
      (prev) => [
        ...prev.slice(0, index),
        oldContext,
        newContext,
        ...prev.slice(index + 1, prev.length)
      ]
    )
    updateCursorPosition(index + 1, actions.ENTER, 0)
  }
  const handleSelectionChange = (
    event: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
    index: number
  ) => {
    const { selection } = event.nativeEvent;
    const { index: focusIndex, action } = focusState;

    if( focusIndex === index) {
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
    const currentText = currentContext.payload.text;
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
  const InputArea = () => (
    contentStorage.map((content, index) => {
      const { type, payload } = content;
      
      if(type === types.PARAGRAPH || type === types.QUOTE) {
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
            onSubmitEditing={() => handleInputSubmitEditing(index)}
            onEndEditing={() => console.log('enter')}
            onChangeText={(text) => handleInputChangeText(text, index)} 
            onKeyPress={(event) => handleInputKeyPress(event, index)}
            onSelectionChange={event => handleSelectionChange(event, index)}
            onFocus={() => FocusActionReset(index)}
            style={contentStorage.length - 1 === index && { display: 'none' }}
          >
            <RenderText 
              paragraph={payload.text}
            />
          </StyledTextInput>
        )
      } else {
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
        selecting
        onBoldPress={handleBoldPress}
      />
    </>
  )
}

export default Editor;

const StyledTextInput = styled.TextInput`
  padding: 5px 15px;
  font-size: 22px;
  color: white;
  background-color: rgba(255,255,255, .2);
  margin: 5px 0;
`

