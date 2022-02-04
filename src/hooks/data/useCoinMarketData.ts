import { AxiosResponse } from 'axios';
import { baseTypes } from 'base-types';

import useRequestInfinite from '../useRequestInfinite';
import {
  CoinGecko,
  http,
  ORDER,
  PriceChangePercentageType,
} from '/lib/api/CoinGeckoClient';
import { CoinMarketReturn } from '/types/CoinGeckoReturnType';
import { useAppSelector } from '../useRedux';

type ParamsType = {
  per_page?: number;
  order?: ORDER;
  ids?: string[] | string;
  suspense?: boolean;
  refreshInterval?: number;
  sparkline?: boolean;
  currency?: baseTypes.Currency;
  price_change_percentage?:
  | PriceChangePercentageType
  | PriceChangePercentageType[];
  willNotRequest?: boolean;
};

export default ({
  per_page = 70,
  order = 'market_cap_desc',
  ids,
  refreshInterval,
  currency,
  price_change_percentage,
  suspense = true,
  sparkline = true,
  willNotRequest = false,
}: ParamsType) => {
  const { currency: localCurrency } = useAppSelector(
    state => state.baseSettingReducer
  );

  const getKey = (
    pageIndex: number,
    previousPageData: AxiosResponse<unknown> | null
  ) => {
    if (previousPageData && !(previousPageData as any).length) return null;
    if (willNotRequest) return null;
    return CoinGecko.coin.markets({
      ids: Array.isArray(ids) && ids.length === 0 ? ['null'] : ids,
      vs_currency: currency || localCurrency,
      page: pageIndex + 1,
      order,
      per_page,
      sparkline,
      price_change_percentage,
    });
  };

  const { data, ...args } = useRequestInfinite<CoinMarketReturn>(getKey, http, {
    suspense,
    refreshInterval,
  });

  args.isLoading = willNotRequest ? false : args.isLoading;

  return { data: data?.flat(), ...args };
};
