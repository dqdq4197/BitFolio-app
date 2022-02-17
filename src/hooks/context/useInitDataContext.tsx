import React, { createContext, useContext, useMemo } from 'react';

import useRequest from '/hooks/useRequest';
import useLocales from '/hooks/useLocales';
import { upbitClient, http as upbitHttp } from '/lib/api/upbitClient';
import { CoinGecko, http as coingeckoHttp } from '/lib/api/CoinGeckoClient';
import type { SearchDataReturn } from '/types/CoinGeckoReturnType';
import type { MarketReturn } from '/types/upbit';

type InitialData = {
  coingeckoAssets?: SearchDataReturn;
  upbitAssets?: MarketReturn;
  upbitIsLoading: boolean;
  coingeckoIsLoading: boolean;
};

type ProviderProps = {
  children: React.ReactNode;
};

const InitDataContext = createContext<InitialData | undefined>(undefined);

export function InitDataProvider({ children }: ProviderProps) {
  const { language } = useLocales();

  const { data: upbitMarketData, isLoading: upbitIsLoading } =
    useRequest<MarketReturn>(upbitClient.market(), upbitHttp, {
      refreshInterval: 30 * 60 * 1000,
    });

  const { data: searchData, isLoading: coingeckoIsLoading } =
    useRequest<SearchDataReturn>(
      CoinGecko.coin.search({ locale: language }),
      coingeckoHttp,
      { refreshInterval: 30 * 60 * 1000 }
    );

  const initialData: InitialData = useMemo(
    () => ({
      coingeckoAssets: searchData,
      upbitAssets: upbitMarketData,
      upbitIsLoading,
      coingeckoIsLoading,
    }),
    [coingeckoIsLoading, searchData, upbitIsLoading, upbitMarketData]
  );

  return (
    <InitDataContext.Provider value={initialData}>
      {children}
    </InitDataContext.Provider>
  );
}

export function useInitData() {
  const context = useContext(InitDataContext);
  if (!context) {
    throw new Error(`InitDataContext is undefined`);
  }
  return context;
}
