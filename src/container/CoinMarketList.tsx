import React, { useRef } from 'react';
import { FlatList } from 'react-native';
import useRequest from '/hooks/useRequest';
import { CoinGecko } from '/lib/api/CoinGeckoClient';
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';
import CoinMarketItem from '/components/CoinMarket/CoinMarketItem'
import CustomRefreshControl from '/components/common/CustomRefreshControl';




const CoinMarketList = () => {
  const ref = useRef(null);
  const { data } = useRequest<CoinMarketReturn[]>(
    CoinGecko.coin.markets({
      vs_currency:'krw', 
      price_change_percentage:'24h', 
      page: 1,
      order: 'market_cap_rank',
      per_page: 20,
      sparkline: false,
    }), {
      suspense: true
    }
  )

  console.log(data)

  return (
    <FlatList 
      renderItem={CoinMarketItem}
      data={data}
      scrollEventThrottle={16}
      contentContainerStyle={{paddingTop: 58*2}}
      ref={ref}
      keyExtractor={(item) => item.id}
      refreshControl={<CustomRefreshControl/>}
    /> 
  )
}

export default CoinMarketList;