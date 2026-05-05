import styled from 'styled-components/native'
import {
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
} from 'victory-native'

import { useChartState } from '@/hooks/context/useChartContext'
import useGlobalTheme from '@/hooks/useGlobalTheme'

import LoadBoundaryView from './LoadBoundaryView'

interface ChartProps {
  width: number
  height: number
  padding: number
}

const CandlestickChart = ({ width, height, padding }: ChartProps) => {
  const { theme } = useGlobalTheme()
  const { candles, isLoading, error } = useChartState()

  return (
    <ChartContainer $width={width} $height={height} $padding={padding}>
      <LoadBoundaryView
        isLoading={isLoading}
        isNotFound={error?.status === 404}
      />
      {!isLoading && (
        <VictoryChart
          theme={VictoryTheme.grayscale}
          width={width + padding}
          height={height + padding}
          padding={{
            top: padding,
            right: padding,
            bottom: padding,
          }}
          domainPadding={{ x: 25 }}
          scale={{ x: 'time', y: 'linear' }}
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
  )
}

export default CandlestickChart

type StyledChartProps = {
  $width: number
  $height: number
  $padding: number
}

const ChartContainer = styled.View<StyledChartProps>`
  overflow: hidden;
  margin: 30px 0 20px;
  width: ${({ $width, $padding }) => $width + $padding}px;
  height: ${({ $height, $padding }) => $height + $padding}px;
`
