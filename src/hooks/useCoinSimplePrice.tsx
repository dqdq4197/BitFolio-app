import useRequest from './useRequest';
import { CoinGecko } from '/lib/api/CoinGeckoClient';


type ReturnType = {
  [key : string]: number
}
type SimplePriceProps = {
  ids: string[] | string,
}
export default ({ ids }: SimplePriceProps) => {
  const getKey = CoinGecko.coin.simplePrice({
    ids,
    vs_currencies: ['krw', 'usd', 'eur'],
    include_market_cap: false,
    include_24hr_vol: false,
    include_24hr_change: true,
    include_last_updated_at: true,
  })

  return useRequest<ReturnType>(getKey, { suspense: true })
}