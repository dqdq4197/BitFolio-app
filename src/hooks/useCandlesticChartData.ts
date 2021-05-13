import useRequest from './useRequest';
import { CoinGecko, http } from '/lib/api/CoinGeckoClient';
import { CharDataReturn } from '/lib/api/CoinGeckoReturnType';
import { useAppSelector } from './useRedux';

type ChartDataProps = {
  id: string,
  days?: number,
}

export default ({ id, days }:ChartDataProps) => {
  const { currency, chartTimeFrame } = useAppSelector(state => state.baseSettingReducer);
  
  const getKey = CoinGecko.coin.historicalOhlc(id, {
    vs_currency: currency,
    days: chartTimeFrame,
  })

  return useRequest<CharDataReturn>(getKey, http)
}
