import React, { useLayoutEffect } from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import LineChart from './LineChart';
import PriceAndDetail from './PriceAndDetail';
import ChartTab from './ChartTab';
import { useAppSelector } from '/hooks/useRedux';
import useCoinDetailInfoData from '/hooks/useCoinDetailInfoData';
import CandlesticChart from './CandlesticChart';

type ParamList = {
  CoinMarketDetail: {
    id: string
  }
}


const ItemDetail = () => {

  const { params } = useRoute<RouteProp<ParamList, 'CoinMarketDetail'>>();
  const { chartOption, currency } = useAppSelector(state => state.baseSettingReducer);
  const navigation = useNavigation();
  const { data } = useCoinDetailInfoData(params.id);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params.id
    })
  }, [params.id])
  
  if(!data) return <></>
  return (
    <Container>
        <PriceAndDetail 
          id={params.id}
          currentPrice={data?.market_data.current_price[currency]}
        />
      {chartOption === 'ohlc' 
        ? <CandlesticChart
            id={params.id}
          />
        : <LineChart 
            id={params.id}
            chartOption={chartOption}
          />
      }
      <ChartTab />
    </Container>
  )
}

export default ItemDetail;



const Container = styled.ScrollView`
  
`

