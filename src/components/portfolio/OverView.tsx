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
import PortfolioAnalysisSheet from './PortfolioAnalysisSheet';
import useAnimatedHeaderTitle from '/hooks/useAnimatedHeaderTitle';
import CoinListSheet from './CoinListSheet';
import OverviewTitle from './OverviewTitle';


const Overview = () => {
  const { t } = useTranslation(); 
  const navigation = useNavigation();
  const { id, coinsData, mutate } = usePortfolioContext();
  const { portfolioStats } = usePortfolioStats({ id, coinsData })
  const [refreshing, setRefreshing] = useState(false);
  const { scrollY } = useAnimatedHeaderTitle({ 
    title: 
      <OverviewTitle 
        total_balance={portfolioStats?.total_balance}
        portfolio_change_percentage_24h={portfolioStats?.portfolio_change_percentage_24h}
      />,
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
      <PortfolioAnalysisSheet 
        portfolioStats={portfolioStats}
      />
      <SurfaceWrap 
        title={ t(`portfolio.assets`) }
      >
        <CoinListSheet 
          coinsStats={portfolioStats?.coins}
          portfolioTotalCosts={portfolioStats?.total_costs}
        />
        <AddTrackingButton
          onPress={handleAddTrackingCoinPress} 
        >
          <Text fontL color100 bold>
            추가하기
          </Text>
        </AddTrackingButton>
      </SurfaceWrap>
    </ScrollView>
  )
}

export default Overview;

const AddTrackingButton = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  background-color: ${({ theme }) => theme.base.primaryColor};
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.border.m};
  margin-top: 30px;
`

const PrivateWrap = styled.View`
  width: 70px;
  height: 30px;
  background-color: ${({ theme }) => theme.base.background[200]};
  border-radius: ${({ theme }) => theme.border.m};
  align-items: center;
  justify-content: center;
`

const PercentageWrap = styled.View`
  background-color: ${({ theme }) => theme.base.background[200] };
  border-radius: ${({ theme }) => theme.border.m};
  padding: 3px 5px;
`