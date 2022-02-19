import React from 'react';
import styled from 'styled-components/native';
import {
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryCandlestick,
  VictoryLabel,
} from 'victory-native';

import { useChartState } from '/hooks/context/useChartContext';
import useGlobalTheme from '/hooks/useGlobalTheme';

import LoadBoundaryView from './LoadBoundaryView';

interface ChartProps {
  WIDTH: number;
  HEIGHT: number;
  PADDING: number;
}

const CandlesticChart = ({ WIDTH, HEIGHT, PADDING }: ChartProps) => {
  const { theme } = useGlobalTheme();
  const { candles, isLoading, error } = useChartState();
  // console.log(error.status);

  return (
    <ChartContainer WIDTH={WIDTH} HEIGHT={HEIGHT} PADDING={PADDING}>
      <LoadBoundaryView
        isLoading={isLoading}
        isNotFound={error?.status === 404}
      />
      {!isLoading && (
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
            fixLabelOverlap
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
                fontSize: parseInt(theme.size.font_s, 10),
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
            data={candles.slice(-60)}
            candleColors={{ positive: '#00e676', negative: '#f44336' }}
            style={{
              data: {
                stroke: 'transparent',
              },
            }}
          />
        </VictoryChart>
      )}
    </ChartContainer>
  );
};

export default CandlesticChart;

const ChartContainer = styled.View<ChartProps>`
  overflow: hidden;
  margin: 30px 0 20px;
  width: ${({ WIDTH, PADDING }) => WIDTH + PADDING}px;
  height: ${({ HEIGHT, PADDING }) => HEIGHT + PADDING}px;
`;
