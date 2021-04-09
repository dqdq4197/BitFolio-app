import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
  TextInput, 
  findNodeHandle,
  NativeSyntheticEvent, 
  TextInputSelectionChangeEventData,
  TextInputKeyPressEventData,
  TextInputFocusEventData,

} from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import styled, { css } from 'styled-components/native';
import ControlBar from './ControlBar';
import KeyboardAwareScrollView from './KeyboardAwareScrollView';
import { unicodes, types, actions } from './constants';
import RenderText from './RenderText';
import Text from '/components/common/Text';
import YoutubePlayer from "react-native-youtube-iframe";
import PlainTextInput from './PlainTextInput';
import ListTextInput from './ListTextInput';


const CONTROL_BAR_HEIGHT = 45;


type ParagraphType = {
  type: string,
  payload: {
    text: string,
    styles: string[]
  }
}
type DelimiterType = {
  type: string,
  payload: {}
}
type EmbedType = {
  type: string,
  payload: {
    source: string,
    id: string,
    caption: string,
  }
}
type ListType = {
  type: string,
  payload: {
    style: "ordered" | "unordered",
    items: string[]
  }
}

type ContentType = ParagraphType | EmbedType | DelimiterType | ListType

const Editor = () => {
  const scheme = useColorScheme();
  const textInputRef = useRef<TextInput>(null);
  const [focusState, setFocusState] = useState({
    index: 0,
    action: ''
  });
  const [isTextRendered, setIsTextRendered] = useState(true);
  const [contentStorage, setContentStorage] = useState<ContentType[]>([
    {
      type: types.PARAGRAPH,
      payload: {
        text: `${unicodes.TEXT_MARKER}hello${unicodes.TEXT_MARKER}${unicodes.TEXT_LINK}${unicodes.TEXT_ITALIC}${unicodes.TEXT_BOLD}hi${unicodes.TEXT_BOLD}${unicodes.TEXT_ITALIC}${unicodes.TEXT_LINK}how are ${unicodes.TEXT_BOLD}you${unicodes.TEXT_BOLD}?`,
        styles: [
          'NORMAL',
        ]
      }
    }, {
      type: types.LIST,
      payload: {
        items: ['fsd', '2index'],
        style: "unordered"
      }
    },{
      type: types.LIST,
      payload: {
        items: ['fsd', '2index'],
        style: "unordered"
      }
    }, {
      type: types.DUMMY,
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

  useEffect(() => {
    if(textInputRef.current && isTextRendered) {
      const { action, index } = focusState;
      const { ENTER, BACKSPACE, LINEPOP } = actions;
      
      if(action !== LINEPOP)
        textInputRef.current?.focus();

      if(action === ENTER || action === BACKSPACE || (action === LINEPOP && index !== 0)) {
        textInputRef.current.setNativeProps({ selection })
      }
    }
  }, [focusState.index, isTextRendered])

  const onTextRendering = useCallback((bool:boolean) => {
    const { action } = focusState;
    const { ENTER, BACKSPACE, LINEPOP } = actions;

    if(action === ENTER || action === BACKSPACE || action === LINEPOP)
      setIsTextRendered(bool);
  }, [focusState.action])

  const updateFocusState = (index:number, action:string, selectionEnd: number) => {
    setFocusState({ index, action })
    setSelection({
      start: selectionEnd,
      end: selectionEnd
    })
  }

  const focusActionReset = (index?: number) => {
    if(index !== undefined) {
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
  
  // console.log(contentStorage);
  console.log(selection, focusState)
  const handleInputChangeText = useCallback((text:string, index:number) => {
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
            styles: []
          }
        })
        focusIndex += 1;
      } 
      
      if(afterURL !== "" || nextContext.type !== types.PARAGRAPH) {
        newContext.push({
          type: types.PARAGRAPH,
          payload: {
            text: afterURL,
            styles: []
          }
        })
      }

      setContentStorage((prev) => [
        ...prev.slice(0, index),
        ...newContext,
        ...prev.slice(index + 1, contentStorage.length)
      ])
      
      updateFocusState(focusIndex, actions.TYPING, afterURL.length);
    } else {
      currentContext.payload.text = text;

      setContentStorage((prev) => [
        ...prev.slice(0, index),
        currentContext,
        ...prev.slice(index + 1, contentStorage.length)
      ])
  
      focusActionReset();
    }
  }, [contentStorage, focusState, selection])

  const handleInputKeyPress = useCallback((
    event:NativeSyntheticEvent<TextInputKeyPressEventData>, 
    index:number
  ) => {
    if(focusState.index !== index) return ;
    const { key } = event.nativeEvent;
    const { PARAGRAPH, DELIMITER, EMBED } = types;
    const { BACKSPACE, ENTER, LINEPOP } = actions;
    const currentContext = contentStorage[index] as ParagraphType;
    const currentText = currentContext.payload.text;

    // enter key 
    if(key === 'Enter') {
      const editedText = currentText.slice(0, selection.start);
      currentContext.payload.text = editedText;

      let newContext = {
        type: PARAGRAPH,
        payload: {
          text: currentText.slice(selection.end, currentText.length),
          styles: [],
        }
      }
      
      setIsTextRendered(false);
      setContentStorage(
        (prev) => [
          ...prev.slice(0, index),
          currentContext,
          newContext,
          ...prev.slice(index + 1, prev.length)
        ]
      )
      updateFocusState(index + 1, ENTER, 0)
    }
    
    if(key === "Backspace" && index !== 0) {
      const prevContext = contentStorage[index - 1] as ParagraphType;
      const { type } = prevContext;
      const prevText = prevContext.payload.text;

      if(selection.end === 0) {
        if(type === DELIMITER || type === EMBED) {
          setContentStorage(
            (prev) => [
              ...prev.slice(0, index - 1),
              ...prev.slice(index, prev.length)
            ]
          )
          updateFocusState(index - 1, BACKSPACE, 0);
        } else {
          if(currentText === "") {
            //onPress backspace remove current line
            setContentStorage(
              (prev) => [
              ...prev.slice(0, index),
              ...prev.slice(index + 1, prev.length)
              ]
            )
            updateFocusState(index - 1, LINEPOP, prevText.length)
            setTimeout(() => {
              textInputRef.current?.focus();
            }, 0)
          } else {
            //onPress backspace merge previous line
            const editedText = prevText + currentText;
            prevContext.payload.text = editedText;

            setIsTextRendered(false);
            setContentStorage(
              (prev) => [
                ...prev.slice(0, index - 1),
                prevContext,
                ...prev.slice(index + 1, prev.length)
              ]
            )
            updateFocusState(index - 1, BACKSPACE, prevText.length)
          }
        }
      }
    }
  }, [contentStorage, focusState, selection])

  const handleCaptionChange = (text:string, index:number) => {
    const currentContext = contentStorage[index] as EmbedType;
    currentContext.payload.caption = text;
    setContentStorage(
      (prev) => [
        ...prev.slice(0, index),
        currentContext,
        ...prev.slice(index + 1, prev.length)
      ]
    )
  }

  const handleCaptionSubmitEditing = (index: number) => {
    const newContext = {
      type: types.PARAGRAPH,
      payload: {
        text: "",
        styles: []
      }
    }

     setContentStorage(
       (prev) => [
         ...prev.slice(0, index + 1),
         newContext,
         ...prev.slice(index + 1, prev.length)
       ]
     )

     updateFocusState(index + 1, actions.ENTER, 0);
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
    const currentContext = contentStorage[index] as ParagraphType;
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

  const handleQuotePress = () => {
    let { index } = focusState;
    const { PARAGRAPH, QUOTE, EMBED } = types;
    let currentContext = contentStorage[index];

    if(currentContext.type === EMBED) return ;

    if(currentContext.type === QUOTE) {
      currentContext.type = PARAGRAPH;
    } else {
      currentContext.type = QUOTE;
    }

    setContentStorage(
      (prev) => [
        ...prev.slice(0, index),
        currentContext,
        ...prev.slice(index + 1, prev.length)
      ]
    )
  }

  const handleHeaderPress = () => {
    let { index } = focusState;
    const { PARAGRAPH, HEADER, EMBED } = types;
    let currentContext = contentStorage[index];

    if(currentContext.type === EMBED) return ;

    if(currentContext.type === HEADER) {
      currentContext.type = PARAGRAPH;
    } else {
      currentContext.type = HEADER;
    }

    setContentStorage(
      (prev) => [
        ...prev.slice(0, index),
        currentContext,
        ...prev.slice(index + 1, prev.length)
      ]
    )
  }

  const handleDelimiterPress = () => {
    let { index } = focusState;
    const nextContext = contentStorage[index + 1];
    const isLastContent = index === contentStorage.length - 2;
    let newContext:ContentType[] = [];

    newContext.push({
      type: types.DELIMITER,
      payload: {}
    })

    if(isLastContent || nextContext.type === types.DELIMITER) {
      newContext.push({
        type: types.PARAGRAPH,
        payload: {
          text: "",
          styles: []
        }
      })
    }

    setContentStorage(
      (prev) => [
        ...prev.slice(0, index + 1),
        ...newContext,
        ...prev.slice(index + 1, prev.length)
      ]
    )
    updateFocusState(index + 2, actions.TYPING, 0);
  }

  const handleFocus = (
    event:NativeSyntheticEvent<TextInputFocusEventData>, 
    index:number,
  ) => {
    const { text } = event.nativeEvent;
    const { ENTER, BACKSPACE, LINEPOP } = actions;
    const { action } = focusState;

    if(text === "") {
      setSelection({
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

    focusActionReset(index);
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
        setSelection({
          start: 0,
          end: 0
        })
      } else if(action === LINEPOP) {
        // todo when action is pop
      } else if(action === BACKSPACE) {
        // todo when action is backspace
      } else {
        console.log('mmmm', selection);
        setSelection(selection)
      }
    }
  }
  console.log(contentStorage);
  const InputArea = () => (
    contentStorage.map((content, index) => {
      const { type } = content;
      const { PARAGRAPH, QUOTE, HEADER, DUMMY, DELIMITER, EMBED, LIST } = types;
      
      if(type === PARAGRAPH || type === QUOTE || type === HEADER || type === DUMMY) {
        const { payload } = content as ParagraphType;
        const isLastIndex = contentStorage.length - 1 === index;
        return (
          <PlainTextInput 
            key={index}
            ref={textInputRef}
            index={index}
            focusState={focusState}
            type={type}
            isLastIndex={isLastIndex}
            payload={payload}
            onInputChangeText={handleInputChangeText}
            onInputKeyPress={handleInputKeyPress}
            onSelectionChange={handleSelectionChange}
            onFocus={handleFocus}
            onTextRendering={onTextRendering}
          />
        )
      } else if(type === DELIMITER) {
        return (
          <StyledDelimiter key={'input' + index}> 
            <Text fontXXXL>
              * * *
            </Text>
          </StyledDelimiter>
        )
      } else if(type === EMBED) {
        const { payload } = content as EmbedType;

        return (
          <EmbedView key={'input' + index}>
            <YoutubePlayer
              height={211}
              videoId={payload.id}
            />
            <CaptionTextInput 
              keyboardAppearance={scheme === 'dark' ? 'dark' : 'light'}
              value={payload.caption}
              multiline
              blurOnSubmit
              returnKeyType="next"
              textAlignVertical="center"
              placeholder={"Enter a caption"}
              placeholderTextColor="rgba(201,201,204,.48)" 
              onChangeText={(text) => handleCaptionChange(text, index)}
              onFocus={(event) => handleFocus(event, index)}
              onSubmitEditing={() => handleCaptionSubmitEditing(index)}
            />
          </EmbedView>
        )
      } else if(type === LIST) {
        const { items, style } = (content as ListType).payload;

        return items.map((item, listIndex) => {
          return (
            <ListTextInput 
              key={listIndex}
              text={item}
              style={style}
              listIndex={listIndex}
            />
          )
        })
          
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
        selecting={selection.start !== selection.end}
        onBoldPress={handleBoldPress}
        onQuotePress={handleQuotePress}
        onHeaderPress={handleHeaderPress}
        onDelimiterPress={handleDelimiterPress}
      />
    </>
  )
}

export default Editor;

const StyledDelimiter = styled.View`
  height: 50px;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const EmbedView = styled.View`
  margin-bottom: 10px;
`

const CaptionTextInput = styled.TextInput`
  color: white;
  padding: 5px 15px;
  font-size: ${({theme}) => theme.size.font_l};
  font-style: italic;
  border-color: ${({theme}) => theme.colors.grey['800']};
  border-width: 2px;
  border-style: solid;
  margin-top: 5px;
`

