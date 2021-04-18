import React from 'react';
import styled from 'styled-components/native';
import ControlBar from './ControlBar';
import KeyboardAwareScrollView from './KeyboardAwareScrollView';
import { types } from '/lib/constant';
import Text from '/components/common/Text';
import PlainTextInput from './PlainTextInput';
import ListTextInput from './ListTextInput';
import EmbedArea from './EmbedArea';
import { 
  useMdEditorState,
  ParagraphType,
  EmbedType,
  ListType 
} from '/hooks/useMdEditorContext';

const CONTROL_BAR_HEIGHT = 45;


const InputArea = () => {
  const { contentStorage, focusState, listFocusIndex, selection } = useMdEditorState();
  console.log(
    contentStorage,
    'focusState:', focusState, 'listFocusIndex:', listFocusIndex, 'selection:', selection,
    )

  return (
    <>
    {
      contentStorage.map((content, index) => {
        const { type } = content;
        const { PARAGRAPH, QUOTE, HEADER, DUMMY, DELIMITER, EMBED, LIST } = types;

        switch(type) {
          case PARAGRAPH:
          case QUOTE:
          case HEADER:
          case DUMMY:
            const isLastIndex = contentStorage.length - 1 === index;
            const { payload } = content as ParagraphType;
            return (
              <PlainTextInput 
                key={index}
                index={index}
                type={type}
                isLastIndex={isLastIndex}
                payload={payload}
              />
            )
          case DELIMITER:
            return (
              <StyledDelimiter key={'input' + index}> 
                <Text fontXXXL>
                  * * *
                </Text>
              </StyledDelimiter>
            )
          case EMBED:
            return (
              <EmbedArea 
                content={content as EmbedType} 
                index={index}
              />
            )
          case LIST:
            const { items, style } = (content as ListType).payload;
            return items.map((item, listIndex) => {
              return (
                <ListTextInput 
                  key={listIndex}
                  text={item}
                  style={style}
                  listIndex={listIndex}
                  contentIndex={index}
                />
              )
            })
        }
      })
    }
    </>
  )
}

const Editor = () => {
  const { focusState, selection } = useMdEditorState();

  return (
    <>
      <KeyboardAwareScrollView
        autoScrollDependency={focusState.index}
        extraScrollHeight={CONTROL_BAR_HEIGHT}
      >
        <InputArea />
      </KeyboardAwareScrollView>
      <ControlBar 
        selecting={selection.start !== selection.end}
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





