import React, { createContext, useContext, useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { useAppSelector, shallowEqual } from '/hooks/useRedux';
import useCoinMarketData from '/hooks/useCoinMarketData';
import { CoinType, SortType } from '/store/portfolio';
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';


type ValueType = {
  id: string
  coins: CoinType[]
  coinsData?: CoinMarketReturn[]
  mutate: () => Promise<AxiosResponse<CoinMarketReturn>[] | undefined>
}

export const PortfolioContext = createContext<ValueType | undefined>(undefined);

type ContextProps = {
  children: React.ReactNode
}

export function PortfolioDataProvider({ children }: ContextProps) {
  const { id, coins } = useAppSelector(state => ({
    id: state.portfolioReducer.id,
    coins: state.portfolioReducer.coins,
  }), shallowEqual);
  const [coinIds, setCoinIds] = useState<string[]>([]);
  const { data: coinsData, mutate } = useCoinMarketData({ 
    suspense: false, 
    sparkline: true,
    ids: coinIds,
    willNotRequest: coinIds.length <= 0,
  });

  const mutateCoinsData = () => {
    return mutate();
  }

  useEffect(() => {
    let temp:string[] = [];

    coins.map(coin => {
      if(!temp.includes(coin.id)) {
        temp.push(coin.id);
      }
    })
    
    setCoinIds(temp)
  }, [coins])

  return (
    <PortfolioContext.Provider 
      value={{ 
        id, 
        coins,
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