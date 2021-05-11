import React from 'react';
import { Dimensions } from 'react-native';
import { VictoryChart, VictoryTheme, VictoryAxis, VictoryCandlestick, VictoryZoomContainer } from 'victory-native';
import useCandlesticChartData from '/hooks/useCandlesticChartData';
import useGlobalTheme from '/hooks/useGlobalTheme';
import GlobalIndicator from '/components/common/GlobalIndicator';
import styled from 'styled-components/native';

interface ChartProps {
  id: string,
  lastUpdatedPrice: number,
}
const φ = (1 + Math.sqrt(5)) / 2;
const { width, height: wHeight } = Dimensions.get("window");
const height = (1 - 1 / φ) * wHeight;
const padding = 25 // 차트 padding
const cursorR = 5;  // Cursor 반지름
const CandlesticChart = ({ id, lastUpdatedPrice }:ChartProps) => {
  const { data, isValidating } = useCandlesticChartData({ id });
  const theme = useGlobalTheme();

  return (
    <ChartContainer>
      <GlobalIndicator isLoaded={!isValidating}/>
      {data && 
        <VictoryChart
          theme={VictoryTheme.material}
          width={width + padding}
          height={height + padding + cursorR}
          padding={{
            right: padding,
            bottom: padding
          }}
          domainPadding={{ x: 25 }}
          scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              allowZoom={true} 
            />
          }
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
            orientation="right"
            style={{ 
              tickLabels: {
                zIndex: 3,
                fill: '#bdbdbd',
                transform: `translate(-${lastUpdatedPrice.toString().length * 4}, 0)`,
              },
              axis: {
                stroke: 'transparent'
              },
              grid: {
                stroke: 'rgba(255,255,255,.1)'
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
          />
        </VictoryChart>
      }
    </ChartContainer>
  )
}

export default CandlesticChart;

const ChartContainer = styled.View`
  overflow: hidden;
  margin-top: 30px;
  width: ${width + padding}px;
  height: ${height + padding + cursorR}px;
`