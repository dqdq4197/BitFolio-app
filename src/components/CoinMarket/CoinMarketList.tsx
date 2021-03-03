import React, { useRef } from 'react';
import { FlatList, Animated,  } from 'react-native';
import CoinMarketItem from '/components/CoinMarket/CoinMarketItem'
import CustomRefreshControl from '/components/common/CustomRefreshControl';
import useCoinMarketData from '/hooks/useCoinMarketData';


const CoinMarketList = () => {
  const ref = useRef(null);
  const { data, mutate } = useCoinMarketData({vsCurrency: 'krw', page: 1, perPage: 20 })

  return (
    <Animated.FlatList 
      renderItem={CoinMarketItem}
      data={data}
      scrollEventThrottle={16}
      contentContainerStyle={{paddingTop: 58*2}}
      ref={ref}
      keyExtractor={(item) => item.id}
      refreshControl={
        <CustomRefreshControl
          todo={mutate}
        />
      }
    /> 
  )
}

export default CoinMarketList;