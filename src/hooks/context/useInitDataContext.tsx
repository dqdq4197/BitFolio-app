import React, { createContext, useContext, useMemo } from 'react'

import useRequest from '/hooks/useRequest'
import { upbitClient, http as upbitHttp } from '/lib/api/upbitClient'
import type { MarketReturn } from '/types/upbit'

type InitialData = {
  upbitAssets?: MarketReturn[]
  upbitIsLoading: boolean
}

type ProviderProps = {
  children: React.ReactNode
}

const InitDataContext = createContext<InitialData | undefined>(undefined)

export function InitDataProvider({ children }: ProviderProps) {
  const { data: upbitMarketData, isLoading: upbitIsLoading } = useRequest<
    MarketReturn[]
  >(upbitClient.market(), upbitHttp, {
    refreshInterval: 30 * 60 * 1000,
  })

  const initialData: InitialData = useMemo(
    () => ({
      upbitAssets: upbitMarketData,
      upbitIsLoading,
    }),
    [upbitIsLoading, upbitMarketData]
  )

  return (
    <InitDataContext.Provider value={initialData}>
      {children}
    </InitDataContext.Provider>
  )
}

export function useInitData() {
  const context = useContext(InitDataContext)
  if (!context) {
    throw new Error(`InitDataContext is undefined`)
  }
  return context
}
