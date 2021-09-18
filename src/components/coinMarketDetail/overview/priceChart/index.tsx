import React from 'react';
import { Dimensions } from 'react-native';
import CandlesticChart from './CandlesticChart';
import LineChart from './LineChart';

const HEIGHT = 280;
const PADDING = 25 // 차트 padding
const VOLUME_HEIGHT = 50
const { width: WIDTH } = Dimensions.get("window");

type ContainerProps = {
  id: string
  chartOption: "prices" | "total_volumes" | "market_caps" | 'ohlc'
  lastUpdatedPrice: number
  lastUpdatedPercentage: number
  price_24h_ago: number
}

const ChartContainer = ({ 
  chartOption,
  id,
  lastUpdatedPrice,
  lastUpdatedPercentage,
  price_24h_ago
}: ContainerProps) => {
  return (
    <>
    { chartOption === 'ohlc' 
      ? <CandlesticChart
          id={id}
          HEIGHT={HEIGHT}
          PADDING={PADDING}
          WIDTH={WIDTH}
        />
      : <LineChart 
          id={id}
          chartOption={chartOption}
          lastUpdatedPrice={lastUpdatedPrice}
          lastUpdatedPercentage={lastUpdatedPercentage}
          HEIGHT={HEIGHT}
          PADDING={PADDING}
          WIDTH={WIDTH}
          VOLUME_HEIGHT={VOLUME_HEIGHT}
          price_24h_ago={price_24h_ago}
        />
    }
    </>
  )
}

export default ChartContainer;