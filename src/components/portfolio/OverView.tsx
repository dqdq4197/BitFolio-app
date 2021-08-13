import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '/hooks/useRedux';
import FormModal from './transactionModal/FormModal';
import Text from '/components/common/Text';
import CoinListSheet from './CoinListSheet';
import usePortfolioStats from '/hooks/usePortfolioStats';
import SurfaceWrap from '/components/common/SurfaceWrap';
import { usePortfolioContext } from './PortfolioDataContext'

const { width } = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = width - 60;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const OverView = () => {

  const navigation = useNavigation();
  const { id, coinsData, mutate } = usePortfolioContext();
  const { portfolioStats } = usePortfolioStats({ id, coinsData })
  
  const handleAddTrackingCoinPress = () => {
    navigation.navigate('AddTrack', { portfolioId: id });
  }

  return (
    <Container>
      <HeaderContainer>

      </HeaderContainer>
      <SurfaceWrap 
        title="Assets"
      >
        <CoinListSheet 
          coinsStats={portfolioStats?.coins}
          portfolioTotalCosts={portfolioStats?.total_costs}
        />
      </SurfaceWrap>
      <AddTrackingButton>
        <Text fontL onPress={handleAddTrackingCoinPress} color100>
          추가하기
        </Text>
      </AddTrackingButton>
    </Container>
  )
}

export default OverView;

const Container = styled.ScrollView`
`

const HeaderContainer = styled.View`
  padding: 0 ${({ theme }) => theme.content.spacing};
  height: 170px;
  align-items: center;
  padding-top: 20px;
`

const AddTrackingButton = styled.TouchableOpacity`
  position: absolute;
  height: 30px;
  bottom: 20px;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.base.primaryColor};
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.border.ml};
  color: white;
`