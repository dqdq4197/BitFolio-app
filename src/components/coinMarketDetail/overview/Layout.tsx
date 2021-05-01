import React, { useContext, useState, useCallback } from 'react';
import styled from 'styled-components/native';
import LineChart from './LineChart';
import PriceAndDate from './PriceAndDate';
import ChartTab from './ChartTab';
import { useAppSelector } from '/hooks/useRedux';
import useCoinDetailData from '/hooks/useCoinDetailData';
import CandlesticChart from './CandlesticChart';
import { CoinIdContext } from '/screens/coinMarket/detail';
import CustomRefreshControl from '/components/common/CustomRefreshControl';
import ScrollView from '/components/common/ScrollView'


const Layout = () => {

  const coinId = useContext(CoinIdContext) as string;
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
            />
          : <LineChart 
              id={coinId}
              chartOption={chartOption}
            />
        }
        <ChartTab />
      </ChartArea>
    </ScrollView>
  )
}

export default Layout;

const ChartArea = styled.View`
  background-color: ${({ theme }) => theme.base.background.surface};
  padding: 15px 0;
`