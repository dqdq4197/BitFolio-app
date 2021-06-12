import React, { useState } from 'react';
import { 
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import styled from 'styled-components/native';
import CircleCloseButton from '/components/common/CircleCloseButton';

type ModalProps = {
  visible: boolean;
  children: React.ReactNode;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  headerComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
  extraComponent?: React.ReactNode;
}
const ScrollCloseModal = ({ 
  visible, 
  setVisible, 
  children, 
  headerComponent,
  footerComponent,
  extraComponent
}: ModalProps) => {

  const [percentage, setPercentage] = useState(0);

  const handleModalClose = () => {
    setVisible(false);
    setPercentage(0);
  }

  const handleTouchEnd = () => {
    if(percentage >= 100) {
      setVisible(false);
      setPercentage(0);
    }
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { nativeEvent: { contentOffset } } = event;
    if(contentOffset.y < 3 && contentOffset.y >= -54) {
      setPercentage(-contentOffset.y * 2);
    }
  }

  return (
    <Modal 
      animationType='slide'
      visible={visible}
    > 
      <Container
        behavior="padding"
      >
        <HeaderView>
          <CircleCloseButton percentage={percentage} onModalClose={handleModalClose}/>
        </HeaderView>
        { headerComponent }
        <ScrollView
          onScroll={handleScroll}
          onTouchEnd={handleTouchEnd}
          scrollEventThrottle={1}
        >
          { children }
        </ScrollView>
        { footerComponent }
      </Container>
      { extraComponent }
    </Modal>
  )
}

export default ScrollCloseModal;

const Modal = styled.Modal``

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.base.background.surface};
`

const HeaderView = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 16px;
  padding: 30px ${({ theme }) => theme.content.spacing} 0;
`

const ScrollView = styled.ScrollView`
  width: 100%;
  padding: 0 ${({ theme }) => theme.content.spacing};
`
