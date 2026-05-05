import useRequest from '../use-request'
import { CoinGecko, http } from '@/lib/api/coin-gecko-client'
import { GlobalReturn } from '@/types/coin-gecko-return-type'

interface MarketGlobalProps {
  suspense?: boolean
}
const useMarketGlobal = ({ suspense = true }: MarketGlobalProps) => {
  const getKey = CoinGecko.coin.global()

  return useRequest<GlobalReturn>(getKey, http, { suspense })
}

export default useMarketGlobal
