import { useState, useEffect } from 'react';

import useRequest from '../useRequest';
import { useAppSelector } from '../useRedux';
import { CoinGecko, http } from '/lib/api/CoinGeckoClient';
import filteredPriceData from '/lib/utils/filteredPriceData';
import { ChartDataReturn } from '/types/CoinGeckoReturnType';

type ChartDataProps = {
  id: string,
  days?: number,
  interval?: 'daily'
}

export default ({ id, days, interval }:ChartDataProps) => {
  const { currency, chartTimeFrame } = useAppSelector(state => state.baseSettingReducer);
  const [filteredData, setFilteredData] = useState<ChartDataReturn>();
  const [highestPrice, setHighestPrice] = useState<number[]>([]);
  const [lowestPrice, setLowestPrice] = useState<number[]>([]);

  const getKey = CoinGecko.coin.marketChart(id, {
    vs_currency: currency,
    days: chartTimeFrame,
    interval
  })

  const { data, ...args } = useRequest<ChartDataReturn>(getKey, http);

  useEffect(() => {
    if(data) {
      const filteredTemp = filteredPriceData(data!, chartTimeFrame);
      const sortedPrices = data.prices.slice().sort((a, b) => a[1] - b[1]);

      setHighestPrice(sortedPrices.slice(-1)[0])
      setLowestPrice(sortedPrices[0])
      setFilteredData(filteredTemp);
    }
  }, [data])
  
  return { data: filteredData, highestPrice, lowestPrice, ...args }
}
