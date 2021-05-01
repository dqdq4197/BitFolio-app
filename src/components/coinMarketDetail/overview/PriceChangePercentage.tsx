import React, { useMemo } from 'react';
import styled from 'styled-components/native';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory-native';
import { useTranslation } from 'react-i18next';
import useGlobalTheme from '/hooks/useGlobalTheme';
import Text from '/components/common/Text';

const padding = 25;

type ChangePercentageType = {
  percentage_24h: number,
  percentage_7d: number,
  percentage_30d: number,
  percentage_200d: number,
  percentage_1y: number,
}
const PriceChangePercentage = ({
  percentage_24h,
  percentage_7d,
  percentage_30d,
  percentage_200d,
  percentage_1y
} :ChangePercentageType ) => {
  const { t } = useTranslation();
  const theme = useGlobalTheme();

  return (
    <Container>
      <TitleWrap>
        <Text fontL color100 bold margin="0 10px 0 0">
          { t('coinDetail.price change percentage') }
        </Text>
      </TitleWrap>
      <VictoryChart
        height={120}
        padding={{
          right: padding,
          bottom: padding
        }}
        domainPadding={{ x: 45, y: 50 }}
      >
        <VictoryBar
          cornerRadius={{ top: 3 }}
          style={{
            labels: {
              fill: theme.base.text[200]
            },
            data: {
              strokeLinejoin: "round",
              strokeWidth: 1,
              strokeOpacity: 0.3,
              width: 40,
              borderRadius: 10,
              fill: theme.base.text[300]
            }
          }}
          data={[
            { x: '24h', y: percentage_24h, y0: 0 },
            { x: '7d', y: percentage_7d , y0: 0 },
            { x: '30d', y: percentage_30d, y0: 0 },
            { x: '200d', y: percentage_200d, y0: 0 },
            { x: '1y', y: percentage_1y , y0: 0 }
          ]}
          labels={({ datum }) => `${Math.floor((datum.y - datum.y0) * 100) / 100}`}
        />
          <VictoryAxis 
            offsetY={30}
            style={{ 
              axis: {
                stroke: "transparent",
                fill: theme.base.text[200],
                fontWeight: 'bold'
              },
              ticks: {
                stroke: "transparent",
              },
              tickLabels: {
                fill:theme.base.text[200],
                fontWeight: 500,
                fontSize: theme.size.font_ml
              },
              grid: {
                stroke: 'transparent'
              }  
            }}
          />
          <VictoryAxis 
            dependentAxis
            style={{ 
              tickLabels: {
                fill: 'transparent',
              },
              axis: {
                stroke: 'transparent'
              }
            }} 
          />
      </VictoryChart>
    </Container>
  )
}

export default PriceChangePercentage;

const Container = styled.View`
  margin-top: ${({ theme }) => theme.content.blankSpacing};
  padding: 0 ${({ theme }) => theme.content.spacing} 20px;
  background-color: ${({ theme }) => theme.base.background.surface};
  `

const TitleWrap = styled.View`
  padding: 20px 0
`