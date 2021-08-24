import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Svg } from 'react-native-svg';
import { VictoryPie, VictoryLabel, VictoryTooltip, VictoryLegend, VictoryContainer } from 'victory-native';
import { CoinStatType } from '/hooks/usePortfolioStats';
import useGlobalTheme from '/hooks/useGlobalTheme';


const { width } = Dimensions.get('window');

type AllocationViewProps = {
  coins?: { [key: string]: CoinStatType } 
  tatalCosts?: number
}

const CustomLabel = () => {
  return (
    <>
      <VictoryLabel />
        <VictoryTooltip
          x={200} 
          y={250}
          orientation="top"
          pointerLength={0}
          cornerRadius={50}
          flyoutWidth={100}
          flyoutHeight={100}
          flyoutStyle={{ fill: "white" }}
        />
    </>
  )
}
const AllocationView = ({ coins, tatalCosts }: AllocationViewProps) => {

  const { theme } = useGlobalTheme();

  if(!coins || !tatalCosts) return <></>

  const data = Object.entries(coins).map(coin => { 
    const label = coin[0];
    const holding_costs = coin[1].holding_costs
    return { 
      x: label, 
      y: holding_costs / tatalCosts * 100  < 1
        ? 1
        : holding_costs / tatalCosts * 100 
    }
  })

  return (
    <Container>
      <Svg 
        width={width - 32} 
        height={250} 
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <VictoryLegend standalone={false}
          colorScale={["tomato", "orange", "gold"]}
          x={216} 
          y={0}
          gutter={20}
          title="Legend"
          centerTitle
          style={{ 
            border: { stroke: "transparent" },
            labels: { fill: theme.base.text[200] },
            title: { display: 'none' }
          }}
          data={[
            { name: 'Cats' }, 
            { name: 'Dogs' },
            { name: 'Birds' },
            { name: 'fd' },
            { name: 'fd' },
            { name: 'fd' } 
          ]}
          
        />
        <VictoryPie
          name="pie"
          width={200}
          height={200}
          innerRadius={70}
          cornerRadius={3}
          labelRadius={100}
          style={{ labels: { fill: "transparent" } }}
          padAngle={2}
          data={[
            { x: "Cats", y: Math.round(Math.random() * 100) },
            { x: "Dogs", y: Math.round(Math.random() * 100) },
            { x: "Birds", y: Math.round(Math.random() * 100) },
            { x: "fd", y: Math.round(Math.random() * 100) },
            { x: "fd", y: Math.round(Math.random() * 100) },
            { x: "fd", y: Math.round(Math.random() * 100) },
          ]}
          radius={({ datum, active }) => (active ? 150 : 100)}
          events={[{
            target: "data",
            eventHandlers: {
              onPressIn: () => {
                return [
                  {
                    eventKey: "all",
                    mutation: () => {
                      console.log('press')
                    }
                  },
                  {
                    mutation: () => ({ active: true })
                  }
                ];
              }
            }
          }]}
          animate={{ easing: 'exp' }}
        />
      </Svg>
    </Container>
  )
}

export default AllocationView;

const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.content.surfacePadding} 0;
`