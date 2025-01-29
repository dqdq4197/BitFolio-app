import { useState, useEffect, useMemo } from 'react'

import useRequest from '../useRequest'
import { useAppSelector } from '../useRedux'
import useCoinDetail from './useCoinDetail'
import { CoinGecko, http } from '/lib/api/CoinGeckoClient'
import filteredPriceData from '/lib/utils/filteredPriceData'
import { CHART_TIME_INTERVAL } from '/lib/constants/coingecko'
import { CURRENCIES } from '/lib/constant'
import type {
  ChartDataReturn,
  HistoricalOhlcReturn,
} from '/types/coinGeckoReturnType'
import type { CurrencyType } from '/types/common'

type TProps = {
  id: string
  symbol: string
  enabled: boolean
}

const INTERVAL = Object.entries(CHART_TIME_INTERVAL).map((interval) => ({
  label: interval[0],
  value: interval[1],
}))

export default ({ id, symbol, enabled }: TProps) => {
  const { currency, chartOptions } = useAppSelector(
    (state) => state.baseSettingReducer
  )

  const timeFrame = useMemo(
    () => chartOptions.globalAverage.interval,
    [chartOptions]
  )

  const [points, setPoints] = useState<number[][]>()
  const [volumes, setVolumes] = useState<number[][]>()
  const [highestPoint, setHighestPoint] = useState<number[]>([])
  const [lowestPoint, setLowestPoint] = useState<number[]>([])
  const [activeTradingPair, setActiveTradingPair] =
    useState<CurrencyType>(currency)

  const tradingPairs = useMemo(() => {
    return Object.entries(CURRENCIES).map((currency) => {
      const [key, asset] = currency

      return {
        label: `${asset.iso} / ${symbol.toUpperCase()}`,
        value: key,
      }
    })
  }, [symbol])

  const {
    data: candlesData,
    isLoading: candlesIsLoading,
    error: candlesError,
  } = useRequest<HistoricalOhlcReturn>(
    enabled
      ? CoinGecko.coin.historicalOhlc(id, {
          vs_currency: activeTradingPair,
          days: timeFrame,
        })
      : null,
    http,
    { refreshInterval: 3 * 60 * 1000 }
  )

  const {
    data: lineData,
    isLoading: lineIsLoading,
    error: lineError,
  } = useRequest<ChartDataReturn>(
    enabled
      ? CoinGecko.coin.marketChart(id, {
          vs_currency: activeTradingPair,
          days: timeFrame,
        })
      : null,
    http,
    { refreshInterval: 3 * 60 * 1000 }
  )

  const {
    data: detailData,
    isLoading: detailIsLoading,
    error: detailError,
  } = useCoinDetail({
    id,
  })

  useEffect(() => {
    // TODO. highest, lowest points => ohlc값으로 바꾸기.
    if (lineData) {
      const { prices, total_volumes } = filteredPriceData(lineData, timeFrame)
      const sortedPrices = lineData.prices.slice().sort((a, b) => a[1] - b[1])

      setPoints(prices)
      setVolumes(total_volumes)
      setHighestPoint(sortedPrices.slice(-1)[0])
      setLowestPoint(sortedPrices[0])
    }
  }, [timeFrame, lineData])

  const latestPrice = useMemo(() => {
    if (lineData) {
      return lineData?.prices.slice(-1)[0][1]
    }
    return 0
  }, [lineData])

  const priceChange24h = useMemo(() => {
    if (detailData) {
      return detailData?.market_data.price_change_24h_in_currency[
        activeTradingPair
      ]
    }
    return 0
  }, [detailData, activeTradingPair])

  return {
    points: points as number[][],
    candles: candlesData as HistoricalOhlcReturn,
    volumes: volumes as number[][],
    highestPoint,
    lowestPoint,
    changeRate:
      detailData?.market_data.price_change_percentage_24h_in_currency[
        activeTradingPair
      ],
    latestPrice,
    prevClosingPrice: latestPrice - priceChange24h,
    isLoading: candlesIsLoading || lineIsLoading || detailIsLoading || !points,
    error: candlesError || lineError || detailError,
    streamType: 'SNAPSHOT' as 'REALTIME' | 'SNAPSHOT',
    interval: INTERVAL,
    tradingPairs,
    activeTradingPair,
    setActiveTradingPair: setActiveTradingPair as React.Dispatch<
      React.SetStateAction<string>
    >,
  }
}
