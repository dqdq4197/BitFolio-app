import React, { useLayoutEffect } from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import LineChart from './LineChart';
import useMarketChartData from '/hooks/useMarketChartData';

type ParamList = {
  CoinMarketDetail: {
    id: string
  }
}

const ItemDetail = () => {

  const { params } = useRoute<RouteProp<ParamList, 'CoinMarketDetail'>>();
  const navigation = useNavigation();
  const { data, mutate, isValidating } = useMarketChartData({
    id: params.id,
    days: 1,
  })

  React.useEffect(() => {
    console.log(data);
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params.id
    })
  }, [params.id])
  
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