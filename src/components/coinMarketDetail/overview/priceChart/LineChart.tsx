import React, { useMemo, useState } from "react";
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { 
  VictoryChart, 
  VictoryBar,
  VictoryLine, 
  VictoryAxis,
  VictoryLabel,
  VictoryScatter,
} from 'victory-native';
import GlobalIndicator from '/components/common/GlobalIndicator';
import useMarketLineChartData from '/hooks/useMarketLineChartData';
import useGlobalTheme from '/hooks/useGlobalTheme';
import useLocales from '/hooks/useLocales';
import { CONTENT_SPACING } from '/lib/constant';
import { currencyFormat, getCurrencySymbol } from '/lib/utils/currencyFormat';
import Cursor from './Cursor';

// const φ = (1 + Math.sqrt(5)) / 2;
// const height = (1 - 1 / φ) * Dimensions.get("window").height;
const CURSOR_SIZE = 16;
 
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

const BaseLineLabel = React.memo((props: any) => {
  const { theme } = useGlobalTheme(); 
  const x = 0;
  const y = props.scale.y(props.y); 
  const { isCursorActive } = props;

  return (
    <VictoryLabel 
      {...props} 
      x={x} 
      y={y}
      style={{
        fill: isCursorActive ? theme.base.text[200] : 'transparent',
        fontSize: parseInt(theme.size.font_s)
      }}
      backgroundStyle={{
        fill: isCursorActive ? theme.base.background.surface : 'transparent',
        borderRadius: 100
      }}
      textAnchor="start"
      backgroundPadding={{
        left: 10, right: 10, top: 5, bottom: 5
      }}
    />
  ) 
})

// const ScatterWithLabel = (props: any) => {
//   const { x, y, size } = props;

//   return (
//     <VictoryScatter 
//       data={[{ x, y }]}
//       size={ 2 }
//       style={{ 
//         data: { 
//           fill: isCursorActive ? 'transparent' : strokeColor,
//         }
//       }}
//       labels={[ 
//         t('coinDetail.highest') + ' ' +
//         currencyFormat({ value: highestPrice[1], prefix: getCurrencySymbol(currency) })
//       ]}
//       labelComponent={
//         <VictoryLabel 
//           style={[
//             { 
//               fill: isCursorActive ? 'transparent' : strokeColor, 
//               fontSize: parseInt(theme.size.font_s) 
//             }
//           ]}
//           textAnchor="end"
//         />
//       }
//     />
//   )
// }

