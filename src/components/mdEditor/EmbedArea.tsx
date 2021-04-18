import React from 'react';
import styled from 'styled-components/native';
import YoutubePlayer from "react-native-youtube-iframe";
import { useColorScheme } from 'react-native-appearance';
import { EmbedType, useMdEditorDispatch, useMdEditorState } from '/hooks/useMdEditorContext';
import { types, actions } from '/lib/constant';



type EmbedAreaProps = {
  content: EmbedType,
  index: number,
}
const EmbedArea = ({ content, index }:EmbedAreaProps) => {

  const { payload } = content;
  const { contentStorage } = useMdEditorState();
  const handlers = useMdEditorDispatch();
  const scheme = useColorScheme();


  const handleCaptionChange = (text:string, index:number) => {
    const currentContext = contentStorage[index] as EmbedType;
    currentContext.payload.caption = text;
    handlers.updateCurrentLine(currentContext, index);
  }

  const handleCaptionSubmitEditing = (index: number) => {
    const newContext = [{
      type: types.PARAGRAPH,
      payload: {
        text: "",
      }
    }]

    handlers.insertNewLineAfter(newContext, index);
    handlers.updateFocusState(index + 1, actions.ENTER);
    handlers.updateSelection({
      start: 0,
      end: 0
    })
  }

  const handleFocus = (index:number) => { 
    return handlers.focusActionReset(index);
  }

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
        onFocus={() => handleFocus(index)}
        onSubmitEditing={() => handleCaptionSubmitEditing(index)}
      />
    </EmbedView>
  )
}

export default EmbedArea;

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
