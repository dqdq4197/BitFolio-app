import React from "react";
import Cursor from './Cursor';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { 
  VictoryChart, 
  VictoryLine, 
  VictoryAxis,
} from 'victory-native';
import useLineChartModel from '/hooks/useLineChartModel';
import GlobalIndicator from '/components/common/GlobalIndicator';


const φ = (1 + Math.sqrt(5)) / 2;
const { width, height: wHeight } = Dimensions.get("window");
const height = (1 - 1 / φ) * wHeight;
const padding = 25 // 차트 padding
const cursorR = 5;  // Cursor 반지름

interface ChartProps {
  data: [number[]];
  isValidating: boolean;
}

const LineChart = ({ data, isValidating }: ChartProps) => {
  
  const { scaleX, d } = useLineChartModel({data, width, height, cursorR});

  return (
    <ChartContainer>
      {isValidating &&
        <GlobalIndicator size='large'/>
      }
      <VictoryChart 
        width={width + padding}
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
            }
          }}
          animate 
          data={data} 
          x={0}
          y={1}
          interpolation="basis"
        />
        <VictoryAxis 
          style={{ 
            grid: {
              stroke: 'rgba(255,255,255,.1)'
            },
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
            },  
          }} 
        />
        <VictoryAxis 
          dependentAxis
          orientation="right"
          style={{ 
            tickLabels: {
              fill: 'rgba(255,255,255,0.3)',
              transform: 'translate(-37, 0)'
            },
            axis: {
              stroke: 'transparent'
            },
            grid: {stroke: 'rgba(255,255,255,.1)'},
          }} 
        />
      </VictoryChart>
      <CursorContainer>
        <Cursor
          path={d}
          scaleX={scaleX}
          data={data}
        />
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
`

const CursorContainer = styled.View`
  position: absolute;
  overflow: hidden;
  width: ${width + padding}px;
  height: ${height + cursorR}px;
  z-index: 121;
`


