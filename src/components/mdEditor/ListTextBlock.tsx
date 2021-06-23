import React, { useRef, useEffect } from 'react';
import { 
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInputSelectionChangeEventData,
  TextInputFocusEventData
} from 'react-native';
import styled from 'styled-components/native';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { unicodes, ACTIONS, TYPES } from '/lib/constant';
import { useMdEditorState, useMdEditorDispatch, ListType, ParagraphType } from '/hooks/useMdEditorContext';
import RenderText from './RenderText';


interface ListProps {
  text: string,
  style: 'ordered' | 'unordered',
  listIndex: number,
  contentIndex: number,
}

const ListTextBlock = ({
  text,
  style,
  listIndex,
  contentIndex,
}:ListProps) => {
  const { scheme } = useGlobalTheme();
  const { listFocusIndex, contentStorage, focusState, selection, selectionChangeDetect } = useMdEditorState();
  const { ENTER, BACKSPACE, LINEPOP } = ACTIONS;
  const handlers = useMdEditorDispatch();
  const textInputRef = useRef<TextInput>(null);
  
  useEffect(() => {
    if(textInputRef.current) {
      const { action } = focusState;
      textInputRef.current.focus();
      if(action === ENTER || action === BACKSPACE) {
        textInputRef.current.setNativeProps({ selection })
      }
    }
    
  }, [listFocusIndex, focusState.index])

  const handleInputChangeText = (text: string) => {
    const lineBreak = /\r|\n/.exec(text);
    if (lineBreak) {
      return ;
    }
    const currentContext = contentStorage[contentIndex] as ListType;
    currentContext.payload.items[listIndex] = text;
    handlers.updateCurrentLine(currentContext, contentIndex);
  }

  const handleInputKeyPress = (
    event:NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    const { key } = event.nativeEvent;
    const currentContext = contentStorage[contentIndex] as ListType;
    const { items, style } = currentContext.payload;
    const currentItem = items[listIndex];

    if(key === 'Enter') {
      const editedText = currentItem.slice(0, selection.start);

      currentContext.payload.items = [
        ...items.slice(0, listIndex),
        editedText,
        currentItem.slice(selection.end, currentItem.length),
        ...items.slice(listIndex + 1, items.length)
      ]
      
      handlers.updateCurrentLine(currentContext, contentIndex);
      handlers.updateFocusState(contentIndex, ENTER);
      handlers.updateListFocusIndex(listIndex + 1);
      handlers.selectionChangeDetected(true);
    }

    if(key === 'Backspace') {
      if(selection.end === 0) {
        const itemsBeforeFocusIndex = items.slice(0, listIndex);
        const itemsAfterFocusIndex = items.slice(listIndex + 1, items.length);
        let newContext: (ListType | ParagraphType)[] = [{
          type: TYPES.PARAGRAPH,
          payload: {
            text: currentItem,
            inlineStyles: []
          }
        }]
        if(itemsBeforeFocusIndex.length) {
          newContext.unshift({
            type: TYPES.LIST,
            payload: {
              items: itemsBeforeFocusIndex,
              style
            }
          })
        }
        if(itemsAfterFocusIndex.length) {
          newContext.push({
            type: TYPES.LIST,
            payload: {
              items: itemsAfterFocusIndex,
              style
            }
          })
        }
        handlers.divideCurrentLineAndNewLine(newContext, contentIndex);
        if(listIndex === 0) {
          handlers.updateFocusState(contentIndex, BACKSPACE);
        } else {
          handlers.updateFocusState(contentIndex + 1, BACKSPACE);
        }
        handlers.updateListFocusIndex(-1);
        handlers.selectionChangeDetected(true);
      }
    }
  }


  const handleFocus = (
    event:NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    const { text } = event.nativeEvent;

    if(focusState.action !== ENTER) {
      if(text === "") {
        handlers.updateSelection({
          start: 0,
          end: 0
        })
      } else {
        handlers.updateSelection({
          start: text.length,
          end: text.length
        })
      }
    }

    console.log('list 1')
    handlers.updateListFocusIndex(listIndex);
    handlers.focusActionReset(contentIndex);
  }
``
  const handleSelectionChange = (
    event: NativeSyntheticEvent<TextInputSelectionChangeEventData>
  ) => {
    const { selection: nativeSelection } = event.nativeEvent;
    const { action } = focusState;
    if(listIndex !== listFocusIndex) return ;
    console.log('list 2')

    if(action === ENTER) {
      handlers.updateSelection({
        start: 0,
        end: 0
      })
    } else if(action === LINEPOP) {
      // todo when action is pop
    } else if(action === BACKSPACE) {
      // todo when action is backspace
    } else {
      console.log('update list selection')
      if(selectionChangeDetect) {
        textInputRef.current?.setNativeProps({ selection })
        handlers.selectionChangeDetected(false);
      } else {
        handlers.updateSelection(nativeSelection)
      }
    }
  }
  
  return (
    <ListView>
      <ListMark>
        {style === 'unordered' ? unicodes.UL_BULLET : listIndex + 1 + " ."}
      </ListMark>
      <StyledTextInput
        ref={contentIndex === focusState.index && listIndex === listFocusIndex ? textInputRef : null}
        keyboardAppearance={scheme === 'dark' ? 'dark' : 'light'}
        multiline
        value=""
        blurOnSubmit={false}
        spellCheck={false}
        scrollEnabled={false}
        onChangeText={handleInputChangeText}
        onKeyPress={handleInputKeyPress}
        onFocus={handleFocus}
        onSelectionChange={handleSelectionChange}
      >
        <RenderText 
          type={TYPES.LIST}
          index={contentIndex}
        >
          { text }
        </RenderText>
      </StyledTextInput>
    </ListView>
  )
}

export default ListTextBlock;

const ListView = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 5px 15px;
`

const ListMark = styled.Text`
  width: 30px;
  color: white;
  /* background-color: rgba(255,255,255, .2); */
  font-size:${({theme}) => theme.size.font_l};
`

const StyledTextInput = styled.TextInput`
  width: 100%;
  /* background-color: rgba(255,255,255, .2); */
  font-size:${({theme}) => theme.size.font_l};
  color:white;
  padding: 0 15px 0 0;
`