import React from 'react'
import { View } from 'react-native'

import {
  useMdEditorState,
  ParagraphType,
  EmbedType,
  ListType,
  ImageType,
} from '/hooks/context/useMdEditorContext'
import { TYPES } from '/lib/constant'

import ControlBar from './ControlBar'
import KeyboardAwareScrollView from './KeyboardAwareScrollView'
import PlainTextBlock from './PlainTextBlock'
import ListTextBlock from './ListTextBlock'
import EmbedBlock from './EmbedBlock'
import ImageBlock from './ImageBlock'
import DelimiterBlock from './DelimiterBlock'

const CONTROL_BAR_HEIGHT = 45

const InputArea = () => {
  const {
    contentStorage,
    focusState,
    listFocusIndex,
    selection,
    selectionChangeDetect,
  } = useMdEditorState()
  console.log(
    // contentStorage,
    'focusState:',
    focusState,
    'listFocusIndex:',
    listFocusIndex,
    'selection:',
    selection,
    'detected:',
    selectionChangeDetect
  )

  return (
    <>
      {contentStorage.map((content, index) => {
        const { type } = content
        const {
          PARAGRAPH,
          QUOTE,
          HEADER,
          DUMMY,
          DELIMITER,
          EMBED,
          LIST,
          IMAGE,
        } = TYPES
        // eslint-disable-next-line default-case
        switch (type) {
          case PARAGRAPH:
          case QUOTE:
          case HEADER:
          case DUMMY:
            // eslint-disable-next-line no-case-declarations
            const { payload } = content as ParagraphType
            return (
              <PlainTextBlock
                key={index}
                index={index}
                type={type}
                payload={payload}
              />
            )
          case DELIMITER:
            return <DelimiterBlock key={index} />
          case EMBED:
            return (
              <EmbedBlock
                key={index}
                content={content as EmbedType}
                index={index}
              />
            )
          case LIST: {
            const { items, style } = (content as ListType).payload
            return items.map((item, listIndex) => {
              return (
                <ListTextBlock
                  key={index}
                  text={item}
                  style={style}
                  listIndex={listIndex}
                  contentIndex={index}
                />
              )
            })
          }
          case IMAGE: {
            const {
              file: { uri, width, height },
            } = (content as ImageType).payload
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
        }
      })}
      ;
    </>
  )
}

const Editor = () => {
  const { focusState, selection } = useMdEditorState()

  return (
    <View
      // behavior="padding"
      // keyboardVerticalOffset={60}
      style={{ flex: 1 }}
    >
      <KeyboardAwareScrollView
        autoScrollDependency={focusState.index}
        extraScrollHeight={CONTROL_BAR_HEIGHT}
      >
        <InputArea />
      </KeyboardAwareScrollView>
      <ControlBar selecting={selection.start !== selection.end} />
    </View>
  )
}

export default Editor
