import React from 'react';
import { Dimensions } from 'react-native';
import { 
  VictoryChart, 
  VictoryTheme, 
  VictoryAxis, 
  VictoryCandlestick, 
  VictoryCursorContainer
} from 'victory-native';
import useCandlesticChartData from '/hooks/useCandlesticChartData';
import useGlobalTheme from '/hooks/useGlobalTheme';
import GlobalIndicator from '/components/common/GlobalIndicator';
import styled from 'styled-components/native';


interface ConstType {
  WIDTH: number,
  HEIGHT: number,
  PADDING: number
}

interface ChartProps extends ConstType{
  id: string,
  lastUpdatedPrice: number,
}

const CandlesticChart = ({ 
  id, 
  lastUpdatedPrice,
  WIDTH,
  HEIGHT,
  PADDING
}:ChartProps) => {
  const { data, isValidating } = useCandlesticChartData({ id });
  const { theme } =useGlobalTheme();

  return (
    <ChartContainer
      WIDTH={WIDTH}
      HEIGHT={HEIGHT}
      PADDING={PADDING}
    >
      <GlobalIndicator isLoaded={!isValidating}/>
      {data && 
        <VictoryChart
          theme={VictoryTheme.grayscale}
          width={WIDTH + PADDING}
          height={HEIGHT + PADDING}
          padding={{
            right: PADDING,
            bottom: PADDING
          }}
          domainPadding={{ x: 25 }}
          scale={{ x: "time" }}
        >
          <VictoryAxis 
            style={{ 
              axis: {
                stroke: "transparent",
                fill: theme.base.text[200]
              },
              ticks: {
                stroke: "transparent",
              },
              tickLabels: {
                fill:theme.base.text[200],
              },
              grid: {
                stroke: 'transparent'
              }  
            }}
          />
          <VictoryAxis 
            dependentAxis
            orientation="left"
            offsetX={WIDTH}
            style={{ 
              tickLabels: {
                fill: theme.base.text[200],
              },
              axis: {
                stroke: 'transparent'
              },
              grid: {
                stroke: theme.base.text[300],
                strokeDasharray: 8,
              }
            }} 
          />
          <VictoryCandlestick
            x={0}
            open={1}
            high={2}
            low={3}
            close={4}
            data={data as any}
            candleColors={{ positive: "#00e676", negative: "#f44336" }}
            animate={{
              duration: 300,
            }}
            style={{
              data: {
                stroke: theme.base.text[300],
              },
            }}
          />
        </VictoryChart>
      }
    </ChartContainer>
  )
}

export default CandlesticChart;

const ChartContainer = styled.View<ConstType>`
  overflow: hidden;
  margin-top: 30px;
  width: ${({ WIDTH, PADDING }) => WIDTH + PADDING }px; 
  height: ${({ HEIGHT, PADDING }) => HEIGHT + PADDING }px;
`