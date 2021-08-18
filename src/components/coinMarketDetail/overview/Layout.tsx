import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import PriceAndDate from './PriceAndDate';
import ChartTab from './ChartTab';
import PriceChangePercentage from './PriceChangePercentage';
import Stats from './Stats';
import { useAppSelector } from '/hooks/useRedux';
import useCoinDetailData from '/hooks/useCoinDetailData';
import { useCoinIdContext } from '/hooks/useCoinIdContext';
import useLocales from '/hooks/useLocales';
import CustomRefreshControl from '/components/common/CustomRefreshControl';
import ScrollView from '/components/common/ScrollView'
import MainChart from './priceChart';

const Layout = () => {
  const { id } = useCoinIdContext();
  const [refreshing, setRefreshing] = useState(false);
  const { chartOption } = useAppSelector(state => state.baseSettingReducer);
  const { currency } = useLocales();
  const { data, mutate } = useCoinDetailData({ id });

  const handleRefresh = useCallback(async() => {
    setRefreshing(true);
    await mutate()
    setRefreshing(false);
  }, []);

  if(!data) return <></>
  return (
    <ScrollView 
      refreshControl={
        <CustomRefreshControl
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
      }
    >
      <ChartArea>
        <PriceAndDate
          lastUpdatedPrice={data.market_data.current_price[currency]}
          lastUpdatedDate={data.last_updated}
        />
        <MainChart 
          id={id}
          chartOption={chartOption}
          lastUpdatedPrice={data.market_data.current_price[currency]}
          lastUpdatedPercentage={data.market_data.price_change_percentage_24h_in_currency[currency]}
        />
        <ChartTab />
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
    </ScrollView>
  )
}

export default Layout;

const ChartArea = styled.View`
  background-color: ${({ theme }) => theme.base.background.surface};
  padding: 15px 0;
`