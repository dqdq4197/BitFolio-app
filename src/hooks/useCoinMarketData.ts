import useRequestInfinite from './useRequestInfinite';
import { CoinGecko, http } from '/lib/api/CoinGeckoClient'
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';
import { AxiosResponse } from 'axios';
import { useAppSelector } from './useRedux';
import { ORDER } from '/lib/api/CoinGeckoClient';



type ParamsType = {
  per_page?: number,
  order?: ORDER,
  ids?: string[] | string,
  suspense?: boolean,
  refreshInterval?: number,
}
export default ({
  per_page = 70, 
  order = 'market_cap_desc',
  ids,
  suspense = true,
  refreshInterval
}: ParamsType) => {
  const { currency } = useAppSelector(state => state.baseSettingReducer);

  if(Array.isArray(ids) && ids.length === 0) {
    ids=['null'];
  }

  const getKey = (pageIndex:number, previousPageData: AxiosResponse<unknown> | null) => {
    return CoinGecko.coin.markets({
      ids,
      vs_currency: currency,
      page: pageIndex + 1,
      order,
      per_page,
      sparkline: true
    })
  }

  const { data, ...args } = useRequestInfinite<CoinMarketReturn>(
    getKey, http, { suspense, refreshInterval }
  );

  return { data: data?.flat(), ...args }
}