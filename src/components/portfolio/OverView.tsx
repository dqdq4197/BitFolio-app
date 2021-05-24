import React, { useState } from 'react';
import styled from 'styled-components/native';
import FormModal from './FormModal';
import Text from '/components/common/Text';

const OverView = () => {

  const [visible, setVisible] = useState(false);

  const setModalVisible = () => {
    setVisible(false)
  }

  return (
    <>
      <Button onPress={() => setVisible(!visible)}>
        <Text fontXL>
          추가
        </Text>
      </Button>
      <FormModal visible={visible} setModalVisible={setModalVisible}/>
    </>
  )
}

export default OverView;

const Button = styled.TouchableOpacity`

`