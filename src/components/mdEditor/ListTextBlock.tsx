import React, { useRef, useEffect } from 'react'
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInputSelectionChangeEventData,
  TextInputFocusEventData,
  TextInputSubmitEditingEventData,
} from 'react-native'
import styled from 'styled-components/native'
import useGlobalTheme from '/hooks/useGlobalTheme'
import { unicodes, ACTIONS, TYPES } from '/lib/constant'
import {
  useMdEditorState,
  useMdEditorDispatch,
  ListType,
  ParagraphType,
} from '/hooks/context/useMdEditorContext'
import RenderText from './RenderText'

interface ListProps {
  text: string
  style: 'ordered' | 'unordered'
  listIndex: number
  contentIndex: number
}

const ListTextBlock = ({ text, style, listIndex, contentIndex }: ListProps) => {
  const { scheme } = useGlobalTheme()
  const {
    listFocusIndex,
    contentStorage,
    focusState,
    selection,
    selectionChangeDetect,
  } = useMdEditorState()
  const { ENTER, BACKSPACE, LINEPOP, TYPING } = ACTIONS
  const handlers = useMdEditorDispatch()
  const textInputRef = useRef<TextInput>(null)

  useEffect(() => {
    if (textInputRef.current) {
      const { action } = focusState
      textInputRef.current.focus()
      if (action === ENTER || action === BACKSPACE) {
        textInputRef.current.setNativeProps({ selection })
      }
    }
  }, [listFocusIndex, focusState.index])

  const handleInputChangeText = (text: string) => {
    const lineBreak = /\r|\n/.exec(text)
    if (lineBreak) {
      return
    }
    const currentContext = contentStorage[contentIndex] as ListType
    currentContext.payload.items[listIndex] = text
    handlers.updateCurrentLine(currentContext, contentIndex)
  }

  const handleInputKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    const { key } = event.nativeEvent
    const currentContext = contentStorage[contentIndex] as ListType
    const { items, style } = currentContext.payload
    const currentItem = items[listIndex]
    const itemAfterSelection = currentItem.slice(
      selection.end,
      currentItem.length
    )
    console.log(key)
    if (key === 'Enter') {
      console.log('asdasd', currentItem)
      if (currentItem.length === 0) {
        divideList(items, listIndex)
        console.log('divide')
      } else {
        const editedText = currentItem.slice(0, selection.start)

        currentContext.payload.items = [
          ...items.slice(0, listIndex),
          editedText,
          itemAfterSelection,
          ...items.slice(listIndex + 1, items.length),
        ]

        handlers.updateCurrentLine(currentContext, contentIndex)
        handlers.updateFocusState(contentIndex, ENTER)

        if (itemAfterSelection.length) {
          handlers.selectionChangeDetected(true)
          console.log('있음')
        } else {
          console.log('없음')
        }
        handlers.updateListFocusIndex(listIndex + 1)
        handlers.updateSelection({
          start: 0,
          end: 0,
        })
      }
    }

    if (key === 'Backspace' && selection.end === 0) {
      divideList(items, listIndex)
    }
  }

  const divideList = (items: string[], listIndex: number) => {
    const currentItem = items[listIndex]
    const itemsBeforeFocusIndex = items.slice(0, listIndex)
    const itemsAfterFocusIndex = items.slice(listIndex + 1, items.length)
    let newContext: (ListType | ParagraphType)[] = [
      {
        type: TYPES.PARAGRAPH,
        payload: {
          text: currentItem,
          inlineStyles: [],
        },
      },
    ]
    if (itemsBeforeFocusIndex.length) {
      newContext.unshift({
        type: TYPES.LIST,
        payload: {
          items: itemsBeforeFocusIndex,
          style,
        },
      })
    }
    if (itemsAfterFocusIndex.length) {
      newContext.push({
        type: TYPES.LIST,
        payload: {
          items: itemsAfterFocusIndex,
          style,
        },
      })
    }
    handlers.divideCurrentLineAndNewLine(newContext, contentIndex)
    if (listIndex === 0) {
      handlers.updateFocusState(contentIndex, BACKSPACE)
    } else {
      handlers.updateFocusState(contentIndex + 1, BACKSPACE)
    }
    handlers.updateListFocusIndex(-1)
    if (currentItem.length) {
      handlers.selectionChangeDetected(true)
    }
  }

  const handleFocus = (
    event: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    const { text } = event.nativeEvent

    if (listIndex !== listFocusIndex) {
      if (focusState.action === TYPING) {
        console.log('actionssss', text.length)
        handlers.updateSelection({
          start: text.length,
          end: text.length,
        })
        textInputRef.current?.setNativeProps({
          start: text.length,
          end: text.length,
        })
      }
      // console.log('none active', selection)

      // const { items } = (contentStorage[focusState.index] as ListType).payload
      // let len = items[listFocusIndex].length
      // if(len) {
      //   handlers.updateSelection({
      //     start: len,
      //     end: len
      //   })
      // } else {
      //   handlers.updateSelection({
      //     start: 0,
      //     end: 0
      //   })
      // }
    }
    // if(focusState.action !== ENTER) {
    //   if(text === "") {
    //     console.log('xxxx')
    //     handlers.updateSelection({
    //       start: 0,
    //       end: 0
    //     })
    //   } else {
    //     // console.log('xxxx213')
    //     // handlers.updateSelection({
    //     //   start: text.length,
    //     //   end: text.length
    //     // })
    //   }
    // }

    console.log('list 1', selection)
    if (selectionChangeDetect) {
      textInputRef.current?.setNativeProps({ selection })
    }
    handlers.updateListFocusIndex(listIndex)
    handlers.focusActionReset(contentIndex)
  }

  const handleSelectionChange = (
    event: NativeSyntheticEvent<TextInputSelectionChangeEventData>
  ) => {
    const { selection: nativeSelection } = event.nativeEvent
    const { action } = focusState
    if (listIndex === listFocusIndex) console.log('돔황챠')
    if (listIndex !== listFocusIndex) return
    console.log('ㅋㅌㅇ마ㅣ넝미나어미')
    if (action === ENTER) {
      // todo when action is Enter
    } else if (action === LINEPOP) {
      // todo when action is pop
    } else if (action === BACKSPACE) {
      // todo when action is backspace
    } else {
      if (selectionChangeDetect) {
        // textInputRef.current?.setNativeProps({ selection })
        handlers.selectionChangeDetected(false)
        console.log('detected selection change')
      } else {
        console.log('native selection change: ', nativeSelection)
        handlers.updateSelection(nativeSelection)
      }
    }
  }

  return (
    <ListView>
      <ListMark>
        {style === 'unordered' ? unicodes.UL_BULLET : listIndex + 1 + ' .'}
      </ListMark>
      <StyledTextInput
        ref={
          contentIndex === focusState.index && listIndex === listFocusIndex
            ? textInputRef
            : null
        }
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
        onEndEditing={event => {
          textInputRef.current?.setNativeProps({
            start: text.length,
            end: text.length,
          })
        }}
      >
        <RenderText type={TYPES.LIST} index={contentIndex}>
          {text}
        </RenderText>
      </StyledTextInput>
    </ListView>
  )
}

export default ListTextBlock

const ListView = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 5px 15px;
`

const ListMark = styled.Text`
  width: 35px;
  color: white;
  /* background-color: rgba(255,255,255, .2); */
  font-size: ${({ theme }) => theme.size.font_l};
`

const StyledTextInput = styled.TextInput`
  width: 100%;
  /* background-color: rgba(255,255,255, .2); */
  font-size: ${({ theme }) => theme.size.font_l};
  color: white;
  padding: 0 15px 0 0;
`
