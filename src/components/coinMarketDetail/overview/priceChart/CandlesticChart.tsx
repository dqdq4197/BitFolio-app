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
    <ChartContainer>
      <GlobalIndicator isLoaded={!isValidating}/>
      {data && 
        <VictoryChart
          theme={VictoryTheme.material}
          width={WIDTH + PADDING}
          height={HEIGHT + PADDING}
          padding={{
            right: PADDING,
            bottom: PADDING
          }}

          domainPadding={{ x: 25 }}
          scale={{ x: "time" }}
          containerComponent={
            <VictoryCursorContainer
              cursorDimension="x"
              cursorLabel={(data) => console.log(data)}
              style={{
                fill:'white',
                stroke: 'white',

              }}
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
            events={[{
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      target: "data",
                      mutation: (props) => {
                        const fill = props.style && props.style.fill;
                        return fill === "white" ? null : { style: { fill: "white" } };
                      }
                    }
                  ];
                }
              }
            }]}
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

const ChartContainer = styled.View`
  overflow: hidden;
  margin-top: 30px;
`