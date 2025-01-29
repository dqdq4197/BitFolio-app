import { AxiosResponse } from 'axios'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import useCoinMarketData from '/hooks/data/useCoinMarketData'
import { shallowEqual, useAppSelector } from '/hooks/useRedux'
import { PortfolioType } from '/store/slices/portfolio'
import type { CoinMarketReturn } from '/types/coinGeckoReturnType'

interface ValueType extends Pick<PortfolioType, 'id' | 'coins'> {
  coinsData?: CoinMarketReturn[]
  initLoading: boolean
  isLoading: boolean
  mutate: () => Promise<AxiosResponse<CoinMarketReturn>[] | undefined>
}

export const PortfolioContext = createContext<ValueType | undefined>(undefined)

type ContextProps = {
  children: React.ReactNode
}

export function PortfolioDataProvider({ children }: ContextProps) {
  const { portfolios, activeIndex } = useAppSelector(
    state => ({
      portfolios: state.portfolioReducer.portfolios,
      activeIndex: state.portfolioReducer.activeIndex,
    }),
    shallowEqual
  )
  const [coinIds, setCoinIds] = useState<string[]>([])
  const [initLoading, setInitLoading] = useState(true)
  const willNotRequestData = coinIds.length <= 0
  const {
    data: coinsData,
    isLoading,
    mutate,
  } = useCoinMarketData({
    suspense: false,
    sparkline: true,
    ids: coinIds,
    willNotRequest: willNotRequestData,
  })

  useEffect(() => {
    const temp: string[] = []
    const { coins } = portfolios[activeIndex]

    coins.forEach(coin => {
      if (!temp.includes(coin.id)) {
        temp.push(coin.id)
      }
    })

    setCoinIds(temp)
  }, [activeIndex, portfolios])

  useEffect(() => {
    if ((willNotRequestData || coinsData) && initLoading === true) {
      setInitLoading(false)
    }
  }, [coinIds.length, coinsData, initLoading, isLoading, willNotRequestData])

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
  )

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolioContext() {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error(`Portfolio Context is undefined`)
  }
  return context
}
