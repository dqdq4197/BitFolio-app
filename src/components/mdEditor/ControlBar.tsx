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
  ParagraphType,
  ListType,
  HeaderType,
  QuoteType
} from '/hooks/useMdEditorContext';

const { width } = Dimensions.get('window');
const CONTROLBAR_HEIGHT = 45;

interface ControlBarProps {
  selecting: boolean,
}

const SelectionContorlBar = () => {

  const { focusState: { index, action }, contentStorage, selection: { start, end } } = useMdEditorState();
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
    const currentContext = contentStorage[index] as ParagraphType;
    const currentText = currentContext.payload.text;
    const editedText = replaceRange(currentText, start, end, unicodes.TEXT_BOLD)
    
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

  const { focusState: { index }, contentStorage, listFocusIndex } = useMdEditorState();
  const { QUOTE, PARAGRAPH, LIST, EMBED, HEADER, DELIMITER, LISTSTYLE: { UL, OL } } = types;
  const handlers = useMdEditorDispatch();

  const handleHeaderPress = () => {
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

  const handleListPress = () => {
    /* -------- order of conversion ---------
      plainText -> unordered -> ordered -> paragraph */
    const currentContext = contentStorage[index];
    const prevContext = contentStorage[index - 1];
    const nextContext = contentStorage[index + 1];
    const { type } = currentContext;

    if(type === LIST) {
      const { payload: { style: curStyle, items: curItems } } = currentContext as ListType;
      if(curStyle === UL) {
        // unordered -> ordered
        const isPrevStyleOL = prevContext.type === LIST && (prevContext as ListType).payload.style === OL;
        const isNextStyleOL = nextContext.type === LIST && (nextContext as ListType).payload.style === OL;
        if(isPrevStyleOL && isNextStyleOL && curItems.length === 1) {
          const { payload: { items: prevItems } } = prevContext as ListType;
          const { payload: { items: nextItems } } = nextContext as ListType;
          const newContext = {
            ...prevContext,
            payload: {
              ...prevContext.payload,
              items: [...prevItems, ...curItems, ...nextItems]
            }
          }
          handlers.mergePreviousLineWithNextLine(newContext as ListType, index);
          handlers.updateFocusState(index - 1, actions.TYPING);
          handlers.updateListFocusIndex(prevItems.length);
        } else if(isPrevStyleOL && listFocusIndex === 0) {
          const { payload: { items: prevItems } } = prevContext as ListType;
          const [curItem, restItems] = [curItems[0], curItems.slice(1, curItems.length)];
          const newContext = [{
            ...prevContext,
            payload: {
              ...prevContext.payload,
              items: [...prevItems, curItem]
            }
          }]
          if(restItems.length) {
            newContext.push({
              ...currentContext,
              payload: {
                ...currentContext.payload,
                items: [...restItems]
              }
            })
          }
          handlers.mergePreviousLineWithCurrentLine(newContext as ListType[], index);
          handlers.updateFocusState(index - 1, actions.TYPING);
          handlers.updateListFocusIndex(prevItems.length);
        } else if(isNextStyleOL && listFocusIndex === curItems.length - 1) {
          const { payload: { items: nextItems } } = nextContext as ListType;
          const [restItems, curItem] = [curItems.slice(0, curItems.length - 1), curItems.slice(-1)]
          const newContext = [{
            ...nextContext,
            payload: {
              ...nextContext.payload,
              items: [curItem, ...nextItems]
            }
          }]
          if(restItems.length) {
            newContext.unshift({
              ...currentContext,
              payload: {
                ...currentContext.payload,
                items: [...restItems]
              }
            })
          }
          handlers.mergeNextLineWithCurrentLine(newContext as ListType[], index);
          handlers.updateListFocusIndex(0);
        } else {
          const newContext = {
            ...currentContext,
            payload: {
              ...currentContext.payload,
              style: OL
            }
          }
          handlers.updateCurrentLine(newContext, index);
          handlers.updateListFocusIndex(0);
        }
      } else {
        // ordered -> paragraph
        const prevItems = curItems.slice(0, listFocusIndex)
        const nextItems = curItems.slice(listFocusIndex + 1, curItems.length)

        const prevNewContext = {
          ...currentContext,
          payload: {
            ...currentContext.payload,
            items: prevItems
          }
        }
        const curNewContext = {
          type: PARAGRAPH,
          payload: {
            text: curItems[listFocusIndex]
          }
        }
        const nextNewContext = {
          ...currentContext,
            payload: {
              ...currentContext.payload,
              items: nextItems
            }
        }
        let newContext = [];
        if(prevItems.length && nextItems.length) {
          newContext = [prevNewContext, curNewContext, nextNewContext]
          handlers.divideCurrentLineAndNewLine(newContext, index);
          handlers.updateFocusState(index + 1, actions.TYPING)
        } else if(prevItems.length) {
          newContext = [prevNewContext, curNewContext]
          handlers.divideCurrentLineAndNewLine(newContext, index);
          handlers.updateFocusState(index + 1, actions.TYPING)
        } else if(nextItems.length) {
          newContext = [curNewContext, nextNewContext]
          handlers.divideCurrentLineAndNewLine(newContext, index);
        } else {
          handlers.updateCurrentLine(curNewContext, index);
        }
      } 
    }
    if(type === HEADER || type === QUOTE || type === PARAGRAPH) {
      const { payload: { text } } = currentContext as ParagraphType | QuoteType | HeaderType;
      // plainText -> unordered
      const isPrevStyleUL = prevContext.type === LIST && (prevContext as ListType).payload.style === UL;
      const isNextStyleUL = nextContext.type === LIST && (nextContext as ListType).payload.style === UL;
      if(isPrevStyleUL && isNextStyleUL) {
        const { payload: { items: prevItems } } = prevContext as ListType;
        const { payload: { items: nextItems } } = nextContext as ListType;
        const newContext = {
          ...prevContext,
          payload: {
            ...prevContext.payload,
            items: [...prevItems, text, ...nextItems]
          }
        }
        handlers.mergePreviousLineWithNextLine(newContext as ListType, index);
        handlers.updateListFocusIndex(prevItems.length);
        handlers.updateFocusState(index - 1, actions.TYPING);
      } else if(isPrevStyleUL) {
        const { payload: { items: prevItems } } = prevContext as ListType;
        const newContext = [{
          ...prevContext,
          payload: {
            ...prevContext.payload,
            items: [...prevItems, text]
          }
        }]
        handlers.mergePreviousLineWithCurrentLine(newContext as ListType[], index);
        handlers.updateListFocusIndex(prevItems.length);
        handlers.updateFocusState(index - 1, actions.TYPING);
      } else if(isNextStyleUL) {
        const { payload: { items: nextItems } } = nextContext as ListType;
        const newContext = {
          ...nextContext,
          payload: {
            ...nextContext.payload,
            items: [text, ...nextItems]
          }
        }
        handlers.mergeNextLineWithCurrentLine([newContext as ListType], index);
        handlers.updateListFocusIndex(0);
      } else {
        const newContext = {
          type: LIST,
          payload: {
            items: [text],
            style: UL
          }
        }
        handlers.updateCurrentLine(newContext, index);
        handlers.updateListFocusIndex(0);
      }
    }
  }

  const handleDelimiterPress = () => {
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
        <UtilBtn onPress={handleListPress}>
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