const CustomLabel = (props: any) => {
  const { isCursorActive, color, text, x, y, dy, width } = props;
  const { theme } = useGlobalTheme();
  
  return (
    <VictoryLabel 
      x={ x }
      y={ y }
      dy={ dy }
      style={[
        { 
          fill: isCursorActive ? 'transparent' : color, 
          fontSize: parseInt(theme.size.font_s) 
        }
      ]}
      textAnchor={ 
        x < 45 
        ? 'start' 
        : width - x < 45
          ? 'end'
          : 'middle'
      }
      text={ text }
    />
  )
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
  const { t } = useTranslation();
  const [isCursorActive, setIsCursorActive] = useState(false);
  const { data, isValidating, highestPrice, lowestPrice } = useMarketLineChartData({ id })
  const { theme } = useGlobalTheme();
  const { currency } = useLocales();

  const strokeColor = useMemo(() => {
    return  lastUpdatedPercentage > 0 
      ? theme.base.upColor
      : lastUpdatedPercentage === 0 
        ? theme.base.background[200]
        : theme.base.downColor
  }, [lastUpdatedPercentage, theme])
  
  const handleCursorActiveChange = (state: boolean) => {
    if(isCursorActive && state) return ;
    setIsCursorActive(state);
  }

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
            top: PADDING,
            bottom: PADDING
          }}
          scale={{x: "time", y: 'linear'}}
        >  
          <VictoryAxis 
            dependentAxis
            style={{ 
              tickLabels: {
                fill: 'transparent',
              },
              axis: {
                stroke: 'transparent'
              },
              grid: {
                stroke: theme.base.background[300],
                strokeDasharray: 8,
              }
            }} 
          />
          <VictoryLine 
            style={{
              data: {
                stroke: theme.base.text[300],
                strokeWidth: 1,
                strokeDasharray: 3,
              }
            }}
            data={data[chartOption].map(v => [v[0], data[chartOption][0][1]])}
            x={0}
            y={1} 
            interpolation="linear"
          />
          <VictoryLine 
            style={{
              data: {
                stroke: lastUpdatedPercentage > 0 
                  ? theme.base.upColor
                  : lastUpdatedPercentage === 0 
                    ? theme.base.background[200]
                    : theme.base.downColor,
                strokeWidth: 1.5,
              }
            }}
            animate={{
              duration: 300
            }}
            data={data[chartOption]} 
            x={0}
            y={1}
            interpolation="catmullRom"
          />
          <VictoryAxis 
            dependentAxis
            orientation='right'
            tickLabelComponent={
              <VictoryLabel 
                verticalAnchor="middle"
                textAnchor="end"
              />
            }
            style={{ 
              tickLabels: {
                fill: isCursorActive ? theme.base.text[200]: 'transparent',
                fontSize: theme.size.font_s,
              },
              axis: {
                stroke: 'transparent'
              },
              grid: {
                stroke: 'transparent',
                strokeDasharray: 8,
              }
            }} 
          />
          <BaseLineLabel 
            y={ data[chartOption][0][1] }
            dy={ -5 }
            text={ 
              currencyFormat({ 
                value: data[chartOption][0][1], 
                prefix: getCurrencySymbol(currency)
              }) 
            }
            isCursorActive={isCursorActive}
          />
          {/* <ScatterWithLabel 
            x={ highestPrice[0] }
            y={ highestPrice[1] }
            size={ 2 }
            labels={[ 
              t('coinDetail.highest') + ' ' +
              currencyFormat({ value: highestPrice[1], prefix: getCurrencySymbol(currency) })
            ]}
            isCursorActive={ isCursorActive }
            color={ strokeColor }
          /> */}
          <VictoryScatter 
            data={[{ x: highestPrice[0], y: highestPrice[1] }]}
            size={ 2 }
            style={{ 
              data: { 
                fill: isCursorActive ? 'transparent' : strokeColor,
              }
            }}
            labels={[ 
              t('coinDetail.highest') + ' ' +
              currencyFormat({ value: highestPrice[1], prefix: getCurrencySymbol(currency) })
            ]}
            labelComponent={
              <CustomLabel 
                isCursorActive={ isCursorActive }
                color={ strokeColor }
              />
              // <VictoryLabel 
              //   style={[
              //     { 
              //       fill: isCursorActive ? 'transparent' : strokeColor, 
              //       fontSize: parseInt(theme.size.font_s) 
              //     }
              //   ]}
              //   textAnchor={(props) => {
              //     // console.log(props.scale.x(highestPrice[0]))
              //     return 'middle'
              //   }}
              // />
            }
          />
          <VictoryScatter 
            data={[{ x: lowestPrice[0], y: lowestPrice[1] }]}
            size={ 2 }
            style={{ 
              data: { 
                fill: isCursorActive ? 'transparent' : strokeColor
              }
            }}
            labels={[ 
              t('coinDetail.lowest') + ' ' +
              currencyFormat({ value: lowestPrice[1], prefix: getCurrencySymbol(currency) }) 
            ]}
            labelComponent={
              <CustomLabel 
                isCursorActive={ isCursorActive }
                color={ strokeColor }
                dy={ 10 }
              />
            }
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
              CURSOR_SIZE={CURSOR_SIZE}
              PADDING={PADDING}
              highestPrice={highestPrice}
              lowestPrice={lowestPrice}
              onCursorActiveChange={handleCursorActiveChange}
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
                fontSize: parseInt(theme.size.font_m),
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