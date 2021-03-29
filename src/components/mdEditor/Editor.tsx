import React, { useRef, useEffect, useState } from 'react';
import { TextInput, Platform, Dimensions, Keyboard, EmitterSubscription } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import styled from 'styled-components/native';
import ControlBar from './ControlBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


// const UL_BULLET = "\u2022";

const { height } = Dimensions.get('screen');
const TOPTOSCROLL = 50;
const TEXTINPUT_HEIGHT = 50;
const CONTROL_BAR_HEIGHT = 45;


const Editor = () => {

  const textInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<any>(null);
  const scrollRef = useRef<any>();
  const [focusState, setFocusState] = useState('');
  const [contentStorage, setContentStorage] = useState(
    [
      {
        type: "text",
        payload: {
          text: "",
          styles: [
            'NORMAL',
          ]
        }
      }
    ]
  )
  const [cursorPosition, setCursorPosition] = useState({
    start: 0,
    end: 0
  })
  const [focusIndex, setFocusIndex] = useState(0);
  const [keyboardHeight, setKeyboardHeight] = useState(CONTROL_BAR_HEIGHT);
  const scheme = useColorScheme();

  useEffect(() => {
    let keyboardWillShowEvent: EmitterSubscription;
    let keyboardWillHideEvent: EmitterSubscription;

    if(Platform.OS === 'android') {
      keyboardWillShowEvent = Keyboard.addListener(
        'keyboardDidShow', 
        (event) => {
          setKeyboardHeight(event.endCoordinates.height + CONTROL_BAR_HEIGHT)
        }
      )

      keyboardWillHideEvent = Keyboard.addListener(
        'keyboardDidHide', 
        (event) => {
          setKeyboardHeight(CONTROL_BAR_HEIGHT);
        }
      )
    } else {
      keyboardWillShowEvent = Keyboard.addListener(
        'keyboardWillShow', 
        (event) => {
          setKeyboardHeight(event.endCoordinates.height + CONTROL_BAR_HEIGHT)
        }
      )

      keyboardWillHideEvent = Keyboard.addListener(
        'keyboardWillHide', 
        (event) => {
          setKeyboardHeight(CONTROL_BAR_HEIGHT);
        }
      )
    }
    
    return () => {
      // keyboard event 해제
      keyboardWillShowEvent.remove();
      keyboardWillHideEvent.remove();
    }
  }, [])

  useEffect(() => {
    if(textInputRef.current) {
      textInputRef.current.focus();
      if(focusState === 'enter') {
        console.log('enter cursor')
        textInputRef.current.setNativeProps({
          selection: {
            start: 0,
            end: 0
          }
        })
      } else if(focusState === 'backspace') {
        console.log('backspace cursor')
        textInputRef.current.setNativeProps({
          selection: {
            start: cursorPosition.start,
            end: cursorPosition.end
          }
        })
      } else if(focusState === 'pop' && focusIndex !== 0) {
        console.log('pop cursor:', contentStorage[focusIndex].payload.text.length);
        textInputRef.current.setNativeProps({
          selection: {
            start: contentStorage[focusIndex].payload.text.length,
            end: contentStorage[focusIndex].payload.text.length
          }
        })
      }
    }

    textInputRef.current?.measure((fy:number ,pageY:number) => {
      const offsetToTop = pageY - scrollRef.current;
      const offsetToKeyboard = offsetToTop - keyboardHeight;
      if(offsetToTop < TEXTINPUT_HEIGHT) {
        // scrollViewRef.current.scrollToPosition(0, pageY - TOPTOSCROLL)
        scrollViewRef.current?.scrollTo({
          x: 0,
          y: pageY - TOPTOSCROLL
        })
      }
      if(offsetToKeyboard > 0) {
        scrollViewRef.current?.scrollTo({
          x: 0,
          y: pageY - (height - keyboardHeight) + 175
        })
      }
    })
  }, [focusIndex])

  const handleInputChangeText = (text:string, index: number) => {
    var match = /\r|\n/.exec(text);
    if (match) {
      return ;
    }
    const temp = contentStorage[index];
    temp.payload.text = text;
    
    setContentStorage((prev) => [
      ...prev.slice(0, index),
      temp,
      ...prev.slice(index + 1, contentStorage.length)
    ])
    setFocusState('pushpop')
  }

  // backspace remove input text
  const handleInputKeyPress = (event:any, index:number) => {
    const { key } = event.nativeEvent;
    const targetText = contentStorage[index].payload.text;

    if(key === 'Backspace' && index !== 0) {
      if(targetText === "") {
        setContentStorage((prev) => [
          ...prev.slice(0, index),
          ...prev.slice(index + 1, prev.length)
        ])
        setFocusIndex(index - 1);
        setFocusState('pop');
        setCursorPosition({
          start: contentStorage[index - 1].payload.text.length,
          end: contentStorage[index - 1].payload.text.length
        })
      } else if(cursorPosition.end === 0) {
        const prevContext = contentStorage[index - 1];
        const prevText = prevContext.payload.text;
        const editedText = prevText + targetText;
        prevContext.payload.text = editedText;
        setContentStorage(
          (prev) => [
            ...prev.slice(0, index - 1),
            prevContext,
            ...prev.slice(index + 1, prev.length)
          ]
        )
        setFocusIndex(index - 1);
        setFocusState('backspace');
        setCursorPosition({
          start: prevText.length,
          end: prevText.length
        })
      }
    }
  }

  // enter key 
  const handleInputSubmitEditing = (index:number) => {
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
    setCursorPosition({
      start: 0,
      end: 0
    })
    setFocusState('enter');
  }

  const InputArea = () => (
    contentStorage.map((content, index) => {
      const { type, payload } = content;
      if(type === 'text' || type === 'quote') {
        return (
          <StyledTextInput
            key={'input' + index} 
            returnKeyType='next'
            spellCheck={false}
            keyboardAppearance={scheme === 'dark' ? 'dark' : 'light'}
            ref={focusIndex === index ? textInputRef : null}
            onSubmitEditing={() => handleInputSubmitEditing(index)}
            onChangeText={(text) => handleInputChangeText(text, index)} 
            onKeyPress={(event) => handleInputKeyPress(event, index)}
            value={payload.text}
            onFocus={() => {
              setFocusIndex(index)
              setFocusState('touch')
            }}
            onSelectionChange={
              ({ nativeEvent: { selection } }) => {
                if(focusIndex === index) {
                  if(focusState === 'enter') {
                    setCursorPosition({
                      start: 0,
                      end: 0
                    })
                  } else if(focusState === 'pop') {
                  } else if(focusState === 'backspace') {
                  } else {
                    setCursorPosition(selection)
                  }
                }
              }
            }
            multiline
            scrollEnabled={false}
            blurOnSubmit={false}
          />
        )
      } else {
      }
    })
  )

  return (
    <>
      <Container
        contentInset={{bottom: keyboardHeight}}
        onScroll={(event) => {
          scrollRef.current = event.nativeEvent.contentOffset.y;
        }}
        ref={scrollViewRef}
        scrollEventThrottle={16}
        onContentSizeChange={(w, y) => {
          scrollRef.current = y;
        }}
        keyboardShouldPersistTaps={'always'}
        keyboardDismissMode={Platform.OS === 'ios' ? "interactive" : "on-drag"}
      >
        {InputArea()}
      </Container>
      <ControlBar/>
    </>
  )
}

export default Editor;

const Container = styled.ScrollView`
  flex: 1;
`
const StyledTextInput = styled.TextInput`
  padding: 5px 15px;
  font-size: 22px;
  color: white;
  font-weight: bold;
  background-color: rgba(255,255,255, .2);
  margin: 5px 0;
`