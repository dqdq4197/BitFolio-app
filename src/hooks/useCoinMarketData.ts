import useRequestInfinite from './useRequestInfinite';
import { CoinGecko, CoinMarketsParams } from '/lib/api/CoinGeckoClient'
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';
import { AxiosResponse } from 'axios';
import { useAppSelector } from './useRedux';



type ParamsType = {
  per_page?: number,
  order?: 
    | "market_cap_rank" | "market_cap_desc" 
    | "market_cap_asc" | "volume_asc" | "volume_desc" 
    | "id_asc" | "id_desc",
}
export default ({
  per_page = 30, 
  order = 'market_cap_rank',
}: ParamsType) => {
  const { currency } = useAppSelector(state => state.baseSettingReducer);
  const getKey = (pageIndex:number, previousPageData: AxiosResponse<unknown> | null) => {
    return CoinGecko.coin.markets({
      vs_currency: currency,
      page: pageIndex + 1,
      order,
      per_page,
      sparkline: true
    })
  }



  return useRequestInfinite<CoinMarketReturn>(getKey, { suspense: true })
}