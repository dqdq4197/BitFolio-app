import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { AxiosResponse } from 'axios';

import { useAppSelector, shallowEqual } from '/hooks/useRedux';
import useCoinMarketData from '/hooks/data/useCoinMarketData';
import { PortfolioType } from '/store/slices/portfolio';
import type { CoinMarketReturn } from '/types/coinGeckoReturnType';

interface ValueType extends Pick<PortfolioType, 'id' | 'coins'> {
  coinsData?: CoinMarketReturn[];
  initLoading: boolean;
  isLoading: boolean;
  mutate: () => Promise<AxiosResponse<CoinMarketReturn>[] | undefined>;
}

export const PortfolioContext = createContext<ValueType | undefined>(undefined);

type ContextProps = {
  children: React.ReactNode;
};

export function PortfolioDataProvider({ children }: ContextProps) {
  const { portfolios, activeIndex } = useAppSelector(
    state => ({
      portfolios: state.portfolioReducer.portfolios,
      activeIndex: state.portfolioReducer.activeIndex,
    }),
    shallowEqual
  );
  const [coinIds, setCoinIds] = useState<string[]>([]);
  const [initLoading, setInitLoading] = useState(true);
  const {
    data: coinsData,
    isLoading,
    mutate,
  } = useCoinMarketData({
    suspense: false,
    sparkline: true,
    ids: coinIds,
    willNotRequest: coinIds.length <= 0,
  });

  useEffect(() => {
    const temp: string[] = [];
    const { coins } = portfolios[activeIndex];

    coins.forEach(coin => {
      if (!temp.includes(coin.id)) {
        temp.push(coin.id);
      }
    });

    setCoinIds(temp);
  }, [activeIndex, portfolios]);

  useEffect(() => {
    if (!isLoading && initLoading === true) {
      setInitLoading(false);
    }
  }, [coinsData, initLoading, isLoading]);

  const value = useMemo(
    () => ({
      id: portfolios[activeIndex].id,
      coins: portfolios[activeIndex].coins,
      coinsData,
      initLoading,
      isLoading,
      mutate,
    }),
    [activeIndex, coinsData, initLoading, isLoading, mutate, portfolios]
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioContext() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error(`Portfolio Context is undefined`);
  }
  return context;
}
