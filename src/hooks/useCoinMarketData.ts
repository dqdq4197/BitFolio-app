import useRequestInfinite from './useRequestInfinite';
import { CoinGecko, CoinMarketsParams } from '/lib/api/CoinGeckoClient'
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';
import { AxiosResponse } from 'axios';



export default ({
  vs_currency = 'krw', 
  per_page = 1, 
  page, 
  price_change_percentage,
  order,
  sparkline = true,
  ids
}: CoinMarketsParams) => {

  const getKey = (pageIndex:number, previousPageData: AxiosResponse<unknown> | null) => {
    // console.log(previousPageData)
    // if(previousPageData ) return null;
    return CoinGecko.coin.markets({
      vs_currency,
      price_change_percentage,
      page: pageIndex + 1,
      order,
      per_page,
      sparkline: true
    })
  }



  return useRequestInfinite<CoinMarketReturn>(getKey, { suspense: true })
}