import React, { useState, useMemo } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Merge } from 'mapped-types';
import { 
  VictoryPie, 
  VictoryLegend, 
  Slice
} from 'victory-native';
import { CoinStatType } from '/hooks/usePortfolioStats';
import useGlobalTheme from '/hooks/useGlobalTheme';
import useLocales from '/hooks/useLocales';
import { convertUnits, digitToFixed } from '/lib/utils';
import { ModeType } from '/store/portfolio';
import Text from '/components/common/Text';
import IncreaseDecreaseValue from '/components/common/IncreaseDecreaseValue';
import PrivatePlaceholder from './PrivatePlaceholder';

const { width } = Dimensions.get('window');

const LARGE_RADIUS = 120;
const SMALL_RADIUS = 115;
const INNER_RADIUS = 90;

type AllocationViewProps = {
  coins?: { [key: string]: CoinStatType } 
  tatalCosts?: number
  mode: ModeType
}
type ActiveIndex = number | null
type LegendContainerProps = Merge<
  { activeIndex: ActiveIndex }, 
  { children?: any }
>

const CustomLegendContainer = ({ activeIndex, children }: LegendContainerProps) => {
  const [rect, ...svgs] = children[0];

  const datas = useMemo(() => {
    const dataLength = svgs.length / 2;

    return svgs.slice(0, dataLength);
  }, [children])

  const labels = useMemo(() => {
    const dataLength = svgs.length / 2;

    return svgs.slice(-dataLength);
  }, [children])

  return (
    <CustomContainerWrap>
      { datas.map((data: any) => {
        const { style, size, events, index } = data.props; 
        const { text } = labels[index].props;

        return (
          <Legend 
            key={index}
            onPress={() => events.onPress()}
            activeOpacity={0.6}
            isActive={activeIndex === index}
          >
            <Point size={size} fill={style.fill} />
            <Text bold>
              { text }
            </Text>
          </Legend>
        )
      }) }
    </CustomContainerWrap>
  )
}

const CustomSlice = ({...props}) => {

  return (
    <Slice 
      {...props} 
      radius={props.index === props.activeIndex ? LARGE_RADIUS : SMALL_RADIUS}
    />
  )
}

