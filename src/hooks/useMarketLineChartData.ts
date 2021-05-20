import { useState, useEffect } from 'react';
import useRequest from './useRequest';
import { CoinGecko, http } from '/lib/api/CoinGeckoClient';
import { CharDataReturn } from '/lib/api/CoinGeckoReturnType';
import { useAppSelector } from './useRedux';
import filteredPriceData from '/lib/utils/filteredPriceData';

type ChartDataProps = {
  id: string,
  days?: number,
  interval?: 'daily'
}

export default ({ id, days, interval }:ChartDataProps) => {
  const { currency, chartTimeFrame } = useAppSelector(state => state.baseSettingReducer);
  const [filteredData, setFilteredData] = useState<CharDataReturn>();
  
  const getKey = CoinGecko.coin.marketChart(id, {
    vs_currency: currency,
    days: chartTimeFrame,
    interval
  })

  const { data, ...args } = useRequest<CharDataReturn>(getKey, http);

  useEffect(() => {
    if(data) {
      setFilteredData(filteredPriceData(data!, chartTimeFrame))
    }
  }, [data])
  
  return { data: filteredData, ...args }
}
