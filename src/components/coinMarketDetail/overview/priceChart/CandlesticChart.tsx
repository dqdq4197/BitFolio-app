import React from 'react';
import styled from 'styled-components/native';
import {
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryCandlestick,
  VictoryLabel,
} from 'victory-native';

import useGlobalTheme from '/hooks/useGlobalTheme';
import { useAppSelector } from '/hooks/useRedux';
import useRequest from '/hooks/useRequest';
import { http, CoinGecko } from '/lib/api/CoinGeckoClient';
import { HistoricalOhlcReturn } from '/types/CoinGeckoReturnType';

import GlobalIndicator from '/components/common/GlobalIndicator';

interface IConst {
  WIDTH: number;
  HEIGHT: number;
  PADDING: number;
}

interface ChartProps extends IConst {
  id: string;
}

const CandlesticChart = ({ id, WIDTH, HEIGHT, PADDING }: ChartProps) => {
  const { theme } = useGlobalTheme();
  const { currency, chartTimeFrame } = useAppSelector(
    state => state.baseSettingReducer
  );
  const { data, isValidating } = useRequest<HistoricalOhlcReturn>(
    CoinGecko.coin.historicalOhlc(id, {
      days: chartTimeFrame,
      vs_currency: currency,
    }),
    http
  );

  return (
    <ChartContainer WIDTH={WIDTH} HEIGHT={HEIGHT} PADDING={PADDING}>
      <GlobalIndicator isLoaded={!isValidating} />
      {data && (
        <VictoryChart
          theme={VictoryTheme.grayscale}
          width={WIDTH + PADDING}
          height={HEIGHT + PADDING}
          padding={{
            top: PADDING,
            right: PADDING,
            bottom: PADDING,
          }}
          domainPadding={{ x: 25 }}
          scale={{ x: 'time' }}
        >
          <VictoryAxis
            style={{
              axis: {
                stroke: 'transparent',
                fill: theme.base.text[200],
              },
              ticks: {
                stroke: 'transparent',
              },
              tickLabels: {
                fill: theme.base.text[200],
              },
              grid: {
                stroke: 'transparent',
              },
            }}
          />
          <VictoryAxis
            dependentAxis
            fixLabelOverlap
            orientation="right"
            tickLabelComponent={
              <VictoryLabel verticalAnchor="middle" textAnchor="end" />
            }
            style={{
              tickLabels: {
                fill: theme.base.text[200],
                fontSize: parseInt(theme.size.font_s, 10),
                padding: -10,
              },
              axis: {
                stroke: 'transparent',
              },
              grid: {
                stroke: theme.base.background[300],
                strokeDasharray: 8,
              },
            }}
          />
          <VictoryCandlestick
            x={0}
            open={1}
            high={2}
            low={3}
            close={4}
            data={data}
            candleColors={{ positive: '#00e676', negative: '#f44336' }}
            style={{
              data: {
                stroke: theme.base.text[300],
              },
            }}
          />
        </VictoryChart>
      )}
    </ChartContainer>
  );
};

export default CandlesticChart;

const ChartContainer = styled.View<IConst>`
  overflow: hidden;
  margin: 30px 0 20px;
  width: ${({ WIDTH, PADDING }) => WIDTH + PADDING}px;
  height: ${({ HEIGHT, PADDING }) => HEIGHT + PADDING}px;
`;
