import React from 'react'
import { Dimensions } from 'react-native'

import { ChartDataProvider } from '/hooks/context/useChartContext'
import { useAppSelector } from '/hooks/useRedux'
import { CHART_TYPE } from '/lib/constant'

import ExchangeAndPairSelector from './ExchangeAndPairSelector'
import PriceAndDate from './PriceAndDate'
import CandlesticChart from './CandlesticChart'
import LineChart from './LineChart'
import ChartTab from './ChartTab'

const HEIGHT = 280 // 차트 높이
const PADDING = 25 // 차트 padding
const VOLUME_HEIGHT = 50
const { width: WIDTH } = Dimensions.get('window')

const ChartContainer = () => {
  const { chartType } = useAppSelector(state => state.baseSettingReducer)
  return (
    <ChartDataProvider>
      <ExchangeAndPairSelector />
      <PriceAndDate />
      {chartType === CHART_TYPE.CANDLESTICK ? (
        <CandlesticChart HEIGHT={HEIGHT} PADDING={PADDING} WIDTH={WIDTH} />
      ) : (
        <LineChart
          HEIGHT={HEIGHT}
          PADDING={PADDING}
          WIDTH={WIDTH}
          VOLUME_HEIGHT={VOLUME_HEIGHT}
        />
      )}
      <ChartTab />
    </ChartDataProvider>
  )
}

export default ChartContainer
