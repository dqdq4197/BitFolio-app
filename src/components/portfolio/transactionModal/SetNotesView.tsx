import React, { useRef, useEffect } from 'react';
import { Dimensions, TextInput, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import Text from '/components/common/Text';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { useTranslation } from 'react-i18next';


const { width } = Dimensions.get('window');
type NotesViewProps = {
  height: number
  isFocused: boolean
  notes: string | null
  setNotes: (text: string) => void
  notesMaxLength: number
}

const SetNotesView = ({ 
  height,
  isFocused,
  notes,
  setNotes,
  notesMaxLength
}: NotesViewProps) => {

  const { t } = useTranslation();
  const textInputRef = useRef<TextInput>(null);
  const { scheme } = useGlobalTheme();


  useEffect(() => {
    if(isFocused) {
      textInputRef.current?.focus();
    } else {
      Keyboard.dismiss();
    }
  }, [isFocused])
  return (
    <Container height={height}>
      <NotePadWrap>
        <Text>
          { t('common.notes') }
        </Text>
        <NotePad 
          ref={textInputRef}
          onChangeText={(text) => setNotes(text)}
          keyboardAppearance={scheme === 'dark' ? 'dark' : 'light'}
          multiline
          value={notes || ''}
        />
        <TextLengthWrap>
          <Text>
            { notes ? notes.length : 0 } / {notesMaxLength}
          </Text>
        </TextLengthWrap>
      </NotePadWrap>
    </Container>
  )
}

export default SetNotesView;

type ContainerType = {
  height: number;
}

const Container = styled.View<ContainerType>`
  width: ${ width }px;
  height: ${({ height }) => height }px;
  padding: 16px ${({ theme }) => theme.content.spacing};
`

const NotePadWrap = styled.View`
  width: 100%;
  min-height: 120px;
  max-height: 230px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.base.background[400]};
  border-radius: ${({ theme }) => theme.border.m};
`
const NotePad = styled.TextInput`
  min-height: 120px;
  max-height: 180px;
  color: ${({ theme }) => theme.base.text[100]};
  font-size: ${({ theme }) => theme.size.font_ml };
  margin: 5px 0;
`

const TextLengthWrap = styled.View`
  align-items: flex-end;
`
