import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components/native';
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInputSelectionChangeEventData,
  TextInputFocusEventData,
} from 'react-native';
import {
  useMdEditorDispatch,
  useMdEditorState,
  ParagraphType,
  EmbedType,
  ListType
} from '/hooks/context/useMdEditorContext';
import useGlobalTheme from '/hooks/useGlobalTheme';

import RenderText from './RenderText';
import { TYPES, ACTIONS } from '/lib/constant';


interface PlainTextProps {
  index: number,
  payload: {
    text: string,
  },
  type: string,
}

const PlainTextBlock = ({ index, type, payload }: PlainTextProps) => {
  const { scheme } = useGlobalTheme();
  const handlers = useMdEditorDispatch();
  const textInputRef = useRef<TextInput | null>(null);
  const { contentStorage, isTextRendered, selection, focusState, selectionChangeDetect } = useMdEditorState();

  useEffect(() => {
    if (textInputRef.current && isTextRendered) {
      const { action, index } = focusState;
      const { ENTER, BACKSPACE, LINEPOP } = ACTIONS;

      if (action === LINEPOP) {
        setTimeout(() => {
          textInputRef.current?.focus();
        })
      } else {
        textInputRef.current?.focus();
      }
      // if(action === ENTER || action === BACKSPACE || (action === LINEPOP && index !== 0)) {
      //   textInputRef.current.setNativeProps({ selection })
      //   console.log('asd1')
      // }
    }
  }, [focusState, isTextRendered])

  const searchYoutubeUrl = (text: string) => {
    const regExp = /(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    let match = text.match(regExp);

    // youtube video unique id length => 11
    if (match && match[1].length == 11) {
      return {
        source: match[0],
        id: match[1],
        index: match['index'],
        input: match['input'],
      }
    }
  }

  const handleInputChangeText = (text: string) => {
    const lineBreak = /\r|\n/.exec(text);
    const { action } = focusState;
    const { PARAGRAPH, EMBED } = TYPES;
    if (lineBreak) {
      return;
    }

    if (action === ACTIONS.LINEPOP || action === ACTIONS.BACKSPACE) {
      return;
    }

    const currentContext = contentStorage[index] as ParagraphType;
    const nextContext = contentStorage[index + 1];
    const embedInfo = searchYoutubeUrl(text);

    if (embedInfo) {
      const { id, source, index: sourceIndex, input } = embedInfo;
      const [beforeURL, afterURL] = input?.split(source) as [string, string];
      let focusIndex = index + 1;

      let newContext: (EmbedType | ParagraphType)[] = [
        {
          type: EMBED,
          payload: {
            source,
            id,
            caption: ""
          }
        }
      ]

      if (beforeURL !== "") {
        newContext.unshift({
          type: PARAGRAPH,
          payload: {
            text: beforeURL,
            inlineStyles: []
          }
        })
        focusIndex += 1;
      }

      if (afterURL !== "" || nextContext?.type !== PARAGRAPH) {
        newContext.push({
          type: PARAGRAPH,
          payload: {
            text: afterURL,
            inlineStyles: []
          }
        })
      }

      handlers.divideCurrentLineAndNewLine(newContext, focusState.index);
      handlers.updateFocusState(focusIndex, ACTIONS.TYPING);
      handlers.updateSelection({
        start: afterURL.length,
        end: afterURL.length
      })
    } else {
      currentContext.payload.text = text;

      handlers.updateCurrentLine(currentContext, index);
      handlers.focusActionReset();
    }
  }

  const handleInputKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (focusState.index !== index) return;
    const { key } = event.nativeEvent;
    const { PARAGRAPH, DELIMITER, EMBED, LIST, IMAGE } = TYPES;
    const { BACKSPACE, ENTER, LINEPOP } = ACTIONS;
    const { start, end } = selection;
    const currentContext = contentStorage[index] as ParagraphType;
    const currentText = currentContext.payload.text;

    if (key === 'Enter') {
      const editedText = currentText.slice(0, start);
      currentContext.payload.text = editedText;

      const newContext = [
        currentContext,
        {
          type: PARAGRAPH,
          payload: {
            text: currentText.slice(end, currentText.length)
          }
        }
      ]
      handlers.setIsTextRendered(false);
      handlers.divideCurrentLineAndNewLine(newContext, index);
      handlers.updateFocusState(index + 1, ENTER);
      handlers.updateSelection({
        start: 0,
        end: 0
      })
    }

    if (key === "Backspace" && index !== 0 && end === 0) {
      const prevContext = contentStorage[index - 1];
      const nextContext = contentStorage[index + 1];

      switch (prevContext.type) {
        case DELIMITER:
        case IMAGE:
        case EMBED:
          handlers.removePreviousLine(index);
          handlers.updateFocusState(index - 1, BACKSPACE);
          handlers.updateSelection({
            start: 0,
            end: 0
          })
          return;
        case LIST:
          const { payload: { items: prevItems, style: prevStyle } } = prevContext as ListType;
          let newContext = {
            ...prevContext,
            payload: {
              ...prevContext.payload,
              items: [
                ...prevItems.slice(0, prevItems.length - 1),
                prevItems[prevItems.length - 1] + currentText
              ]
            }
          }
          if (nextContext?.type === LIST) {
            const { payload: { items: nextItems, style: nextStyle } } = nextContext as ListType;
            if (prevStyle === nextStyle) {
              newContext.payload.items.push(...nextItems)
              handlers.mergePreviousLineWithNextLine(newContext as ListType, index);
            } else {
              handlers.mergePreviousLineWithCurrentLine([newContext], index);
            }
          } else {
            handlers.mergePreviousLineWithCurrentLine([newContext], index);
          }
          handlers.updateListFocusIndex(prevItems.length - 1);
          handlers.updateFocusState(index - 1, BACKSPACE)
          handlers.updateSelection({
            start: prevItems[prevItems.length - 1].length,
            end: prevItems[prevItems.length - 1].length
          })
          if (currentText.length) {
            handlers.selectionChangeDetected(true);
          }
          return;
        default:
          const { payload } = prevContext as ParagraphType;
          const prevText = payload.text;
          if (currentText === "") {
            //onPress backspace remove current line
            handlers.removeCurrentLine(index);
            handlers.updateFocusState(index - 1, LINEPOP);
            handlers.updateSelection({
              start: prevText.length,
              end: prevText.length
            })
          } else {
            //onPress backspace merge previous line
            const editedText = prevText + currentText;
            (prevContext as ParagraphType).payload.text = editedText;
            handlers.setIsTextRendered(false);
            handlers.mergePreviousLineWithCurrentLine([prevContext as ParagraphType], index);
            handlers.updateFocusState(index - 1, BACKSPACE);
            handlers.updateSelection({
              start: prevText.length,
              end: prevText.length
            });

          }
          return;
      }
    }
  }


  const handleSelectionChange = (
    event: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
  ) => {
    const { selection: nativeSelection } = event.nativeEvent;
    const { index: focusIndex, action } = focusState;
    const { ENTER, LINEPOP, BACKSPACE } = ACTIONS;

    if (focusIndex === index) {
      console.log('selection change')
      if (action === ENTER) {
        console.log('4')
        textInputRef.current?.setNativeProps({ selection })
      } else if (action === LINEPOP) {
        // todo when action is pop
      } else if (action === BACKSPACE) {
        // todo when action is backspace
        console.log(1)
        textInputRef.current?.setNativeProps({ selection })
      } else {
        if (selectionChangeDetect) {
          // textInputRef.current?.setNativeProps({ selection })
          console.log('ㅋㅋㅋㅋ')
          handlers.selectionChangeDetected(false);
        } else {
          console.log('native selection change')
          handlers.updateSelection(nativeSelection)
        }
      }
    }
  }

  const handleFocus = (
    event: NativeSyntheticEvent<TextInputFocusEventData>,
  ) => {
    const { text } = event.nativeEvent;
    const { ENTER, BACKSPACE, LINEPOP, TYPING } = ACTIONS;
    const { action } = focusState;

    if (action === TYPING) {
      textInputRef.current?.setNativeProps({
        selection: {
          start: text.length,
          end: text.length
        }
      })
    }
    // if(text === "") {
    //   console.log('설마 여기?')
    //   handlers.updateSelection({
    //     start: 0,
    //     end: 0
    //   })
    // }

    if (selectionChangeDetect) {
      textInputRef.current?.setNativeProps({ selection })
    }
    console.log(3)
    handlers.focusActionReset(index);
    handlers.updateListFocusIndex(-1);
  }
  return (
    <StyledTextInput
      keyboardAppearance={scheme === 'dark' ? 'dark' : 'light'}
      ref={focusState.index === index ? textInputRef : null}
      textAlignVertical="center"
      multiline
      value={""}
      spellCheck={false}
      scrollEnabled={false}
      onChangeText={handleInputChangeText}
      onKeyPress={handleInputKeyPress}
      onSelectionChange={handleSelectionChange}
      onFocus={handleFocus}
      type={type}
    >
      <RenderText
        type={type}
        index={index}
      >
        {payload.text}
      </RenderText>
    </StyledTextInput>
  )
}

export default PlainTextBlock;

interface TextInputProps {
  type: string,
}
const StyledTextInput = styled.TextInput<TextInputProps>`
  color: white;
  /* background-color: rgba(255,255,255, .2); */

  ${(props) => {
    switch (props.type) {
      case TYPES.QUOTE:
        return StyledQuote
      case TYPES.HEADER:
        return StyledHeader
      default:
        return StyledParagraph
    }
  }}
`

const StyledParagraph = css`
  font-size:${({ theme }) => theme.size.font_l};
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