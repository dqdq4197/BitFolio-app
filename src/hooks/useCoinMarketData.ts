import useRequestInfinite from './useRequestInfinite';
import { CoinGecko, CoinMarketsParams } from '/lib/api/CoinGeckoClient'
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';
import { AxiosResponse } from 'axios';
import { useAppSelector } from './useRedux';



export default ({
  per_page = 30, 
  price_change_percentage,
  order,
  ids
}: CoinMarketsParams) => {
  const { currency } = useAppSelector(state => state.baseSettingReducer);

  const getKey = (pageIndex:number, previousPageData: AxiosResponse<unknown> | null) => {
    return CoinGecko.coin.markets({
      vs_currency: currency,
      price_change_percentage,
      page: pageIndex + 1,
      order,
      per_page,
      sparkline: true
    })
  }



  return useRequestInfinite<CoinMarketReturn>(getKey, { suspense: true })
}