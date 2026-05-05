import React, { createContext, use } from 'react'

const CoinIdContext = createContext<ValueType | undefined>(undefined)

type ValueType = {
  id: string
  symbol: string
}

type ProviderProps = {
  value: ValueType
  children: React.ReactNode
}

export function CoinIdProvider({ value, children }: ProviderProps) {
  return <CoinIdContext value={value}>{children}</CoinIdContext>
}

export function useCoinIdContext() {
  const context = use(CoinIdContext)
  if (!context) {
    throw new Error(`CoinIdContext is undefined`)
  }
  return context
}
