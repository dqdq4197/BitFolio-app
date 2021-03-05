import React from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import LineChart from './LineChart';
import useMarketChartData from '/hooks/useMarketChartData';

type ParamList = {
  CoinMarketDetail: {
    id: string
  }
}

const ItemDetail = () => {

  const { params } = useRoute<RouteProp<ParamList, 'CoinMarketDetail'>>();
  const { data, mutate, isValidating } = useMarketChartData({
    id: params.id,
    days: 1,
    vsCurrency: 'krw'
  })
  
  if(!data) return <></>;

  return (
    <>
      <LineChart 
        data={data}
      />
    </>
  )
}

export default ItemDetail;