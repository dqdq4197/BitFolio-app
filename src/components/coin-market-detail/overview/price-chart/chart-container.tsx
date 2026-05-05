import { Dimensions } from 'react-native'

import { ChartDataProvider } from '@/hooks/context/use-chart-context'
import { useAppSelector } from '@/hooks/use-redux'
import { CHART_TYPE } from '@/lib/constant'

import ExchangeAndPairSelector from './exchange-and-pair-selector'
import PriceAndDate from './price-and-date'
import CandlestickChart from './candlestick-chart'
import LineChart from './line-chart'
import ChartTab from './chart-tab'

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
        <CandlestickChart width={WIDTH} height={HEIGHT} padding={PADDING} />
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
