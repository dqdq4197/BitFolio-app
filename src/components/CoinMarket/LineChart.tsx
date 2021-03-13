import React from "react";
import { Dimensions } from "react-native";
import { scaleTime, scaleLinear } from "d3-scale";
import * as shape from "d3-shape";
import { Svg, Path } from 'react-native-svg';
import Cursor from './Cursor';
import styled from 'styled-components/native';
import { 
  VictoryCursorContainer,
  VictoryChart, 
  VictoryLine, 
  VictoryAxis,
} from 'victory-native';

import { CoordinatesPropType } from 'victory-core';

interface ChartProps {
  data: [number[]]
}

const φ = (1 + Math.sqrt(5)) / 2;
const { width, height: wHeight } = Dimensions.get("window");
const height = (1 - 1 / φ) * wHeight;
const cursorR = 5;  // Cursor 반지름
const padding = 25 // 차트 padding

const getDomain = (domain: number[]) => [
  Math.min(...domain),
  Math.max(...domain)
];

const LineChart = ({ data }: ChartProps) => {
  const scaleX = scaleTime()
    .domain(getDomain(data.map(d => d[0])))
    .range([0, width]);
  const scaleY = scaleLinear()
    .domain(getDomain(data.map(d => d[1])))
    .range([height + cursorR, 0]);
  const d = 
    shape
    .line<number[]>()
    .x(p => scaleX(p[0]))
    .y(p => scaleY(p[1]))
    .curve(shape.curveBasis)(data) as string
  
  const handleCursorChange = (event:CoordinatesPropType, props:any) => {
    console.log(event);
  }
  return (
    <ChartContainer>
      {/* <Svg>
        <Path 
          d={d}
          fill='transparent'
          stroke={'white'}
        />
      </Svg> */}
      
      <VictoryChart 
        width={width + padding}
        height={height + padding + cursorR}
        padding={{
          right: padding,
          bottom: padding
        }}
        scale={{x: "time", y: 'linear'}}
        containerComponent={
          <VictoryCursorContainer
            onCursorChange={handleCursorChange}
          />
        }
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
          valueX={getDomain(data.map(d => d[0]))}
          valueY={getDomain(data.map(d => d[1]))}
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
  margin-top: 100px;
  width: ${width + padding}px;
  height: ${height + padding + cursorR}px;
`

const CursorContainer = styled.View`
  position: absolute;
  overflow: hidden;
  width: ${width + padding}px;
  height: ${height + cursorR}px;
`