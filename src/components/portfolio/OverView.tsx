import React, { useState, useEffect } from 'react';
import { 
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '/hooks/useRedux';
import PortfolioItem from './PortfolioItem';
import FooterView from './FooterView';
import useGlobalTheme from '/hooks/useGlobalTheme';
import FormModal from './transactionModal/FormModal';
import Text from '/components/common/Text';
import usePortfolioCoins from '/hooks/usePortfolioCoins';

const { width } = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = width - 60;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const OverView = () => {

  const navigation = useNavigation();
  const { theme } = useGlobalTheme();
  const { portfolios } = useAppSelector(state => state.portfolioReducer);
  const [activePageNum, setActivePageNum] = useState(0);
  const [visible, setVisible] = useState(false);
  const { data } = usePortfolioCoins({ portfolios });
  
  const handleScrollEnd = (event:NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    
    let pageNum = Math.floor(contentOffset.x / layoutMeasurement.width);
    setActivePageNum(pageNum);
  }
  
  const onModalClose = () => {
    setVisible(false);
  }

  const handleAddTrackingCoinPress = () => {
    let activePageId = portfolios[activePageNum].id;
    navigation.navigate('AddTrack', { portfolioId: activePageId });
  }

  if(!portfolios) return <></>
  return (
    <Container>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        snapToInterval={width}
        snapToAlignment='center'
        decelerationRate={0}
        bounces={false}
      >
        {/* <SpacerItem /> */}
        {portfolios.map(portfolio => {
          return (
            <PortfolioItem
              key={portfolio.id}
              item={portfolio}
              coinsData={data}
            />
            )
          }) 
        }
        <FooterView />
      </ScrollView>
      <AddTrackingButton>
        <Text fontL onPress={handleAddTrackingCoinPress} color100>
          추가하기
        </Text>
      </AddTrackingButton>
    </Container>
  )
}

export default OverView;

const Container = styled.View`
  align-items: center;
`
const ScrollView = styled.ScrollView`
  background-color: ${({ theme }) => theme.base.background.surface};
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