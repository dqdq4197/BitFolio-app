import React, { useMemo } from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import IncreaseDecreaseValue from '/components/common/IncreaseDecreaseValue';
import Text from '/components/common/Text';
import useLocales from '/hooks/useLocales';
import { currencyFormat, getCurrencySymbol } from '/lib/utils/currencyFormat';
import { digitToFixed } from '/lib/utils';
import { CoinType } from '/store/portfolio';
import { CoinStatType } from '/hooks/usePortfolioStats';
import SkeletonContainer from '/components/skeletonPlaceholder/common/Container';
import DynamicSizeText from '/components/common/DynamicSizeText';


type RowProps = {
  COL_WIDTH: number
  coin: CoinType
  stats?: CoinStatType | null
  totalCosts: number
  priceStats?: {
    current_price: number;
    price_change_percentage_24h: number | null;
  } 
  onAddButtonPress: (coin: CoinType) => void
}

type ColProps = {
  width: number
  children: React.ReactNode
  isLoading: boolean
}

const Skeleton = React.memo(() => {
  return (
    <SkeletonContainer>
      <SkeletonPlaceholder.Item justifyContent="flex-end" alignItems="flex-end">
        <SkeletonPlaceholder.Item width={80} height={13} borderRadius={3}/>
        <SkeletonPlaceholder.Item width={50} height={13} marginTop={10} borderRadius={3}/>
      </SkeletonPlaceholder.Item>
    </SkeletonContainer>
  )
})

const Col = ({ width, children, isLoading }: ColProps ) => {
  return (
    <ColWrap width={width}>
      { isLoading ? <Skeleton /> : children }
    </ColWrap>
  )
}

const 

StatisticsRow = ({ 
  COL_WIDTH,
  coin,
  stats,
  totalCosts,
  priceStats,
  onAddButtonPress
}: RowProps) => {
  const { t } = useTranslation();
  const { currency } = useLocales();
  const navigation = useNavigation();

  const handleRowPress = () => {
    const { id, symbol } = coin; 
    navigation.navigate('portfolioCoinDetail', {
      param: { id, symbol }, 
      screen: t('coinDetail.transactions')
    })
  }

  const PriceTab = useMemo(() => (
    <>
      { priceStats !== undefined && (
        <>
          <DynamicSizeText color100 bold>
            { currencyFormat({ 
              value: priceStats.current_price,
              prefix: getCurrencySymbol(currency)
            }) }
          </DynamicSizeText>
          <IncreaseDecreaseValue
            value={ digitToFixed(priceStats.price_change_percentage_24h ?? 0, 2) }
            afterPrefix="%"
            right
            bold
          />
        </>
      ) }
    </>
  ), [currency, priceStats])
  
  const HoldingsTab = useMemo(() => (
    <>
      { coin.state === 'watching' 
        ? <AddButton
            onPress={() => onAddButtonPress(coin)}
            activeOpacity={0.6}
            hitSlop={{
              bottom: 20,
              top: 20,
              left: 20,
              right: 20
            }}
          >
            <Text bold>
              { t(`common.add`) }
            </Text>
          </AddButton>
        : stats && (
          <> 
            <DynamicSizeText color100 bold>
              { currencyFormat({ 
                value: stats.holding_costs,
                prefix: getCurrencySymbol(currency)
              }) }
            </DynamicSizeText>
            <DynamicSizeText bold>
              { stats.holding_quantity + ' ' + coin.symbol.toUpperCase() }
            </DynamicSizeText>
          </>
        )
      }
    </>
  ), [stats, coin, onAddButtonPress])

  const BuyAvgPrice = useMemo(() => (
    <>
      { coin.state === 'watching'
        ? <Text>
            --
          </Text>
        : stats && (
          <>
            <DynamicSizeText bold color100>
              { currencyFormat({ 
                value: stats.total_purchase_quantity === 0 
                  ? 0 
                  : stats.total_purchase_cost / stats.total_purchase_quantity,
                prefix: getCurrencySymbol(currency)
              }) }
            </DynamicSizeText>
            <Text></Text>
          </>
        )
      }
    </>
  ), [coin, stats, currency])

  const PLTab = useMemo(() => (
    <>  
      { coin.state === 'watching' 
        ? <Text>
            --
          </Text> 
        : stats && (
          <>
            <DynamicSizeText bold color100>
              { currencyFormat({ 
                value: stats.all_time_pl,
                prefix: stats.all_time_pl > 0 
                  ? '+' + getCurrencySymbol(currency)
                  : getCurrencySymbol(currency)
              }) }
            </DynamicSizeText>
            <IncreaseDecreaseValue
              value={ 
                digitToFixed(stats.total_purchase_quantity === 0 
                  ? 0 
                  : stats.all_time_pl_percentage ?? 0, 2) 
              }
              afterPrefix="%"
              right
            />
          </>
        )
      }
    </>
  ), [stats, currency]) 

  const AllocationTab = useMemo(() => {
    const rate = stats && totalCosts 
      ? stats.holding_costs / totalCosts * 100  < 0
        ? 0
        : stats.holding_costs / totalCosts * 100
      : 0

    return (
      <>
        <Text bold margin="0 0 3px 0" color100>
          { currencyFormat({ value: rate }) }%
        </Text>
        <AllocationBar>
          <AllocationIndicator 
            rate={rate}
          />
        </AllocationBar>
      </>
    )
  }, [stats, totalCosts])
  
  return (
    <Container 
      activeOpacity={0.6}
      onPress={handleRowPress}
    >
      <Col 
        width={COL_WIDTH} 
        isLoading={priceStats === undefined}
        children={PriceTab}
      />
      <Col 
        width={COL_WIDTH} 
        isLoading={!stats && coin.state !== 'watching'}
        children={HoldingsTab}
      />
      <Col 
        width={COL_WIDTH} 
        isLoading={!stats && coin.state !== 'watching'}
        children={BuyAvgPrice}
      />
      <Col 
        width={COL_WIDTH} 
        isLoading={!stats && coin.state !== 'watching'} 
        children={PLTab}
      />
      <Col 
        width={COL_WIDTH} 
        isLoading={false}
        children={AllocationTab}
      />
    </Container>
  )
}

export default StatisticsRow;

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: 60px;
`

const ColWrap = styled.View<{ width: number }>`
  width: ${({ width }) => width }px;
  align-items: flex-end;
  justify-content: center;
`

const AddButton = styled.TouchableOpacity`
  width: 65px;
  height: 25px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.border.m};
  border-width: 1px;
  border-color: ${({ theme }) => theme.base.text[200]};
  margin-right: 3px;
`

const AllocationBar = styled.View`
  width: 80%;
  height: 11px;
  background-color: ${({ theme }) => theme.base.background[300]};
  border-radius: ${({ theme }) => theme.border.s};
  overflow: hidden;
`

const AllocationIndicator = styled.View<{rate: number}>`
  position: absolute;
  top: 0;
  width: ${({ rate }) => rate}%;
  height: 100%;
  background-color: ${({ theme }) => theme.base.text[200]};
`