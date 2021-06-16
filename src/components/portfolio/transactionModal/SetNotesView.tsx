import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Text from '/components/common/Text';

const { width } = Dimensions.get('window');
type NotesViewProps = {
  height: number;
}

const SetNotesView = ({ 
  height
}: NotesViewProps) => {

  return (
    <Container height={height}>
      <Text color100 fontXL>
        Notes
      </Text>
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
  justify-content: space-around;
  align-items: center;
  padding: 0 ${({ theme }) => theme.content.spacing};
`