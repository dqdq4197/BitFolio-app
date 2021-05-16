import React from 'react';
import styled from 'styled-components/native';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryGroup, VictoryLabel } from 'victory-native';
import { VictoryLabelProps } from 'victory';
import { useTranslation } from 'react-i18next';
import { digitToFixed } from '/lib/utils';
import useGlobalTheme from '/hooks/useGlobalTheme';
import Text from '/components/common/Text';

const padding = 30;

type ChangePercentageType = {
  percentage_24h?: number,
  percentage_7d?: number | {},
  percentage_30d?: number | {},
  percentage_200d?: number | {},
  percentage_1y?: number | {},
}

const NegativeAwareTickLabel = ({
  datum, 
  y,
  dy, 
  ...rest
}: VictoryLabelProps) => {
  return (
    <VictoryLabel
      datum={ datum }
      y={ 100 } 
      dy={ Math.sign((datum as { y: number })?.y) >= 0 ? 15 : 0 }
      {...rest} 
    />
  );
};

const PriceChangePercentage = ({
  percentage_24h,
  percentage_7d,
  percentage_30d,
  percentage_200d,
  percentage_1y
} :ChangePercentageType ) => {
  const { t } = useTranslation();
  const { theme } =useGlobalTheme();
  
  return (
    <Container>
      <Header>
        <Text fontL color100 bold margin="0 10px 0 0">
          { t('coinDetail.price change percentage') } (%)
        </Text>
      </Header>
      <VictoryChart
        height={ 120 }
        padding={{
          right: padding,
          bottom: padding,
        }}
        domainPadding={{ x: 45, y: 30 }}
      >
        <VictoryGroup 
          data={[
            { x: '24h', y: percentage_24h || 0 },
            { x: '7d', y: percentage_7d || 0 },
            { x: '30d', y: percentage_30d || 0 },
            { x: '200d', y: percentage_200d || 0 },
            { x: '1y', y: percentage_1y || 0 }
          ]}
        >
          <VictoryBar
            cornerRadius={{ top: 3 }}
            style={{
              labels: {
                fill: theme.base.text[200],
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
            labels={({ datum }) => 
              `${ digitToFixed(datum.y, 2) }`
            }
          />
          <VictoryBar
            labels={({ datum }) => `${datum.x}`}
            style={{
              data: { 
                fill: "none" 
              },
              labels: {
                fill: theme.base.text[200],
                fontWeight: '600',
              },
            }}
            labelComponent={ <NegativeAwareTickLabel /> }
          />
        </VictoryGroup>
        <VictoryAxis 
          style={{
            tickLabels: { 
              fill: "none" 
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

const Header = styled.View`
  padding: 20px 0;
`