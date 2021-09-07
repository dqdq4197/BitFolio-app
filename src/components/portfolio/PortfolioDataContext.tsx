import React, { createContext, useContext, useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { useAppSelector, shallowEqual } from '/hooks/useRedux';
import useCoinMarketData from '/hooks/useCoinMarketData';
import { PortfolioType } from '/store/portfolio';
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';


interface ValueType extends Pick<PortfolioType, 'id' | 'coins'> {
  coinsData?: CoinMarketReturn[]
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
  const { transactions } = useAppSelector(state => state.transactionReducer);
  const [coinIds, setCoinIds] = useState<string[]>([]);
  const { data: coinsData, mutate } = useCoinMarketData({ 
    suspense: false, 
    sparkline: true,
    ids: coinIds,
    willNotRequest: coinIds.length <= 0,
  });
  // console.log(transactions);

  const mutateCoinsData = () => {
    return mutate();
  }

  useEffect(() => {
    let temp:string[] = [];
    const { coins } = portfolios[activeIndex];

    coins.map(coin => {
      if(!temp.includes(coin.id)) {
        temp.push(coin.id);
      }
    })
    
    setCoinIds(temp)
  }, [portfolios[activeIndex].coins])

  return (
    <PortfolioContext.Provider 
      value={{ 
        id: portfolios[activeIndex].id, 
        coins: portfolios[activeIndex].coins,
        coinsData,
        mutate: mutateCoinsData 
      }}
    >
      { children }
    </PortfolioContext.Provider>
  )
}

export function usePortfolioContext() {
  const context = useContext(PortfolioContext);
  if(!context) {
    throw new Error(`Portfolio Context is undefined`);
  }
  return context;
}