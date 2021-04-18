import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components/native';
import { useColorScheme } from 'react-native-appearance';
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
  ContentsType,
  ListType
} from '/hooks/useMdEditorContext';
import RenderText from './RenderText';
import { types, actions } from '/lib/constant';


interface PlainTextInputProps {
  index: number,
  payload: {
    text: string,
  },
  type: string,
  isLastIndex: boolean,
}

const PlainTextInput = ({ index, type, isLastIndex, payload }: PlainTextInputProps ) => {
  const scheme = useColorScheme();
  const handlers = useMdEditorDispatch();
  const { contentStorage, isTextRendered, selection, focusState } = useMdEditorState();
  const textInputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    if(textInputRef.current && isTextRendered) {
      const { action, index } = focusState;
      const { ENTER, BACKSPACE, LINEPOP } = actions;
      
      if(action === LINEPOP) {
        setTimeout(() => {
          textInputRef.current?.focus();
        })
      } else {
        textInputRef.current?.focus();
      }
      if(action === ENTER || action === BACKSPACE || (action === LINEPOP && index !== 0)) {
        textInputRef.current.setNativeProps({ selection })
      }
    }
  }, [focusState, isTextRendered])

  const searchYoutubeUrl = (text:string) => {
    const regExp = /(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    let match = text.match(regExp);
    
    if (match && match[1].length == 11) {
      return {
        source: match[0],
        id: match[1],
        index: match['index'],
        input: match['input'],
      }
    }
  }

  const handleInputChangeText = (text:string, index:number) => {
    const lineBreak = /\r|\n/.exec(text);
    const { action } = focusState;
    if (lineBreak) {
      return ;
    }

    if(action === actions.LINEPOP || action === actions.BACKSPACE) {
      return ;
    }

    const currentContext = contentStorage[index] as ParagraphType;
    const nextContext = contentStorage[index + 1];
    const embedInfo = searchYoutubeUrl(text);

    if(embedInfo) {
      const { id, source, index: sourceIndex, input } = embedInfo;
      const [beforeURL, afterURL] = input?.split(source) as [string, string];
      let focusIndex = index + 1;

      let newContext: (EmbedType | ParagraphType)[] = [
        {
          type: types.EMBED,
          payload: {
            source,
            id,
            caption: ""
          }
        } 
      ]

      if(beforeURL !== "") {
        newContext.unshift({
          type: types.PARAGRAPH,
          payload: {
            text: beforeURL,
          }
        })
        focusIndex += 1;
      } 
      
      if(afterURL !== "" || nextContext.type !== types.PARAGRAPH) {
        newContext.push({
          type: types.PARAGRAPH,
          payload: {
            text: afterURL,
          }
        })
      }

      handlers.divideCurrentLineAndNewLine(newContext, focusState.index);
      handlers.updateFocusState(focusIndex, actions.TYPING);
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
    event:NativeSyntheticEvent<TextInputKeyPressEventData>, 
    index:number
  ) => {
    if(focusState.index !== index) return ;
    const { key } = event.nativeEvent;
    const { PARAGRAPH, DELIMITER, EMBED, LIST, LISTSTYLE } = types;
    const { BACKSPACE, ENTER, LINEPOP } = actions;
    const currentContext = contentStorage[index] as ParagraphType;
    const currentText = currentContext.payload.text;
    console.log('enter')
    
    // enter key 
    if(key === 'Enter') {
      const editedText = currentText.slice(0, selection.start);
      currentContext.payload.text = editedText;

      let newContext = [
        currentContext,
        {
          type: PARAGRAPH,
          payload: {
            text: currentText.slice(selection.end, currentText.length)
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
    if(key === "Backspace" && index !== 0) {
      const prevContext = contentStorage[index - 1];
      const nextContext = contentStorage[index + 1];
      const { type } = prevContext;

      if(selection.end === 0) {
        if(type === DELIMITER || type === EMBED) {
          handlers.removePreviousLine(index);
          handlers.updateFocusState(index - 1, BACKSPACE);
          handlers.updateSelection({
            start: 0,
            end: 0
          })
        } else if(type === LIST) {
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
          if(nextContext.type === LIST) {
            const { payload: { items: nextItems, style: nextStyle } } = nextContext as ListType;
            if(prevStyle === nextStyle) {
              newContext.payload.items.push(...nextItems)
              handlers.mergePreviousLineWithNextLine(newContext as ListType, index);
            } else {
              handlers.mergePreviousLineWithCurrentLine([newContext], index);
            }
          } else {
            handlers.mergePreviousLineWithCurrentLine([newContext], index);
          }
          
          handlers.updateFocusState(index - 1, BACKSPACE)
          handlers.updateListFocusIndex(prevItems.length - 1);
          handlers.updateSelection({
            start: prevItems[prevItems.length - 1].length,
            end: prevItems[prevItems.length - 1].length
          })
        } else if(type === PARAGRAPH) {
          const { payload } = prevContext as ParagraphType;
          const prevText = payload.text;

          if(currentText === "") {
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
        }
      }
    }
  }


  const handleSelectionChange = (
    event: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
    index: number
  ) => {
    const { selection } = event.nativeEvent;
    const { index: focusIndex, action } = focusState;
    const { ENTER, LINEPOP, BACKSPACE } = actions;

    if(focusIndex === index) {
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
        console.log('update', selection)
        handlers.updateSelection(selection)
      }
    }
  }

  const handleFocus = (
    event:NativeSyntheticEvent<TextInputFocusEventData>, 
    index:number,
  ) => {
    const { text } = event.nativeEvent;
    const { ENTER, BACKSPACE, LINEPOP } = actions;
    const { action } = focusState;

    if(text === "") {
      handlers.updateSelection({
        start: 0,
        end: 0
      })
    }

    if(action !== ENTER && action !== BACKSPACE && action !== LINEPOP)
      textInputRef.current?.setNativeProps({
        selection: {
          start: text.length,
          end: text.length
        }
      })
    console.log('focus Reset', index)
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
      returnKeyType = "none"
      spellCheck={false}
      scrollEnabled={false}
      onChangeText={(text) => handleInputChangeText(text, index)} 
      onKeyPress={(event) => handleInputKeyPress(event, index)}
      onSelectionChange={event => handleSelectionChange(event, index)}
      onFocus={(event) => handleFocus(event, index)}
      style={isLastIndex && { display: 'none' }}
      type={type}
    >
      <RenderText 
        type={type}
        index={index}
      >
        { payload.text }
      </RenderText>
    </StyledTextInput>
  )
}

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
  margin-top: 5px;
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