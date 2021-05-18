import React from 'react';
import { Dimensions } from 'react-native';
import CandlesticChart from './CandlesticChart';
import LineChart from './LineChart';

const HEIGHT = 250;
const PADDING = 25 // 차트 padding
const { width: WIDTH } = Dimensions.get("window");
const VOLUME_HEIGHT = 50

type ContainerProps = {
  id: string,
  chartOption: "prices" | "total_volumes" | "market_caps" | 'ohlc',
  lastUpdatedPrice: number,
  lastUpdatedPercentage: number,
}

const ChartContainer = ({ 
  chartOption,
  id,
  lastUpdatedPrice,
  lastUpdatedPercentage
}: ContainerProps) => {
  return (
    <>
    { chartOption === 'ohlc' 
      ? <CandlesticChart
          id={id}
          lastUpdatedPrice={lastUpdatedPrice}
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
        />
    }
    </>
  )
}

export default ChartContainer;