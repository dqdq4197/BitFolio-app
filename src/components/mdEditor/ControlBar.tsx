import React from 'react';
import { Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { types, actions, unicodes } from '/lib/constant';
import { 
  useMdEditorState, 
  useMdEditorDispatch, 
  ParagraphType
} from '/hooks/useMdEditorContext';

const { width } = Dimensions.get('window');
const CONTROLBAR_HEIGHT = 45;

interface ControlBarProps {
  selecting: boolean,
}

const SelectionContorlBar = () => {

  const { focusState, contentStorage, selection } = useMdEditorState();
  const handlers = useMdEditorDispatch();

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
    const currentContext = contentStorage[index] as ParagraphType;
    const currentText = currentContext.payload.text;
    const editedText = replaceRange(currentText, selection.start, selection.end, unicodes.TEXT_BOLD)
    
    currentContext.payload.text = editedText;

    handlers.updateCurrentLine(currentContext, index);
  }

  return (
    <SelectingView>
      <UtilBtn onPress={handleBoldPress}>
        <Foundation name="bold" size={24} color="white" />
      </UtilBtn>
      <UtilBtn>
        <MaterialIcons name="format-italic" size={24} color="white" />
      </UtilBtn>
      <UtilBtn>
        <MaterialCommunityIcons name="marker" size={20} color="white" />
      </UtilBtn>
    </SelectingView>
  )
}

const DefaultControlBar = () => {

  const { focusState, contentStorage } = useMdEditorState();
  const handlers = useMdEditorDispatch();

  const handleHeaderPress = () => {
    const { index } = focusState;
    const { PARAGRAPH, HEADER, EMBED } = types;
    const currentContext = contentStorage[index];

    if(currentContext.type === EMBED) return ;

    if(currentContext.type === HEADER) {
      currentContext.type = PARAGRAPH;
    } else {
      currentContext.type = HEADER;
    }

    handlers.updateCurrentLine(currentContext, index);
  }

  const handleQuotePress = () => {
    const { index } = focusState;
    const { PARAGRAPH, QUOTE, EMBED } = types;
    const currentContext = contentStorage[index];

    if(currentContext.type === EMBED) return ;

    if(currentContext.type === QUOTE) {
      currentContext.type = PARAGRAPH;
    } else {
      currentContext.type = QUOTE;
    }

    handlers.updateCurrentLine(currentContext, index);
  }

  const handleDelimiterPress = () => {
    const { index } = focusState;
    const { DELIMITER, PARAGRAPH } = types; 
    const nextContext = contentStorage[index + 1];
    const isLastContent = index === contentStorage.length - 2;

    let newContext = [{
      type: DELIMITER,
      payload: {}
    }]

    if(isLastContent || nextContext.type === DELIMITER) {
      newContext.push({
        type: PARAGRAPH,
        payload: {
          text: "",
          styles: []
        }
      })
    }

    handlers.insertNewLineAfter(newContext, index);
    handlers.updateFocusState(index + 2, actions.TYPING)
    handlers.updateSelection({
      start: 0,
      end: 0
    })
  }

  return (
    <View>
      <UtilsWrap flex={5}>
        <UtilBtn onPress={handleHeaderPress}>
          <MaterialIcons name="text-fields" size={24} color="rgba(255,255,255, .7)" />
        </UtilBtn>
        <UtilBtn onPress={handleQuotePress}>
          <FontAwesome name="quote-left" size={20} color="rgba(255,255,255, .7)" />
        </UtilBtn>
        <UtilBtn>
          <FontAwesome5 name="list-ul" size={20} color="rgba(255,255,255, .7)" />
        </UtilBtn>
        <UtilBtn onPress={handleDelimiterPress}>
          <Ionicons name="ellipsis-horizontal" size={24} color="rgba(255,255,255, .7)" />
        </UtilBtn>
        <UtilBtn>
          <Octicons name="mention" size={24} color="rgba(255,255,255, .7)" />
        </UtilBtn>
      </UtilsWrap>
      <UtilsWrap flex={1}>
        <UtilBtn>
          <Ionicons name="md-image" size={24} color="rgba(255,255,255, .7)" />
        </UtilBtn>
      </UtilsWrap>
    </View>
  )
}

const ControlBar = ({ selecting }:ControlBarProps ) => {

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={45}>
      {selecting 
        ? <SelectionContorlBar/>
        : <DefaultControlBar />
      }
    </Container>
  )
}

export default ControlBar;

interface UtilsWrapProps {
  flex: number
}
const Container = styled.KeyboardAvoidingView`
  position: absolute;
  flex-direction: row;
  width: ${width}px;
  height: ${CONTROLBAR_HEIGHT}px;
  align-items: center;
  bottom: 0;
  /* padding: ${CONTROLBAR_HEIGHT}px; */
  /* padding: 0; */
  background-color: ${({theme}) => theme.base.background[200]};
  /* background-color: white; */
`
const View = styled.View`
  position: absolute;
  top: 0;
  width: ${width}px;
  height: ${CONTROLBAR_HEIGHT}px;
  align-items: center;
  flex-direction: row;
  padding: 0 10px;
`
const UtilsWrap = styled.View<UtilsWrapProps>`
  flex: ${props => props.flex};
  flex-direction: row;
`
const UtilBtn = styled.TouchableOpacity`
  padding: 0 10px;
`

const SelectingView = styled.View`
  position: absolute;
  top: 0;
  width: ${width}px;
  height: ${CONTROLBAR_HEIGHT}px;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 10px;
`