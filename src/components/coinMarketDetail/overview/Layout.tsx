import React, { useState, useCallback } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';

import { useAppSelector, shallowEqual } from '/hooks/useRedux';
import useCoinDetail from '/hooks/data/useCoinDetail';
import { useCoinIdContext } from '/hooks/useCoinIdContext';
import useLocales from '/hooks/useLocales';
import useGlobalTheme from '/hooks/useGlobalTheme';

import CustomRefreshControl from '/components/common/CustomRefreshControl';
import ScrollView from '/components/common/ScrollView'
import AddTransactionButton from '../AddTransactionButton';
import WatchButton from '../WatchButton';
import ChartTab from './ChartTab';
import PriceChangePercentage from './PriceChangePercentage';
import Stats from './Stats';
import MainChart from './priceChart';

const { width } = Dimensions.get('window');

const Layout = () => {
  const { theme, scheme } = useGlobalTheme();
  const { id } = useCoinIdContext();
  const [refreshing, setRefreshing] = useState(false);
  const { chartOption, portfolios, activeIndex } = useAppSelector(state => ({
    chartOption: state.baseSettingReducer.chartOption,
    portfolios: state.portfolioReducer.portfolios,
    activeIndex: state.portfolioReducer.activeIndex
  }), shallowEqual);
  const { currency } = useLocales();
  const { data, mutate } = useCoinDetail({ id });
  
  const handleRefresh = useCallback(async() => {
    setRefreshing(true);
    await mutate()
    setRefreshing(false);
  }, []);

  if(!data) return <></>

  return (
    <>
      <ScrollView 
        refreshControl={
          <CustomRefreshControl
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        }
      >
        <ChartArea>
          <MainChart 
            id={id}
            chartOption={chartOption}
            lastUpdatedPrice={data.market_data.current_price[currency]}
            percentage_24h={data.market_data.price_change_percentage_24h_in_currency[currency]}
            price_24h_ago={
              data.market_data.current_price[currency]
              - data.market_data.price_change_24h_in_currency[currency]
            }
          />
          <ChartTab 
            lastUpdatedPercentage={data.market_data.price_change_percentage_24h_in_currency[currency]} 
          />
        </ChartArea>
        <Stats 
          rank={data.market_data.market_cap_rank}
          marketcap={data.market_data.market_cap[currency]}
          totalVolume={data.market_data.total_volume[currency]}
          genesis_date={data.genesis_date}
          maxSupply={data.market_data.max_supply}
          circulatingSupply={data.market_data.circulating_supply}
          hashingAlgorithm={data.hashing_algorithm}
          currency={currency}
        />
        <PriceChangePercentage 
          percentage_24h={data.market_data.price_change_percentage_24h_in_currency[currency]}
          percentage_7d={data.market_data.price_change_percentage_7d_in_currency[currency]}
          percentage_30d={data.market_data.price_change_percentage_30d_in_currency[currency]}
          percentage_200d={data.market_data.price_change_percentage_200d_in_currency[currency]}
          percentage_1y={data.market_data.price_change_percentage_1y_in_currency[currency]}
        />
        <EmptyView />
      </ScrollView>
      <FooterContainer 
        intensity={85} 
        tint={scheme === 'dark' ? 'dark' : 'light'}
      >
        <ButtonWrap>
          <WatchButton 
            width={ 
              (width - parseInt(theme.content.spacing) * 2) / 2 - (
                parseInt(theme.content.spacing) / 2
              ) 
            }
            id={data.id}
            symbol={data.symbol}
            image={data.image.large}
            name={data.name}
          />
          <AddTransactionButton 
            width={ 
              (width - parseInt(theme.content.spacing) * 2) / 2 - (
                parseInt(theme.content.spacing) / 2
              )
             }
             portfolioId={portfolios[activeIndex].id}
          />
        </ButtonWrap>
      </FooterContainer>
    </>
  )
}

export default Layout;

const ChartArea = styled.View`
  background-color: ${({ theme }) => theme.base.background.surface};
  padding: 15px 0;
`

const EmptyView = styled.View`
  height: 80px;
  margin-top: ${({ theme }) => theme.content.blankSpacing};
  background-color: ${({ theme }) => theme.base.background.surface};
`

const FooterContainer = styled(BlurView)`
  flex-direction: row;
  position: absolute;
  width: ${ width }px;
  height: 70px;
  bottom: 0px;
  align-items: center;
  justify-content: center;
`

const ButtonWrap = styled.View`
  flex-direction: row;
  width: ${({ theme }) => width - parseInt(theme.content.spacing) * 2}px;
  justify-content: space-between;
  
`