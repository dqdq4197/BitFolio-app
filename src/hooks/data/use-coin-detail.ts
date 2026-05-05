import useRequest from '../use-request'
import { CoinGecko, http } from '@/lib/api/coin-gecko-client'
import type { CoinDetailDataReturn } from '@/types/coin-gecko-return-type'

type DetailDataProps = {
  id: string
  suspense?: boolean
}

export default ({ id, suspense = true }: DetailDataProps) => {
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
