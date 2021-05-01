import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import LineChart from './LineChart';
import PriceAndDate from './PriceAndDate';
import ChartTab from './ChartTab';
import { useAppSelector } from '/hooks/useRedux';
import useCoinDetailData from '/hooks/useCoinDetailData';
import { useCoinIdContext } from '/hooks/useCoinIdContext';
import CandlesticChart from './CandlesticChart';
import CustomRefreshControl from '/components/common/CustomRefreshControl';
import ScrollView from '/components/common/ScrollView'
import PriceChangePercentage from './PriceChangePercentage';

const Layout = () => {

  const coinId = useCoinIdContext();
  const [refreshing, setRefreshing] = useState(false);
  const { chartOption, currency } = useAppSelector(state => state.baseSettingReducer);
  const { data, mutate } = useCoinDetailData(coinId);
  //genesis_date => 창세기

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    mutate()
      .then(() => {
        setRefreshing(false);
      })
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
        {chartOption === 'ohlc' 
          ? <CandlesticChart
              id={coinId}
              lastUpdatedPrice={data.market_data.current_price[currency]}
            />
          : <LineChart 
              id={coinId}
              chartOption={chartOption}
              lastUpdatedPrice={data.market_data.current_price[currency]}
              lastUpdatedPercentage={data.market_data.price_change_percentage_24h}
            />
        }
        <ChartTab />
      </ChartArea>
      <PriceChangePercentage 
        percentage_24h={data.market_data.price_change_percentage_24h}
        percentage_7d={data.market_data.price_change_percentage_7d}
        percentage_30d={data.market_data.price_change_percentage_30d}
        percentage_200d={data.market_data.price_change_percentage_200d}
        percentage_1y={data.market_data.price_change_percentage_1y}

      />
    </ScrollView>
  )
}

export default Layout;

const ChartArea = styled.View`
  background-color: ${({ theme }) => theme.base.background.surface};
  padding: 15px 0;
`