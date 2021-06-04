import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import Text from '/components/common/Text';
import { useAppDispatch } from '/hooks/useRedux';
import { createPortfolio } from '/store/portfolio';
import CreatePortfolioModal from './CreatePortfolioModal';

const { width } = Dimensions.get('window');

const FooterView = ( ) => {

  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  const closeModal = () => {
    setVisible(false)
  }

  const handleAddPress = () => {
    setVisible(true);
  }

  return (
    <Container>
      <Text fontXL onPress={handleAddPress}>
        Add a new portfolio
      </Text>
      <CreatePortfolioModal
        visible={visible}
        closeModal={closeModal}
      />
    </Container>
  )
}

export default FooterView;

const Container = styled.View`
  width: ${ width }px;
  flex: 1;
  justify-content: center;
  align-items: center;
`