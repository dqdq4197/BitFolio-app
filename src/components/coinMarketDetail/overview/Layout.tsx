import React, { useContext } from 'react';
import styled from 'styled-components/native';
import LineChart from './LineChart';
import PriceAndDetail from './PriceAndDetail';
import ChartTab from './ChartTab';
import { useAppSelector } from '/hooks/useRedux';
import useCoinDetailData from '/hooks/useCoinDetailData';
import CandlesticChart from './CandlesticChart';
import { CoinIdContext } from '/screens/coinMarket/detail';


const Layout = () => {

  const coinId = useContext(CoinIdContext) as string;
  const { chartOption, currency } = useAppSelector(state => state.baseSettingReducer);
  const { data } = useCoinDetailData(coinId);
  //genesis_date => 창세기
  if(!data) return <></>
  return (
    <Container>
      <PriceAndDetail 
        currentPrice={data.market_data.current_price[currency]}
        currentDate={data.last_updated}
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
    </Container>
  )
}

export default Layout;

const Container = styled.ScrollView`
  flex: 1;
  padding-top: 15px;
  background-color: ${({ theme }) => theme.base.background[100]};
`

