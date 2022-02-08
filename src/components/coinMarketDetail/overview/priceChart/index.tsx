import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { chartType } from 'base-types';

import PriceAndDate from './PriceAndDate';
import CandlesticChart from './CandlesticChart';
import LineChart from './LineChart';

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
  const datumX = useSharedValue('-');
  const datumY = useSharedValue(['-', '-']);
  const datumYChangePercentage = useSharedValue('-');
  const [isCursorActive, setIsCursorActive] = useState(false);
  const [percentageStatus, setPercentageStatus] =
    useState<chartType.percentageStatus>(
      'negative' || 'unchanged' || 'positive'
    );

  const handleIsCursorActiveChange = (state: boolean) => {
    if (isCursorActive && state) return;
    setIsCursorActive(!isCursorActive);
  };

  const handlePercentageStatusChange = (status: chartType.percentageStatus) => {
    if (percentageStatus === status) return;
    setPercentageStatus(status);
  };

  return (
    <>
      <PriceAndDate
        id={id}
        lastUpdatedPrice={lastUpdatedPrice}
        percentage_24h={percentage_24h}
        isCursorActive={isCursorActive}
        datumX={datumX}
        datumY={datumY}
        datumYChangePercentage={datumYChangePercentage}
        percentageStatus={percentageStatus}
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
          id={id}
          chartOption={chartOption}
          lastUpdatedPrice={lastUpdatedPrice}
          HEIGHT={HEIGHT}
          PADDING={PADDING}
          WIDTH={WIDTH}
          VOLUME_HEIGHT={VOLUME_HEIGHT}
          price_24h_ago={price_24h_ago}
          datumX={datumX}
          datumY={datumY}
          datumYChangePercentage={datumYChangePercentage}
          isCursorActive={isCursorActive}
          onIsCursorActiveChange={handleIsCursorActiveChange}
          onPercentageStatusChange={handlePercentageStatusChange}
        />
      )}
    </>
  );
};

export default ChartContainer;
