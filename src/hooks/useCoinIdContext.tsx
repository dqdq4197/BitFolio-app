import React, { createContext, useContext } from 'react';


export const CoinIdContext = createContext<string | undefined>(undefined);

type ProviderProps = {
  id: string,
  children: React.ReactNode,
}
export function CoinIdProvider({ id, children }: ProviderProps) {
  return (
    <CoinIdContext.Provider value={id}>
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