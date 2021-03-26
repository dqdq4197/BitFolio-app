import React, { useRef, useEffect, useState } from 'react';
import { ScrollView, TextInput, Platform } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import styled from 'styled-components/native';
import ControlBar from './ControlBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const UL_BULLET = "\u2022";

const Editor = () => {

  const textInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [contentStorage, setContentStorage] = useState([{
    type: "text",
    payload: {
      text: "",
      styles: [
        'NORMAL',
      ]
    }
  }])
  const [cursorPosition, setCursorPosition] = useState({
    start: 0,
    end: 0
  })
  const [cursorFx, setCursorFx] = useState(0);
  const [focusIndex, setFocusIndex] = useState(0);
  const scheme = useColorScheme();


  useEffect(() => {
    if(textInputRef.current) {
      textInputRef.current.focus();
      textInputRef.current.measure((fx:number, fy:number) => {
        setCursorFx(fy);
      })
    }
  }, [focusIndex])

  // const handleContolPress = (control: string) => {
  //   if(control === 'ol') {
  //     const currentInput = contentStorage[focusIndex];
  //     currentInput.payload.text = UL_BULLET + currentInput.payload.text;
  //     contentModification(focusIndex, currentInput);
  //   }
  // }
  
  // const contentModification = (index:number, modifiedContent:any) => {
  //   setContentStorage(
  //     (prev) => [
  //       ...prev.slice(0, index),
  //       modifiedContent,
  //       ...prev.slice(index + 1, prev.length)
  //     ]
  //   )
  // }

  const handleInputChange = (text:string, index: number) => {
    const temp = contentStorage[index];
    const newText = text;
    const ar = newText.split('\n').join('');
    
    temp.payload.text = ar;

    setContentStorage((prev) => [
      ...prev.slice(0, index),
      temp,
      ...prev.slice(index + 1, contentStorage.length)
    ])
  }

  const handleInputChanged = (event:any, index: number) => {
    const temp = contentStorage[index];
  }

  // backspace remove input text
  const handleInputKeyPress = (event:any, index:number) => {
    const { key } = event.nativeEvent;
    const targetText = contentStorage[index].payload.text;
    if(key === 'Backspace' && targetText === "" && index !== 0) {
      setContentStorage((prev) => [
        ...prev.slice(0, index),
        ...prev.slice(index + 1, prev.length)
      ])
      setFocusIndex(index - 1);
    }
  }


  // enter key 
  const handleInputSubmitEditing = (event:any, index:number) => {
    const oldContext = contentStorage[index];
    const text = oldContext.payload.text;
    const editedText = text.slice(0, cursorPosition.start);
    oldContext.payload.text = editedText
    let newContext = {
      type:"text",
      payload: {
        text: text.slice(cursorPosition.end, text.length),
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
    setFocusIndex(index + 1);
  }

  const InputArea = () => (
    contentStorage.map((content, index) => {
      const { type, payload } = content;
      if(type === 'text' || type === 'quote') {
        return (
            <StyledTextInput
              key={'input' + index} 
              returnKeyType='done'
              spellCheck={false}
              keyboardAppearance={scheme === 'dark' ? 'dark' : 'light'}
              ref={focusIndex === index ? textInputRef : null}
              onSubmitEditing={(event) => handleInputSubmitEditing(event,index)}
              onChangeText={(text) => handleInputChange(text, index)} 
              onChange={(event) => console.log('asdqwe',event.nativeEvent)}
              onKeyPress={(event) => handleInputKeyPress(event, index)}
              value={payload.text}
              onFocus={() => setFocusIndex(index)}
              onSelectionChange={(event) => setCursorPosition(event.nativeEvent.selection)}
              multiline
              scrollEnabled={false}
              blurOnSubmit={true}
            />
        )
      } else {
      }
    })
  )

  return (
    <>
      <KeyboardAwareScrollView 
        extraScrollHeight={45}
        keyboardShouldPersistTaps={'always'}
        keyboardDismissMode={Platform.OS === 'ios' ? "interactive" : "on-drag"}
      >
        {InputArea()}
      </KeyboardAwareScrollView>
      <ControlBar/>
    </>
  )
}

export default Editor;

const Container = styled.ScrollView`
  flex: 1;
  min-height: 400px;
  margin-bottom: 45px;
`
const StyledTextInput = styled.TextInput`
  padding: 5px 15px;
  font-size: 22px;
  color: white;
  font-weight: bold;
  background-color: rgba(255,255,255, .2);
  margin: 5px 0;
`