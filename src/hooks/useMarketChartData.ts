import useRequest from './useRequest';
import { CoinGecko } from '/lib/api/CoinGeckoClient';
import { CharDataReturn } from '/lib/api/CoinGeckoReturnType';

type ChartDataProps = {
  id: string,
  vsCurrency: 'usd' | 'krw' | 'eur',
  days: number,
  interval?: 'daily'
}

export default ({id, vsCurrency, days, interval}:ChartDataProps) => {

  const getKey = CoinGecko.coin.marketChart(id, {
    vs_currency: vsCurrency,
    days,
    interval
  })

  return useRequest<CharDataReturn>(getKey, { suspense: true })
}
