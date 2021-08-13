import React, { createContext, useContext } from 'react';

export const CoinIdContext = createContext<ValueType | undefined>(undefined);

type ValueType = {
  id: string
  symbol: string
}

type ProviderProps = {
  value: ValueType
  children: React.ReactNode
}
export function CoinIdProvider({ value, children }: ProviderProps) {

  return (
    <CoinIdContext.Provider value={value}>
      { children }
    </CoinIdContext.Provider>
  )
}

export function useCoinIdContext() {
  const context = useContext(CoinIdContext);
  if(!context) {
    throw new Error(`CoinIdContext is undefined`);
  }
  return context;
}