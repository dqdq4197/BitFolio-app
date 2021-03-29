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
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


// const UL_BULLET = "\u2022";

const CONTROL_BAR_HEIGHT = 45;

const Editor = () => {

  const textInputRef = useRef<TextInput>(null);
  const [focusState, setFocusState] = useState({
    index: 0,
    behavior: ''
  });
  const [contentStorage, setContentStorage] = useState([
    {
      type: "text",
      payload: {
        text: "",
        styles: [
          'NORMAL',
        ]
      }
    },
    {
      type: "text",
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
      if(focusState.behavior === 'enter' || focusState.behavior === 'backspace' || (focusState.behavior === 'pop' && focusState.index !== 0)) {
        textInputRef.current.setNativeProps({ selection })
      }
    }

  }, [focusState.index])


  const updateCursorPosition = (index:number, behavior:string, selectionEnd: number) => {
    setFocusState({ index, behavior })
    setSelection({
      start: selectionEnd,
      end: selectionEnd
    })
  }

  const handleInputChangeText = (text:string, index:number) => {
    const lineBreak = /\r|\n/.exec(text);
    if (lineBreak) {
      return ;
    }
    const currentContext = contentStorage[index];
    currentContext.payload.text = text;
    
    setContentStorage((prev) => [
      ...prev.slice(0, index),
      currentContext,
      ...prev.slice(index + 1, contentStorage.length)
    ])

    if(focusState.behavior !== 'reset')
      setFocusState(prevState => ({
        ...prevState,
        behavior: 'reset'
      }))
  }

  // backspace remove input text
  const handleInputKeyPress = (event:any, index:number) => {
    if(focusState.index !== index) return ;

    const { key } = event.nativeEvent;
    
    if(key === 'Backspace' && index !== 0) {
      const currentText = contentStorage[index].payload.text;
      const prevContext = contentStorage[index - 1];
      const prevText = prevContext.payload.text;

      if(currentText === "") {
        setContentStorage((prev) => [
          ...prev.slice(0, index),
          ...prev.slice(index + 1, prev.length)
        ])
        updateCursorPosition(index - 1, 'pop', prevText.length)
      } else if(selection.end === 0) {
        const editedText = prevText + currentText;
        prevContext.payload.text = editedText;
        setContentStorage(
          (prev) => [
            ...prev.slice(0, index - 1),
            prevContext,
            ...prev.slice(index + 1, prev.length)
          ]
        )
        updateCursorPosition(index - 1, 'backspace', prevText.length)
      }
    }
  }

  // enter key 
  const handleInputSubmitEditing = (index:number) => {
    const oldContext = contentStorage[index];
    const text = oldContext.payload.text;
    const editedText = text.slice(0, selection.start);
    oldContext.payload.text = editedText

    let newContext = {
      type:"text",
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
    updateCursorPosition(index + 1, 'enter', 0)
  }
  const handleSelectionChange = (
    event: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
    index: number
  ) => {
    const { selection } = event.nativeEvent;
    const { index: focusIndex, behavior } = focusState;

    if( focusIndex === index) {
      if(behavior === 'enter') {
        setSelection({
          start: 0,
          end: 0
        })
      } else if(behavior === 'pop') {
        // todo when behavior is pop
      } else if(behavior === 'backspace') {
        // todo when behavior is backspace
      } else {
        setSelection(selection)
      }
    }
  }

  const InputArea = () => (
    contentStorage.map((content, index) => {
      const { type, payload } = content;
      
      if(type === 'text' || type === 'quote') {
        return (
          <>
          <StyledTextInput
            key={'input' + index} 
            keyboardAppearance={scheme === 'dark' ? 'dark' : 'light'}
            ref={focusState.index === index ? textInputRef : null}
            value={payload.text}
            multiline
            returnKeyType='next'
            blurOnSubmit={false}
            spellCheck={false}
            scrollEnabled={false}
            onSubmitEditing={() => handleInputSubmitEditing(index)}
            onChangeText={(text) => handleInputChangeText(text, index)} 
            onKeyPress={(event) => handleInputKeyPress(event, index)}
            onSelectionChange={event => handleSelectionChange(event, index)}
            onFocus={() => {
              setFocusState({
                index,
                behavior: 'reset'
              })
            }}
            style={contentStorage.length - 1 === index && { display: 'none' }}
          />
          </>
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
      <ControlBar/>
    </>
  )
}

export default Editor;

const StyledTextInput = styled.TextInput`
  padding: 5px 15px;
  font-size: 22px;
  color: white;
  font-weight: bold;
  /* background-color: rgba(255,255,255, .2); */
  margin: 5px 0;
`