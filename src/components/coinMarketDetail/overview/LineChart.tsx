import React from "react";
import Cursor from './Cursor';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { 
  VictoryChart, 
  VictoryLine, 
  VictoryAxis,
} from 'victory-native';
import GlobalIndicator from '/components/common/GlobalIndicator';
import useMarketLineChartData from '/hooks/useMarketLineChartData';
import { CONTENT_SPACING } from '/lib/constant';


const φ = (1 + Math.sqrt(5)) / 2;
const { width, height: wHeight } = Dimensions.get("window");
const height = (1 - 1 / φ) * wHeight;
const padding = 25 // 차트 padding
const cursorR = 5;  // Cursor 반지름

interface ChartProps {
  id: string,
  chartOption: "prices" | "total_volumes" | "market_caps"
}

const LineChart = ({id, chartOption}: ChartProps) => {
  
  const { data, isValidating } = useMarketLineChartData({ id })

  
  
  return (
    <ChartContainer>
      <GlobalIndicator isLoaded={!isValidating}/>
      {data && 
        <VictoryChart 
          width={width + padding - CONTENT_SPACING * 2}
          height={height + padding + cursorR}
          padding={{
            right: padding,
            bottom: padding
          }}
          scale={{x: "time", y: 'linear'}}
        >
          <VictoryLine 
            style={{
              data: {
                stroke: 'red',
                strokeWidth: 2
              }
            }}
            animate={{
              duration: 300
            }}
            data={data[chartOption]} 
            x={0}
            y={1}
            interpolation="basis"
          />
          <VictoryAxis 
            style={{ 
              axis: {
                stroke: "transparent",
                fill: 'white'
              },
              ticks: {
                stroke: "transparent",
                fill: 'white'
              },
              tickLabels: {
                fill:'white',
                fontSize: 13,
              },  
            }} 
          />
          <VictoryAxis 
            dependentAxis
            orientation="right"
            style={{ 
              tickLabels: {
                zIndex: 3,
                fill: '#bdbdbd',
                transform: 'translate(-37, 0)',
              },
              axis: {
                stroke: 'transparent'
              },
              grid: {
                stroke: 'rgba(255,255,255,.1)'
              }
            }} 
          />
        </VictoryChart>
      }
      <CursorContainer>
        {data &&
          <Cursor
            data={data[chartOption]}
            width={width - CONTENT_SPACING * 2}
            height={height}
            cursorR={cursorR}
          />
        }
      </CursorContainer>
    </ChartContainer>
  );
};

export default LineChart;

const ChartContainer = styled.View`
  overflow: hidden;
  margin-top: 30px;
  width: ${width + padding}px;
  height: ${height + padding + cursorR}px;
  align-items: center;
`

const CursorContainer = styled.View`
  position: absolute;
  overflow: hidden;
  width: ${width + padding - CONTENT_SPACING * 2}px;
  height: ${height + cursorR}px;
  z-index: 2;
  align-items: center;
`

const Skeleton = styled.View`

`