const AllocationView = ({ 
  coins, 
  tatalCosts,
  mode
}: AllocationViewProps) => {

  const { theme } = useGlobalTheme();
  const [activeIndex, setActiveIndex] = useState<ActiveIndex>(null);
  const colorScale = ["#7c0000","#ff4d2d","#ff2430","#00c4ff","#00ffff","#0045cf","#6fc400","#ea59ff","#8d9b00","#002aa8","#faaf00","#0071e9","#ffa23e","#5b8bff","#a05a00","#0093f9","#ff855d","#0043a0","#f3d28a","#ec71ff","#003600","#ff007b","#2ea577","#ef61c9","#055932","#ffbaff","#122c00","#ff7f6c","#003c89","#a2c47b","#580049","#b7ffff","#760000","#dadff1","#730000","#007957","#8c002d","#003f75","#69470a","#002f57","#8c0a26","#38576e","#520000","#c6b29b","#80184a","#1d2b00","#d27c8d","#282520","#b78876","#8b6a62"];
  const { currency } = useLocales();
  
  if(!coins || !tatalCosts) return <></>
  
  const coinArr = Object.entries(coins);
  const pieData = coinArr.map(coin => { 
    const label = coin[0];
    const holding_costs = coin[1].holding_costs
    return { 
      x: label, 
      y: holding_costs / tatalCosts * 100  < 1
        ? 1
        : holding_costs / tatalCosts * 100 
    }
  })
  
  const legendData = coinArr.map(coin => {
    return {
      name: coin[1].symbol.toUpperCase()
    }
  })

  return (
    <Container>
      <VictoryPie 
        name="pie"
        dataComponent={<CustomSlice activeIndex={activeIndex} />}
        width={LARGE_RADIUS * 2}
        height={LARGE_RADIUS * 2}
        innerRadius={INNER_RADIUS}
        cornerRadius={3}
        padAngle={2}
        data={ pieData }
        style={{
          labels: {
            fill: 'transparent'
          }
        }}
        colorScale={colorScale}
        events={[
          {
            target: "data",
            eventHandlers: {
              onPress: () => {
                return [
                  {
                    target: "labels",
                    mutation: props => {
                      if(activeIndex === props.index) {
                        setActiveIndex(null);
                      } else {
                        setActiveIndex(props.index)
                      }
                      return ;
                    }
                  }
                ];
              }
            }
          }
        ]}
      />
      <VictoryLegend 
        name="legend"
        containerComponent={<CustomLegendContainer activeIndex={activeIndex}/>}
        centerTitle
        style={{
          labels: { 
            fill: theme.base.text[100], 
            fontSize: parseInt(theme.size.font_m)
          },
          data: { width: 20 }
        }}
        colorScale={colorScale}
        data={ legendData }
        events={[
          {
            target: "data",
            eventHandlers: {
              onPress: () => {
                return [
                  {
                    target: "data",
                    mutation: props => {
                      if(activeIndex === props.index) {
                        setActiveIndex(null);
                      } else {
                        setActiveIndex(props.index)
                      }
                      return ;
                    }
                  }
                ];
              }
          }
        }]}
      />
      { activeIndex !== null
        ? (
          <PieLabel>
            { mode === 'private'
              ? <>
                  <PrivatePlaceholder 
                    diameter={ 10 }
                    numberOfCircle={ 5 }
                    color300
                    horizontalSpacing={ 8 }
                  />
                  <PrivateWrap>
                    <PrivatePlaceholder 
                      diameter={ 8 }
                      numberOfCircle={ 3 }
                      color300
                      horizontalSpacing={ 6 }
                    />
                  </PrivateWrap>
                </>
              : <>
                  <Text fontL color100 bold>
                    { convertUnits(coinArr[activeIndex][1].holding_costs, currency) }
                  </Text>
                  <IncreaseDecreaseValue 
                    value={digitToFixed(coinArr[activeIndex][1].all_time_pl_percentage, 2)}
                    afterPrefix="%"
                    bold
                  />
                </>
            }
            
            <Text bold center>
              { activeIndex !== null && (
                Object.entries(coins)[activeIndex][0].charAt(0).toUpperCase() 
                + Object.entries(coins)[activeIndex][0].slice(1)
              ) }
            </Text>
          </PieLabel>
        )
        : null
       }
    </Container>
  )
}

export default AllocationView;

type LegendProps = {
  isActive: boolean
}

type PointProps = {
  size: number
  fill: string
}

const Container = styled.View`
  align-items: center;
  padding-top: ${({ theme }) => theme.content.surfacePadding};
`

const CustomContainerWrap = styled.View`
  width: ${({ theme }) => width - parseInt(theme.content.spacing) * 2}px;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.content.blankSpacing};
`

const Legend = styled.TouchableOpacity<LegendProps>`
  flex-direction: row;
  align-items: center;
  margin: 2px;
  background-color: ${({ theme, isActive }) => isActive 
    ?  theme.base.background[300]
    : 'transparent'
  };
  padding: 7px 8px;
  border-radius: ${({ theme }) => theme.border.m};
`

const Point = styled.View<PointProps>`
  ${({ size, fill }) => `
    width: ${ size * 2 }px;
    height: ${ size * 2}px;
    border-radius: ${ size }px;
    background-color: ${ fill };
  `};
  margin-right: 10px;
`

const PieLabel = styled.View`
  position: absolute;
  width: ${ INNER_RADIUS * 2}px;
  height: ${ INNER_RADIUS * 2}px;
  border-radius: ${ INNER_RADIUS }px;
  top: ${({ theme }) => parseInt(theme.content.surfacePadding) + LARGE_RADIUS - INNER_RADIUS}px;
  align-items: center;
  justify-content: center;
  z-index: -1;
`

const PrivateWrap = styled.View`
  margin: 8px 0;
`