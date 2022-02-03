import useRequest from '../useRequest';
import { CoinGecko, http } from '/lib/api/CoinGeckoClient';
import { CoinDetailDataReturn } from '/types/CoinGeckoReturnType';

type DetailDataProps = {
  id: string,
  suspense?: boolean,
}

export default ({ id , suspense = true }: DetailDataProps) => {
  const getKey = CoinGecko.coin.DetailInfo(id, {
    localization: true,
    tickers: true,
    market_data: true,
    community_data: true,
    developer_data: true,
    sparkline: false,
  })

  return useRequest<CoinDetailDataReturn>(getKey, http, { suspense })
}