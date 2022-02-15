import React from 'react';
import { Dimensions } from 'react-native';

import { ChartDataProvider } from '/hooks/context/useChartContext';

import PriceAndDate from './PriceAndDate';
import CandlesticChart from './CandlesticChart';
import LineChart from './LineChart';
import ChartTab from './ChartTab';

const HEIGHT = 280; // 차트 높이
const PADDING = 25; // 차트 padding
const VOLUME_HEIGHT = 50;
const { width: WIDTH } = Dimensions.get('window');

type ContainerProps = {
  id: string;
  chartOption: 'prices' | 'total_volumes' | 'market_caps' | 'ohlc';
  lastUpdatedPrice: number;
  percentage_24h?: number;
  price_24h_ago: number;
};

const ChartContainer = ({
  chartOption,
  id,
  lastUpdatedPrice,
  percentage_24h,
  price_24h_ago,
}: ContainerProps) => {
  return (
    <ChartDataProvider>
      <PriceAndDate
        id={id}
        lastUpdatedPrice={lastUpdatedPrice}
        percentage_24h={percentage_24h}
      />
      {chartOption === 'ohlc' ? (
        <CandlesticChart
          id={id}
          HEIGHT={HEIGHT}
          PADDING={PADDING}
          WIDTH={WIDTH}
        />
      ) : (
        <LineChart
          HEIGHT={HEIGHT}
          PADDING={PADDING}
          WIDTH={WIDTH}
          VOLUME_HEIGHT={VOLUME_HEIGHT}
        />
      )}
      <ChartTab lastUpdatedPercentage={percentage_24h as number} />
    </ChartDataProvider>
  );
};

export default ChartContainer;
