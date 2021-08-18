import React, { useCallback, useState } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import usePortfolioStats from '/hooks/usePortfolioStats';
import SurfaceWrap from '/components/common/SurfaceWrap';
import ScrollView from '/components/common/ScrollView';
import Text from '/components/common/Text';
import CustomRefreshControl from '/components/common/CustomRefreshControl';
import { usePortfolioContext } from './PortfolioDataContext'
import PortfolioAnalisisSheet from './PortfolioAnalisisSheet';
import useAnimatedHeaderTitle from '/hooks/useAnimatedHeaderTitle';
import CoinListSheet from './CoinListSheet';
import { currencyFormat, getCurrencySymbol } from '/lib/utils/currencyFormat';
import useLocales from '/hooks/useLocales';

const OverView = () => {
  const { t } = useTranslation(); 
  const navigation = useNavigation();
  const { currency } = useLocales();
  const { id, coinsData, mutate } = usePortfolioContext();
  const { portfolioStats } = usePortfolioStats({ id, coinsData })
  const [refreshing, setRefreshing] = useState(false);
  const { scrollY } = useAnimatedHeaderTitle({ 
    title: portfolioStats 
      ? currencyFormat({ 
          value: portfolioStats?.total_balance,
          prefix: getCurrencySymbol(currency)
        }) 
      : '--', 
    triggerPoint: 60 
  })
  
  const handleAddTrackingCoinPress = () => {
    navigation.navigate('AddTrack', { portfolioId: id });
  }

  const handleScroll = Animated.event(
    [ { nativeEvent: { contentOffset: { y: scrollY } } } ], 
    { useNativeDriver: false }
  )

  const handleRefresh = useCallback(async() => {
    setRefreshing(true);
    await mutate()
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      as={Animated.ScrollView}
      onScroll={handleScroll}
      refreshControl={
        <CustomRefreshControl
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
      }
    >
      <SurfaceWrap 
        marginTopZero
      >
        <PortfolioAnalisisSheet 
          portfolioStats={portfolioStats}
        />
      </SurfaceWrap>
      <SurfaceWrap 
        title={ t(`portfolio.assets`) }
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
    </ScrollView>
  )
}

export default OverView;

const AddTrackingButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.base.primaryColor};
  margin: 0 ${({ theme }) => theme.content.spacing};
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.border.m};
  color: white;
`