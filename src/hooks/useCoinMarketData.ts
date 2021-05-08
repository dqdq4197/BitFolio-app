import useRequestInfinite from './useRequestInfinite';
import { CoinGecko } from '/lib/api/CoinGeckoClient'
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';
import { AxiosResponse } from 'axios';
import { useAppSelector } from './useRedux';
import { ORDER } from '/lib/api/CoinGeckoClient';



type ParamsType = {
  per_page?: number,
  order?: ORDER
}
export default ({
  per_page = 70, 
  order = 'market_cap_desc',
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