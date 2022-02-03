import React, { useCallback, useState, useRef } from 'react';
import { Animated, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Octicons, MaterialCommunityIcons  } from '@expo/vector-icons';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import usePortfolioStats from '/hooks/usePortfolioStats';
import useAnimatedHeaderTitle from '/hooks/useAnimatedHeaderTitle';
import useGlobalTheme from '/hooks/useGlobalTheme';

import { usePortfolioContext } from './PortfolioDataContext'
import PortfolioAnalysisSheet from './PortfolioAnalysisSheet';
import CoinListSheet from './CoinListSheet';
import OverviewTitle from './OverviewTitle';
import { CoinItem as CoinItemSkeleton } from '/components/skeletonPlaceholder/common';
import SurfaceWrap from '/components/common/SurfaceWrap';
import CustomScrollView from '/components/common/ScrollView';
import Text from '/components/common/Text';
import CustomRefreshControl from '/components/common/CustomRefreshControl';


type EmptyViewProps = {
  isLoading: boolean
}
const EmptyCoinListView = ({ isLoading }: EmptyViewProps) => {
  const { t } = useTranslation();
  const { theme } = useGlobalTheme();

  return (
    <>
      { isLoading
        ? <>
            <CoinItemSkeleton />
            <CoinItemSkeleton />
            <CoinItemSkeleton />
            <CoinItemSkeleton />
            <CoinItemSkeleton />
          </>
        : <EmptyViewContainer>
            <MaterialCommunityIcons 
              name="widgets-outline" 
              size={28} 
              color={ theme.base.text[300] } 
            />
            <Text fontML bold margin="10px 0 0 0">
              { t(`portfolio.you do not have any assets yet`) }
            </Text>
            <Text center margin="10px 0 0 0" bold color300 lineHeight={18}>
              { t(`portfolio.tap the`) } &nbsp;
              <Text fontS bold>
                + { t(`portfolio.add new asset`) }
              </Text>
              &nbsp; { t(`portfolio.button to add a transaction or to start watching coins`) }
            </Text>
          </EmptyViewContainer>
      }
    </>
  )
}

const Layout = () => {
  const { t } = useTranslation(); 
  const navigation = useNavigation();
  const { theme } = useGlobalTheme();
  const scrollViewRef = useRef<Animated.LegacyRef<ScrollView>>(null);
  const { id, coins, coinsData, initLoading, mutate } = usePortfolioContext();
  const { portfolioStats } = usePortfolioStats({ id, coinsData })
  const [refreshing, setRefreshing] = useState(false);
  const { scrollY } = useAnimatedHeaderTitle({ 
    title: 
      <OverviewTitle 
        total_balance={portfolioStats?.total_balance}
        portfolio_change_percentage_24h={portfolioStats?.portfolio_change_percentage_24h}
      />,
    triggerPoint: 60,
  })

  useScrollToTop(scrollViewRef);

  const handleWatchCoinCoinPress = () => {
    navigation.navigate('AddNewCoin', { portfolioId: id });
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
    <CustomScrollView
      as={Animated.ScrollView}
      ref={scrollViewRef}
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
        {
          portfolioStats && !initLoading  
            ? coins.length !== 0
              ? <CoinListSheet 
                  coinsStats={portfolioStats.coins}
                  portfolioTotalCosts={portfolioStats.total_costs}
                />
              : <EmptyCoinListView isLoading={false}/>
            : <EmptyCoinListView isLoading={true}/>
        }
        <AddCoinButton
          onPress={handleWatchCoinCoinPress} 
        >
          <Octicons name="plus" size={14} color={ theme.base.dark100 } />
          <Text fontML dark100 heavy margin="0 0 0 5px">
            { t(`portfolio.add new asset`) }
          </Text>
        </AddCoinButton>
      </SurfaceWrap>
    </CustomScrollView>
  )
}

export default Layout;

const AddCoinButton = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  height: 45px;
  background-color: ${({ theme }) => theme.base.primaryColor};
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.border.m};
  margin-top: 30px;
`

const EmptyViewContainer = styled.View`
  height: 160px;
  justify-content: center;
  align-items: center;
`