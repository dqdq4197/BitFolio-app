import React, { createContext, useContext, useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';

import useLocales from '/hooks/useLocales';
import useRequest from '/hooks/useRequest';
import { useAppSelector, shallowEqual } from '/hooks/useRedux';
import useCoinMarketData from '/hooks/data/useCoinMarketData';
import { PortfolioType } from '/store/portfolio';
import { CoinGecko, http } from '/lib/api/CoinGeckoClient';
import { CoinMarketReturn } from '/types/CoinGeckoReturnType';


interface ValueType extends Pick<PortfolioType, 'id' | 'coins'> {
  coinsData?: CoinMarketReturn[]
  initLoading: boolean
  isLoading: boolean
  mutate: () => Promise<AxiosResponse<CoinMarketReturn>[] | undefined>
}

export const PortfolioContext = createContext<ValueType | undefined>(undefined);

type ContextProps = {
  children: React.ReactNode
}

export function PortfolioDataProvider({ children }: ContextProps) {
  const { portfolios, activeIndex } = useAppSelector(state => ({
    portfolios: state.portfolioReducer.portfolios,
    activeIndex: state.portfolioReducer.activeIndex
  }), shallowEqual);
  const { currency } = useLocales();
  const [coinIds, setCoinIds] = useState<string[]>([]);
  const [initLoading, setInitLoading] = useState(true);

  // const { data: coinsData, isLoading, mutate } = useRequest<CoinMarketReturn[]>(
  //   coinIds.length <= 0 
  //     ? null
  //     : CoinGecko.coin.markets({
  //         vs_currency: currency,
  //         ids: coinIds,
  //         sparkline: true
  //       }),
  //   http,
  //   {}
  // )
  const { data: coinsData, isLoading, mutate } = useCoinMarketData({
    suspense: false,
    sparkline: true,
    ids: coinIds,
    willNotRequest: coinIds.length <= 0,
  });

  const mutateCoinsData = () => {
    return mutate();
  }

  useEffect(() => {
    let temp: string[] = [];
    const { coins } = portfolios[activeIndex];

    coins.map(coin => {
      if (!temp.includes(coin.id)) {
        temp.push(coin.id);
      }
    })

    setCoinIds(temp)
  }, [portfolios[activeIndex].coins])

  useEffect(() => {
    if (!isLoading && initLoading === true) {
      setInitLoading(false);
    }
  }, [coinsData])

  return (
    <PortfolioContext.Provider
      value={{
        id: portfolios[activeIndex].id,
        coins: portfolios[activeIndex].coins,
        coinsData,
        initLoading,
        isLoading,
        mutate: mutateCoinsData
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolioContext() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error(`Portfolio Context is undefined`);
  }
  return context;
}