import React, { useState } from "react";
import Cursor from './Cursor';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { 
  VictoryChart, 
  VictoryBar,
  VictoryLine, 
  VictoryAxis,
} from 'victory-native';
import GlobalIndicator from '/components/common/GlobalIndicator';
import useMarketLineChartData from '/hooks/useMarketLineChartData';
import useGlobalTheme from '/hooks/useGlobalTheme';
import { CONTENT_SPACING } from '/lib/constant';

// const φ = (1 + Math.sqrt(5)) / 2;
// const height = (1 - 1 / φ) * Dimensions.get("window").height;
 
interface ConstType {
  WIDTH: number,
  HEIGHT: number,
  PADDING: number,
  VOLUME_HEIGHT: number,
}

interface ChartProps extends ConstType {
  id: string,
  chartOption: "prices" | "total_volumes" | "market_caps",
  lastUpdatedPrice: number,
  lastUpdatedPercentage: number,
}

const LineChart = ({ 
  id,
  chartOption, 
  lastUpdatedPrice, 
  lastUpdatedPercentage,
  WIDTH,
  HEIGHT,
  PADDING,
  VOLUME_HEIGHT
}: ChartProps) => {
  const { data, isValidating } = useMarketLineChartData({ id })
  const { theme } = useGlobalTheme();

  return (
    <ChartContainer
      WIDTH={WIDTH}
      HEIGHT={HEIGHT}
      PADDING={PADDING}
      VOLUME_HEIGHT={VOLUME_HEIGHT}
    >
      <GlobalIndicator isLoaded={!isValidating}/>
      { data && 
        <>
        <VictoryChart 
          width={ WIDTH + PADDING - CONTENT_SPACING * 2 }
          height={ HEIGHT }
          padding={{
            right: PADDING,
          }}
          scale={{x: "time", y: 'linear'}}
        >  
          <VictoryLine 
            style={{
              data: {
                stroke: lastUpdatedPercentage > 0 
                  ? theme.base.upColor
                  : lastUpdatedPercentage === 0 
                    ? theme.base.background[200]
                    : theme.base.downColor,
                strokeWidth: 2,
              }
            }}
            animate={{
              duration: 300
            }}
            data={data[chartOption]} 
            x={0}
            y={1}
            interpolation="linear"
          />
          <VictoryAxis 
            dependentAxis
            orientation="right"
            style={{ 
              tickLabels: {
                fill: '#bdbdbd',
                transform: `translate(-${lastUpdatedPrice.toString().length * 4}, 0)`,
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
        </VictoryChart>
        <CursorContainer
          WIDTH={WIDTH}
          HEIGHT={HEIGHT}
          PADDING={PADDING}
          VOLUME_HEIGHT={VOLUME_HEIGHT}
        >
          {data &&
            <Cursor
              data={data[chartOption]}
              width={WIDTH - CONTENT_SPACING * 2}
              height={HEIGHT}
            />
          }
        </CursorContainer>
        <VictoryChart
          width={ WIDTH + PADDING - CONTENT_SPACING * 2 }
          height={ VOLUME_HEIGHT }
          padding={{
            right: PADDING,
            bottom: PADDING
          }}
          scale={{x: "time", y: 'linear'}}
        >
          <VictoryBar
            data={data['total_volumes']} 
            x={0}
            y={1}
            domain={{
              y: [
                Math.min(...data['total_volumes'].map(v => v[1])),
                Math.max(...data['total_volumes'].map(v => v[1]))
              ]
            }}
            range={{
              y: [VOLUME_HEIGHT, 0]
            }}
            style={{
              data: {
                fill: theme.base.text[300]
              }
            }}
          />
          <VictoryAxis 
            fixLabelOverlap
            style={{ 
              axis: {
                stroke: "transparent",
                fill: theme.base.text[200]
              },
              ticks: {
                stroke: "transparent",
                fill: theme.base.text[200]
              },
              tickLabels: {
                fill: theme.base.text[200],
                fontSize: theme.size.font_ml,
              },  
            }} 
           />
        </VictoryChart>
        </>
      }
    </ChartContainer>
  );
};

export default LineChart;

const ChartContainer = styled.View<ConstType>`
  overflow: hidden;
  margin-top: 30px;
  width: ${({ WIDTH, PADDING }) => WIDTH + PADDING}px;
  height: ${({ HEIGHT, PADDING, VOLUME_HEIGHT }) => HEIGHT + PADDING + VOLUME_HEIGHT}px ;
  align-items: center;
`

const CursorContainer = styled.View<ConstType>`
  position: absolute;
  overflow: hidden;
  width: ${({ WIDTH, PADDING }) => WIDTH + PADDING - CONTENT_SPACING * 2}px; 
  height: ${({ HEIGHT, VOLUME_HEIGHT, PADDING }) => HEIGHT + VOLUME_HEIGHT - PADDING }px;
  z-index: 2;
  align-items: center;
`