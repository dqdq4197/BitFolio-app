import useRequest from './useRequest';
import { CoinGecko, http } from '/lib/api/CoinGeckoClient';
import { CharDataReturn } from '/lib/api/CoinGeckoReturnType';
import { useAppSelector } from './useRedux';

type ChartDataProps = {
  id: string,
  days?: number,
  interval?: 'daily'
}

export default ({ id, days, interval }:ChartDataProps) => {
  const { currency, chartTimeFrame } = useAppSelector(state => state.baseSettingReducer);

  
  const getKey = CoinGecko.coin.marketChart(id, {
    vs_currency: currency,
    days: chartTimeFrame,
    interval
  })

  return useRequest<CharDataReturn>(getKey, http)
}
