import React from 'react';
import ControlBar from './ControlBar';
import KeyboardAwareScrollView from './KeyboardAwareScrollView';
import PlainTextBlock from './PlainTextBlock';
import ListTextBlock from './ListTextBlock';
import EmbedBlock from './EmbedBlock';
import ImageBlock from './ImageBlock';
import DelimiterBlock from './DelimiterBlock';
import { 
  useMdEditorState,
  ParagraphType,
  EmbedType,
  ListType,
  ImageType
} from '/hooks/useMdEditorContext';
import { TYPES } from '/lib/constant';


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
        const { PARAGRAPH, QUOTE, HEADER, DUMMY, DELIMITER, EMBED, LIST, IMAGE } = TYPES;

        switch(type) {
          case PARAGRAPH:
          case QUOTE:
          case HEADER:
          case DUMMY:
            const { payload } = content as ParagraphType;
            return (
              <PlainTextBlock 
                key={index}
                index={index}
                type={type}
                payload={payload}
              />
            )
          case DELIMITER:
            return (
              <DelimiterBlock key={index} />
            )
          case EMBED:
            return (
              <EmbedBlock 
                key={index}
                content={content as EmbedType} 
                index={index}
              />
            )
          case LIST:
            const { items, style } = (content as ListType).payload;
            return items.map((item, listIndex) => {
              return (
                <ListTextBlock 
                  key={listIndex}
                  text={item}
                  style={style}
                  listIndex={listIndex}
                  contentIndex={index}
                />
              )
            })
          case IMAGE:
            const { file: { uri, width, height } } = (content as ImageType).payload;
            return (
              <ImageBlock
                key={index}
                index={index}
                uri={uri}
                width={width}
                height={height}
              />
            )
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