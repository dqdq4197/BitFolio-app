import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import IncreaseDecreaseValue from '/components/common/IncreaseDecreaseValue';
import Text from '/components/common/Text';
import useLocales from '/hooks/useLocales';
import usePortfolioCoinStats from '/hooks/usePortfolioCoinStats';
import { CoinMarketReturn } from '/lib/api/CoinGeckoReturnType';
import { currencyFormat, getCurrencySymbol } from '/lib/utils/currencyFormat';
import { digitToFixed } from '/lib/utils';
import { CoinType } from '/store/portfolio';




type RowProps = {
  COL_WIDTH: number
  coin: CoinType
  data?: CoinMarketReturn
  onAddButtonPress: (coin: CoinType) => void
}

type ColProps = {
  width: number
  children: React.ReactNode
  isLoading: boolean
}

const Col = ({ width, children, isLoading }: ColProps ) => {
  return (
    <ColWrap width={width}>
      { isLoading ? <></> : children }
    </ColWrap>
  )
}

const StatisticsRow = ({ 
  COL_WIDTH,
  coin,
  data,
  onAddButtonPress
}: RowProps) => {

  const { t } = useTranslation();
  const { currency } = useLocales();
  // const { } = usePortfolioCoinStats({ id });

  return (
    <Container 
      activeOpacity={0.6}
    >
      <Col width={COL_WIDTH} isLoading={!data}>
        <Text color100>
          { currencyFormat({ 
            value: data!.current_price,
            prefix: getCurrencySymbol(currency)
          }) }
        </Text>
        <IncreaseDecreaseValue
          value={ digitToFixed(data!.price_change_percentage_24h ?? 0, 2) }
          afterPrefix="%"
          textStyle={{
            right: true
          }}
        />
      </Col>
      <Col width={COL_WIDTH} isLoading={!data}>
        { coin.type === 'tracking'
          ? <AddButton
              onPress={() => onAddButtonPress(coin)}
              activeOpacity={0.6}
              hitSlop={{
                bottom: 10,
                top: 10,
                left: 10,
                right: 10
              }}
            >
              <Text>
                { t(`common.add`) }
              </Text>
            </AddButton>
          : <> 
              <Text color100>
                { currencyFormat({ 
                  value: data!.current_price,
                  prefix: getCurrencySymbol(currency)
                }) }
              </Text>
              <IncreaseDecreaseValue
                value={ digitToFixed(data!.price_change_percentage_24h ?? 0, 2) }
                afterPrefix="%"
                textStyle={{
                  right: true
                }}
              />
            </>
        }
      </Col>
    </Container>
  )
}

export default StatisticsRow;

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: 60px;
  /* background-color: white; */
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
`