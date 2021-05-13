import useRequest from './useRequest';
import { CoinGecko, http } from '/lib/api/CoinGeckoClient';
import { CoinDetailDataReturn } from '/lib/api/CoinGeckoReturnType';


export default (id: string) => {
  const getKey = CoinGecko.coin.DetailInfo(id, {
    localization: true,
    tickers: true,
    market_data: true,
    community_data: true,
    developer_data: true,
    sparkline: false,
  })

  return useRequest<CoinDetailDataReturn>(getKey, http, { suspense: true })
}