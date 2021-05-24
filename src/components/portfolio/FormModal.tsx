import React, { useState } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import styled from 'styled-components/native';
import CircleCloseButton from '/components/common/CircleCloseButton';

type FormModalProps = {
  visible: boolean,
  setModalVisible: () => void;
}
const FormModalLayout = ({ visible, setModalVisible }: FormModalProps) => {

  const [percentage, setPercentage] = useState(0);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { nativeEvent: { contentOffset } } = event;
    if(contentOffset.y < 10 && contentOffset.y >= -70) {
      setPercentage(-contentOffset.y * 2);
    }
  }

  const onModalClose = () => {
    setModalVisible();
    setPercentage(0);
  }

  const handleTouchEnd = () => {
    if(percentage >= 100) {
      setModalVisible();
      setPercentage(0);
    }
  }

  return (
    <>
      <Modal 
        animationType='slide'
        visible={visible}
      > 
        <HaderView>
          <CircleCloseButton percentage={percentage} onModalClose={onModalClose}/>
        </HaderView>
        <ScrollView 
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onTouchEnd={handleTouchEnd}
        >

        </ScrollView>
      </Modal>
    </>
  )
}

export default FormModalLayout;

const Modal = styled.Modal`
`
const HaderView = styled.View`
  background-color: ${({ theme }) => theme.base.background.surface};
  padding-top: 50px;
`
const ScrollView = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.base.background.surface};
`
